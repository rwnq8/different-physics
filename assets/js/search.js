/**
 * The Road Not Taken — Search
 * Fetches search-data.json, builds an in-memory index, handles search UI.
 */
(function() {
  'use strict';

  var searchData = null;
  var searchInput = document.getElementById('search-input');
  var searchOverlay = document.getElementById('search-overlay');
  var searchOverlayInput = document.getElementById('search-overlay-input');
  var searchResults = document.getElementById('search-results');
  var searchClose = document.getElementById('search-close');
  var selectedIndex = -1;

  // ============================================================
  // FETCH SEARCH DATA
  // ============================================================
  function loadSearchData() {
    var baseUrl = document.querySelector('script[src*="search.js"]')
      ? document.querySelector('script[src*="search.js"]').src.replace(/\/assets\/js\/search\.js.*$/, '')
      : '';

    fetch(baseUrl + '/assets/search/search-data.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        searchData = data;
        // Enable search input
        if (searchInput) searchInput.disabled = false;
      })
      .catch(function() {
        if (searchInput) {
          searchInput.disabled = true;
          searchInput.placeholder = 'Search unavailable';
        }
      });
  }

  // ============================================================
  // TOKENIZE + INDEX
  // ============================================================
  function tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(function(t) { return t.length > 1; });
  }

  function buildIndex() {
    if (!searchData) return null;
    return searchData.map(function(item) {
      var tokens = tokenize(item.title + ' ' + item.content);
      return { item: item, tokens: tokens };
    });
  }

  // ============================================================
  // SEARCH
  // ============================================================
  function search(query) {
    if (!searchData || query.length < 2) return [];

    var queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    var index = buildIndex();
    var results = [];

    index.forEach(function(entry) {
      var score = 0;
      queryTokens.forEach(function(qt) {
        entry.tokens.forEach(function(dt) {
          if (dt === qt) score += 2;
          else if (dt.indexOf(qt) === 0) score += 1;
          else if (dt.indexOf(qt) > 0) score += 0.5;
        });
      });

      // Title match bonus
      var titleLower = entry.item.title.toLowerCase();
      if (titleLower.indexOf(query.toLowerCase()) >= 0) score += 3;

      if (score > 0) {
        results.push({ item: entry.item, score: score });
      }
    });

    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, 20);
  }

  // ============================================================
  // HIGHLIGHT SNIPPET
  // ============================================================
  function highlightSnippet(text, query) {
    var queryLower = query.toLowerCase();
    var idx = text.toLowerCase().indexOf(queryLower);
    var snippet = '';

    if (idx >= 0) {
      var start = Math.max(0, idx - 40);
      var end = Math.min(text.length, idx + queryLower.length + 60);
      snippet = (start > 0 ? '…' : '') + text.substring(start, end) + (end < text.length ? '…' : '');

      // Wrap match in mark tag
      var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
    } else {
      snippet = text.substring(0, 150) + (text.length > 150 ? '…' : '');
    }

    return snippet;
  }

  // ============================================================
  // RENDER RESULTS
  // ============================================================
  function renderResults(query, results) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results for "' + escapeHtml(query) + '"</div>';
      return;
    }

    var html = '';
    results.forEach(function(result, i) {
      html += '<a href="' + result.item.url + '" class="search-result' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">';
      html += '<div class="result-title">' + escapeHtml(result.item.title) + '</div>';
      html += '<div class="result-snippet">' + highlightSnippet(result.item.content, query) + '</div>';
      html += '</a>';
    });

    searchResults.innerHTML = html;
    selectedIndex = 0;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================================
  // EVENT HANDLERS
  // ============================================================
  var debounceTimer;

  function handleSearchInput(value) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      var results = search(value);
      renderResults(value, results);
    }, 300);
  }

  function openSearchOverlay() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    if (searchOverlayInput) {
      searchOverlayInput.value = searchInput ? searchInput.value : '';
      searchOverlayInput.focus();
    }
  }

  function closeSearchOverlay() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    selectedIndex = -1;
  }

  function navigateResults(direction) {
    var items = searchResults.querySelectorAll('.search-result');
    if (items.length === 0) return;

    items[selectedIndex].classList.remove('active');
    selectedIndex += direction;

    if (selectedIndex < 0) selectedIndex = items.length - 1;
    if (selectedIndex >= items.length) selectedIndex = 0;

    items[selectedIndex].classList.add('active');
    items[selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  function openSelectedResult() {
    var active = searchResults.querySelector('.search-result.active');
    if (active) {
      window.location.href = active.href;
      closeSearchOverlay();
    }
  }

  // ============================================================
  // BIND EVENTS
  // ============================================================
  function bindEvents() {
    // Sidebar search input
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        handleSearchInput(this.value);
        if (this.value.length >= 2) openSearchOverlay();
      });

      searchInput.addEventListener('focus', function() {
        if (this.value.length >= 2) openSearchOverlay();
      });
    }

    // Overlay search input
    if (searchOverlayInput) {
      searchOverlayInput.addEventListener('input', function() {
        handleSearchInput(this.value);
        if (searchInput) searchInput.value = this.value;
      });
    }

    // Close button
    if (searchClose) {
      searchClose.addEventListener('click', closeSearchOverlay);
    }

    // Click outside to close
    if (searchOverlay) {
      searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) closeSearchOverlay();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!searchOverlay || !searchOverlay.classList.contains('open')) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          navigateResults(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigateResults(-1);
          break;
        case 'Enter':
          e.preventDefault();
          openSelectedResult();
          break;
        case 'Escape':
          e.preventDefault();
          closeSearchOverlay();
          break;
      }
    });

    // Click on result
    if (searchResults) {
      searchResults.addEventListener('click', function(e) {
        var result = e.target.closest('.search-result');
        if (result) {
          closeSearchOverlay();
        }
      });
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  loadSearchData();
  bindEvents();

})();
