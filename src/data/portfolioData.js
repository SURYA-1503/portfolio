export const personalInfo = {
  name: "Surya M.",
  shortBio: "Junior Software Developer | Backend Developer | Aspiring Full-Stack Developer",
  titles: [
    "Junior Software Developer",
    "Backend Developer",
    "Healthcare Automation Engineer",
    "Aspiring Full-Stack Developer"
  ],
  location: "Chennai, Tamil Nadu, India",
  coordinates: "13.0827° N, 80.2707° E",
  email: "suryasiva1503@gmail.com",
  phone: "+91 9566682024",
  github: "https://github.com/SURYA-1503",
  linkedin: "https://linkedin.com/in/surya-m-352ab32a3",
  currentCompany: "Digiclarity Global Solutions",
  currentRole: "Junior Software Developer",
  currentFocus: "Backend Development & Healthcare Automation",
  status: {
    availability: "Open to Full-Stack Opportunities",
    currentlyWorking: "Backend Development & Healthcare Automation",
    currentlyLearning: "React, Docker, Google Cloud Platform (GCP)",
    exploring: "CI/CD Pipelines & Full-Stack Architecture",
    city: "Chennai, India"
  }
};

export const aboutNarrative = {
  intro:
    "I am a Junior Software Developer currently working at Digiclarity Global Solutions, primarily focused on backend development, scalable application architectures, and automation solutions.",
  experienceHighlight:
    "My hands-on experience includes developing robust backend services and orchestrating healthcare-related automation workflows with Python and Playwright.",
  growthMindset:
    "Driven by continuous learning, I am actively expanding my technical expertise across modern frontend engineering with React, containerization with Docker, Google Cloud Platform (GCP), and CI/CD pipelines.",
  longTermGoal:
    "My long-term ambition is to grow into a versatile Full-Stack Developer possessing deep engineering depth across backend systems, intuitive frontends, cloud infrastructure, and DevOps best practices.",
  personalNote:
    "Beyond writing code, I love exploring cutting-edge developer tools, experimenting with creative UI/UX concepts, immersing myself in music, and playing video games."
};

export const workExperience = [
  {
    id: "exp-digiclarity",
    role: "Junior Software Developer",
    company: "Digiclarity Global Solutions",
    location: "Chennai, India",
    area: "Backend Development & Automation",
    isCurrent: true,
    points: [
      "Engineered backend application services and reliable data-driven processes.",
      "Developed and maintained healthcare-related automation workflows leveraging browser automation and backend integrations.",
      "Collaborated on backend application development, REST API design, and automation process monitoring.",
      "Actively exploring frontend integration and modern web application development.",
      "Expanding infrastructure competencies in Docker containerization, GCP cloud deployment, and automated CI/CD pipelines."
    ],
    technologies: ["Python", "FastAPI", "Playwright", "SQL", "REST APIs", "Git", "Docker (Learning)", "GCP (Learning)"]
  }
];

