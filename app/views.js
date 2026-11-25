// views.js — every page of NusaStat, rendered from data.js into #app.
// Charts come from charts.js; all figures carry a source and a year.

import { AGE_STRUCTURE, COUNTRY, INDICATORS, PROVINCES, RELEASES, SECTORS, fmt, indicator, province, seriesPairs } from './data.js';
import { barChart, donutChart, donutLegend, lineChart } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function kpiCard(ind, extra = '') {
  return `<a class="kpi" href="#/indicator/${ind.slug}">
    <div class="kpi-label">${esc(ind.title)}</div>
    <div class="kpi-value">${fmt(ind.value, ind.slug === 'gini' ? 3 : ind.value < 10 ? 2 : ind.value < 100 ? 1 : 0)} <span class="kpi-unit">${esc(ind.unit)}</span></div>
    <div class="kpi-change ${ind.changeDir === 'up' ? 'up' : 'down'}">${esc(ind.change)}</div>
    <div class="kpi-source">${esc(ind.source)}, ${ind.year}${extra}</div>
  </a>`;
}

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function indicatorList(category) {
  const items = INDICATORS.filter((i) => i.category === category);
  return `<div class="ind-list">${items.map((i) => `<a class="ind-item" href="#/indicator/${i.slug}">
    <span><span class="ind-name">${esc(i.title)}</span><br><span class="ind-year">${esc(i.source)}, ${i.year}</span></span>
    <span class="ind-value">${fmt(i.value, i.slug === 'gini' ? 3 : i.value < 10 ? 2 : i.value < 100 ? 1 : 0)} ${esc(i.unit)}</span>
  </a>`).join('')}</div>`;
}

function releasesHtml() {
  return RELEASES.map((r) => `<div class="release">
    <div class="date">${esc(r.date)}</div>
    <div><h4>${esc(r.title)}</h4><p>${esc(r.detail)}</p></div>
  </div>`).join('');
}

// ---------- home ----------

export function home() {
  const pop = indicator('population');
  const gdp = indicator('gdp');
  const poverty = indicator('poverty');
  const life = indicator('life-expectancy');
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `
  <section class="hero">
    <h1>Indonesia in numbers</h1>
    <p class="lede">Population, economy, health and education for the world’s fourth most populous
    country — 283.5 million people across 38 provinces and 17,508 islands. Every figure below
    carries its source and its year.</p>
    <div class="kpis">
      ${kpiCard(pop)}${kpiCard(gdp)}${kpiCard(poverty)}${kpiCard(life)}
    </div>
  </section>

  <section class="section">
    <div class="grid2">
      <div class="chart-wrap">
        <h3>Population, 2015–2024</h3>
        ${lineChart(seriesPairs(pop), { label: 'Population of Indonesia 2015 to 2024' })}
        <p class="chart-note">Million people, mid-year estimates. Growth has slowed from 1.3% a year in 2015 to 0.9% in 2024.</p>
        ${sourceLine('BPS — Statistics Indonesia, 2024')}
      </div>
      <div class="chart-wrap">
        <h3>What the economy makes</h3>
        <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
          ${donutChart(SECTORS.map((s) => ({ value: s.share })), { centre: 'US$1.4tn', centreLabel: 'GDP, 2024' })}
          <div style="flex:1;min-width:180px">${donutLegend(SECTORS.map((s) => ({ name: s.name, display: s.share + '% of GDP' })))}</div>
        </div>
        <p class="chart-note">Share of GDP by sector, 2024. Manufacturing is the largest single sector; services together are more than half.</p>
        ${sourceLine('BPS — Statistics Indonesia, 2024')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Biggest provinces</h2><a class="more" href="#/provinces">All 38 provinces →</a></div>
    <div class="chart-wrap">
      <h3>Population by province, 2024</h3>
      ${barChart(top5.map((p) => ({ label: p.name, value: p.pop, display: fmt(p.pop, 2) + 'm' })), { label: 'Largest provinces by population' })}
      <p class="chart-note">More than half of all Indonesians live on Java: Jawa Barat alone has 49.9 million people.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </section>

  <section class="section">
    <div class="grid2">
      <div class="card">
        <h3>Explore by topic</h3>
        <div class="chip-row">
          <a class="chip" href="#/population">👥 Population</a>
          <a class="chip" href="#/economy">📈 Economy</a>
          <a class="chip" href="#/health">❤ Health</a>
          <a class="chip" href="#/education">🎓 Education</a>
          <a class="chip" href="#/provinces">🗺 Provinces</a>
          <a class="chip" href="#/about">📚 Sources &amp; methods</a>
        </div>
        <h3 style="margin-top:22px">At a glance</h3>
        <dl class="deflist">
          <dt>Capital</dt><dd>${esc(COUNTRY.capital)}</dd>
          <dt>Land area</dt><dd>${COUNTRY.areaKm2.toLocaleString('en-US')} km² — the world’s largest archipelago</dd>
          <dt>Currency</dt><dd>${esc(COUNTRY.currency)}</dd>
          <dt>Official language</dt><dd>${esc(COUNTRY.language)}</dd>
        </dl>
      </div>
      <div class="card">
        <h3>Latest releases</h3>
        ${releasesHtml()}
        <p class="source">Releases as published by BPS — Statistics Indonesia.</p>
      </div>
    </div>
  </section>`;
}

