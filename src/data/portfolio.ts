export const profile = {
  name: 'Nanduri Mansi',
  role: 'Full-Stack Web Developer Intern | Engineering Student',
  headline:
    'Building Responsive Web Experiences and Learning to Engineer Better Solutions.',
  introduction:
    'An engineering student and aspiring full-stack developer interested in creating responsive web applications, developing interactive user interfaces, and building practical software solutions. Experienced in frontend development through hands-on projects and internship work, with growing experience in Laravel, PHP, REST APIs, MySQL, and Java.',
  aboutMe:
    "I'm Nanduri Mansi, an engineering student at Joginpally B.R. Engineering College with a strong interest in web development and software engineering. I enjoy creating responsive websites, implementing interactive functionality, and exploring technologies that help turn ideas into practical applications.\n\nMy experience includes frontend development with HTML, CSS, and JavaScript, along with learning full-stack application development using Laravel, PHP, REST APIs, and MySQL. Through internships, technical projects, certifications, and hackathon participation, I continue to strengthen my development skills and work toward building reliable, user-friendly software.",
  institution: 'Joginpally B.R. Engineering College',
  educationPeriod: '2024 — Present',
  available: true,
  email: 'nandurimansi@gmail.com',
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nanduri-mansi/',
      handle: 'in/nanduri-mansi',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/nandurimansi',
      handle: 'github.com/nandurimansi',
    },
    {
      label: 'Email',
      url: 'mailto:nandurimansi@gmail.com',
      handle: 'nandurimansi@gmail.com',
    },
  ],
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  accent: string;
  type: string;
};

