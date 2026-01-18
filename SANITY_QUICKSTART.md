# Quick Start: Sanity CMS Integration

## ⚡ Quick Setup (5 minutes)

### Step 1: Get Sanity Project ID
```bash
# Login to Sanity (opens browser)
npx sanity login

# Create/link project
cd sanity
npx sanity init

# Follow prompts:
# - Create new project? Yes
# - Project name: My Portfolio
# - Dataset: production
# - Output path: . (current directory)
# - Schema: Clean project with no predefined schemas
```

### Step 2: Update Environment Variables

Copy the Project ID from the output and add to `.env`:
```env
VITE_SANITY_PROJECT_ID=abc123xyz
VITE_SANITY_DATASET=production
```

Also update `sanity/.env`:
```env
SANITY_STUDIO_PROJECT_ID=abc123xyz
SANITY_STUDIO_DATASET=production
```

### Step 3: Start Sanity Studio Locally

```bash
cd sanity
npm run dev
```

Studio opens at `http://localhost:3333`

### Step 4: Add Sample Content

In the studio, create:

**Projects** (2-3 examples):
- Title: "E-Commerce Platform"
- Description: "Full-stack shopping solution"
- Image: 🛍️
- Tech: React, Node.js, MongoDB
- Link: https://example.com
- GitHub: https://github.com/you/project
- Order: 0

**Tech Stack** (5-8 items):
- Name: React
- Icon: ⚛️
- Color: from-blue-500 to-cyan-500
- Order: 0

### Step 5: Deploy Studio (Optional)

```bash
cd sanity
npm run deploy
```

Choose a hostname: `your-name-portfolio-studio`

Access at: `https://your-name-portfolio-studio.sanity.studio`

## 🎯 Using the CMS

### Add New Project
1. Go to Sanity Studio
2. Click "Projects" → "+" button
3. Fill in all fields
4. Set Order (lower = appears first)
5. Publish

Changes appear instantly on your portfolio! ✨

### Edit Tech Stack
1. Go to "Tech Stack"
2. Click existing item or add new
3. Update icon, color, or order
4. Publish

### View Changes
Your portfolio fetches data on every page load. Just refresh to see updates!

## 🌐 CORS Setup

If you get CORS errors:

1. Go to https://manage.sanity.io
2. Select your project
3. Navigate to API → CORS Origins
4. Add: `http://localhost:5173` (dev) and your production URL

## 🎨 Emoji Ideas

Projects: 🛍️ 📊 ✅ 🌤️ 🎨 💪 📱 🚀 ⚡ 🔥
Tech: ⚛️ 🟢 🐳 🍃 🐘 ⚡ 🎨 📦 🔧 💻

## 📞 Need Help?

- Sanity docs: https://www.sanity.io/docs
- GROQ query help: https://www.sanity.io/docs/groq
- Join Sanity Slack: https://slack.sanity.io/
