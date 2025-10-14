# Online CV Website - Solana Developer

A modern, responsive online CV website with Solana-inspired design. Perfect for applying to blockchain and Web3 positions.

## Features

- **Modern Design**: Clean, professional layout with Solana's signature purple and green color scheme
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, hover effects, and animated sections
- **Easy to Customize**: Simple HTML structure with clear sections for your information
- **Fast Loading**: Optimized performance with minimal dependencies
- **Print-Friendly**: Looks great when printed or saved as PDF

## What's Included

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with Solana theme
- `script.js` - Interactive features and animations
- `README.md` - This file

## Customization Guide

### 1. Personal Information

Open `index.html` and update the following sections:

**Header Section** (lines 15-30):
```html
<h1 class="name">Your Name</h1>
<p class="title">Blockchain Developer | Solana Specialist</p>
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://github.com/yourusername">github.com/yourusername</a>
```

### 2. About Section

Update the about text and highlights (lines 50-70):
- Personal introduction
- Your highlights and strengths

### 3. Work Experience

Add your work experience (lines 75-110):
- Job titles and companies
- Dates of employment
- Key achievements and responsibilities

### 4. Skills

Update your technical skills (lines 115-155):
- Blockchain & Web3 skills
- Programming languages
- Frontend/Backend technologies
- Tools and frameworks

### 5. Projects

Showcase your projects (lines 160-220):
- Project names and descriptions
- Technologies used
- Links to live demos or GitHub repos

### 6. Education

Add your educational background (lines 225-245):
- Degrees and institutions
- Certifications
- Bootcamps or courses

### 7. Profile Image

To add a real profile picture, replace this line in `index.html`:
```html
<div class="profile-image">
    <i class="fas fa-user-circle"></i>
</div>
```

With:
```html
<div class="profile-image">
    <img src="your-photo.jpg" alt="Your Name" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #9945FF;">
</div>
```

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a new repository on GitHub
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site is live instantly with a custom URL
4. Optional: Add custom domain

### Option 3: Vercel (Free)

1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click
4. Get automatic HTTPS and custom domain support

### Option 4: Local Testing

Simply open `index.html` in your web browser to view locally.

For better local development experience:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## Tips for Solana Job Applications

1. **Highlight Solana Experience**: Make sure to emphasize any Solana-specific projects or knowledge
2. **Show Code**: Link to GitHub repos with Rust/Anchor code samples
3. **Active Wallet**: Consider adding your Solana wallet address to show you're active in the ecosystem
4. **Community Involvement**: Mention any Solana hackathons, DAOs, or community contributions
5. **Stay Updated**: Keep your CV updated with latest Solana developments and features you've worked with

## Customization Ideas

- Add a dark/light mode toggle
- Include a contact form
- Add blog section for technical articles
- Integrate Web3 wallet connection
- Display your NFT collection
- Add testimonials section
- Include video introduction

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Lighthouse score: 95+
- Fast loading time
- Minimal dependencies (only Font Awesome for icons)
- Optimized animations

## Need Help?

- HTML/CSS basics: [MDN Web Docs](https://developer.mozilla.org)
- Git and GitHub: [GitHub Guides](https://guides.github.com)
- Web hosting: Check documentation for your chosen platform

## License

Free to use and modify for your personal CV.

## Good Luck!

Best wishes with your Solana job applications! Remember to:
- Keep your CV updated
- Customize it to match job requirements
- Proofread everything carefully
- Test on multiple devices
- Share the link in your applications

Built with passion for the Solana ecosystem 💜
