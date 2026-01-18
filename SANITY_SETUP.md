# Sanity CMS Integration Guide

This portfolio uses Sanity.io as a headless CMS to manage projects and tech stack content.

## 🚀 Setup Instructions

### 1. Create a Sanity Account
1. Go to [sanity.io](https://www.sanity.io/) and sign up
2. Create a new project
3. Note your **Project ID**

### 2. Configure Environment Variables

Update both `.env` files with your Sanity credentials:

**Root `.env`** (for frontend):
```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

**`sanity/.env`** (for Sanity Studio):
```env
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

### 3. Initialize Sanity Studio

```bash
cd sanity
npm install sanity @sanity/vision
npm install
```

### 4. Deploy Sanity Studio

Deploy your studio to Sanity's hosted platform:

```bash
cd sanity
npx sanity deploy
```

Choose a studio hostname (e.g., `your-portfolio-studio`)

Your studio will be available at: `https://your-portfolio-studio.sanity.studio`

### 5. Add Content

Visit your Sanity Studio and add content:

#### Projects Schema
- **Title**: Project name
- **Description**: Brief description (max 300 chars)
- **Image**: Emoji or icon (e.g., 🛍️, 📊)
- **Tech**: Array of technologies used
- **Link**: Live demo URL
- **GitHub**: Repository URL
- **Order**: Display order (0, 1, 2, etc.)

#### Tech Stack Schema
- **Name**: Technology name (e.g., React, TypeScript)
- **Icon**: Emoji or text (e.g., ⚛️, TS)
- **Color**: Tailwind gradient classes (e.g., `from-blue-500 to-cyan-500`)
- **Order**: Display order

## 📁 File Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   └── sanity.js          # Sanity client configuration
│   └── components/
│       ├── Experience.jsx      # Fetches projects from Sanity
│       └── Toolbox.jsx        # Fetches tech stack from Sanity
├── sanity/
│   ├── schemas/
│   │   ├── project.js         # Project schema
│   │   ├── techStack.js       # Tech stack schema
│   │   └── index.js
│   ├── sanity.config.js       # Sanity configuration
│   └── sanity.cli.js
└── .env
```

## 🔧 Development

### Run Frontend
```bash
npm run dev
```

### Run Sanity Studio Locally
```bash
cd sanity
npx sanity dev
```

Studio will be available at `http://localhost:3333`

## 📝 Example Content

### Example Project Entry:
```javascript
{
  title: "E-Commerce Platform",
  description: "A full-stack e-commerce solution with React and Node.js",
  image: "🛍️",
  tech: ["React", "Node.js", "MongoDB", "Stripe"],
  link: "https://myproject.com",
  github: "https://github.com/username/project",
  order: 0
}
```

### Example Tech Stack Entry:
```javascript
{
  name: "React",
  icon: "⚛️",
  color: "from-blue-500 to-cyan-500",
  order: 0
}
```

## 🎨 Color Gradient Options

Use Tailwind gradient classes:
- `from-blue-500 to-cyan-500` (React blue)
- `from-yellow-500 to-yellow-300` (JavaScript yellow)
- `from-green-600 to-green-400` (Node.js green)
- `from-purple-500 to-pink-500` (Vite purple)
- `from-orange-500 to-red-500` (Git orange)
- `from-cyan-500 to-blue-500` (Tailwind)

## 🔒 CORS Configuration

If you need to configure CORS for your Sanity project:

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to **API** settings
4. Add your domain to **CORS Origins** (e.g., `http://localhost:5173`)

## 🚨 Troubleshooting

### Data Not Loading
- Check environment variables are set correctly
- Verify Project ID matches your Sanity project
- Check browser console for errors
- Ensure CORS is configured for your domain

### Fallback Data
Both components have fallback data that displays if Sanity fails to load, ensuring your portfolio always works.

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio](https://www.sanity.io/studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
