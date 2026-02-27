# Portfolio Website - Complete Setup & Hosting Guide

## 📋 Prerequisites
- GitHub account (free)
- Git installed on your computer
- Your personal information and content ready

## 🚀 Step-by-Step Hosting Guide

### Step 1: Create GitHub Account
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Choose username (IMPORTANT: This will be your website URL: `yourusername.github.io`)
4. Verify your email

### Step 2: Create Repository
1. Click the "+" icon in top-right corner
2. Select "New repository"
3. **CRITICAL**: Name it exactly: `yourusername.github.io` (replace with YOUR GitHub username)
4. Make it Public
5. Don't initialize with README
6. Click "Create repository"

### Step 3: Set Up Git Locally
```bash
# Configure git with your info
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 4: Upload Your Portfolio
```bash
# Navigate to portfolio folder
cd ~/portfolio-website

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio website"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"

### Step 6: Access Your Website
- Your website will be live at: `https://yourusername.github.io`
- It may take 5-10 minutes to go live initially

## 📝 Customization Checklist

Replace these placeholders in `index.html`:

### Personal Information
- [ ] Your Name (multiple places)
- [ ] Your Title/Role
- [ ] Your Tagline/Bio
- [ ] Email address
- [ ] Phone number
- [ ] Location
- [ ] Profile picture (`profile.jpg`)
- [ ] About section image (`about.jpg`)

### Social Links
- [ ] GitHub URL
- [ ] LinkedIn URL
- [ ] Twitter URL
- [ ] Instagram URL

### Skills Section
- [ ] Your programming languages
- [ ] Your frameworks
- [ ] Your tools

### Projects Section
- [ ] Project names
- [ ] Project descriptions
- [ ] Project technologies
- [ ] Project links
- [ ] Project images (`project1.jpg`, etc.)

### Experience Section
- [ ] Job titles
- [ ] Company names
- [ ] Employment dates
- [ ] Job descriptions

### Additional Files to Add
- [ ] `profile.jpg` - Your professional photo (400x400px recommended)
- [ ] `about.jpg` - Another photo for about section
- [ ] `project1.jpg`, `project2.jpg`, etc. - Screenshots of your projects
- [ ] `resume.pdf` - Your resume/CV file

## 🎨 Optional Customizations

### Change Colors
Edit these CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6C63FF;  /* Main theme color */
    --secondary-color: #FF6584; /* Accent color */
}
```

### Add More Projects
Copy this structure in the projects section:
```html
<div class="project-card">
    <div class="project-image">
        <img src="projectX.jpg" alt="Project Name">
        <div class="project-overlay">
            <a href="LIVE_LINK" class="project-link"><i class="fas fa-link"></i></a>
            <a href="GITHUB_LINK" class="project-link"><i class="fab fa-github"></i></a>
        </div>
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description</p>
        <div class="project-tech">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

## 🔄 Updating Your Website

After making changes:
```bash
git add .
git commit -m "Update description"
git push
```

Changes will appear on your live site within minutes.

## 🌐 Custom Domain (Optional)

To use your own domain (like `yourname.com`):

1. Buy domain from provider (Namecheap, GoDaddy, etc.)
2. In your repository, create file `CNAME` with your domain
3. Configure DNS settings at your domain provider:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## 🛠️ Troubleshooting

### Site not showing up?
- Check repository name is exactly `yourusername.github.io`
- Wait 10-15 minutes after first deployment
- Check GitHub Pages is enabled in Settings

### 404 Error?
- Ensure `index.html` is in root directory
- Check file names are lowercase
- Verify branch is set to `main` in Pages settings

### Images not showing?
- Check image file names match exactly (case-sensitive)
- Ensure images are committed to repository
- Use relative paths (e.g., `src="image.jpg"` not `src="/image.jpg"`)

## 📧 Contact Form

The contact form currently shows an alert. To make it functional:
- Use service like [Formspree](https://formspree.io) (free tier available)
- Or [EmailJS](https://www.emailjs.com) for email integration
- Or create a backend API endpoint

## 🎉 Congratulations!

Your portfolio is now live and hosted for FREE on GitHub Pages!

Remember to:
- Keep your portfolio updated with new projects
- Share your portfolio link on LinkedIn/Resume
- Add Google Analytics to track visitors (optional)