import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read environment variables from .env
function loadEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    throw new Error("No .env file found at " + envPath);
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

async function sync() {
  console.log("\n=======================================================");
  console.log("   🚀 SYNCING LOCAL PORTFOLIO CONTENT TO SUPABASE");
  console.log("=======================================================\n");

  const env = loadEnv();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  // Prefer service_role key for admin write operations (bypasses RLS), fallback to anon key
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: VITE_SUPABASE_URL and key are missing in .env");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Import local data
  const { BOOKS_CATALOG } = await import("../src/data/booksCatalog.js");
  const {
    personalInfo,
    workExperience,
    skillsData,
    projectsData,
    educationData,
    certificationsData
  } = await import("../src/data/portfolioData.js");
  const { BOOK_PAGES_DATA } = await import("../src/data/bookPagesData.js");

  // 1. Sync Profile
  console.log("⏳ Syncing profile...");
  const { error: profileErr } = await supabase
    .from("portfolio_profile")
    .upsert({
      name: personalInfo.name,
      role: personalInfo.shortBio,
      introduction: personalInfo.titles?.join(" | ") || personalInfo.shortBio,
      email: personalInfo.email,
      phone: personalInfo.phone,
      github_url: personalInfo.github,
      linkedin_url: personalInfo.linkedin,
      location: personalInfo.location,
      coordinates: personalInfo.coordinates,
      updated_at: new Date().toISOString()
    }, { onConflict: "email" });

  if (profileErr) {
    console.warn("   ⚠️  Profile sync notice:", profileErr.message);
  } else {
    console.log("   ✅ Profile synced: " + personalInfo.name);
  }

  // 2. Sync Books
  console.log("⏳ Syncing 9 books catalog...");
  const booksToUpsert = BOOKS_CATALOG.map((b, idx) => ({
    slug: b.id,
    index_label: b.index,
    title: b.title,
    subtitle: b.subtitle,
    category: b.category,
    cover_color: b.color,
    text_color: b.textColor,
    spine_pattern: b.spinePattern || "solid",
    tagline: b.tagline,
    display_order: idx + 1,
    is_active: true
  }));

  const { error: booksErr } = await supabase
    .from("books")
    .upsert(booksToUpsert, { onConflict: "slug" });

  if (booksErr) {
    console.warn("   ⚠️  Books sync notice:", booksErr.message);
  } else {
    console.log(`   ✅ Synced ${booksToUpsert.length} books in catalog.`);
  }

  // 3. Sync Book Pages
  console.log("⏳ Syncing detailed book pages & chapters...");
  const pagesToUpsert = [];
  for (const [slug, data] of Object.entries(BOOK_PAGES_DATA)) {
    if (data.indexPage) {
      pagesToUpsert.push({
        book_slug: slug,
        page_type: "index",
        page_number: 0,
        title: data.indexPage.chapterTitle || "Table of Contents",
        subtitle: data.indexPage.tagline,
        content: data.indexPage
      });
    }
    if (data.page1) {
      pagesToUpsert.push({
        book_slug: slug,
        page_type: "content",
        page_number: 1,
        title: data.page1.title,
        subtitle: data.page1.subtitle,
        content: data.page1
      });
    }
    if (data.page2) {
      pagesToUpsert.push({
        book_slug: slug,
        page_type: "content",
        page_number: 2,
        title: data.page2.title,
        subtitle: data.page2.subtitle,
        content: data.page2
      });
    }
  }

  const { error: pagesErr } = await supabase
    .from("book_pages")
    .upsert(pagesToUpsert, { onConflict: "book_slug,page_number" });

  if (pagesErr) {
    console.warn("   ⚠️  Book pages sync notice:", pagesErr.message);
  } else {
    console.log(`   ✅ Synced ${pagesToUpsert.length} book pages.`);
  }

  // 4. Sync Skills
  console.log("⏳ Syncing technical skills...");
  const skillsToUpsert = [];
  let skillOrder = 1;
  for (const cat of skillsData.categories) {
    for (const s of cat.skills) {
      skillsToUpsert.push({
        name: s.name,
        category_id: cat.id,
        category_title: cat.title,
        is_learning: Boolean(s.isLearning),
        level: s.level,
        display_order: skillOrder++
      });
    }
  }

  const { error: skillsErr } = await supabase
    .from("portfolio_skills")
    .upsert(skillsToUpsert, { onConflict: "name" });

  if (skillsErr) {
    console.warn("   ⚠️  Skills sync notice:", skillsErr.message);
  } else {
    console.log(`   ✅ Synced ${skillsToUpsert.length} skills across categories.`);
  }

  // 5. Sync Projects
  console.log("⏳ Syncing projects...");
  const projectsToUpsert = projectsData.map((p, idx) => ({
    slug: p.id,
    index_label: p.index,
    title: p.title,
    category: p.category,
    project_type: p.type,
    summary: p.summary,
    technologies: p.technologies || [],
    features: p.features || [],
    highlights: p.highlights || [],
    github_url: p.github,
    is_professional: Boolean(p.isProfessional),
    display_order: idx + 1,
    is_active: true
  }));

  const { error: projErr } = await supabase
    .from("portfolio_projects")
    .upsert(projectsToUpsert, { onConflict: "slug" });

  if (projErr) {
    console.warn("   ⚠️  Projects sync notice:", projErr.message);
  } else {
    console.log(`   ✅ Synced ${projectsToUpsert.length} projects.`);
  }

  // 6. Sync Experience
  console.log("⏳ Syncing work experience...");
  const expToUpsert = workExperience.map((e, idx) => ({
    slug: e.id,
    role: e.role,
    company: e.company,
    location: e.location,
    area: e.area,
    is_current: Boolean(e.isCurrent),
    points: e.points || [],
    technologies: e.technologies || [],
    display_order: idx + 1
  }));

  const { error: expErr } = await supabase
    .from("portfolio_experience")
    .upsert(expToUpsert, { onConflict: "slug" });

  if (expErr) {
    console.warn("   ⚠️  Experience sync notice:", expErr.message);
  } else {
    console.log(`   ✅ Synced ${expToUpsert.length} work experience entries.`);
  }

  // 7. Sync Education & Certifications
  console.log("⏳ Syncing education and certifications...");
  const eduToUpsert = educationData.map((e, idx) => ({
    institution: e.institution,
    degree: e.degree,
    period: e.period,
    score: e.score,
    location: e.location,
    record_type: e.type,
    display_order: idx + 1
  }));
  const { error: eduErr } = await supabase.from("portfolio_education").upsert(eduToUpsert, { onConflict: "institution,degree" });
  if (eduErr) console.warn("   ⚠️  Education sync notice:", eduErr.message);
  else console.log(`   ✅ Synced ${eduToUpsert.length} education records.`);

  const certsToUpsert = certificationsData.map((c, idx) => ({
    title: c.title,
    issuer: c.issuer,
    period: c.period,
    skills: c.skills || [],
    display_order: idx + 1
  }));
  const { error: certErr } = await supabase.from("portfolio_certifications").upsert(certsToUpsert, { onConflict: "title" });
  if (certErr) console.warn("   ⚠️  Certifications sync notice:", certErr.message);
  else console.log(`   ✅ Synced ${certsToUpsert.length} certifications.`);

  console.log("\n=======================================================");
  console.log("   🎉 SYNC COMPLETE! Your database is now up to date.");
  console.log("=======================================================\n");
}

sync().catch((err) => {
  console.error("\n❌ Sync failed with unexpected error:", err.message);
  process.exit(1);
});