// ---------- topic pages ----------

function topicHead(crumb, title, lede) {
  return `<div class="pagehead"><p class="crumb"><a href="#/">NusaStat</a> / ${esc(crumb)}</p>
  <h1>${esc(title)}</h1><p>${lede}</p></div>`;
}

export function populationPage() {
  const pop = indicator('population');
  const urban = indicator('urban-share');
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `${topicHead('Population', 'Population', 'Who lives in Indonesia, where they live, and how the population is changing.')}
  <div class="kpis">${kpiCard(pop)}${kpiCard(urban)}${kpiCard(indicator('poverty'))}</div>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>Population growth, 2015–2024</h3>
      ${lineChart(seriesPairs(pop), { label: 'Population 2015 to 2024' })}
      <p class="chart-note">Million people. The population grows by about 2.5 million people a year.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
    <div class="chart-wrap"><h3>Age structure, 2024</h3>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
        ${donutChart(AGE_STRUCTURE.map((a) => ({ value: a.share })), { centre: '68.7%', centreLabel: 'working age (15–64)' })}
        <div style="flex:1;min-width:180px">${donutLegend(AGE_STRUCTURE.map((a) => ({ name: a.group, display: a.share + '%' })))}</div>
      </div>
      <p class="chart-note">Indonesia’s demographic dividend: more than two in three people are of working age.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </div></section>
  <section class="section">
    <div class="section-head"><h2>Ten largest provinces</h2><a class="more" href="#/provinces">Full table of 38 →</a></div>
    <div class="chart-wrap"><h3>Population by province, 2024</h3>
      ${barChart(sorted.map((p) => ({ label: p.name, value: p.pop, display: fmt(p.pop, 2) + 'm' })), { label: 'Ten largest provinces by population' })}
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </section>
  <section class="section"><h2>All population indicators</h2>${indicatorList('Population')}</section>`;
}

