# Deployment Guide: 100% Free Deployment (Vercel & Netlify)

This guide shows how to deploy your **InternGo Gamified Skill Trainer & Aptitude Web App** for **$0 forever** with free custom domain support and SSL certificates.

---

## Method 1: Deploying to Vercel ($0 Cost — Recommended)

Vercel is the creator of Next.js and provides lightning-fast global CDN deployment for Vite React web apps completely for **$0/month**.

### Step 1: Upload Your Code to GitHub
1. Create a free account on [GitHub.com](https://github.com).
2. Create a new repository named `interngo-aptitude-app`.
3. Push your project code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial release of InternGo Gamified Aptitude App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/interngo-aptitude-app.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [Vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New Project"** $\rightarrow$ **"Import from GitHub"**.
3. Select your `interngo-aptitude-app` repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**!
6. In ~30 seconds, your site will be live at `https://interngo-aptitude-app.vercel.app`!

---

## Method 2: Deploying to Netlify ($0 Cost)

1. Go to [Netlify.com](https://netlify.com) and log in with GitHub.
2. Click **"Add new site"** $\rightarrow$ **"Import an existing project"**.
3. Select GitHub and choose `interngo-aptitude-app`.
4. Build Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click **"Deploy Site"**.

---

## How to Monetize with Google AdSense / H5 Games Ads

1. Apply for a free account at [Google AdSense](https://adsense.google.com).
2. Insert your AdSense publisher script tag into `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
   ```
3. Submit your Vercel URL (`https://your-app.vercel.app`) for approval. Because you now have a Privacy Policy, Terms of Service, 90 Levels of content, and 10 Page View navigation per test, your site is optimized for AdSense approval!
