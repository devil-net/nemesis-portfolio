export interface TerminalLine {
  id: string;
  type: "command" | "output" | "error" | "system" | "directory-list" | "progress";
  text?: string;
  elements?: React.ReactNode;
  timestamp?: string;
}

export const VALID_DIRECTORIES = [
  "profile/",
  "projects/",
  "experience-and-education/",
  "technical-skills/",
  "certifications-and-achievements/",
  "contact-info/",
];

export const DIRECTORY_METADATA: Record<string, { label: string; desc: string; route: string }> = {
  "profile/": {
    label: "profile/",
    desc: "RAW Classified Dossier & 3D Operative ID Lanyard",
    route: "/profile",
  },
  "projects/": {
    label: "projects/",
    desc: "Forensics, Security Engineering & AI Platforms Showcase",
    route: "/projects",
  },
  "experience-and-education/": {
    label: "experience-and-education/",
    desc: "NFSU Academic Degree & Job Simulations git-graph",
    route: "/experience-and-education",
  },
  "technical-skills/": {
    label: "technical-skills/",
    desc: "The One Piece World Tree (Upper Canopy vs Underground Roots)",
    route: "/technical-skills",
  },
  "certifications-and-achievements/": {
    label: "certifications-and-achievements/",
    desc: "Interactive Treasure Map with Animated Terminal Cat",
    route: "/certifications-and-achievements",
  },
  "contact-info/": {
    label: "contact-info/",
    desc: "Encrypted Comms, PGP Verification & Direct Channels",
    route: "/contact-info",
  },
};

export const BOOT_SEQUENCE = [
  "DEVIL-NET TACTICAL OS [Version 4.2.0-sec-hardened]",
  "Initializing cryptographic enclave... [OK]",
  "Loading RAW Operative Security Modules... [OK]",
  "Mounting /dev/nemesis filesystem (AES-256-XTS)... [OK]",
  "Establishing secure tunnel to devil-net nodes... [ESTABLISHED]",
  "Clearance Level: LEVEL 5 // TOP SECRET",
  "Operative: Dhanush Gurudu (Nemesis)",
  "Type 'help' or 'ls' to navigate available directories.",
];