export function economyPage() {
  const gdp = indicator('gdp');
  const growth = indicator('gdp-growth');
  const exports = indicator('exports');
  return `${topicHead('Economy', 'Economy', 'Output, prices, jobs, trade and inequality — the shape of a US$1.4 trillion economy.')}
  <div class="kpis">${kpiCard(gdp)}${kpiCard(growth)}${kpiCard(indicator('inflation'))}${kpiCard(indicator('unemployment'))}</div>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>GDP, 2015–2024</h3>
      ${lineChart(seriesPairs(gdp), { label: 'GDP 2015 to 2024' })}
      <p class="chart-note">Nominal GDP in US$ billion. The 2020 dip is the pandemic recession; growth has been near 5% a year since.</p>
      ${sourceLine('World Bank, World Development Indicators, 2024')}
    </div>
    <div class="chart-wrap"><h3>Exports of goods, 2015–2024</h3>
      ${lineChart(seriesPairs(exports), { color: '#e8a020', label: 'Exports 2015 to 2024' })}
      <p class="chart-note">US$ billion, free on board. The 2022 peak came from high coal and palm-oil prices.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </div></section>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>Real GDP growth, 2015–2024</h3>
      ${lineChart(seriesPairs(growth), { label: 'Real GDP growth 2015 to 2024' })}
      <p class="chart-note">Percent per year at constant prices. Indonesia has grown at about 5% a year for a decade, outside the pandemic year.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
    <div class="chart-wrap"><h3>What the economy makes</h3>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
        ${donutChart(SECTORS.map((s) => ({ value: s.share })), { centre: 'US$1.4tn', centreLabel: 'GDP, 2024' })}
        <div style="flex:1;min-width:180px">${donutLegend(SECTORS.map((s) => ({ name: s.name, display: s.share + '% of GDP' })))}</div>
      </div>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </div></section>
  <section class="section"><h2>All economy indicators</h2>${indicatorList('Economy')}</section>`;
}

export function healthPage() {
  const life = indicator('life-expectancy');
  const infant = indicator('infant-mortality');
  return `${topicHead('Health', 'Health', 'How long Indonesians live, and how the youngest fare.')}
  <div class="kpis">${kpiCard(life)}${kpiCard(infant)}</div>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>Life expectancy at birth, 2015–2024</h3>
      ${lineChart(seriesPairs(life), { label: 'Life expectancy 2015 to 2024' })}
      <p class="chart-note">Years. Life expectancy has risen by three years in a decade; women live about four years longer than men.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
    <div class="chart-wrap"><h3>Infant mortality, 2015–2024</h3>
      ${lineChart(seriesPairs(infant), { color: '#b23b2e', label: 'Infant mortality 2015 to 2024' })}
      <p class="chart-note">Deaths under one year per 1,000 live births. The rate has fallen by more than a quarter since 2015.</p>
      ${sourceLine('World Bank, World Development Indicators, 2024')}
    </div>
  </div></section>
  <section class="section"><div class="card">
    <h3>Health in the provinces</h3>
    <p>Life expectancy ranges from <b>75.9 years in DKI Jakarta</b> to <b>67.2 years in Papua Pegunungan</b> —
    a gap of nearly nine years inside one country. The provinces with the shortest lives are also the ones
    with the highest poverty rates; closing that gap is the central challenge of Indonesian health policy.</p>
    <p><a href="#/provinces">Compare all 38 provinces →</a></p>
  </div></section>
  <section class="section"><h2>All health indicators</h2>${indicatorList('Health')}</section>`;
}

export function educationPage() {
  const lit = indicator('literacy');
  const school = indicator('mean-schooling');
  return `${topicHead('Education', 'Education', 'Reading, writing and years in school — the skills base of 283 million people.')}
  <div class="kpis">${kpiCard(lit)}${kpiCard(school)}</div>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>Adult literacy, 2015–2023</h3>
      ${lineChart(seriesPairs(lit), { label: 'Adult literacy 2015 to 2023' })}
      <p class="chart-note">Percent of people aged 15 and over who can read and write. Literacy is now near-universal among the young; the remaining gap is among older Indonesians.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2023')}
    </div>
    <div class="chart-wrap"><h3>Mean years of schooling, 2015–2024</h3>
      ${lineChart(seriesPairs(school), { label: 'Mean years of schooling 2015 to 2024' })}
      <p class="chart-note">Years of formal schooling completed by people aged 25 and over. The national average is still below the 12 years of compulsory schooling.</p>
      ${sourceLine('BPS — Statistics Indonesia, 2024')}
    </div>
  </div></section>
  <section class="section"><div class="card">
    <h3>Schooling across the country</h3>
    <p>Mean years of schooling run from about <b>11.5 years in DKI Jakarta</b> to under <b>7 years in Papua Pegunungan</b>.
    Net enrolment is 99% at primary level, 96% at junior secondary and 82% at senior secondary — the drop-off
    after junior school is where most students leave education.</p>
    <p><a href="#/provinces">Compare all 38 provinces →</a></p>
  </div></section>
  <section class="section"><h2>All education indicators</h2>${indicatorList('Education')}</section>`;
}

