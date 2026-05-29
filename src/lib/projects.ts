export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "Full-Stack" | "AI/ML" | "Desktop" | "Web" | "Tool" | "Bot";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "geoip-explorer",
    title: "GeoIP Explorer",
    description:
      "An advanced IP tracking and geolocation application built with Vue 3 and Leaflet",
    longDescription:
      "GeoIP Explorer is an advanced IP tracking and geolocation application featuring real-time IP location mapping, distance measurements, custom markers, weather information, and more. Built with Vue 3, TypeScript, and Leaflet with a tactical/military theme, it includes multiple map modes, marker systems, analytics, and export options.",
    category: "Web",
    technologies: ["Vue.js", "TypeScript", "Leaflet", "Pinia", "Vite"],
    githubUrl: "https://github.com/lokicik/geoip-explorer",
    liveUrl: "https://geoip-explorer-lokmanefe.netlify.app/",
    imageUrl: "/projects/geoip_1.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "blogcraft-ai",
    title: "BlogCraft AI",
    description: "Automated blog post generator with AI-powered content creation",
    longDescription:
      "BlogCraft AI is an intelligent blog post generation system that creates SEO-optimized, professional content about career development, AI hiring trends, and job market insights. Features Google Gemini integration, smart template system, dynamic personalization, and beautiful Streamlit interface with automation capabilities.",
    category: "AI/ML",
    technologies: ["Python", "Streamlit", "Gemini", "FastAPI", "HTMX", "AI"],
    githubUrl: "https://github.com/lokicik/BlogCraft-ai",
    imageUrl: "/projects/blogpost_ss1.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "matchtalent-ai",
    title: "MatchTalent AI",
    description: "Intelligent CV analysis & job matching platform with AI-powered insights",
    longDescription:
      "MatchTalent AI is a powerful web application that leverages artificial intelligence to analyze CVs/resumes and provide personalized job recommendations. Features smart CV analysis, multi-platform job search across JSearch, Adzuna, and RemoteOK, intelligent matching with relevance scoring, and secure processing with automatic data clearing for privacy.",
    category: "AI/ML",
    technologies: ["Python", "Streamlit", "Gemini", "AI", "APIs", "PDF Processing", "NLP"],
    githubUrl: "https://github.com/lokicik/matchtalent-ai",
    imageUrl: "/projects/matchtalent-ai.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "storycut",
    title: "StoryCut",
    description: "An AI-powered tool to generate storybooks from user prompts.",
    longDescription:
      "StoryCut is a tool that allows users to generate complete storybooks, including characters, scenes, and a cover, based on their own prompts. A key feature is character referencing, allowing for consistent characters across different scenes. The tool provides a seamless experience for creating and exporting stories as PDF files.",
    category: "AI/ML",
    technologies: ["Python", "FastAPI", "HTMX", "AI", "OpenAI API"],
    liveUrl: "/projects/After_The_Adventure's_End_storybook.pdf",
    imageUrl: "/projects/ai-storybook_ss1.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "saaskit",
    title: "SaaS Kit",
    description: "A SaaS template with Next.js 15",
    longDescription:
      "A comprehensive SaaS starter kit built with the latest Next.js 15, featuring authentication, billing, user management, and modern UI components. Perfect for quickly launching SaaS applications.",
    category: "Web",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://saas-kit-eosin.vercel.app/",
    imageUrl: "/projects/saaskit_ss1.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "chimera",
    title: "Chimera",
    description: "A modern full-stack AI-powered chat application",
    longDescription:
      "Built with Next.js frontend and Go backend, featuring real-time messaging, Firebase integration, and AI capabilities. A sophisticated chat platform with modern architecture and scalable design.",
    category: "Full-Stack",
    technologies: ["Next.js", "Go", "Firebase", "WebSocket", "AI"],
    githubUrl: "https://github.com/orgs/Chimera-Platform/repositories",
    liveUrl: "https://trychimera.xyz",
    imageUrl: "/projects/chimera_ss1.webp",
    featured: true,
    year: 2025,
  },
  {
    id: "lokmanyefe",
    title: "lokmanefe.com",
    description: "This very website - my personal portfolio and blog",
    longDescription:
      "A modern, clean portfolio website built with Next.js, featuring a blog system, reading tracker, and project showcase. Demonstrates my skills in modern web development and design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
    githubUrl: "https://github.com/lokicik/lokmanefe.com",
    liveUrl: "https://lokmanefe.com",
    imageUrl: "/projects/lokmanefe_ss1.webp",
    featured: true,
    year: 2022,
  },
  {
    id: "gdg-website",
    title: "GDG Website",
    description: "A school club website with Next.js",
    longDescription:
      "Official website for GDG on Campus Trakya, built with Next.js. Features event management, member profiles, and club information with a modern, responsive design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    githubUrl:
      "https://github.com/GDG-on-Campus-Trakya/GDG-on-Campus-Trakya-Website",
    imageUrl: "/projects/gdgwebsite_ss1.webp",
    year: 2024,
  },
  {
    id: "eyedoro",
    title: "Eyedoro",
    description: "An open-source Electron alternative for lookaway.app",
    longDescription:
      "A beautiful desktop application built with Electron that helps protect your eyes by enforcing regular breaks from screen time. Features customizable work/break intervals, full screen blocking, system tray integration, and beautiful UI with dark mode support.",
    category: "Desktop",
    technologies: ["Electron", "React", "JavaScript", "CSS3"],
    githubUrl: "https://github.com/lokicik/eyedoro",
    imageUrl: "/projects/eyedoro_ss1.webp",
    featured: true,
    year: 2024,
  },
  {
    id: "gochop",
    title: "GoChop",
    description:
      "Open-source, privacy-respecting link shortener designed for power users",
    longDescription:
      "A powerful link shortener with advanced features like A/B testing, password protection, dynamic QR codes, and comprehensive analytics. Built with Go backend and TypeScript frontend for optimal performance.",
    category: "Full-Stack",
    technologies: ["Go", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/lokicik/gochop",
    imageUrl: "/projects/gochop_ss1.webp",
    featured: true,
    year: 2024,
  },
  {
    id: "hms",
    title: "Hotel Management System",
    description:
      "A simple hotel management system with Google Sheets integration",
    longDescription:
      "A streamlined hotel management solution that leverages Google Sheets for data storage, providing an easy-to-use interface for managing bookings, guests, and hotel operations.",
    category: "Web",
    technologies: ["JavaScript", "Google Sheets API", "HTML", "CSS"],
    githubUrl: "https://github.com/lokicik/hms",
    year: 2025,
  },
  {
    id: "ikigai-bot",
    title: "Ikigai Discord Bot",
    description: "A Discord bot with music support",
    longDescription:
      "A feature-rich Discord bot with music playback capabilities, moderation tools, and various utility commands to enhance server management and user experience.",
    category: "Bot",
    technologies: ["Python", "Discord.py", "SQLite"],
    githubUrl: "https://github.com/lokicik/ikigai-discord-bot",
    year: 2023,
  },
  {
    id: "easyscreenocr",
    title: "EasyScreenOCR Clone",
    description: "An open-source solution for a paid OCR app",
    longDescription:
      "A free alternative to paid OCR software, providing text extraction capabilities from screenshots and images with high accuracy and a simple interface.",
    category: "Tool",
    technologies: ["Python", "OCR", "Tkinter"],
    githubUrl: "https://github.com/lokicik/easyscreenocr-clone",
    year: 2023,
  },
  {
    id: "dog-cat-classification",
    title: "Dog or Cat Classification",
    description:
      "A deep learning model for classifying images of dogs and cats with CNN",
    longDescription:
      "Computer vision project using Convolutional Neural Networks to accurately classify images as containing either dogs or cats. Demonstrates deep learning and image processing skills.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "CNN", "Computer Vision"],
    githubUrl: "https://github.com/lokicik/dog_or_cat_image_classification",
    year: 2023,
  },
  {
    id: "smoking-drinking-classification",
    title: "Smoking/Drinking Classification",
    description:
      "A deep learning project for drinking or smoking prediction with ensemble learning",
    longDescription:
      "Machine learning project using ensemble methods (LGBM, XGB, and Random Forest) to predict smoking and drinking habits based on various health and lifestyle indicators.",
    category: "AI/ML",
    technologies: [
      "Python",
      "LGBM",
      "XGBoost",
      "Random Forest",
      "Scikit-learn",
    ],
    githubUrl: "https://github.com/lokicik/smoking_drinking_classification",
    year: 2023,
  },
  {
    id: "aygaz-project",
    title: "Dog Breed Classification",
    description: "A deep learning project for classifying dog breeds with CNN",
    longDescription:
      "Advanced computer vision project for the Aygaz Deep Learning competition, using CNNs to classify different dog breeds with high accuracy.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "CNN", "Data Augmentation"],
    githubUrl: "https://github.com/lokicik/Aygaz_Deep_Learning_Project",
    year: 2023,
  },
  {
    id: "akbank-project",
    title: "Melbourne Housing Regression",
    description:
      "A machine learning project for house price prediction with Random Forest",
    longDescription:
      "Regression analysis project for the Akbank Machine Learning competition, predicting Melbourne housing prices using Random Forest algorithms and feature engineering.",
    category: "AI/ML",
    technologies: ["Python", "Random Forest", "Pandas", "Feature Engineering"],
    githubUrl: "https://github.com/lokicik/Akbank_Machine_Learning_Project",
    year: 2023,
  },
];