export const projects: Project[] = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio Website',
    tagline: 'Interactive developer showcase & personal OS',
    description:
      'A personal portfolio showcasing professional information, selected projects, certifications, and contact details through a responsive and interactive interface.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-cyan-500/20 to-blue-500/10',
    type: 'Frontend Showcase',
  },
  {
    id: 'quiz-app',
    name: 'Interactive Quiz Application',
    tagline: 'Dynamic quiz with answer tracking & instant feedback',
    description:
      'An interactive quiz application with answer selection, score tracking, progress controls, and visual feedback. The project demonstrates JavaScript logic, API integration, and user-interface development.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Public APIs'],
    accent: 'from-emerald-500/20 to-teal-500/10',
    type: 'Interactive App',
  },
  {
    id: 'shopping-demo',
    name: 'Product Listing and Food Shopping Demo',
    tagline: 'Filtering, sorting & product catalog interface',
    description:
      'A product browsing interface featuring product listings, category filtering, sorting by rating, and responsive layouts for a smooth browsing experience.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-amber-500/20 to-orange-500/10',
    type: 'E-Commerce UI',
  },
  {
    id: 'todo-list',
    name: 'Dynamic To-Do List',
    tagline: 'Lightweight task management with DOM manipulation',
    description:
      'A lightweight task-management application that lets users add and delete tasks using JavaScript-driven DOM manipulation and responsive controls.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/nandurimansi/Apex_planet_internship-task2',
    accent: 'from-fuchsia-500/20 to-pink-500/10',
    type: 'Productivity Tool',
  },
  {
    id: 'responsive-webapp',
    name: 'Responsive Web Application',
    tagline: 'Capstone web application developed at ApexPlanet',
    description:
      'A capstone web application developed during her ApexPlanet internship, combining responsive UI components and previously developed functionality with performance and cross-browser improvements.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    repoUrl: 'https://github.com/nandurimansi/Apex_planet_internship',
    accent: 'from-indigo-500/20 to-purple-500/10',
    type: 'Internship Capstone',
  },
];

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Development',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Web Design',
      'DOM Manipulation',
      'Form Validation',
      'CSS Flexbox and Grid',
    ],
  },
  {
    category: 'Backend and Web Development',
    skills: ['PHP', 'Laravel', 'REST APIs', 'API Integration', 'MySQL'],
  },
  {
    category: 'Programming',
    skills: [
      'Java',
      'Object-Oriented Programming',
      'Data Structures and Core Java Concepts',
    ],
  },
  {
    category: 'Tools and Additional Learning',
    skills: [
      'Git',
      'GitHub Copilot & AI-Assisted Development',
      'Docker Fundamentals',
      'Kubernetes Fundamentals',
      'Cross-Browser Testing',
      'Web Performance Optimization',
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  status?: string;
  description: string;
  points: string[];
  certificateId?: string;
};

export const experiences: Experience[] = [
  {
    role: 'Full-Stack Web Developer Intern',
    company: 'Yalu India',
    period: 'July 1, 2026 — Present (6 months)',
    status: 'Ongoing as of October 2026',
    description:
      'Working toward practical full-stack web development experience using Laravel, REST APIs, MySQL, PHP, and Git. Developing familiarity with real-world web applications and collaborative software development.',
    points: [
      'Gaining practical full-stack web development experience using Laravel and PHP.',
      'Working with REST APIs and MySQL database integration.',
      'Collaborating using Git for version control in team software development.',
      'Developing familiarity with real-world web applications and best practices.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'ApexPlanet Software Pvt. Ltd.',
    period: 'October 11, 2025 — November 24, 2025',
    description:
      'Completed hands-on frontend development tasks and built responsive web applications using HTML, CSS, and JavaScript.',
    certificateId: 'APSPL2521217',
    points: [
      'Built interactive interfaces and responsive page layouts.',
      'Implemented DOM manipulation and form validation.',
      'Developed a dynamic to-do list and contact form.',
      'Created a product listing interface with filtering and sorting.',
      'Integrated public APIs into interactive web experiences.',
      'Improved performance through resource optimization and lazy loading.',
      'Tested responsiveness and cross-browser compatibility.',
    ],
  },
];

export type Education = {
  institution: string;
  period: string;
  role: string;
};

export const education: Education[] = [
  {
    institution: 'Joginpally B.R. Engineering College',
    period: '2024 — Present',
    role: 'Engineering Student',
  },
];

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  achievement?: string;
  credentialId?: string;
  badge?: string;
  imageUrl?: string;
  verificationUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: 'nptel-java',
    title: 'Programming in Java',
    issuer: 'NPTEL (IIT Kharagpur)',
    issuerLogo: '/logos/nptel.png',
    issueDate: 'Jan-Apr 2026',
    achievement: 'Elite + Gold, 94% (Assignments 25/25, Exam 69/75)',
    credentialId: 'NPTEL26CS36S75620525304703053',
    badge: 'Elite + Gold (Top Candidate)',
    imageUrl: '/certificates/nptel-java.png',
    verificationUrl:
      'https://nptel.ac.in/noc/E_Certificate/NPTEL26CS36S75620525304703053',
  },
  {
    id: 'be10x-ai-tools',
    title: 'AI Tools & Claude Workshop',
    issuer: 'be10x',
    issuerLogo: '/logos/be10x.png',
    issueDate: 'June 21, 2026',
    achievement: 'AI Productivity, Automation & Claude',
    credentialId: '0270772f-3809-4400-b29b-1e1c61cd0997',
    badge: 'be10x Verified',
    imageUrl: '/certificates/be10x-ai-tools.png',
    verificationUrl:
      'https://certx.in/certificate/0270772f-3809-4400-b29b-1e1c61cd09971467150',
  },
  {
    id: 'eduskills-java-fullstack',
    title: 'Java Full Stack',
    issuer: 'EduSkills Foundation',
    issuerLogo: '/logos/eduskills.png',
    issueDate: 'March 2026',
    credentialId: '2026-BBBE93F11A',
    achievement: 'AICTE Certified · Java Full Stack Domain',
    badge: 'EduSkills Verified',
    verificationUrl: 'https://lmsapi.eduskills.academy/verify/2026-BBBE93F11A',
  },
  {
    id: 'scaler-docker-k8s',
    title: 'Fundamentals of Docker & Kubernetes',
    issuer: 'Scaler Masterclass',
    issuerLogo: '/logos/scaler.png',
    issueDate: 'February 19, 2026',
    achievement: 'Certificate of Participation · Docker & Kubernetes',
    badge: 'Masterclass Participant',
    imageUrl: '/certificates/scaler-docker-k8s.png',
    verificationUrl: 'https://moonshot.scaler.com/s/sl/s0WTQ-fzQr',
  },
  {
    id: 'eduskills-security',
    title: 'Web Exploit Hunting and Bug Bounty Virtual Internship',
    issuer: 'EduSkills Foundation (AICTE · MoE)',
    issuerLogo: '/logos/eduskills.png',
    issueDate: 'October – December 2025',
    credentialId: 'cb693fb29761f11f90c96240b26237f5',
    achievement: 'Grade O (Outstanding) · 10-Week Virtual Internship',
    badge: 'Grade O',
    imageUrl: '/certificates/eduskills-security.png',
  },
  {
    id: 'apexplanet-internship',
    title:
      'Web Development with HTML, CSS, and JavaScript Internship',
    issuer: 'ApexPlanet Software Pvt. Ltd.',
    issuerLogo: '/logos/apexplanet.png',
    issueDate: 'November 2025',
    credentialId: 'APSPL2521217',
    imageUrl: '/certificates/apexplanet-internship.jpg',
    verificationUrl:
      'https://apexplanet.in/internship/verify/certificate/validate/APSPL2521217',
  },
  {
    id: 'deloitte-sim',
    title: 'Technology Job Simulation',
    issuer: 'Deloitte',
    issuerLogo: '/logos/deloitte.png',
    issueDate: 'October 2025',
    credentialId: '68f7afeb466f20c69d3236bc',
    imageUrl: '/certificates/deloitte-sim.png',
  },
  {
    id: 'jbrec-ai-chatbot',
    title: 'AI Chatbot Building — TechXplore 2k25',
    issuer: 'Joginpally B.R. Engineering College (JBREC)',
    issuerLogo: '/logos/jbrec.png',
    issueDate: 'May 6–7, 2025',
    achievement: 'Certificate of Participation · TechXplore',
    badge: 'TechXplore 2k25',
    imageUrl: '/certificates/jbrec-ai-chatbot.png',
  },
  {
    id: 'embrizon-data-science',
    title: 'Data Science Internship Completion',
    issuer: 'Embrizon Technologies',
    issuerLogo: '/logos/embrizon.png',
    issueDate: 'December 15, 2024',
    credentialId: 'ET2024IC2381',
    achievement: 'Internship Completion (Oct–Nov 2024)',
    badge: 'Internship Completion',
    imageUrl: '/certificates/embrizon-internship.png',
  },
  {
    id: 'embrizon-training',
    title: 'Data Science Training Completion',
    issuer: 'Embrizon Technologies',
    issuerLogo: '/logos/embrizon.png',
    issueDate: 'December 15, 2024',
    credentialId: 'ET2024TC2381',
    achievement: 'Training Program Completion (Oct–Nov 2024)',
    badge: 'Training Completion',
    imageUrl: '/certificates/embrizon-training.png',
  },
  {
    id: 'embrizon-project',
    title: 'Data Science Project Completion',
    issuer: 'Embrizon Technologies',
    issuerLogo: '/logos/embrizon.png',
    issueDate: 'December 15, 2024',
    credentialId: 'ET2024PC2381',
    achievement: 'Project Completion (Oct–Nov 2024)',
    badge: 'Project Completion',
    imageUrl: '/certificates/embrizon-project.png',
  },
  {
    id: 'agents-league-creative-apps',
    title: 'Agents League — Creative Apps',
    issuer: 'Global AI Community',
    issuerLogo: '/logos/globalai.svg',
    issueDate: 'July 14, 2026',
    credentialId: '573d0d94-4c43-4fed-83e8-d6890059c92f',
    achievement:
      'Microsoft Developer Challenge · Creative Apps Track · AI-Assisted Apps with GitHub Copilot',
    badge: 'Verified Digital Badge',
    imageUrl: '/certificates/agents-league-creative-apps.png',
    verificationUrl:
      'https://globalai.community/badges/573d0d94-4c43-4fed-83e8-d6890059c92f',
  },
];

