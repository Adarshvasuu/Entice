import { ServiceItem, JobListing, BlogPost, Testimonial } from '../types';

export const COMPANY_DETAILS = {
  name: 'Entice HR Solutions',
  tagline: 'Building high-performing workforces behind tomorrow\'s most successful businesses.',
  phone: '9488853199',
  phoneFormatted: '+91 94888 53199',
  whatsappUrl: 'https://wa.me/919488853199?text=Hello%20Entice%20HR%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20HR%20services.',
  address: '47/65 mettu street, vadiveeswaram, Nagercoil-629002',
  email: 'info@enticehr.com',
  socials: {
    instagram: 'https://instagram.com/entice_hr',
    instagramHandle: '@entice_hr',
    linkedin: 'https://linkedin.com/company/entice-hr-solutions',
    twitter: 'https://x.com/EnticeInnov',
    twitterHandle: '@EnticeInnov',
    facebook: 'https://www.facebook.com/profile.php?id=61593312836008',
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'recruitment',
    title: 'Recruitment & Talent Acquisition',
    shortDesc: 'End-to-end talent sourcing, AI pre-screening, and fast-track hiring for tech, sales, operations, and leadership roles.',
    fullDesc: 'We act as your dedicated talent acquisition squad. Powered by our proprietary 20M+ candidate database and AI-matching engine, we shortlist high-caliber professionals who align perfectly with your technical stack and culture in under 14 days.',
    iconName: 'Users',
    features: [
      'Access to 20M+ verified candidate profiles',
      'AI-driven skill matching & background validation',
      'Dedicated recruiter & technical interview screening',
      '90-day free candidate replacement guarantee'
    ],
    deliverables: [
      '3-5 vetted candidate profiles within 48-72 hours',
      'Detailed candidate assessment matrix & interview notes',
      'Offer letter negotiation & notice period management',
      'Post-joining engagement & retention check-ins'
    ],
    benefits: [
      'Reduce cost-per-hire by up to 60%',
      'Eliminate recruiter salaries & job board subscription fees',
      'Zero candidate ghosting with dedicated onboarding support'
    ],
    idealFor: 'Startups scaling 5 to 50 hires, growing SMBs, and tech enterprises needing niche skillsets.'
  },
  {
    id: 'executive-search',
    title: 'Executive Search & Leadership',
    shortDesc: 'Discreet, high-precision headhunting for C-suite, VPs, Directors, and critical leadership positions.',
    fullDesc: 'Leadership hires dictate the trajectory of your enterprise. Our Executive Search practice combines confidential industry networking with deep executive vetting to attract top-performing leaders who rarely look on active job boards.',
    iconName: 'Crown',
    features: [
      'Confidential candidate outreach & mapping',
      'In-depth leadership competency & cultural fit evaluation',
      'Board-level presentation & candidate dossiers',
      'Comprehensive reference checks & background verification'
    ],
    deliverables: [
      'Targeted industry market landscape analysis',
      'Calibrated list of passive leadership prospects',
      'Structured behavioral & leadership interview reports',
      'Executive compensation advisory & transition support'
    ],
    benefits: [
      '100% confidential search execution',
      'Hire visionaries with proven track records',
      'Mitigate bad executive hire risk with 180-day guarantee'
    ],
    idealFor: 'Series A/B+ startups hiring C-level executives, expanding corporations, and board-level placements.'
  },
  {
    id: 'payroll',
    title: 'Payroll & Statutory Compliance',
    shortDesc: 'Automated monthly payroll, PF, ESI, Professional Tax, TDS management, and audit-proof compliance handling.',
    fullDesc: 'Never worry about payroll errors or regulatory penalties again. Entice HR manages your complete payroll processing cycle, salary slip generation, tax deductions, and statutory filings so you can focus on core business strategy.',
    iconName: 'Receipt',
    features: [
      'Automated salary computation & direct bank transfers',
      'Statutory compliance (PF, ESI, PT, LWF, Income Tax)',
      'Employee self-service portal for payslips & Form 16',
      '100% audit-proof compliance guarantees'
    ],
    deliverables: [
      'Monthly payroll register & bank advice files',
      'Challan generation & timely statutory deposit filings',
      'Reimbursement & leave encapsulation processing',
      'Year-end tax computation & Form 16 issuance'
    ],
    benefits: [
      'Save 40+ hours per month of admin overhead',
      'Zero risk of non-compliance fines or legal notices',
      'Transparent employee query resolution portal'
    ],
    idealFor: 'Companies with 10 to 500 employees seeking hassle-free, accurate payroll and 100% legal compliance.'
  },
  {
    id: 'hr-consulting',
    title: 'Strategic HR Consulting & Audits',
    shortDesc: 'Custom policy handbooks, performance management systems (OKRs/KPIs), organizational design, and HR legal audits.',
    fullDesc: 'Establish world-class corporate governance without hiring an expensive VP of HR. We craft custom HR policies, design performance appraisal frameworks, resolve employee grievances, and ensure your workplace culture fosters long-term retention.',
    iconName: 'ShieldCheck',
    features: [
      'Tailored employee handbooks & POSH compliance',
      'OKR/KPI framework implementation & appraisal cycles',
      'Compensation benchmarking & incentive modeling',
      'HR process audit & workplace culture health checks'
    ],
    deliverables: [
      'Fully compliant company policy handbook & contract templates',
      'Performance review software & evaluation rubrics',
      'POSH committee setup & mandatory employee training',
      'Quarterly HR strategy roadmap & retention reports'
    ],
    benefits: [
      'Structure your organization for scalable growth',
      'Reduce voluntary employee turnover by up to 35%',
      'Protect your brand with legally sound workplace policies'
    ],
    idealFor: 'Startups transitioning into structured growth stages and companies modernizing HR operations.'
  },
  {
    id: 'campus-hiring',
    title: 'Campus Hiring & Mass Drive',
    shortDesc: 'End-to-end university campus drives, fresher talent pipelines, hackathons, and volume entry-level recruitment.',
    fullDesc: 'Build your future workforce directly from top universities and engineering colleges across India. We manage college tie-ups, online aptitude testing, technical hackathons, and drive management for seamless volume hiring.',
    iconName: 'GraduationCap',
    features: [
      'Access to 200+ top engineering & management institutes',
      'Automated online coding & aptitude assessment platforms',
      'On-campus & virtual drive coordination teams',
      'High offer-to-joining conversion management'
    ],
    deliverables: [
      'Custom campus recruitment strategy & university outreach',
      'Pre-filtered student databases matching academic criteria',
      'Turnkey assessment administration & rank listings',
      'Joining engagement & pre-onboarding learning modules'
    ],
    benefits: [
      'Hire bulk entry-level talent cost-effectively',
      'Elevate your employer brand across premier campuses',
      'Streamline fresh graduate onboarding & training readiness'
    ],
    idealFor: 'IT companies, GCC centers, fintechs, and high-growth firms building large fresher talent cohorts.'
  }
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Technical Recruiter',
    department: 'Talent Acquisition',
    location: 'Nagercoil / Hybrid',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    salaryRange: '₹5.5L - ₹8.5L LPA',
    description: 'We are seeking a proactive Senior Technical Recruiter to join Entice HR Solutions. You will drive end-to-end recruitment drives for our top startup and corporate client accounts in full-stack engineering, AI/ML, and cloud roles.',
    requirements: [
      'Proven experience recruiting for software engineering stacks (React, Node, Java, Python)',
      'Expertise in sourcing via LinkedIn Recruiter, GitHub, and candidate databases',
      'Strong candidate negotiation and offer acceptance tracking abilities',
      'Excellent spoken & written corporate communication'
    ],
    isUrgent: true
  },
  {
    id: 'job-2',
    title: 'Payroll & Statutory Compliance Specialist',
    department: 'HR Operations',
    location: 'Nagercoil / On-site',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    salaryRange: '₹4.0L - ₹6.5L LPA',
    description: 'Manage monthly payroll processing, statutory calculations (PF, ESI, PT, TDS), and client compliance audits across multi-state corporate accounts.',
    requirements: [
      'In-depth knowledge of Indian Labour Laws, EPF, ESI, Income Tax rules',
      'Hands-on experience with payroll software (Keka, Spine, Zoho Payroll or similar)',
      'High numerical accuracy and client query management skills',
      'B.Com / MBA in HR / Finance preferred'
    ]
  },
  {
    id: 'job-3',
    title: 'Business Development Manager - B2B Sales',
    department: 'Corporate Sales',
    location: 'Remote / Bangalore / Chennai',
    type: 'Full-Time',
    experience: '2 - 6 Years',
    salaryRange: '₹6.0L - ₹12.0L LPA + Uncapped Incentive',
    description: 'Connect with founders, CEOs, and HR heads of growing startups and SMBs to offer Entice HR\'s outsourced recruitment and payroll solutions.',
    requirements: [
      'Track record in B2B service sales or HR agency business development',
      'Strong consultative selling skills and founder-level networking',
      'Self-driven mindset with experience closing retainer and contingent recruitment contracts'
    ],
    isUrgent: true
  },
  {
    id: 'job-4',
    title: 'HR Generalist & Client Account Lead',
    department: 'HR Consulting',
    location: 'Nagercoil / Hybrid',
    type: 'Full-Time',
    experience: '1 - 3 Years',
    salaryRange: '₹3.5L - ₹5.0L LPA',
    description: 'Act as the primary point of contact for assigned client accounts, managing employee lifecycle events, POSH policies, and performance reviews.',
    requirements: [
      'MBA in Human Resource Management',
      'Familiarity with modern HR policies, POSH guidelines, and appraisal frameworks',
      'Empathetic interpersonal skills and problem-solving mindset'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Startups Fail at Early Hiring (And How Outsourced HR Fixes It)',
    category: 'Startup Scaling',
    snippet: 'Early-stage founders spend up to 40% of their bandwidth recruiting manually. Learn how partnering with an external HR squad accelerates hiring while saving runway.',
    content: `Building a startup requires speed, but hasty hiring can sink early momentum. Most startups under 50 employees cannot justify the $80,000+ annual overhead of a full-time HR Director, recruiter, and payroll admin.

Key Takeaways for Founders:
1. **The Hidden Cost of Mis-hires**: A bad developer or sales hire costs 3x their annual salary in lost time and product delays.
2. **Speed to Market**: Outsourced HR squads bring pre-screened candidate pools, reducing time-to-hire from 60 days down to 12 days.
3. **Focus on Product & Revenue**: Founders should focus on core IP while expert HR teams handle compliance, offer letters, and background checks.`,
    author: {
      name: 'Entice Research Team',
      role: 'B2B Talent Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    date: 'July 24, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-2',
    title: 'Demystifying Indian Statutory Compliance: EPF, ESI & Tax Guidelines for 2026',
    category: 'Payroll & Compliance',
    snippet: 'A comprehensive guide for corporate companies on statutory filings, penalty avoidance, and managing multi-state employee payroll seamlessly.',
    content: `Statutory compliance in India can be a labyrinth for growing companies. From EPF wage ceilings to state-wise Professional Tax variations, non-compliance can attract heavy penalties and operational audits.

Key Compliance Highlights:
- **Employees\' Provident Fund (EPF)**: mandatory for establishments with 20+ workers.
- **Employees\' State Insurance (ESI)**: applicable for employees with monthly gross wages up to ₹21,000.
- **POSH Act Compliance**: mandatory Internal Complaints Committee (ICC) setup for companies with 10+ employees.
- **Audit Preparedness**: maintaining digital registers and timely monthly challan deposits prevents legal notices.`,
    author: {
      name: 'Compliance Desk',
      role: 'Senior Payroll Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    date: 'July 18, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-3',
    title: 'The AI Revolution in Candidate Screening: Sifting 10,000 Resumes in Seconds',
    category: 'HR Trends',
    snippet: 'How vector-based semantic search and AI pre-screening eliminate bias, surface hidden tech talent, and elevate candidate experience.',
    content: `Traditional keyword matching rejects great candidates who don't use exact phrasing. Modern AI recruitment engines utilize semantic understanding to analyze skills context, project quality, and career trajectory.

Why AI Sourcing Leads:
- **Zero Keyword Bias**: Evaluates actual capability over resume buzzwords.
- **Automated Skill Testing**: Pre-checks technical skills before human interviews.
- **Candidate Delight**: Real-time feedback loops prevent the 'resume black hole'.`,
    author: {
      name: 'Tech Talent Advisory',
      role: 'Head of Recruitment Innovation',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    date: 'July 10, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-4',
    title: 'Campus Recruitment Playbook: Attracting Top Engineering Freshers',
    category: 'Campus Hiring',
    snippet: 'Best practices for organizing high-yielding college placement drives, hackathons, and converting offers into long-term team members.',
    content: `Fresh engineering talent brings enthusiasm and modern stack readiness to tech organizations. However, campus recruitment drives can easily turn chaotic without structured assessment tools and proactive offer engagement.`,
    author: {
      name: 'Campus Outreach Lead',
      role: 'University Partnerships Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    date: 'June 29, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Entice HR Solutions transformed our scaling journey. We needed 12 specialized full-stack engineers in 30 days without an internal recruitment team. They delivered pre-vetted candidates within 5 days and handled all offer negotiations seamlessly.',
    author: 'Vikramaditya Sharma',
    title: 'Co-Founder & CTO',
    company: 'Nexus Cloud Technologies',
    companyType: 'Series A Tech Startup',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    metrics: '12 Engineers Hired in 21 Days'
  },
  {
    id: 'test-2',
    quote: 'Offloading our payroll, PF, and compliance to Entice HR eliminated monthly admin headaches completely. Their response time on WhatsApp and email is phenomenal. Truly our trusted HR partner.',
    author: 'Ananya Deshmukh',
    title: 'Head of Operations',
    company: 'FinPulse Solutions',
    companyType: 'Fintech Corporate',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    metrics: '100% Payroll Compliance & Zero Fines'
  },
  {
    id: 'test-3',
    quote: 'Finding a VP of Engineering on contingent recruiting felt impossible until we engaged Entice HR’s Executive Search team. Their deep market reach surfaced leadership candidates we could never have reached otherwise.',
    author: 'Rajesh K. Nambiar',
    title: 'Managing Director',
    company: 'Aura Logistics India',
    companyType: 'Enterprise Logistics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    metrics: 'VP Hired in 18 Days'
  }
];
