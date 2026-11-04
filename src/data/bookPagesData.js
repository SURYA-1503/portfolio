import {
  personalInfo,
  aboutNarrative,
  workExperience,
  skillsData,
  projectsData,
  educationData,
  certificationsData,
  interestsData,
  learningJourney
} from "./portfolioData";

export const BOOK_PAGES_DATA = {
  "about-me": {
    id: "about-me",
    title: "ABOUT ME",
    subtitle: "Surya M. Story",
    category: "Identity & Story",
    color: "#d9975b",
    indexPage: {
      chapterNum: "01",
      chapterTitle: "Identity & Personal Dossier",
      tagline: "Junior Software Developer @ Digiclarity Global Solutions",
      summary:
        "An exploration of my background, backend engineering philosophy, healthcare automation workflows, and my long-term journey toward becoming a versatile Full-Stack Developer.",
      sections: [
        { label: "Section 1", title: "Background & Production Work", page: 1 },
        { label: "Section 2", title: "Full-Stack Vision & Pursuits", page: 2 }
      ],
      metadata: [
        { label: "Location", val: personalInfo.location },
        { label: "GPS Coords", val: personalInfo.coordinates },
        { label: "Status", val: "Active Full-Time Engineer" }
      ]
    },
    page1: {
      title: "Background & Current Role",
      subtitle: "Digiclarity Global Solutions",
      content: [
        aboutNarrative.intro,
        aboutNarrative.experienceHighlight
      ],
      highlights: [
        { label: "Primary Area", value: "Backend Development" },
        { label: "Specialization", value: "Healthcare-related automation workflows" },
        { label: "Methodology", value: "Modular, testable, and maintainable services" }
      ]
    },
    page2: {
      title: "Growth & Long-Term Vision",
      subtitle: "The Path to Full-Stack",
      content: [
        aboutNarrative.growthMindset,
        aboutNarrative.longTermGoal,
        aboutNarrative.personalNote
      ],
      callout: "Committed to deep technical depth across backend architecture, intuitive frontends, cloud native infrastructure, and automated CI/CD pipelines."
    }
  },

  "my-skills": {
    id: "my-skills",
    title: "MY SKILLS",
    subtitle: "Active & Learning",
    category: "Technical Stack",
    color: "#6b9e78",
    indexPage: {
      chapterNum: "02",
      chapterTitle: "Technical Skills Matrix",
      tagline: "Production Competencies vs. Active Learning",
      summary:
        "A rigorous, authentic breakdown of my technical capabilities. Clearly separates production-tested backend and database tools from emerging technologies I am actively learning.",
      sections: [
        { label: "Section 1", title: "Active Production Competencies", page: 1 },
        { label: "Section 2", title: "Currently Learning & Cloud Expansion", page: 2 }
      ],
      metadata: [
        { label: "Core Langs", val: "Java, Python, SQL" },
        { label: "Frameworks", val: "FastAPI, Spring Boot" },
        { label: "Expansion", val: "React, Docker, GCP, CI/CD" }
      ]
    },
    page1: {
      title: "Active Production Skills",
      subtitle: "Backend, Databases & Automation",
      categories: skillsData.categories.filter((c) =>
        ["languages", "backend", "database", "automation"].includes(c.id)
      ),
      note: "These technologies represent my core day-to-day production expertise used to engineer reliable REST services and automation tasks."
    },
    page2: {
      title: "Currently Learning",
      subtitle: "Frontend & Cloud DevOps",
      items: [
        { name: "React.js", domain: "Frontend UI, Component Lifecycle & State" },
        { name: "Docker", domain: "Containerization & Microservice Environments" },
        { name: "Google Cloud Platform (GCP)", domain: "Cloud Hosting, Storage & Infrastructure" },
        { name: "CI/CD Pipelines", domain: "Automated Build, Test & Deployment" }
      ],
      note: "Strict Honesty Policy: These technologies are under active expansion. They are not represented as advanced expertise, but as dedicated growth areas."
    }
  },

  "experience": {
    id: "experience",
    title: "EXPERIENCE",
    subtitle: "Digiclarity Scope",
    category: "Career Logbook",
    color: "#c86751",
    indexPage: {
      chapterNum: "03",
      chapterTitle: "Professional Career Logbook",
      tagline: "Digiclarity Global Solutions — Chennai, India",
      summary:
        "Detailed engineering logbook of my professional tenure as a Junior Software Developer. Covers healthcare automation, backend service design, and infrastructure learning.",
      sections: [
        { label: "Section 1", title: "Role Overview & Healthcare Scope", page: 1 },
        { label: "Section 2", title: "Key Engineering Tasks & Tech Applied", page: 2 }
      ],
      metadata: [
        { label: "Company", val: "Digiclarity Global Solutions" },
        { label: "Role", val: "Junior Software Developer" },
        { label: "Status", val: "Current Employment" }
      ]
    },
    page1: {
      title: "Role & Healthcare Automation",
      subtitle: "Current Employment Details",
      role: workExperience[0].role,
      company: workExperience[0].company,
      location: workExperience[0].location,
      area: workExperience[0].area,
      narrative:
        "As a Junior Software Developer at Digiclarity Global Solutions, I develop backend services and maintain mission-critical healthcare-related automation workflows using Python and Playwright.",
      highlights: [
        "Architecting backend services for data-driven processes.",
        "Developing headless browser automation for healthcare workflows.",
        "Actively exploring frontend integration with modern web apps."
      ]
    },
    page2: {
      title: "Engineering Log & Toolchain",
      subtitle: "Responsibilities & Technologies",
      tasks: workExperience[0].points,
      technologies: workExperience[0].technologies,
      confidentialityNote:
        "Confidentiality Assurance: Proprietary patient health information, internal client portals, and private API credentials are strictly protected in adherence to HIPAA standards."
    }
  },

  "my-projects": {
    id: "my-projects",
    title: "MY PROJECTS",
    subtitle: "Built & Deployed",
    category: "Project Showcase",
    color: "#4f86a8",
    indexPage: {
      chapterNum: "04",
      chapterTitle: "Project Showcase Index",
      tagline: "4 Key Engineering Systems",
      summary:
        "Comprehensive documentation of my major applications: from full backend hospital and transit engines to vanilla JavaScript web apps and production healthcare automation.",
      sections: [
        { label: "Section 1", title: "Healthcare Automation & Hospital MS", page: 1 },
        { label: "Section 2", title: "Bus Reservation & Shopping Management", page: 2 }
      ],
      metadata: [
        { label: "Scope", val: "Backend, Enterprise, Frontend" },
        { label: "Repositories", val: "Verified GitHub Links" },
        { label: "Languages", val: "Java, Python, JS, SQL" }
      ]
    },
    page1: {
      title: "Systems 01 & 02",
      subtitle: "Automation & Enterprise Spring Boot",
      projects: [
        projectsData.find((p) => p.id === "proj-automation"),
        projectsData.find((p) => p.id === "proj-hospital")
      ]
    },
    page2: {
      title: "Systems 03 & 04",
      subtitle: "Relational JDBC & Client-Side DOM",
      projects: [
        projectsData.find((p) => p.id === "proj-bus"),
        projectsData.find((p) => p.id === "proj-ecommerce")
      ]
    }
  },

  "my-journey": {
    id: "my-journey",
    title: "MY JOURNEY",
    subtitle: "Milestone Log",
    category: "Career Progression",
    color: "#e0d0b0",
    indexPage: {
      chapterNum: "05",
      chapterTitle: "Evolution & Learning Journey",
      tagline: "Academic Foundations to Full-Stack Ambition",
      summary:
        "A milestone timeline detailing my progression from B.E. in Computer Science and Engineering to rigorous full-stack training, current software development, and future cloud expansion.",
      sections: [
        { label: "Section 1", title: "Foundations: Degree & Training", page: 1 },
        { label: "Section 2", title: "Industry Role & Future Trajectory", page: 2 }
      ],
      metadata: [
        { label: "Degree", val: "B.E. Computer Science" },
        { label: "CGPA", val: "8.12 / 10" },
        { label: "Specialization", val: "QSpiders Java Full Stack" }
      ]
    },
    page1: {
      title: "Academic & Specialized Training",
      subtitle: "2020 – 2024 Foundations",
      milestones: learningJourney.slice(0, 2)
    },
    page2: {
      title: "Current Role & Forward Horizon",
      subtitle: "Digiclarity & Full-Stack Expansion",
      milestones: learningJourney.slice(2)
    }
  },

  "hobbies-interests": {
    id: "hobbies-interests",
    title: "HOBBIES",
    subtitle: "Beyond the Code",
    category: "Personal Dimension",
    color: "#c27382",
    indexPage: {
      chapterNum: "06",
      chapterTitle: "Personal Dimension & Pursuits",
      tagline: "Flow State, Strategy & Digital Aesthetics",
      summary:
        "A look at my interests beyond the terminal: focus music, tactical video gaming, continuous technology exploration, and the craft of creative UI interaction design.",
      sections: [
        { label: "Section 1", title: "Soundscapes & Strategic Gaming", page: 1 },
        { label: "Section 2", title: "Technology Radar & Creative UI", page: 2 }
      ],
      metadata: [
        { label: "Focus Tool", val: "Instrumental Soundtracks" },
        { label: "Gaming", val: "Tactical & Multiplayer" },
        { label: "Curiosity", val: "Interaction & Cloud Runtimes" }
      ]
    },
    page1: {
      title: "Soundscapes & Gaming",
      subtitle: "Mental Clarity & Rapid Decision-Making",
      items: interestsData.slice(0, 2)
    },
    page2: {
      title: "Curiosity & Interaction Craft",
      subtitle: "Continuous Exploration",
      items: interestsData.slice(2)
    }
  },

  "education": {
    id: "education",
    title: "EDUCATION",
    subtitle: "Academics & Certs",
    category: "Academic Credentials",
    color: "#d1a84b",
    indexPage: {
      chapterNum: "07",
      chapterTitle: "Education & Certifications",
      tagline: "Verified Academic Records & Industry Training",
      summary:
        "Official documentation of my academic degrees in Computer Science and Engineering, school credentials, and recognized full-stack industry certifications.",
      sections: [
        { label: "Section 1", title: "Formal Academic Degrees", page: 1 },
        { label: "Section 2", title: "Professional Certifications", page: 2 }
      ],
      metadata: [
        { label: "College", val: "K.S. Rangasamy College of Tech" },
        { label: "Degree", val: "B.E. Computer Science" },
        { label: "Score", val: "8.12 / 10 CGPA" }
      ]
    },
    page1: {
      title: "Formal Education",
      subtitle: "Degree & School Records",
      records: educationData
    },
    page2: {
      title: "Industry Certifications",
      subtitle: "Professional Credentials",
      certifications: certificationsData
    }
  },

  "resume": {
    id: "resume",
    title: "RESUME",
    subtitle: "Recruiter PDF",
    category: "Curriculum Vitae",
    color: "#577a68",
    indexPage: {
      chapterNum: "08",
      chapterTitle: "ATS Curriculum Vitae",
      tagline: "Formatted for Technical Recruiters & ATS",
      summary:
        "An ATS-compliant professional developer resume ready for review, print, and one-click PDF download containing verified work history, skills, projects, and education.",
      sections: [
        { label: "Section 1", title: "Executive Profile & Download PDF", page: 1 },
        { label: "Section 2", title: "Technical Qualifications Summary", page: 2 }
      ],
      metadata: [
        { label: "Format", val: "ATS Recruiter Compliant" },
        { label: "PDF Download", val: "One-Click Printable" },
        { label: "Verification", val: "100% Authentic" }
      ]
    },
    page1: {
      title: "Executive Profile",
      subtitle: "Surya M. — ATS Curriculum Vitae",
      info: personalInfo,
      role: workExperience[0]
    },
    page2: {
      title: "Verified Qualifications",
      subtitle: "Skills & Project Credentials",
      skills: skillsData.categories,
      education: educationData[0]
    }
  },

  "contact": {
    id: "contact",
    title: "CONTACT",
    subtitle: "Transmission Hub",
    category: "Direct Inquiries",
    color: "#374151",
    indexPage: {
      chapterNum: "09",
      chapterTitle: "Transmission & Contact Desk",
      tagline: "Direct Collaboration & Career Inquiries",
      summary:
        "Direct communication channels to get in touch: verified email address with 1-click clipboard copy, GitHub, LinkedIn profiles, and an interactive message transmission desk.",
      sections: [
        { label: "Section 1", title: "Direct Contact Channels & Profiles", page: 1 },
        { label: "Section 2", title: "Direct Inquiry Transmission Desk", page: 2 }
      ],
      metadata: [
        { label: "Email", val: personalInfo.email },
        { label: "Location", val: personalInfo.location },
        { label: "Response Time", val: "Within 24 Hours" }
      ]
    },
    page1: {
      title: "Direct Channels",
      subtitle: "Email, Profiles & Location",
      info: personalInfo
    },
    page2: {
      title: "Transmission Desk",
      subtitle: "Send a Direct Message",
      info: personalInfo
    }
  }
};