// ---------- provinces ----------

export const provinceTableState = { query: '', sort: 'pop', dir: -1, island: 'all' };

function density(p) {
  return (p.pop * 1e6) / p.area;
}

function provinceRows() {
  const { query, sort, dir, island } = provinceTableState;
  let rows = [...PROVINCES];
  if (island !== 'all') rows = rows.filter((p) => p.island === island);
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  }
  const key = {
    name: (p) => p.name, pop: (p) => p.pop, area: (p) => p.area,
    density: (p) => density(p), poverty: (p) => p.poverty, life: (p) => p.life, grdpPc: (p) => p.grdpPc,
  }[sort];
  rows.sort((a, b) => {
    const va = key(a); const vb = key(b);
    return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
  });
  return rows;
}

export function provinceTableBody() {
  const rows = provinceRows();
  if (!rows.length) return '<tr><td colspan="7">No province matches that search.</td></tr>';
  return rows.map((p) => `<tr>
    <td><a href="#/province/${p.slug}">${esc(p.name)}</a></td>
    <td>${esc(p.island)}</td>
    <td class="num">${fmt(p.pop, 2)}</td>
    <td class="num">${Math.round(density(p)).toLocaleString('en-US')}</td>
    <td class="num"><span class="bar-cell"><span class="bar-track"><span class="bar-fill" style="width:${Math.min((p.poverty / 35) * 100, 100)}%"></span></span>${fmt(p.poverty, 1)}%</span></td>
    <td class="num">${fmt(p.life, 1)}</td>
    <td class="num">${p.grdpPc}</td>
  </tr>`).join('');
}

export function provincesPage() {
  const islands = [...new Set(PROVINCES.map((p) => p.island))];
  return `${topicHead('Provinces', 'All 38 provinces', 'Every province of Indonesia, side by side. Search by name or island, and click any column heading to sort.')}
  <div class="table-tools">
    <input type="search" id="prov-search" placeholder="Search provinces…" value="${esc(provinceTableState.query)}" aria-label="Search provinces">
    <select id="prov-island" aria-label="Filter by island">
      <option value="all">All islands</option>
      ${islands.map((i) => `<option value="${esc(i)}"${provinceTableState.island === i ? ' selected' : ''}>${esc(i)}</option>`).join('')}
    </select>
    <span class="count" id="prov-count"></span>
  </div>
  <div class="table-scroll"><table class="data" id="prov-table">
    <thead><tr>
      <th><button data-sort="name">Province ↕</button></th>
      <th><button data-sort="name">Island</button></th>
      <th class="num"><button data-sort="pop">Population (m) ↕</button></th>
      <th class="num"><button data-sort="density">Density /km² ↕</button></th>
      <th class="num"><button data-sort="poverty">Poverty % ↕</button></th>
      <th class="num"><button data-sort="life">Life expectancy ↕</button></th>
      <th class="num"><button data-sort="grdpPc">GRDP /capita (Rp m) ↕</button></th>
    </tr></thead>
    <tbody id="prov-tbody">${provinceTableBody()}</tbody>
  </table></div>
  <p class="source">Population: 2024 mid-year estimates. Poverty and life expectancy: BPS 2024. GRDP per capita: BPS 2024, million rupiah. Density is people per km², computed from population and area.</p>
  <section class="section"><div class="grid2">
    <div class="card"><h3>Java dominates</h3>
      <p>Java holds <b>56% of the population on 7% of the land</b>. DKI Jakarta’s density is about
      15,900 people per km²; Papua Selatan’s is 4. That imbalance shapes everything from transport
      spending to where new universities are built.</p></div>
    <div class="card"><h3>The east lags</h3>
      <p>Poverty in Papua Pegunungan (33.1%) is more than seven times the rate in Bali (4.0%).
      Life expectancy and GRDP per capita follow the same pattern — the east is where the next
      decade of development spending is aimed.</p></div>
  </div></section>`;
}

