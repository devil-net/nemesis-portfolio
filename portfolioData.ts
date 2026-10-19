export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Forensics" | "Security Engineering" | "AI & Web" | "Cyber Education";
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface CertificationMilestone {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl?: string;
  details: string;
  coordinate: { x: number; y: number }; // SVG Treasure Map Coordinates
  badgeType: "Certification" | "Job Simulation" | "Achievement";
}

export const portfolioData = {
  // 1. OPERATIVE PROFILE & RAW AGENT DOSSIER (/profile)
  operative: {
    legalName: "Dhanush Gurudu",
    codename: "Nemesis",
    clearanceLevel: "LEVEL 5 // TOP SECRET — RAW TACTICAL DIVISION",
    role: "Cybersecurity | Digital Forensics | Security Engineering",
    location: "Delhi, India",
    status: "ACTIVE OPERATIVE",
    phone: "+91 9550295443",
    primaryEmail: "dhanushgurudu@gmail.com",
    encryptedEmail: "nemesisT_T@protonmail.com",
    github: "https://github.com/devil-net",
    linkedin: "https://www.linkedin.com/in/dhanush-gurudu",
    summary:
      "Computer Science and Cybersecurity undergraduate at the National Forensic Sciences University with experience building security-focused applications, AI-powered web platforms, and digital-forensics prototypes. Interested in web application security, network analysis, reverse engineering, secure systems engineering, and applied cybersecurity research. Uses Python, C/C++, JavaScript, Linux, and security-testing tools to investigate technical problems and develop practical solutions.",
    researchInterests: [
      "IoT Security",
      "Malware Analysis",
      "Reverse Engineering",
      "Security Automation",
      "Web Application Security & Network Forensics"
    ],
    characterInspirations: [
      { title: "Straw Hat Crew", franchise: "One Piece", tag: "Freedom & Crew Loyalty", aesthetic: "Wanted Poster / Gear 5" },
      { title: "Ichigo Kurosaki & Gotei 13", franchise: "Bleach", tag: "Dual Nature / High-Contrast Black & Orange", aesthetic: "Bankai Ink Sketch" },
      { title: "Christopher Nolan Cinema", franchise: "Interstellar / Inception / Oppenheimer", tag: "Time, Scale & Precision Engineering", aesthetic: "IMAX 70mm Grain" },
      { title: "Custom Sketches & Anime Art", franchise: "Personal Artworks", tag: "Hand-Drawn Concept Art", aesthetic: "Charcoal & Orange Accent" }
    ]
  },

  // 2. EDUCATION & EXPERIENCE LOGS (/experience-and-education)
  educationAndExperience: [
    {
      commitHash: "a9f84d2",
      title: "B.Tech — Computer Science and Cyber Security",
      institution: "National Forensic Sciences University (NFSU)",
      period: "2024 – 2029",
      status: "Third Year / Fifth Semester",
      metric: "CGPA: 8.36 / 10",
      highlights: [
        "Specializing in Digital Forensics, Network Security, Reverse Engineering, and Cryptography.",
        "Active participant in competitive hackathons, technical project exhibitions, and CTF competitions."
      ]
    },
    {
      commitHash: "e4c19b0",
      title: "AWS Solutions Architecture Job Simulation",
      institution: "Amazon Web Services (via Forage)",
      period: "January 2026",
      status: "Completed (2026-01-24)",
      metric: "Enrolment Code: G6hjRpkbED09R2TF9 | User Code: ZG2atpKj2fBjEjH7T",
      highlights: [
        "Completed practical engineering tasks in designing a simple, scalable hosting architecture."
      ]
    },
    {
      commitHash: "b72d01f",
      title: "Deloitte Cyber Job Simulation",
      institution: "Deloitte (via Forage)",
      period: "August 2025",
      status: "Completed (2025-08-11)",
      metric: "Enrolment Code: J77F8eGntFE2gW5xY | User Code: ZG2atpKj2fBjEjH7T",
      highlights: [
        "Executed practical operational tasks in enterprise cybersecurity analysis and incident triage."
      ]
    }
  ],

  // 3. PROJECTS SHOWCASE (/projects)
  projects: [
    {
      id: "proj-01",
      slug: "universal-share",
      title: "Universal Share",
      subtitle: "Secure Cross-Device File Transfer",
      category: "Security Engineering",
      technologies: ["Android", "Java/Kotlin", "TCP Sockets", "mDNS/DNS-SD", "ECDH", "AES-256-GCM"],
      highlights: [
        "Designed a cross-device sharing workflow with local-network device discovery and installation-identity-based peer deduplication.",
        "Developed the protocol and security design around device pairing, cryptographic identity, shared-secret establishment, and authenticated encryption.",
        "Planned transfer-engine capabilities including chunking, resumable transfers, session management, and transfer persistence."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    },
    {
      id: "proj-02",
      slug: "byteshark",
      title: "ByteShark",
      subtitle: "Network Forensics Workstation",
      category: "Forensics",
      technologies: ["Electron", "React", "Node.js", "Python", "PCAP Analysis", "Vercel"],
      highlights: [
        "Designed a desktop workflow for investigating packet captures and network conversations.",
        "Planned analysis views for IP endpoints, protocols, ports, and extracted media, with forensic export capabilities.",
        "Focused on making network evidence easier to inspect through a dedicated desktop interface."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    },
    {
      id: "proj-03",
      slug: "cyberforensics-workstation",
      title: "CyberForensics Workstation",
      subtitle: "Windows Desktop Forensic Recovery Suite",
      category: "Forensics",
      technologies: ["C#", ".NET 8", "WPF", "The Sleuth Kit", "PhotoRec"],
      highlights: [
        "Designed a Windows desktop forensic workstation with a WPF interface and a manifest-based approach to external forensic tools.",
        "Organized the application around forensic recovery workflows and integration with established open-source utilities."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    },
    {
      id: "proj-04",
      slug: "veriscope",
      title: "Veriscope",
      subtitle: "AI-Based News Authenticity Analysis",
      category: "AI & Web",
      technologies: ["React", "Tailwind CSS", "NLP", "Vercel"],
      highlights: [
        "Built an AI-powered web platform intended to identify potentially misleading news content.",
        "Integrated an NLP-based text-classification model and developed the frontend in React and Tailwind CSS.",
        "Deployed the web application using Vercel."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    },
    {
      id: "proj-05",
      slug: "the-hidden-bytes",
      title: "The Hidden Bytes",
      subtitle: "Steganography Analysis & File Triage Platform",
      category: "Forensics",
      technologies: ["Web Technologies", "Metadata Extraction", "Binary Inspection", "Steganography"],
      highlights: [
        "Developed a web-based steganography-analysis platform for CTF and digital-forensics workflows.",
        "Integrated functionality for metadata extraction and binary inspection to support initial file triage."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    },
    {
      id: "proj-06",
      slug: "cyber-pocket-lab",
      title: "Cyber Pocket Lab",
      subtitle: "Interactive CLI & Security Tooling Trainer (Google AI Studio)",
      category: "Cyber Education",
      technologies: ["Google AI Studio", "Gemini API", "React", "TypeScript", "Security Tooling"],
      highlights: [
        "Built an interactive AI-powered pocket laboratory in Google AI Studio designed to help learners understand complex cybersecurity tools and CLI commands.",
        "Provides guided explanations, command breakdowns, and safe simulation scenarios for offensive and defensive security utilities (e.g., Steghide, Binwalk, Burp Suite, Nmap)."
      ],
      githubUrl: "https://github.com/devil-net",
      featured: true
    }
  ] as Project[],

  // 4. THE WORLD TREE SKILLS STRUCTURE (/technical-skills)
  worldTreeSkills: {
    // CENTER TRUNK: Core Systems & Languages
    trunk: {
      label: "Core Systems & Languages",
      nodes: ["Python", "C / C++", "JavaScript", "Bash", "C#", "Linux", "Kali Linux", "Windows"]
    },
    // UPPER CANOPY (BRANCHES - "THE GOOD SIDE"): Radiant Solar Orange & White (#FF7700 -> #FFFFFF)
    branches: [
      {
        category: "Web & Desktop Application Engineering",
        color: "#FF8800",
        skills: ["React", "HTML5 / CSS3", "Tailwind CSS", "Vite", "Electron", ".NET 8", "WPF"]
      },
      {
        category: "Cloud, DevOps & AI Architecture",
        color: "#FFAA33",
        skills: ["Docker", "Vercel", "Railway", "Google Cloud", "GitHub / CodeRabbit", "Model Context Protocol (MCP)", "NLP & Google AI Studio"]
      },
      {
        category: "Hobbies & Creative Pursuits (Expandable)",
        color: "#FFFFFF",
        skills: ["Anime & Manga Sketching", "Christopher Nolan Film Analysis", "CTF Challenge Design", "Strategy & Supercell Gaming"]
      }
    ],
    // UNDERGROUND ROOTS ("THE DARK SIDE" - OFFENSIVE & FORENSICS): Deep Crimson & Ember (#FF2200 -> #990000)
    roots: [
      {
        category: "Red-Team & C2 Frameworks",
        color: "#FF2200",
        skills: ["Sliver C2", "Havoc C2", "Metasploit Framework (msfconsole)", "Burp Suite"]
      },
      {
        category: "Reverse Engineering & Binary Exploitation",
        color: "#E61900",
        skills: ["Ghidra", "Binary Ninja", "Binary Inspection", "Malware Triage"]
      },
      {
        category: "Digital Forensics & Recovery",
        color: "#CC1100",
        skills: ["Autopsy", "The Sleuth Kit (TSK)", "PhotoRec", "Steganography", "Metadata Analysis"]
      },
      {
        category: "Network Analysis & Cryptography",
        color: "#FF4400",
        skills: ["Wireshark", "TCPDump", "PCAP Analysis", "TCP/IP", "ECDH & AES-256-GCM", "OSINT"]
      }
    ]
  },

  // 5. TREASURE MAP MILESTONES (/certifications-and-achievements)
  // Ordered chronologically along the winding Grand Line SVG Trail
  treasureMapMilestones: [
    {
      id: "mile-01",
      title: "Deloitte Cyber Job Simulation",
      issuer: "Deloitte (Forage)",
      issueDate: "August 11, 2025",
      credentialId: "Enrolment: J77F8eGntFE2gW5xY | User: ZG2atpKj2fBjEjH7T",
      details: "Completed practical tasks in enterprise cybersecurity operations. Signed by Tina McCreery (CHRO, Deloitte).",
      coordinate: { x: 180, y: 150 },
      badgeType: "Job Simulation"
    },
    {
      id: "mile-02",
      title: "Introduction to Model Context Protocol (MCP)",
      issuer: "Anthropic (via Skilljar)",
      issueDate: "September 29, 2025",
      credentialId: "9u9a6y9zzfzy",
      verifyUrl: "https://verify.skilljar.com/c/9u9a6y9zzfzy",
      details: "Official Anthropic certification validating architecture and integration of Model Context Protocol servers and AI tooling.",
      coordinate: { x: 620, y: 320 },
      badgeType: "Certification"
    },
    {
      id: "mile-03",
      title: "Introduction to Network Analysis",
      issuer: "Security Blue Team",
      issueDate: "December 16, 2025",
      credentialId: "853363659",
      details: "Validated networking fundamentals and ability to analyze PCAPs using Wireshark and TCPDump, including malicious traffic from a mock compromised system.",
      coordinate: { x: 220, y: 510 },
      badgeType: "Certification"
    },
    {
      id: "mile-04",
      title: "Introduction to OSINT",
      issuer: "Security Blue Team",
      issueDate: "January 13, 2026",
      credentialId: "758735264",
      details: "Demonstrated proficiency in Open-Source Intelligence (OSINT) data collection, tooling, techniques, and defensive/offensive operational use cases.",
      coordinate: { x: 660, y: 690 },
      badgeType: "Certification"
    },
    {
      id: "mile-05",
      title: "AWS Solutions Architecture Job Simulation",
      issuer: "Amazon Web Services (Forage)",
      issueDate: "January 24, 2026",
      credentialId: "Enrolment: G6hjRpkbED09R2TF9 | User: ZG2atpKj2fBjEjH7T",
      details: "Completed practical engineering tasks in designing a simple, scalable cloud hosting architecture.",
      coordinate: { x: 240, y: 880 },
      badgeType: "Job Simulation"
    },
    {
      id: "mile-06",
      title: "Pre Security Learning Path",
      issuer: "TryHackMe",
      issueDate: "September 28, 2026",
      credentialId: "THM-ZDAALZ6R3U",
      details: "Completed 19 hours 10 minutes of hands-on cybersecurity, networking, Linux, and web security fundamentals. Signed by Ben Spring (CEO) & Ashu Savani (CTO).",
      coordinate: { x: 600, y: 1060 },
      badgeType: "Certification"
    },
    {
      id: "mile-07",
      title: "Mastering Generative AI & ChatGPT (5-Week Course) + Competitive Honors",
      issuer: "Course Certification / PromptWars 2.0 / HackornCTF / SIH",
      issueDate: "2025 – 2026",
      credentialId: "NEMESIS-HONORS",
      details: "Completed 5-week Mastering Generative AI & ChatGPT course; secured 3rd Prize in PromptWars 2.0 Delhi using Google AI Studio; competed in HackornCTF, Smart India Hackathon, and India AI Impact Summit.",
      coordinate: { x: 400, y: 1250 },
      badgeType: "Achievement"
    }
  ] as CertificationMilestone[]
};