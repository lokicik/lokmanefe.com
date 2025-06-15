# Lokman Baturay Efe - Portfolio & Blog

A clean, modern portfolio and blog built with Next.js 14, featuring markdown-based content management.

## ✨ Features

- **Clean Portfolio Design**: Professional homepage showcasing projects, experience, and contact info
- **Markdown Blog**: Write posts in markdown with frontmatter support
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop and mobile
- **SEO Optimized**: Proper meta tags and structured data
- **Fast & Modern**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Writing Blog Posts

1. Create a new markdown file in `content/posts/`:

   ```bash
   content/posts/my-new-post.md
   ```

2. Add frontmatter to your post:

   ```markdown
   ---
   title: "My Awesome Post"
   date: "2024-01-15"
   excerpt: "A brief description of the post"
   published: true
   tags: ["nextjs", "react", "webdev"]
   ---

   # Your post content here...
   ```

3. Commit and push to deploy (if using Git-based deployment)

### Frontmatter Options

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format
- `excerpt`: Brief description shown in post listings
- `published`: Set to `false` to hide the post
- `tags`: Array of tags for categorization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Content**: Markdown with gray-matter
- **Theme**: next-themes for dark mode
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── content/posts/          # Markdown blog posts
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🎨 Customization

### Personal Info

Update your personal information in `src/app/page.tsx`:

- Name, bio, and contact details
- Project links and descriptions
- Social media links

### Styling

- Modify `tailwind.config.js` for custom colors/themes
- Update `src/app/globals.css` for global styles
- Edit component styles in individual files

### Navigation

Add or modify navigation links in `src/components/navigation.tsx`

## 📝 Content Management

This blog uses a **Git-based workflow**:

- Write posts in markdown files
- Commit changes to publish
- Version control for all content
- Easy backup and portability

No database required - everything is file-based for simplicity and reliability.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The site is a static Next.js app and can be deployed to:

- Netlify
- Cloudflare Pages
- GitHub Pages (with static export)

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!
