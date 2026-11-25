// main.js — router for NusaStat. Hash routes, no network:
//
//   #/                     overview dashboard
//   #/population           population topic
//   #/economy              economy topic
//   #/health               health topic
//   #/education            education topic
//   #/provinces            searchable, sortable table of all 38 provinces
//   #/province/<slug>      one province
//   #/indicator/<slug>     one indicator, with its 2015–2024 series
//   #/search?q=<term>      search results
//   #/about                sources & methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  aboutPage, economyPage, educationPage, healthPage, home, indicatorPage,
  notFound, populationPage, provincePage, provinceTableBody, provinceTableState,
  provincesPage, searchPage,
} from './views.js';

const app = document.getElementById('app');
const topSearch = document.getElementById('topsearch');

const NAV = {
  '#/': 'home', '#/population': 'population', '#/economy': 'economy',
  '#/health': 'health', '#/education': 'education', '#/provinces': 'provinces',
  '#/about': 'about',
};

function setActiveNav(route) {
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === NAV[route]);
  });
}

function bindProvinceTable() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const tbody = document.getElementById('prov-tbody');
  const count = document.getElementById('prov-count');
  if (!search || !tbody) return;
  const refresh = () => {
    tbody.innerHTML = provinceTableBody();
    const rows = tbody.querySelectorAll('tr').length;
    count.textContent = rows === 1 && tbody.textContent.includes('No province')
      ? '0 of 38 provinces'
      : `${rows} of 38 provinces`;
  };
  search.addEventListener('input', () => { provinceTableState.query = search.value; refresh(); });
  island.addEventListener('change', () => { provinceTableState.island = island.value; refresh(); });
  document.querySelectorAll('#prov-table th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (provinceTableState.sort === key) {
        provinceTableState.dir = -provinceTableState.dir;
      } else {
        provinceTableState.sort = key;
        provinceTableState.dir = key === 'name' ? 1 : -1;
      }
      refresh();
    });
  });
  refresh();
}

function route() {
  const hash = location.hash || '#/';
  const [path, queryString] = hash.slice(1).split('?');
  const params = new URLSearchParams(queryString || '');
  let html;
  let title = 'NusaStat — National Statistics of Indonesia';

  const provinceMatch = path.match(/^\/province\/([^/]+)$/);
  const indicatorMatch = path.match(/^\/indicator\/([^/]+)$/);

  if (path === '/' || path === '') {
    html = home();
  } else if (path === '/population') {
    html = populationPage(); title = 'Population | NusaStat';
  } else if (path === '/economy') {
    html = economyPage(); title = 'Economy | NusaStat';
  } else if (path === '/health') {
    html = healthPage(); title = 'Health | NusaStat';
  } else if (path === '/education') {
    html = educationPage(); title = 'Education | NusaStat';
  } else if (path === '/provinces') {
    html = provincesPage(); title = 'All 38 provinces | NusaStat';
  } else if (provinceMatch) {
    html = provincePage(decodeURIComponent(provinceMatch[1]));
    title = 'Province | NusaStat';
  } else if (indicatorMatch) {
    html = indicatorPage(decodeURIComponent(indicatorMatch[1]));
    title = 'Indicator | NusaStat';
  } else if (path === '/search') {
    html = searchPage(params.get('q') || '');
    title = 'Search | NusaStat';
  } else if (path === '/about') {
    html = aboutPage(); title = 'Sources & methods | NusaStat';
  } else {
    html = notFound(); title = 'Not found | NusaStat';
  }

  document.title = title;
  setActiveNav(path);
  app.innerHTML = html;
  if (path === '/provinces') bindProvinceTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

topSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const q = document.getElementById('q').value.trim();
  location.hash = '#/search?q=' + encodeURIComponent(q);
});

window.addEventListener('hashchange', () => {
  window.__shotReady = false;
  route();
});

route();
