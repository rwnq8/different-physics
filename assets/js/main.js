/**
 * The Road Not Taken — Main JavaScript
 * Immediately-invoked function expression. No frameworks.
 */
(function() {
  'use strict';

  // ============================================================
  // 1. THEME
  // ============================================================
  function initTheme() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // Theme toggle buttons
  function bindThemeToggles() {
    var fab = document.getElementById('fab');
    var mobileToggle = document.getElementById('theme-toggle-mobile');
    var pressTimer;

    if (fab) {
      fab.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
          toggleTheme();
          fab.classList.add('theme-flash');
          setTimeout(function() { fab.classList.remove('theme-flash'); }, 500);
        }, 500);
      });

      fab.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
      });

      fab.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
      });

      fab.addEventListener('click', function(e) {
        if (pressTimer) {
          clearTimeout(pressTimer);
          // Short click: scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      // Touch events for mobile
      fab.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(function() {
          toggleTheme();
          fab.classList.add('theme-flash');
          setTimeout(function() { fab.classList.remove('theme-flash'); }, 500);
        }, 500);
      });

      fab.addEventListener('touchend', function(e) {
        clearTimeout(pressTimer);
      });
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', toggleTheme);
    }
  }

  // ============================================================
  // 2. SIDEBAR
  // ============================================================
  function buildSidebar() {
    var nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    fetch(document.querySelector('script[src*="main.js"]').src.replace('main.js', 'nav/sidebar.json'))
      .then(function(res) { return res.json(); })
      .then(function(data) {
        nav.innerHTML = '';
        data.forEach(function(item) {
          var a = document.createElement('a');
          a.href = '#' + item.id;
          a.textContent = item.title;
          a.className = 'nav-h2';
          nav.appendChild(a);

          if (item.children) {
            item.children.forEach(function(child) {
              var ca = document.createElement('a');
              ca.href = '#' + child.id;
              ca.textContent = child.title;
              ca.className = 'nav-h3';
              nav.appendChild(ca);
            });
          }
        });
      })
      .catch(function() {
        // Silently handle — sidebar.json may not exist yet
        nav.innerHTML = '<div style="padding:16px;color:var(--color-sidebar-text-secondary);font-size:0.85em;">Navigation unavailable</div>';
      });
  }

  // ============================================================
  // 3. ACTIVE HEADING TRACKING (IntersectionObserver)
  // ============================================================
  function initActiveHeading() {
    var navLinks = [];
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          document.querySelectorAll('#sidebar-nav a.active').forEach(function(el) {
            el.classList.remove('active');
          });
          var link = document.querySelector('#sidebar-nav a[href="#' + id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    var headings = document.querySelectorAll('.content h2[id]');
    headings.forEach(function(h) { observer.observe(h); });
    navLinks = Array.from(document.querySelectorAll('#sidebar-nav a'));
  }

  // ============================================================
  // 4. PROGRESS BAR
  // ============================================================
  function initProgressBar() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          var progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
          bar.style.width = Math.min(progress, 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ============================================================
  // 5. MOBILE MENU
  // ============================================================
  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');

    if (!toggle || !sidebar || !overlay) return;

    function openMenu() {
      sidebar.classList.add('open');
      overlay.classList.add('visible');
    }

    function closeMenu() {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    }

    toggle.addEventListener('click', function() {
      if (sidebar.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    sidebar.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });
  }

  // ============================================================
  // 6. COLLAPSIBLE SECTIONS
  // ============================================================
  function initCollapsible() {
    document.querySelectorAll('.content h2').forEach(function(h2) {
      h2.style.cursor = 'pointer';
      h2.setAttribute('aria-expanded', 'true');
      h2.setAttribute('tabindex', '0');

      // Add indicator
      var indicator = document.createElement('span');
      indicator.className = 'collapse-indicator';
      indicator.textContent = ' ▾';
      indicator.style.fontSize = '0.7em';
      indicator.style.opacity = '0.5';
      h2.appendChild(indicator);

      h2.addEventListener('click', function() {
        var expanded = h2.getAttribute('aria-expanded') === 'true';
        h2.setAttribute('aria-expanded', String(!expanded));
        indicator.textContent = expanded ? ' ▸' : ' ▾';

        // Toggle all siblings until next h2
        var el = h2.nextElementSibling;
        while (el && el.tagName !== 'H2') {
          if (expanded) {
            el.style.display = 'none';
          } else {
            el.style.display = '';
          }
          el = el.nextElementSibling;
        }
      });

      // Keyboard
      h2.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          h2.click();
        }
      });
    });
  }

  // ============================================================
  // 7. FLOATING ACTION BUTTON
  // ============================================================
  function initFAB() {
    var fab = document.getElementById('fab');
    if (!fab) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        fab.classList.add('visible');
      } else {
        fab.classList.remove('visible');
      }
    });
  }

  // ============================================================
  // 8. SMOOTH SCROLLING FOR HASH LINKS
  // ============================================================
  function initSmoothScroll() {
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Update URL without jump
      history.pushState(null, null, '#' + targetId);
    });
  }

  // ============================================================
  // 9. FRAGMENT HIGHLIGHT
  // ============================================================
  function initFragmentHighlight() {
    function highlightTarget() {
      var hash = window.location.hash;
      if (!hash) return;
      var target = document.querySelector(hash);
      if (!target) return;
      target.classList.add('highlight-target');
      setTimeout(function() { target.classList.remove('highlight-target'); }, 2500);
    }

    highlightTarget();
    window.addEventListener('hashchange', highlightTarget);
  }

  // ============================================================
  // 10. COPY BUTTONS (clipboard.js)
  // ============================================================
  function initCopyButtons() {
    if (typeof ClipboardJS === 'undefined') return;

    document.querySelectorAll('pre').forEach(function(pre) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });

    var clipboard = new ClipboardJS('.copy-btn', {
      target: function(trigger) {
        return trigger.parentElement.querySelector('code') || trigger.parentElement;
      },
      text: function(trigger) {
        var code = trigger.parentElement.querySelector('code');
        return code ? code.textContent : trigger.parentElement.textContent.replace(/Copy$/, '').trim();
      }
    });

    clipboard.on('success', function(e) {
      e.trigger.textContent = '✓ Copied!';
      e.trigger.classList.add('copied');
      setTimeout(function() {
        e.trigger.textContent = 'Copy';
        e.trigger.classList.remove('copied');
      }, 2000);
      e.clearSelection();
    });
  }

  // ============================================================
  // 11. PROOF BLOCK COLLAPSIBILITY
  // ============================================================
  function initProofBlocks() {
    // Detect proof-like patterns and wrap them
    document.querySelectorAll('.content p, .content div').forEach(function(el) {
      var text = el.textContent.trim();
      if (text.match(/^(Proof|Derivation|Demonstration)[\.\:]/i) && el.tagName === 'P') {
        wrapProofBlock(el);
      }
    });
  }

  function wrapProofBlock(startEl) {
    var block = document.createElement('div');
    block.className = 'proof-block';

    var header = document.createElement('div');
    header.className = 'proof-header';
    header.setAttribute('aria-expanded', 'true');
    header.innerHTML = '<span class="proof-indicator">▸</span> ' + startEl.textContent;

    var body = document.createElement('div');
    body.className = 'proof-body open';

    // Move subsequent elements into body until next h2 or hr
    var el = startEl.nextElementSibling;
    while (el && el.tagName !== 'H2' && el.tagName !== 'HR') {
      var next = el.nextElementSibling;
      body.appendChild(el);
      el = next;
    }

    startEl.parentElement.insertBefore(block, startEl);
    block.appendChild(header);
    block.appendChild(body);

    header.addEventListener('click', function() {
      var expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      body.classList.toggle('open');
    });
  }

  // ============================================================
  // 12. IMAGE LIGHTBOX
  // ============================================================
  function initLightbox() {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img class="lightbox-content" alt="">';
    document.body.appendChild(lightbox);

    var img = lightbox.querySelector('.lightbox-content');
    var close = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.content img').forEach(function(el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function() {
        img.src = el.src;
        img.alt = el.alt;
        lightbox.classList.add('open');
      });
    });

    close.addEventListener('click', function() { lightbox.classList.remove('open'); });
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // ============================================================
  // 13. DIAGRAM ZOOM
  // ============================================================
  function initDiagramZoom() {
    document.querySelectorAll('.content pre').forEach(function(pre) {
      // Only ASCII art / diagram blocks
      var text = pre.textContent;
      if (text.match(/[─│┌┐└┘├┤┬┴┼\/\\\|\-\+]+/) || text.match(/^[\/\\\|\-\s]+$/m)) {
        pre.classList.add('diagram');
        pre.style.cursor = 'zoom-in';
        pre.addEventListener('click', function() {
          pre.classList.toggle('zoomed');
        });
      }
    });
  }

  // ============================================================
  // 14. READING TIME
  // ============================================================
  function initReadingTime() {
    var badges = document.querySelectorAll('.reading-time');
    if (badges.length === 0) return;

    var text = '';
    var article = document.querySelector('.content');
    if (article) text = article.textContent;

    var wordCount = text.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    var minutes = Math.max(1, Math.round(wordCount / 200));

    badges.forEach(function(badge) {
      badge.textContent = '⏱ ~' + minutes + ' min read';
    });
  }

  // ============================================================
  // 15. SECTION ANCHORS
  // ============================================================
  function initSectionAnchors() {
    document.querySelectorAll('.content h2[id], .content h3[id]').forEach(function(heading) {
      var anchor = document.createElement('a');
      anchor.href = '#' + heading.id;
      anchor.className = 'section-anchor';
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', 'Link to this section');
      heading.appendChild(anchor);

      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var url = window.location.origin + window.location.pathname + '#' + heading.id;
        navigator.clipboard.writeText(url).then(function() {
          anchor.textContent = '✓';
          setTimeout(function() { anchor.textContent = '#'; }, 1500);
        }).catch(function() {
          // Fallback
          var temp = document.createElement('input');
          temp.value = url;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          anchor.textContent = '✓';
          setTimeout(function() { anchor.textContent = '#'; }, 1500);
        });
      });
    });
  }

  // ============================================================
  // 16. KEYBOARD SHORTCUTS
  // ============================================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ctrl+K: focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        var searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Escape: close search overlay
      if (e.key === 'Escape') {
        var overlay = document.getElementById('search-overlay');
        if (overlay && overlay.classList.contains('open')) {
          overlay.classList.remove('open');
        }
      }
    });
  }

  // ============================================================
  // 17. IMAGE LAZY LOADING
  // ============================================================
  function initLazyImages() {
    document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() { img.classList.add('loaded'); });
        img.addEventListener('error', function() { img.classList.add('loaded'); });
      }
    });
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================
  initTheme();                // 1. Must run before paint
  bindThemeToggles();
  buildSidebar();            // 2.
  initKeyboardShortcuts();

  // DOM-ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMobileMenu();       // 3.
      initProgressBar();      // 4.
      initFAB();              // 5.
      initSmoothScroll();     // 6.
      initFragmentHighlight();// 7.
      initLazyImages();
      initReadingTime();
      initSectionAnchors();

      // Deferred enhancements (after layout stabilizes)
      setTimeout(function() {
        initActiveHeading();  // 8.
        initCollapsible();    // 9.
        initProofBlocks();    // 10.
        initDiagramZoom();    // 11.
        initLightbox();       // 12.
        initCopyButtons();    // 13.
      }, 600);
    });
  } else {
    initMobileMenu();
    initProgressBar();
    initFAB();
    initSmoothScroll();
    initFragmentHighlight();
    initLazyImages();
    initReadingTime();
    initSectionAnchors();
    setTimeout(function() {
      initActiveHeading();
      initCollapsible();
      initProofBlocks();
      initDiagramZoom();
      initLightbox();
      initCopyButtons();
    }, 600);
  }

})();
