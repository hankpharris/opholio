# SEO Setup Guide for Portfolio Website

## What I've Added

I've created a comprehensive SEO setup for your portfolio website that includes:

### 1. Dynamic Sitemap (`frontend/app/sitemap.ts`)
- Automatically generates a sitemap for all your pages
- Includes static pages (home, projects, about)
- Dynamically includes all project pages from your database
- Updates automatically when you add new projects

### 2. Robots.txt (`frontend/app/robots.ts`)
- Tells search engines how to crawl your site
- Points to your sitemap
- Blocks admin and API routes from being indexed

### 3. Enhanced Metadata
- Updated main layout with comprehensive SEO metadata
- Added OpenGraph tags for social media sharing
- Added Twitter Card metadata
- Added metadata to individual pages (about, projects, project details)

## Environment Variables to Set

Add these to your `.env.local` file:

```bash
# Required: Your website's base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Optional: Google Search Console verification
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## How to Test

1. **Sitemap**: Visit `https://your-domain.com/sitemap.xml`
2. **Robots.txt**: Visit `https://your-domain.com/robots.txt`

## Next Steps for Google Indexing

1. **Google Search Console**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property
   - Verify ownership (you'll get a verification code)
   - Submit your sitemap URL: `https://your-domain.com/sitemap.xml`

2. **Submit Sitemap**:
   - In Search Console, go to "Sitemaps"
   - Add your sitemap URL
   - Google will start crawling your pages

3. **Monitor Performance**:
   - Check "Coverage" reports in Search Console
   - Monitor indexing status of your pages
   - Check for any crawl errors

## Features Included

- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Comprehensive metadata
- ✅ OpenGraph social media tags
- ✅ Twitter Card support
- ✅ Individual page metadata
- ✅ Project-specific metadata
- ✅ SEO-friendly URLs

Your website is now ready for Google indexing! The sitemap will automatically update when you add new projects to your database. 