export function provincePage(slug) {
  const p = province(slug);
  if (!p) return notFound();
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === slug) + 1;
  const share = (p.pop / 283.5) * 100;
  const nat = { poverty: 9.03, life: 74.1, grdpPc: 75 };
  return `${topicHead('Provinces', p.name, `${p.island} · ranked #${rank} of 38 provinces by population · ${fmt(share, 1)}% of Indonesia’s people live here.`)}
  <div class="statline">
    <div class="stat"><b>${fmt(p.pop, 2)}m</b><span>Population, 2024</span></div>
    <div class="stat"><b>${Math.round(density(p)).toLocaleString('en-US')}</b><span>People per km²</span></div>
    <div class="stat"><b>${p.area.toLocaleString('en-US')} km²</b><span>Land area</span></div>
    <div class="stat"><b>${fmt(p.poverty, 1)}%</b><span>Poverty rate (national 9.0%)</span></div>
    <div class="stat"><b>${fmt(p.life, 1)} yrs</b><span>Life expectancy (national 74.1)</span></div>
    <div class="stat"><b>Rp ${p.grdpPc}m</b><span>GRDP per capita (national ~Rp 75m)</span></div>
  </div>
  <section class="section"><div class="grid2">
    <div class="chart-wrap"><h3>How ${esc(p.name)} compares</h3>
      ${barChart([
        { label: 'Poverty, ' + p.name, value: p.poverty, display: fmt(p.poverty, 1) + '%' },
        { label: 'Poverty, national', value: nat.poverty, display: '9.0%', color: '#9db8b3' },
        { label: 'Life expectancy, ' + p.name, value: p.life, display: fmt(p.life, 1) + ' yrs' },
        { label: 'Life expectancy, national', value: nat.life, display: '74.1 yrs', color: '#9db8b3' },
      ], { label: p.name + ' compared with the national average', labelWidth: 210 })}
      <p class="chart-note">Bars are on different scales (percent vs years) — read the labels, not the lengths, across the two pairs.</p>
    </div>
    <div class="card"><h3>About ${esc(p.name)}</h3>
      <p>${esc(p.name)} is a province of ${esc(p.island)} with ${fmt(p.pop, 2)} million people on
      ${p.area.toLocaleString('en-US')} km² — about ${fmt(share, 1)}% of Indonesia’s population.
      Its GRDP per capita of Rp ${p.grdpPc} million ${p.grdpPc >= nat.grdpPc ? 'is above' : 'is below'} the
      national average of about Rp 75 million.</p>
      <p>Life expectancy here is ${fmt(p.life, 1)} years, ${p.life >= nat.life ? 'above' : 'below'} the national
      74.1 years, and ${fmt(p.poverty, 1)}% of people live below the poverty line, against 9.0% nationally.</p>
      <p><a href="#/provinces">← Back to all provinces</a></p>
      ${sourceLine('BPS — Statistics Indonesia, 2024. Provincial figures are rounded estimates.')}
    </div>
  </div></section>`;
}

// ---------- indicator detail ----------

export function indicatorPage(slug) {
  const ind = indicator(slug);
  if (!ind) return notFound();
  const pairs = seriesPairs(ind);
  const first = pairs[0];
  const last = pairs[pairs.length - 1];
  const totalChange = (((last.value - first.value) / Math.abs(first.value)) * 100).toFixed(1);
  const related = INDICATORS.filter((i) => i.category === ind.category && i.slug !== slug).slice(0, 4);
  return `${topicHead(ind.category, ind.title, ind.note)}
  <div class="statline">
    <div class="stat"><b>${fmt(ind.value, ind.slug === 'gini' ? 3 : ind.value < 10 ? 2 : ind.value < 100 ? 1 : 0)} ${esc(ind.unit)}</b><span>Latest value, ${ind.year}</span></div>
    <div class="stat"><b>${esc(ind.change)}</b><span>Change on the previous year</span></div>
    <div class="stat"><b>${totalChange > 0 ? '+' : ''}${totalChange}%</b><span>Change since ${first.year}</span></div>
  </div>
  <section class="section"><div class="chart-wrap">
    <h3>${esc(ind.title)}, ${first.year}–${last.year}</h3>
    ${lineChart(pairs, { label: ind.title + ' ' + first.year + ' to ' + last.year })}
    ${sourceLine(`${ind.source}, ${ind.year}`)}
  </div></section>
  <section class="section"><div class="grid2">
    <div class="card"><h3>What this measures</h3><p>${esc(ind.note)}</p>
      <dl class="deflist">
        <dt>Source</dt><dd>${esc(ind.source)}</dd>
        <dt>Latest year</dt><dd>${ind.year}</dd>
        <dt>Unit</dt><dd>${esc(ind.unit)}</dd>
        <dt>Coverage</dt><dd>National, Indonesia — provincial breakdowns on the <a href="#/provinces">provinces page</a></dd>
      </dl></div>
    <div class="card"><h3>Related indicators</h3>
      ${related.map((r) => `<p><a href="#/indicator/${r.slug}">${esc(r.title)}</a> — <b>${fmt(r.value, r.slug === 'gini' ? 3 : r.value < 10 ? 2 : 1)} ${esc(r.unit)}</b> (${r.year})</p>`).join('')}
      <p><a href="#/about">How we compile these figures →</a></p></div>
  </div></section>`;
}

// ---------- search ----------

export function searchPage(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    return `${topicHead('Search', 'Search NusaStat', 'Type an indicator, a topic or a province in the search box above.')}
    <div class="empty"><h2>Try “population”, “GDP”, “Jakarta” or “literacy”.</h2></div>`;
  }
  const inds = INDICATORS.filter((i) => (i.title + ' ' + i.category + ' ' + i.note).toLowerCase().includes(q));
  const provs = PROVINCES.filter((p) => (p.name + ' ' + p.island).toLowerCase().includes(q));
  const topics = [
    { href: '#/population', name: 'Population', match: 'population people age urban density birth' },
    { href: '#/economy', name: 'Economy', match: 'economy gdp growth inflation unemployment trade exports poverty gini' },
    { href: '#/health', name: 'Health', match: 'health life expectancy mortality infant' },
    { href: '#/education', name: 'Education', match: 'education literacy school schooling' },
    { href: '#/provinces', name: 'Provinces', match: 'province provinces region island map' },
    { href: '#/about', name: 'Sources & methods', match: 'source method about data bps world bank' },
  ].filter((t) => (t.name + ' ' + t.match).includes(q));
  const total = inds.length + provs.length + topics.length;
  return `${topicHead('Search', `Results for “${esc(query.trim())}”`, `${total} result${total === 1 ? '' : 's'} found.`)}
  ${inds.length ? `<section class="section"><h2>Indicators</h2>${indicatorListAll(inds)}</section>` : ''}
  ${provs.length ? `<section class="section"><h2>Provinces</h2><div class="ind-list">${provs.map((p) => `<a class="ind-item" href="#/province/${p.slug}">
    <span><span class="ind-name">${esc(p.name)}</span><br><span class="ind-year">${esc(p.island)} · ${fmt(p.pop, 2)}m people</span></span>
    <span class="ind-value">Poverty ${fmt(p.poverty, 1)}%</span></a>`).join('')}</div></section>` : ''}
  ${topics.length ? `<section class="section"><h2>Pages</h2><div class="chip-row">${topics.map((t) => `<a class="chip" href="${t.href}">${esc(t.name)}</a>`).join('')}</div></section>` : ''}
  ${total === 0 ? `<div class="empty"><h2>Nothing matched “${esc(query.trim())}”.</h2><p>Try a topic like population, economy, health or education, or a province name.</p></div>` : ''}`;
}

function indicatorListAll(items) {
  return `<div class="ind-list">${items.map((i) => `<a class="ind-item" href="#/indicator/${i.slug}">
    <span><span class="ind-name">${esc(i.title)}</span><br><span class="ind-year">${esc(i.source)}, ${i.year}</span></span>
    <span class="ind-value">${fmt(i.value, i.slug === 'gini' ? 3 : i.value < 10 ? 2 : i.value < 100 ? 1 : 0)} ${esc(i.unit)}</span>
  </a>`).join('')}</div>`;
}

// ---------- sources ----------

export function aboutPage() {
  return `${topicHead('Sources', 'Sources & methods', 'Where every number on NusaStat comes from, and what has been rounded or estimated.')}
  <section class="section"><div class="card">
    <h3>Our sources</h3>
    <dl class="deflist">
      <dt>BPS — Statistics Indonesia</dt><dd>The national statistical office. Population estimates, GDP, inflation, unemployment, poverty, life expectancy, literacy and schooling, and all provincial figures.</dd>
      <dt>World Bank — World Development Indicators</dt><dd>GDP in US dollars, GDP per capita, infant mortality and the urban population share, used where a comparable international series is needed.</dd>
      <dt>Bank Indonesia</dt><dd>Balance of payments and trade context for the economy pages.</dd>
    </dl>
    <h3>How the figures are handled</h3>
    <ul>
      <li>Figures are shown rounded — populations to two decimals, rates to one or two — exactly as the source publications round them.</li>
      <li>Provincial figures are rounded estimates from BPS publications; small provinces are shown to two decimal places of millions, which is why totals may differ by 0.1 from the national figure.</li>
      <li>Series run 2015–2024 (literacy to 2023, the latest published year). Where a source revises history, we use the latest vintage.</li>
      <li>Nothing on this site is fetched from the internet: the data lives in the site’s own files, so it works offline.</li>
    </ul>
    <h3>Reuse</h3>
    <p>All figures on this site are free to reuse with attribution to the source named under each chart. The site’s own text, design and code are original work under the MIT licence.</p>
  </div></section>
  <section class="section"><h2>Every indicator and its source</h2>
    <div class="table-scroll"><table class="data"><thead><tr>
      <th>Indicator</th><th>Latest value</th><th>Year</th><th>Source</th>
    </tr></thead><tbody>
    ${INDICATORS.map((i) => `<tr><td><a href="#/indicator/${i.slug}">${esc(i.title)}</a></td>
      <td class="num">${fmt(i.value, i.slug === 'gini' ? 3 : i.value < 10 ? 2 : i.value < 100 ? 1 : 0)} ${esc(i.unit)}</td>
      <td class="num">${i.year}</td><td>${esc(i.source)}</td></tr>`).join('')}
    </tbody></table></div></section>`;
}

export function notFound() {
  return `<div class="pagehead"><h1>Page not found</h1>
  <p>That page does not exist on NusaStat. Try one of these instead.</p></div>
  <div class="chip-row">
    <a class="chip" href="#/">Overview</a>
    <a class="chip" href="#/population">Population</a>
    <a class="chip" href="#/economy">Economy</a>
    <a class="chip" href="#/provinces">Provinces</a>
  </div>`;
}
