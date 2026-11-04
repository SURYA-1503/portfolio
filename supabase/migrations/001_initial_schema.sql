-- ============================================================
-- SURYA M. DEVELOPER LIBRARY — Supabase PostgreSQL Migration
-- File: supabase/migrations/001_initial_schema.sql
-- Run this in Supabase SQL Editor or via supabase CLI:
--   supabase db push
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- TABLE: books (the 9 bookshelf items)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.books (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,           -- e.g. "about-me"
  index_label     TEXT NOT NULL,                  -- e.g. "01"
  title           TEXT NOT NULL,
  subtitle        TEXT,
  category        TEXT,
  cover_color     TEXT NOT NULL DEFAULT '#d9975b',
  text_color      TEXT NOT NULL DEFAULT '#1f1408',
  spine_pattern   TEXT DEFAULT 'solid',
  tagline         TEXT,
  display_order   INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- TABLE: book_pages (index + content pages)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.book_pages (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  book_slug     TEXT NOT NULL REFERENCES public.books(slug) ON DELETE CASCADE,
  page_type     TEXT NOT NULL CHECK (page_type IN ('index','content')),
  page_number   INTEGER NOT NULL,       -- 0=index, 1=page1, 2=page2
  title         TEXT,
  subtitle      TEXT,
  content       JSONB NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(book_slug, page_number)
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_profile
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  role          TEXT,
  introduction  TEXT,
  email         TEXT,
  phone         TEXT,
  github_url    TEXT,
  linkedin_url  TEXT,
  location      TEXT,
  coordinates   TEXT,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_skills
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_skills (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  category_id   TEXT NOT NULL,
  category_title TEXT NOT NULL,
  is_learning   BOOLEAN DEFAULT FALSE,
  level         TEXT,
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_projects
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  index_label     TEXT,
  title           TEXT NOT NULL,
  category        TEXT,
  project_type    TEXT,
  summary         TEXT,
  technologies    JSONB DEFAULT '[]',
  features        JSONB DEFAULT '[]',
  highlights      JSONB DEFAULT '[]',
  github_url      TEXT,
  live_url        TEXT,
  is_professional BOOLEAN DEFAULT FALSE,
  display_order   INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_experience
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_experience (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  role            TEXT NOT NULL,
  company         TEXT NOT NULL,
  location        TEXT,
  area            TEXT,
  is_current      BOOLEAN DEFAULT FALSE,
  points          JSONB DEFAULT '[]',
  technologies    JSONB DEFAULT '[]',
  display_order   INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_education
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_education (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  institution   TEXT NOT NULL,
  degree        TEXT,
  period        TEXT,
  score         TEXT,
  location      TEXT,
  record_type   TEXT DEFAULT 'Degree',
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- TABLE: portfolio_certifications
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_certifications (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title         TEXT NOT NULL,
  issuer        TEXT,
  period        TEXT,
  skills        JSONB DEFAULT '[]',
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- TABLE: contact_messages (visitor inquiries)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public READ policies (portfolio is public)
CREATE POLICY "Public can read active books"
  ON public.books FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can read book pages"
  ON public.book_pages FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read profile"
  ON public.portfolio_profile FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read skills"
  ON public.portfolio_skills FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read active projects"
  ON public.portfolio_projects FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can read experience"
  ON public.portfolio_experience FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read education"
  ON public.portfolio_education FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read certifications"
  ON public.portfolio_certifications FOR SELECT
  USING (TRUE);

-- Contact messages: visitors can INSERT only (no read/update/delete)
CREATE POLICY "Visitors can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (TRUE);

-- NO public DELETE / UPDATE / INSERT on portfolio content tables
-- Admin writes must use service_role key from a secure backend environment.

-- ─────────────────────────────────────────────
-- SEED DATA — Books catalog
-- ─────────────────────────────────────────────
INSERT INTO public.books (slug, index_label, title, subtitle, category, cover_color, text_color, spine_pattern, tagline, display_order) VALUES
  ('about-me',          '01', 'ABOUT ME',    'Surya M. Story',    'Identity & Story',      '#d9975b', '#1f1408', 'solid',    'Junior Software Developer @ Digiclarity Global Solutions', 1),
  ('my-skills',         '02', 'MY SKILLS',   'Active & Learning', 'Technical Stack',       '#6b9e78', '#0f1c13', 'ruled',    'Java · Python · FastAPI · Spring Boot · MySQL · React',    2),
  ('experience',        '03', 'EXPERIENCE',  'Digiclarity Scope', 'Career Log',            '#c86751', '#210d08', 'embossed', 'Backend Development & Healthcare Automation',               3),
  ('my-projects',       '04', 'MY PROJECTS', 'Built & Deployed',  'Project Showcase',      '#4f86a8', '#0b1c26', 'ruled',    'Healthcare Autom. · Hospital MS · Bus Transit · Shopping', 4),
  ('my-journey',        '05', 'MY JOURNEY',  'Milestone Log',     'Career Progression',    '#e0d0b0', '#262015', 'solid',    'College CSE → QSpiders → Digiclarity → Full-Stack',        5),
  ('hobbies-interests', '06', 'HOBBIES',     'Beyond the Code',   'Personal Dimension',    '#c27382', '#240e14', 'ruled',    'Music · Video Games · Tech Radar · UI Craft',              6),
  ('education',         '07', 'EDUCATION',   'Academics & Certs', 'Credentials',           '#d1a84b', '#241a05', 'embossed', 'B.E. CSE 8.12 CGPA · QSpiders · Wipro · HackerRank',       7),
  ('resume',            '08', 'RESUME',      'Recruiter PDF',     'Curriculum Vitae',      '#577a68', '#0d1a12', 'solid',    'Print & Download ATS-Friendly Formatted PDF',              8),
  ('contact',           '09', 'CONTACT',     'Transmission Hub',  'Direct Inquiries',      '#374151', '#f9fafb', 'ruled',    'Chennai, India (13.0827° N, 80.2707° E)',                  9)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Portfolio profile
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_profile (name, role, introduction, email, phone, github_url, linkedin_url, location, coordinates) VALUES
  (
    'Surya M.',
    'Junior Software Developer | Backend Developer | Aspiring Full-Stack Developer',
    'I am a Junior Software Developer currently working at Digiclarity Global Solutions, primarily focused on backend development, scalable application architectures, and automation solutions.',
    'suryasiva1503@gmail.com',
    '+91 9566682024',
    'https://github.com/SURYA-1503',
    'https://linkedin.com/in/surya-m-352ab32a3',
    'Chennai, Tamil Nadu, India',
    '13.0827° N, 80.2707° E'
  )
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Skills
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_skills (name, category_id, category_title, is_learning, level, display_order) VALUES
  ('Java',                    'languages', 'Programming Languages',   FALSE, 'Proficient',          1),
  ('Python',                  'languages', 'Programming Languages',   FALSE, 'Proficient',          2),
  ('FastAPI',                 'backend',   'Backend Development',     FALSE, 'Proficient',          3),
  ('Spring Boot',             'backend',   'Backend Development',     FALSE, 'Proficient',          4),
  ('JDBC',                    'backend',   'Backend Development',     FALSE, 'Proficient',          5),
  ('REST APIs',               'backend',   'Backend Development',     FALSE, 'Proficient',          6),
  ('MySQL',                   'database',  'Databases',               FALSE, 'Proficient',          7),
  ('SQL',                     'database',  'Databases',               FALSE, 'Proficient',          8),
  ('PostgreSQL',              'database',  'Databases',               FALSE, 'Proficient',          9),
  ('Playwright',              'automation','Automation & Testing',    FALSE, 'Proficient',          10),
  ('Python Automation',       'automation','Automation & Testing',    FALSE, 'Proficient',          11),
  ('HTML5',                   'frontend',  'Frontend Development',    FALSE, 'Proficient',          12),
  ('CSS3',                    'frontend',  'Frontend Development',    FALSE, 'Proficient',          13),
  ('JavaScript',              'frontend',  'Frontend Development',    FALSE, 'Proficient',          14),
  ('React',                   'frontend',  'Frontend Development',    TRUE,  'Currently Learning',  15),
  ('Git',                     'tools',     'Tools, Cloud & DevOps',   FALSE, 'Proficient',          16),
  ('GitHub',                  'tools',     'Tools, Cloud & DevOps',   FALSE, 'Proficient',          17),
  ('Docker',                  'tools',     'Tools, Cloud & DevOps',   TRUE,  'Currently Learning',  18),
  ('Google Cloud Platform',   'tools',     'Tools, Cloud & DevOps',   TRUE,  'Currently Learning',  19),
  ('CI/CD',                   'tools',     'Tools, Cloud & DevOps',   TRUE,  'Currently Learning',  20)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Projects
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_projects (slug, index_label, title, category, project_type, summary, technologies, features, highlights, github_url, is_professional, display_order) VALUES
  (
    'proj-automation', '01',
    'Healthcare Automation Workflow', 'Production Engineering', 'Professional Scope @ Digiclarity',
    'Enterprise healthcare automation workflow utilizing headless browser orchestration, FastAPI microservices, and database-driven task queues.',
    '["Python","Playwright","FastAPI","SQL","Automation"]',
    '["Headless browser automation with Playwright for secure healthcare portals.","Backend API integration and task validation pipelines using FastAPI.","Database-driven state tracking for asynchronous execution batches.","Process monitoring, error recovery, and robust telemetry logs."]',
    '["Playwright Orchestration","FastAPI Service","Data-Driven Workflow"]',
    NULL, TRUE, 1
  ),
  (
    'proj-hospital', '02',
    'Hospital Management System', 'Full Backend System', 'Personal Project',
    'A comprehensive backend system for orchestrating hospital operations, patient records, doctor scheduling, and pharmacy inventory.',
    '["Java","Spring Boot","REST API","MySQL"]',
    '["Doctor appointment scheduling and calendar management.","Medicine dosage tracking and real-time inventory quantity management.","Multi-branch and hospital information cataloging.","Complete CRUD architecture with layered enterprise Spring Boot patterns.","Relational schema modeling and MySQL database integration."]',
    '["Layered Backend Architecture","Robust CRUD Operations","Relational Integrity"]',
    'https://github.com/SURYA-1503/Hospital-Management', FALSE, 2
  ),
  (
    'proj-bus', '03',
    'Bus Reservation System', 'Java Enterprise & JDBC', 'Personal Project',
    'A high-reliability Java database application managing bus seat bookings, passenger travel preferences, and instant cancellations.',
    '["Java","JDBC","MySQL"]',
    '["Real-time seat reservation with interactive seat preference tracking.","Customer contact and passenger record management.","Flexible travel date scheduling and instant booking cancellations.","Direct JDBC connection pooling and relational transaction handling with MySQL."]',
    '["Direct JDBC Layer","Transaction Management","Seat Allocation Engine"]',
    'https://github.com/SURYA-1503/BusReservation', FALSE, 3
  ),
  (
    'proj-ecommerce', '04',
    'Online Shopping Management', 'Frontend Web App', 'Personal Project',
    'An interactive e-commerce product catalog with dynamic cart state management, client-side storage persistence, and reactive DOM updates.',
    '["HTML5","CSS3","JavaScript","DOM","LocalStorage"]',
    '["Interactive product catalog with category browsing.","Dynamic cart state with real-time add, remove, and quantity updates.","DOM manipulation without heavy frontend framework overhead.","LocalStorage persistence retaining user basket state across browser sessions."]',
    '["Zero-Dependency Vanilla JS","LocalStorage Persistence","Reactive DOM UI"]',
    'https://github.com/SURYA-1503/Online-Shopping-Management', FALSE, 4
  )
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Experience
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_experience (slug, role, company, location, area, is_current, points, technologies, display_order) VALUES
  (
    'exp-digiclarity',
    'Junior Software Developer', 'Digiclarity Global Solutions', 'Chennai, India',
    'Backend Development & Automation', TRUE,
    '["Engineered backend application services and reliable data-driven processes.","Developed and maintained healthcare-related automation workflows leveraging browser automation and backend integrations.","Collaborated on backend application development, REST API design, and automation process monitoring.","Actively exploring frontend integration and modern web application development.","Expanding infrastructure competencies in Docker containerization, GCP cloud deployment, and automated CI/CD pipelines."]',
    '["Python","FastAPI","Playwright","SQL","REST APIs","Git","Docker (Learning)","GCP (Learning)"]',
    1
  )
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Education
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_education (institution, degree, period, score, location, record_type, display_order) VALUES
  ('K.S. Rangasamy College of Technology',       'B.E. Computer Science and Engineering', '2020 – 2024', 'CGPA: 8.12 / 10', 'Tiruchengode, Tamil Nadu', 'Degree',    1),
  ('Vani Vidhyalaya Matric Higher Secondary School', 'Higher Secondary Certificate (HSC)', '2019 – 2020', 'Percentage: 71.5%', 'Tamil Nadu', 'Schooling', 2),
  ('SKV Matric Higher Secondary School',         'Secondary School Leaving Certificate (SSLC)', '2017 – 2018', 'Percentage: 88.4%', 'Tamil Nadu', 'Schooling', 3)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Certifications
-- ─────────────────────────────────────────────
INSERT INTO public.portfolio_certifications (title, issuer, period, skills, display_order) VALUES
  ('Java Full Stack Development',  'QSpiders, Velachery, Chennai', 'July 2024 – December 2024',  '["Java","Spring Boot","SQL","Full-Stack Concepts"]', 1),
  ('Java Full Stack Development',  'Wipro TalentNext',             'July 2023 – September 2023', '["Core Java","J2EE","Web Services"]',               2),
  ('Basic SQL Certification',      'HackerRank',                   'September 2023 – October 2023','["SQL Queries","Joins","Aggregations","Schema Design"]', 3)
ON CONFLICT DO NOTHING;

