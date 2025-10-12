document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';
  let searchIndex = [];

  const searchDataUrl = window.SEARCH_DATA_URL || '/search-data.json';

  fetch(searchDataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      searchIndex = data;
      initSearch();
      performSearch();
    })
    .catch(error => {
      console.error('Failed to load search data:', error);
      initSearch();
      performSearchFallback();
    });

  function initSearch() {
    const displayElement = document.getElementById('search-query-display');
    if (query) {
      displayElement.innerHTML = `"${query}" 검색 결과 <em class="list-count" id="search-count">0</em>`;
    } else {
      displayElement.textContent = '검색어를 입력해주세요.';
    }
  }

  function performSearch() {
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const itemsPerPage = 10;

    if (!query) {
      document.getElementById('search-no-results').classList.remove('hidden');
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    let matchedItems = searchIndex.filter(item => {
      const searchText = (item.title + ' ' + item.content + ' ' + item.section).toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    if (matchedItems.length === 0) {
      document.getElementById('search-no-results').classList.remove('hidden');
      const searchCountElement = document.getElementById('search-count');
      if (searchCountElement) {
        searchCountElement.textContent = '0';
      }
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    const searchItems = document.querySelectorAll('.search-item');
    searchItems.forEach(item => item.style.display = 'none');

    const totalPages = Math.ceil(matchedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, matchedItems.length);

    for (let i = startIndex; i < endIndex; i++) {
      const matchedItem = matchedItems[i];
      const correspondingElement = document.querySelector(`[data-href="${matchedItem.href}"]`);
      if (correspondingElement) {
        correspondingElement.style.display = 'block';
      }
    }

    const searchCountElement = document.getElementById('search-count');
    if (searchCountElement) {
      searchCountElement.textContent = matchedItems.length;
    }

    paginateSearch(currentPage, totalPages, query);
  }

  function performSearchFallback() {
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const itemsPerPage = 10;

    if (!query) {
      document.getElementById('search-no-results').classList.remove('hidden');
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    const searchItems = document.querySelectorAll('.search-item');
    let matchedItems = [];

    searchItems.forEach(item => {
      const title = item.querySelector('h2 a')?.textContent?.toLowerCase() || '';
      const content = item.textContent.toLowerCase();
      if (title.includes(query.toLowerCase()) || content.includes(query.toLowerCase())) {
        matchedItems.push(item);
      }
    });

    if (matchedItems.length === 0) {
      document.getElementById('search-no-results').classList.remove('hidden');
      const searchCountElement = document.getElementById('search-count');
      if (searchCountElement) {
        searchCountElement.textContent = '0';
      }
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    searchItems.forEach(item => item.style.display = 'none');
    const totalPages = Math.ceil(matchedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, matchedItems.length);

    for (let i = startIndex; i < endIndex; i++) {
      matchedItems[i].style.display = 'block';
    }

    const searchCountElement = document.getElementById('search-count');
    if (searchCountElement) {
      searchCountElement.textContent = matchedItems.length;
    }

    paginateSearch(currentPage, totalPages, query);
  }

  function paginateSearch(currentPage, totalPages, query) {
    const paginationContainer = document.getElementById('search-pagination');

    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'block';

    const currentPageSpan = paginationContainer.querySelector('#current-page');
    if (currentPageSpan) {
      currentPageSpan.textContent = currentPage;
    }

    buildPagination(currentPage, totalPages, query);
  }

  function buildPagination(currentPage, totalPages, query) {
    const paginationNav = document.querySelector('#search-pagination nav.pagination');
    if (!paginationNav) return;

    const groupNumber = Math.floor((currentPage - 1) / 10);
    const groupStart = groupNumber * 10 + 1;
    let groupEnd = groupStart + 9;
    if (groupEnd > totalPages) {
      groupEnd = totalPages;
    }

    const pagesContainer = paginationNav.querySelector('.pagination-pages');
    if (pagesContainer) {
      let pagesHtml = '';
      for (let i = groupStart; i <= groupEnd; i++) {
        if (i === currentPage) {
          pagesHtml += `<span class="pagination-page current" id="current-page">${i}</span>`;
        } else {
          pagesHtml += `<a href="/search/?q=${encodeURIComponent(query)}${i > 1 ? '&page=' + i : ''}#pagination-anchor" class="pagination-page pagination-link">${i}</a>`;
        }
      }
      pagesContainer.innerHTML = pagesHtml;
    }
  }
});
