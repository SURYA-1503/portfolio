/**
 * portfolioService.js
 * Data access layer — tries Supabase first, gracefully falls back
 * to local static data when credentials are not configured.
 */

import { supabase, isSupabaseConfigured } from "./supabase";
import {
  BOOKS_CATALOG
} from "../data/booksCatalog";
import {
  personalInfo,
  skillsData,
  projectsData,
  workExperience,
  educationData,
  certificationsData
} from "../data/portfolioData";
import { BOOK_PAGES_DATA } from "../data/bookPagesData";

// ─────────────────────────────────────────────────────────────────────────────
// BOOKS
// ─────────────────────────────────────────────────────────────────────────────
export async function getBooks() {
  if (!isSupabaseConfigured) return BOOKS_CATALOG;

  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data?.length) return BOOKS_CATALOG;

    return data.map((b) => ({
      id: b.slug,
      index: b.index_label,
      title: b.title,
      subtitle: b.subtitle,
      category: b.category,
      color: b.cover_color,
      textColor: b.text_color,
      spinePattern: b.spine_pattern,
      tagline: b.tagline
    }));
  } catch {
    return BOOKS_CATALOG;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────────────────────
export async function getProfile() {
  if (!isSupabaseConfigured) return personalInfo;

  try {
    const { data, error } = await supabase
      .from("portfolio_profile")
      .select("*")
      .single();

    if (error || !data) return personalInfo;

    return {
      name: data.name,
      shortBio: data.role,
      email: data.email,
      phone: data.phone,
      github: data.github_url,
      linkedin: data.linkedin_url,
      location: data.location,
      coordinates: data.coordinates
    };
  } catch {
    return personalInfo;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────
export async function getSkills() {
  if (!isSupabaseConfigured) return skillsData;

  try {
    const { data, error } = await supabase
      .from("portfolio_skills")
      .select("*")
      .order("display_order");

    if (error || !data?.length) return skillsData;

    // Group by category
    const categoryMap = {};
    data.forEach((s) => {
      if (!categoryMap[s.category_id]) {
        categoryMap[s.category_id] = {
          id: s.category_id,
          title: s.category_title,
          skills: []
        };
      }
      categoryMap[s.category_id].skills.push({
        name: s.name,
        isLearning: s.is_learning,
        level: s.level
      });
    });

    return { categories: Object.values(categoryMap) };
  } catch {
    return skillsData;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
export async function getProjects() {
  if (!isSupabaseConfigured) return projectsData;

  try {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data?.length) return projectsData;

    return data.map((p) => ({
      id: p.slug,
      index: p.index_label,
      title: p.title,
      category: p.category,
      type: p.project_type,
      summary: p.summary,
      technologies: p.technologies || [],
      features: p.features || [],
      highlights: p.highlights || [],
      github: p.github_url,
      liveUrl: p.live_url,
      isProfessional: p.is_professional
    }));
  } catch {
    return projectsData;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────
export async function getExperience() {
  if (!isSupabaseConfigured) return workExperience;

  try {
    const { data, error } = await supabase
      .from("portfolio_experience")
      .select("*")
      .order("display_order");

    if (error || !data?.length) return workExperience;

    return data.map((e) => ({
      id: e.slug,
      role: e.role,
      company: e.company,
      location: e.location,
      area: e.area,
      isCurrent: e.is_current,
      points: e.points || [],
      technologies: e.technologies || []
    }));
  } catch {
    return workExperience;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────────────────────
export async function getEducation() {
  if (!isSupabaseConfigured) return educationData;

  try {
    const { data, error } = await supabase
      .from("portfolio_education")
      .select("*")
      .order("display_order");

    if (error || !data?.length) return educationData;

    return data.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      period: e.period,
      score: e.score,
      location: e.location,
      type: e.record_type
    }));
  } catch {
    return educationData;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
export async function getCertifications() {
  if (!isSupabaseConfigured) return certificationsData;

  try {
    const { data, error } = await supabase
      .from("portfolio_certifications")
      .select("*")
      .order("display_order");

    if (error || !data?.length) return certificationsData;

    return data.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      period: c.period,
      skills: c.skills || []
    }));
  } catch {
    return certificationsData;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMIT CONTACT MESSAGE
// ─────────────────────────────────────────────────────────────────────────────
export async function submitContactMessage({ name, email, message }) {
  if (!isSupabaseConfigured) {
    // Graceful degradation — log in dev, pretend success in prod
    console.info("[Contact] Supabase not configured — message not persisted:", { name, email });
    return { success: true, local: true };
  }

  try {
    const { error } = await supabase.from("contact_messages").insert([
      { name, email, message }
    ]);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

