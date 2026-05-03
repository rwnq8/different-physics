# The Road Not Taken: Ultrametric Quantum Mechanics

**What Planck Should Have Measured (and What We'd Know If He Had)**

A counterfactual history of how a forgotten metric from 1897 could have changed physics — arguing that the deepest assumption of quantum mechanics deserves re-examination.

By Rowan Brad Quni-Gudzinas (2026)

---

## About This Site

This is a Jekyll-based GitHub Pages site generated from the manuscript *"The Road Not Taken."*

### Local Development

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000/different-physics/`

### Deploying

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Set Source to "Deploy from a branch"
4. Choose branch: `master`, folder: `/ (root)`
5. Save

The site will be live at `https://rwnq8.github.io/different-physics/`

### Structure

```
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Main document (v0.11)
├── 404.md               # Custom 404 page
├── robots.txt           # SEO robots
├── _layouts/            # HTML templates
│   └── default.html     # Universal layout shell
├── _includes/           # Reusable components
│   ├── footer.html
│   ├── toc.html
│   ├── chapter-nav.html
│   ├── breadcrumbs.html
│   ├── reading-time.html
│   └── google-analytics.html
├── _sass/               # SCSS partials (13 files)
├── assets/
│   ├── css/style.scss   # Main stylesheet
│   ├── js/
│   │   ├── main.js      # Interactive features
│   │   ├── search.js    # Search engine
│   │   └── nav/
│   │       └── sidebar.json  # Navigation data
│   ├── search/
│   │   └── search-data.json  # Search index
│   └── img/
│       └── og-image.svg # Open Graph image
├── 0.1.md - 0.11.md     # Draft versions (source)
└── build_*.py           # Build scripts (source)
```

### License

All rights reserved. Contact the author for permissions.