export const skillsData = {
  categories: [
    {
      id: "languages",
      title: "Programming Languages",
      skills: [
        { name: "Java", isLearning: false, level: "Proficient" },
        { name: "Python", isLearning: false, level: "Proficient" }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      skills: [
        { name: "FastAPI", isLearning: false, level: "Proficient" },
        { name: "Spring Boot", isLearning: false, level: "Proficient" },
        { name: "JDBC", isLearning: false, level: "Proficient" },
        { name: "REST APIs", isLearning: false, level: "Proficient" }
      ]
    },
    {
      id: "database",
      title: "Databases",
      skills: [
        { name: "MySQL", isLearning: false, level: "Proficient" },
        { name: "SQL", isLearning: false, level: "Proficient" },
        { name: "PostgreSQL", isLearning: false, level: "Proficient" }
      ]
    },
    {
      id: "automation",
      title: "Automation & Testing",
      skills: [
        { name: "Playwright", isLearning: false, level: "Proficient" },
        { name: "Python Automation", isLearning: false, level: "Proficient" }
      ]
    },
    {
      id: "frontend",
      title: "Frontend Development",
      skills: [
        { name: "HTML5", isLearning: false, level: "Proficient" },
        { name: "CSS3", isLearning: false, level: "Proficient" },
        { name: "JavaScript", isLearning: false, level: "Proficient" },
        { name: "React", isLearning: true, level: "Currently Learning" }
      ]
    },
    {
      id: "tools",
      title: "Tools, Cloud & DevOps",
      skills: [
        { name: "Git", isLearning: false, level: "Proficient" },
        { name: "GitHub", isLearning: false, level: "Proficient" },
        { name: "Docker", isLearning: true, level: "Currently Learning" },
        { name: "Google Cloud Platform", isLearning: true, level: "Currently Learning" },
        { name: "CI/CD", isLearning: true, level: "Currently Learning" }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "proj-hospital",
    index: "01",
    title: "Hospital Management System",
    category: "Full Backend System",
    type: "Personal Project",
    summary:
      "A comprehensive backend system for orchestrating hospital operations, patient records, doctor scheduling, and pharmacy inventory.",
    technologies: ["Java", "Spring Boot", "REST API", "MySQL"],
    github: "https://github.com/SURYA-1503/Hospital-Management",
    features: [
      "Doctor appointment scheduling and calendar management.",
      "Medicine dosage tracking and real-time inventory quantity management.",
      "Multi-branch and hospital information cataloging.",
      "Complete CRUD architecture with layered enterprise Spring Boot patterns.",
      "Relational schema modeling and MySQL database integration."
    ],
    highlights: ["Layered Backend Architecture", "Robust CRUD Operations", "Relational Integrity"]
  },
  {
    id: "proj-bus",
    index: "02",
    title: "Bus Reservation System",
    category: "Java Enterprise & JDBC",
    type: "Personal Project",
    summary:
      "A high-reliability Java database application managing bus seat bookings, passenger travel preferences, and instant cancellations.",
    technologies: ["Java", "JDBC", "MySQL"],
    github: "https://github.com/SURYA-1503/BusReservation",
    features: [
      "Real-time seat reservation with interactive seat preference tracking.",
      "Customer contact and passenger record management.",
      "Flexible travel date scheduling and instant booking cancellations.",
      "Direct JDBC connection pooling and relational transaction handling with MySQL."
    ],
    highlights: ["Direct JDBC Layer", "Transaction Management", "Seat Allocation Engine"]
  },
  {
    id: "proj-ecommerce",
    index: "03",
    title: "Online Shopping Management",
    category: "Frontend Web App",
    type: "Personal Project",
    summary:
      "An interactive e-commerce product catalog with dynamic cart state management, client-side storage persistence, and reactive DOM updates.",
    technologies: ["HTML5", "CSS3", "JavaScript", "DOM", "LocalStorage"],
    github: "https://github.com/SURYA-1503/Online-Shopping-Management",
    features: [
      "Interactive product catalog with category browsing.",
      "Dynamic cart state with real-time add, remove, and quantity updates.",
      "DOM manipulation without heavy frontend framework overhead.",
      "LocalStorage persistence retaining user basket state across browser sessions."
    ],
    highlights: ["Zero-Dependency Vanilla JS", "LocalStorage Persistence", "Reactive DOM UI"]
  },
  {
    id: "proj-automation",
    index: "04",
    title: "Healthcare Automation Workflow",
    category: "Production Engineering",
    type: "Professional Scope @ Digiclarity",
    summary:
      "Enterprise healthcare automation workflow utilizing headless browser orchestration, FastAPI microservices, and database-driven task queues.",
    technologies: ["Python", "Playwright", "FastAPI", "SQL", "Automation"],
    github: null, // Professional work, proprietary
    isProfessional: true,
    features: [
      "Headless browser automation with Playwright for secure healthcare portals.",
      "Backend API integration and task validation pipelines using FastAPI.",
      "Database-driven state tracking for asynchronous execution batches.",
      "Process monitoring, error recovery, and robust telemetry logs."
    ],
    highlights: ["Playwright Orchestration", "FastAPI Service", "Data-Driven Workflow"]
  }
];

export const educationData = [
  {
    institution: "K.S. Rangasamy College of Technology",
    degree: "B.E. Computer Science and Engineering",
    period: "2020 – 2024",
    score: "CGPA: 8.12 / 10",
    location: "Tiruchengode, Tamil Nadu",
    type: "Degree"
  },
  {
    institution: "Vani Vidhyalaya Matric Higher Secondary School",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2019 – 2020",
    score: "Percentage: 72.5%",
    location: "Tamil Nadu",
    type: "Schooling"
  },
  {
    institution: "SKV Matric Higher Secondary School",
    degree: "Secondary School Leaving Certificate (SSLC)",
    period: "2017 – 2018",
    score: "Percentage: 88.4%",
    location: "Tamil Nadu",
    type: "Schooling"
  }
];

export const certificationsData = [
  {
    title: "Java Full Stack Development",
    issuer: "QSpiders, Velachery, Chennai",
    period: "July 2024 – December 2024",
    skills: ["Java", "Spring Boot", "SQL", "Full-Stack Concepts"]
  },
  {
    title: "Java Full Stack Development",
    issuer: "Wipro TalentNext",
    period: "July 2023 – September 2023",
    skills: ["Core Java", "J2EE", "Web Services"]
  },
  {
    title: "Basic SQL Certification",
    issuer: "HackerRank",
    period: "September 2023 – October 2023",
    skills: ["SQL Queries", "Joins", "Aggregations", "Schema Design"]
  }
];

export const interestsData = [
  {
    id: "music",
    title: "Listening to Music",
    tagline: "Soundscapes & Flow State",
    description: "Curating focused playlists and instrumental soundtracks while architecting clean backend logic.",
    icon: "Headphones"
  },
  {
    id: "gaming",
    title: "Playing Video Games",
    tagline: "Strategy & Rapid Reaction",
    description: "Engaging in competitive multiplayer and story-driven games that sharpen tactical decision-making.",
    icon: "Gamepad2"
  },
  {
    id: "tech-radar",
    title: "Exploring New Tech",
    tagline: "Continuous Tech Curiosity",
    description: "Experimenting with cloud native tools, distributed architectures, and emerging developer runtimes.",
    icon: "Compass"
  },
  {
    id: "creative-ui",
    title: "Creative UI & Web Design",
    tagline: "Aesthetics & Interaction",
    description: "Studying experimental design systems, tactile physics, and creative micro-interactions.",
    icon: "Sparkles"
  }
];

export const learningJourney = [
  {
    year: "2024",
    title: "Graduated with B.E. in Computer Science",
    institution: "K.S. Rangasamy College of Technology",
    detail: "Graduated with 8.12 CGPA. Built strong foundations in Data Structures, Database Systems, and Object-Oriented Engineering."
  },
  {
    year: "2024",
    title: "Java Full Stack Specialization",
    institution: "QSpiders Chennai",
    detail: "Intensive hands-on training in enterprise Java, Spring Boot, JDBC, and relational database architecture."
  },
  {
    year: "Current",
    title: "Junior Software Developer",
    institution: "Digiclarity Global Solutions",
    detail: "Actively building backend services and production healthcare automation workflows with Python and Playwright."
  },
  {
    year: "Current & Forward",
    title: "Full-Stack & Cloud Engineering Expansion",
    institution: "Self-Directed Growth",
    detail: "Diving deep into React frontend engineering, Docker containerization, GCP infrastructure, and automated CI/CD pipelines."
  }
];

