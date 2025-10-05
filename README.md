# lokmanefe.com

> A modern, full-featured personal portfolio and digital presence built with Next.js 15

**Live Site**: [lokmanefe.com](https://lokmanefe.com)

A comprehensive personal website showcasing projects, technical writing, and reading journey. Built with modern web technologies and optimized for performance, SEO, and user experience.

![Website Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

### **Core Functionality**

- **Dynamic Project Showcase**: Interactive project gallery with filtering, search, and detailed view
- **Markdown-Powered Blog**: Git-based content management with frontmatter support
- **Reading Tracker**: Personal library with analytics, goals, and progress tracking
- **Responsive Design**: Seamless experience across all devices
- **Dark Mode**: System-aware theme switching with persistent preferences

### **Advanced Features**

- **Smart Search**: Full-text search across projects, technologies, and content
- **Category Filtering**: Organize content by type, technology, and status
- **RSS Feeds**: Syndication for blog posts and book reviews
- **Social Integration**: GitHub, LinkedIn, and LeetCode profile integration
- **Analytics Dashboard**: Reading goals, velocity tracking, and genre distribution

### **Performance & SEO**

- **Static Generation**: Pre-rendered pages for optimal loading speed
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Image Optimization**: Next.js Image component with lazy loading
- **Font Optimization**: Custom font loading with performance best practices

## Tech Stack

### **Frontend**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: CSS transitions and transforms
- **Icons**: Lucide React

### **Content Management**

- **Blog Posts**: Markdown with gray-matter frontmatter
- **Book Reviews**: Structured markdown with metadata
- **Projects**: JSON-based configuration with image assets

### **Developer Experience**

- **Package Manager**: npm
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier (auto-formatting)
- **Git Hooks**: Pre-commit validation

### **Deployment**

- **Platform**: Vercel (recommended)
- **Domain**: Custom domain with SSL
- **Analytics**: Built-in Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/lokicik/lokmanefe.com.git
cd lokmanefe.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Content Management

### **Blog Posts**

Create posts in `content/posts/`:

```markdown
---
title: "Building Scalable AI Applications"
date: "2025-01-15"
excerpt: "Lessons learned from architecting production AI systems"
published: true
tags: ["ai", "architecture", "nextjs"]
readingTime: 8
---

Your content here...
```

### **Book Reviews**

Add books to `content/books/`:

```markdown
---
title: "Clean Architecture"
author: "Robert C. Martin"
rating: 5
status: "completed"
currentPage: 352
pages: 352
startDate: "2024-01-01"
completedDate: "2024-01-15"
tags: ["architecture", "software-engineering"]
---

Review content...
```

### **Projects**

Configure projects in `src/components/projects-page-content.tsx`:

```typescript
{
  id: "project-name",
  title: "Project Title",
  description: "Brief description",
  longDescription: "Detailed description for featured projects",
  category: "Full-Stack",
  technologies: ["Next.js", "TypeScript", "Go"],
  githubUrl: "https://github.com/user/repo",
  liveUrl: "https://project-demo.com",
  imageUrl: "/projects/screenshot.png",
  featured: true,
  year: 2025,
}
```

## Project Structure

```
lokmanefe.com/
├── content/                  # Content management
│   ├── posts/               # Blog posts (markdown)
│   ├── books/               # Book reviews (markdown)
│   └── projects/            # Project screenshots
├── public/                  # Static assets
│   ├── projects/           # Project images
│   └── favicon.svg         # Site favicon
├── src/
│   ├── app/                # Next.js app router
│   │   ├── blog/           # Blog pages
│   │   ├── reading/        # Reading tracker
│   │   ├── projects/       # Projects showcase
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── blog-*.tsx     # Blog components
│   │   ├── reading-*.tsx  # Reading components
│   │   └── projects-*.tsx # Project components
│   └── lib/               # Utility functions
│       ├── markdown-*.ts  # Content parsers
│       └── utils.ts       # Helper functions
├── components.json         # shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS config
└── next.config.ts         # Next.js configuration
```

## Customization

### **Personal Information**

- Update contact details in `src/app/page.tsx`
- Modify navigation links in `src/components/navigation.tsx`
- Add your social profiles to the contact section

### **Styling & Branding**

- Customize colors in `tailwind.config.js`
- Update fonts and typography in `src/app/globals.css`
- Modify component themes in individual component files

### **Features**

- Add new project categories in the projects configuration
- Create custom book metadata fields
- Extend the reading analytics with new metrics

## Analytics & Insights

### **Reading Analytics**

- Progress tracking with completion rates
- Reading velocity and pace analysis
- Genre distribution and diversity metrics
- Year-over-year reading goals

### **Content Performance**

- Page views and engagement (via Vercel Analytics)
- Most popular projects and blog posts
- Search query analysis

## Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### **Code Quality**

- **ESLint**: Enforces coding standards and catches errors
- **TypeScript**: Static type checking for reliability
- **Prettier**: Automatic code formatting
- **Git Hooks**: Pre-commit validation

## Deployment

### **Vercel (Recommended)**

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure custom domain
4. Enable analytics and monitoring

### **Performance Optimizations**

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle size
- **Caching**: Optimized cache headers for static assets

## Contributing

This is a personal portfolio, but you're welcome to:

- Report issues or bugs
- Suggest improvements
- Use as a template for your own portfolio
- Submit pull requests for general enhancements

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Built with ❤️ by [Lokman Efe](https://github.com/lokicik)**

_If you found this portfolio inspiring, feel free to star ⭐ the repository!_