export type Achievement = {
  id: string;
  title: string;
  event: string;
  organization: string;
  role: string;
  team: string;
  collaborators: string[];
  description: string;
};

export const achievements: Achievement[] = [
  {
    id: 'hacksavvy26',
    title: 'HackSavvy26 — MGIT',
    event: 'HackSavvy26 Hackathon',
    organization: 'MGIT',
    role: 'Team Leader',
    team: 'Team Cybrix',
    collaborators: [
      'Prashanth Yadav Pittakala',
      'Meena Enumula',
      'Swathi',
      'Ramesh Besta',
    ],
    description:
      'Led Team Cybrix during its HackSavvy26 experience at MGIT, collaborating with teammates on problem-solving, technical exploration, teamwork, and decision-making under time constraints.',
  },
];

export const resume = {
  summary:
    'Engineering student and aspiring full-stack developer with hands-on experience in frontend and web development. Skilled in HTML, CSS, JavaScript, with growing practical expertise in Laravel, PHP, REST APIs, MySQL, and Java. Passionate about engineering responsive web experiences, practical problem solving, and collaborative software development.',
  experiences,
  education,
  certifications,
  achievements,
};

export const bootLines = [
  { text: 'MANSI OS v4.2.0 — startup', delay: 0 },
  { text: 'Initializing kernel ........ [ ok ]', delay: 350 },
  { text: 'Mounting /dev/portfolio ..... [ ok ]', delay: 650 },
  { text: 'Loading interface modules .. [ ok ]', delay: 1000 },
  { text: 'Loading web development env. [ ok ]', delay: 1350 },
  { text: 'Starting window manager .... [ ok ]', delay: 1700 },
  { text: 'Welcome back, Mansi.', delay: 2100 },
];
