// NusaStat data — Indonesia, 2024 unless stated otherwise.
// Figures are rounded estimates compiled from BPS — Statistics Indonesia,
// Bank Indonesia and World Bank publications; see the Sources page for the
// basis of each indicator. Provincial figures are rounded BPS estimates.

export const COUNTRY = {
  name: 'Indonesia',
  capital: 'Jakarta (Nusantara from 2028)',
  areaKm2: 1904569,
  islands: 17508,
  provinces: 38,
  currency: 'Indonesian rupiah (IDR)',
  language: 'Bahasa Indonesia',
  updated: '26 November 2026',
};

// Each indicator carries its value, year, source and a 2015–2024 series.
export const INDICATORS = [
  {
    slug: 'population', title: 'Total population', category: 'Population',
    unit: 'million people', value: 283.5, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '+0.9% on 2023', changeDir: 'up',
    note: 'Mid-year estimate. Indonesia is the world’s fourth most populous country.',
    series: [2015, 255.5, 2016, 258.7, 2017, 261.9, 2018, 265.0, 2019, 268.1,
             2020, 271.1, 2021, 274.2, 2022, 277.4, 2023, 280.5, 2024, 283.5],
  },
  {
    slug: 'gdp', title: 'Gross domestic product', category: 'Economy',
    unit: 'US$ billion', value: 1396, year: 2024, source: 'World Bank, World Development Indicators',
    change: '+5.0% real growth', changeDir: 'up',
    note: 'Nominal GDP in current US dollars; the largest economy in Southeast Asia.',
    series: [2015, 861, 2016, 932, 2017, 1016, 2018, 1042, 2019, 1119,
             2020, 1059, 2021, 1186, 2022, 1319, 2023, 1371, 2024, 1396],
  },
  {
    slug: 'gdp-per-capita', title: 'GDP per capita', category: 'Economy',
    unit: 'US$', value: 4925, year: 2024, source: 'World Bank, World Development Indicators',
    change: '+4.1% on 2023', changeDir: 'up',
    note: 'Nominal GDP divided by mid-year population.',
    series: [2015, 3370, 2016, 3603, 2017, 3887, 2018, 3944, 2019, 4196,
             2020, 3907, 2021, 4330, 2022, 4758, 2023, 4889, 2024, 4925],
  },
  {
    slug: 'gdp-growth', title: 'Real GDP growth', category: 'Economy',
    unit: '% per year', value: 5.03, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '−0.03 pts on 2023', changeDir: 'down',
    note: 'Annual change in real GDP at constant 2010 prices.',
    series: [2015, 4.88, 2016, 5.03, 2017, 5.07, 2018, 5.17, 2019, 5.02,
             2020, -2.07, 2021, 3.70, 2022, 5.31, 2023, 5.06, 2024, 5.03],
  },
  {
    slug: 'inflation', title: 'Consumer price inflation', category: 'Economy',
    unit: '% per year', value: 1.57, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '−1.04 pts on 2023', changeDir: 'down',
    note: 'Annual change in the consumer price index, December on December.',
    series: [2015, 3.35, 2016, 3.02, 2017, 3.61, 2018, 3.13, 2019, 2.72,
             2020, 1.68, 2021, 1.87, 2022, 5.51, 2023, 2.61, 2024, 1.57],
  },
  {
    slug: 'unemployment', title: 'Open unemployment rate', category: 'Economy',
    unit: '% of labour force', value: 4.91, year: 2024, source: 'BPS — Sakernas, August 2024',
    change: '−0.41 pts on 2023', changeDir: 'down',
    note: 'Share of the labour force without work and available for work.',
    series: [2015, 6.18, 2016, 5.61, 2017, 5.50, 2018, 5.34, 2019, 5.28,
             2020, 7.07, 2021, 6.49, 2022, 5.86, 2023, 5.32, 2024, 4.91],
  },
  {
    slug: 'poverty', title: 'Poverty rate', category: 'Population',
    unit: '% of population', value: 9.03, year: 2024, source: 'BPS — Statistics Indonesia, September 2024',
    change: '−0.33 pts on 2023', changeDir: 'down',
    note: 'Share of people living below the national poverty line.',
    series: [2015, 11.22, 2016, 10.86, 2017, 10.64, 2018, 9.82, 2019, 9.41,
             2020, 9.78, 2021, 9.71, 2022, 9.57, 2023, 9.36, 2024, 9.03],
  },
  {
    slug: 'life-expectancy', title: 'Life expectancy at birth', category: 'Health',
    unit: 'years', value: 74.1, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '+0.4 years on 2023', changeDir: 'up',
    note: 'Average number of years a newborn is expected to live.',
    series: [2015, 71.1, 2016, 71.4, 2017, 71.7, 2018, 71.9, 2019, 72.2,
             2020, 72.4, 2021, 72.7, 2022, 73.2, 2023, 73.7, 2024, 74.1],
  },
  {
    slug: 'infant-mortality', title: 'Infant mortality rate', category: 'Health',
    unit: 'per 1,000 live births', value: 16.5, year: 2024, source: 'World Bank, World Development Indicators',
    change: '−0.7 on 2023', changeDir: 'down',
    note: 'Deaths of infants under one year per 1,000 live births.',
    series: [2015, 22.9, 2016, 22.1, 2017, 21.3, 2018, 20.6, 2019, 19.9,
             2020, 19.2, 2021, 18.5, 2022, 17.9, 2023, 17.2, 2024, 16.5],
  },
  {
    slug: 'literacy', title: 'Adult literacy rate', category: 'Education',
    unit: '% of people aged 15+', value: 96.0, year: 2023, source: 'BPS — Statistics Indonesia',
    change: '+0.1 pts on 2022', changeDir: 'up',
    note: 'Share of people aged 15 and over who can read and write.',
    series: [2015, 95.2, 2016, 95.4, 2017, 95.6, 2018, 95.8, 2019, 95.9,
             2020, 96.0, 2021, 96.0, 2022, 95.9, 2023, 96.0],
  },
  {
    slug: 'mean-schooling', title: 'Mean years of schooling', category: 'Education',
    unit: 'years', value: 9.1, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '+0.1 years on 2023', changeDir: 'up',
    note: 'Average years of formal schooling completed by people aged 25 and over.',
    series: [2015, 8.2, 2016, 8.4, 2017, 8.5, 2018, 8.6, 2019, 8.8,
             2020, 8.9, 2021, 8.9, 2022, 9.0, 2023, 9.0, 2024, 9.1],
  },
  {
    slug: 'gini', title: 'Gini ratio', category: 'Economy',
    unit: 'index (0–1)', value: 0.379, year: 2024, source: 'BPS — Statistics Indonesia, September 2024',
    change: '−0.008 on 2023', changeDir: 'down',
    note: 'Measure of income inequality; 0 is perfect equality, 1 is maximum inequality.',
    series: [2015, 0.402, 2016, 0.394, 2017, 0.391, 2018, 0.384, 2019, 0.380,
             2020, 0.381, 2021, 0.381, 2022, 0.381, 2023, 0.387, 2024, 0.379],
  },
  {
    slug: 'exports', title: 'Exports of goods', category: 'Economy',
    unit: 'US$ billion', value: 264.7, year: 2024, source: 'BPS — Statistics Indonesia',
    change: '+2.3% on 2023', changeDir: 'up',
    note: 'Free on board value of exported goods; coal, palm oil and nickel lead.',
    series: [2015, 150.4, 2016, 145.2, 2017, 168.8, 2018, 180.2, 2019, 167.7,
             2020, 163.2, 2021, 231.6, 2022, 291.9, 2023, 258.8, 2024, 264.7],
  },
  {
    slug: 'urban-share', title: 'Urban population share', category: 'Population',
    unit: '% of population', value: 58.6, year: 2024, source: 'World Bank, World Development Indicators',
    change: '+0.5 pts on 2023', changeDir: 'up',
    note: 'Share of the population living in urban areas.',
    series: [2015, 54.0, 2016, 54.6, 2017, 55.2, 2018, 55.8, 2019, 56.4,
             2020, 56.9, 2021, 57.3, 2022, 57.8, 2023, 58.1, 2024, 58.6],
  },
];

// GDP by sector, share of GDP, 2024 (%).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.9 },
  { name: 'Wholesale & retail trade', share: 12.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Construction', share: 9.9 },
  { name: 'Mining & quarrying', share: 8.4 },
  { name: 'Transport & storage', share: 5.5 },
  { name: 'Information & communication', share: 4.4 },
  { name: 'Financial services', share: 4.1 },
  { name: 'Other services', share: 23.4 },
];

// Age structure, 2024 (% of population).
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 24.5 },
  { group: '15–64 years', share: 68.7 },
  { group: '65+ years', share: 6.8 },
];

// All 38 provinces. Population is the 2024 mid-year estimate (millions);
// area in km²; poverty and life expectancy are 2024 BPS estimates;
// grdpPc is GRDP per capita in million rupiah, 2024.
export const PROVINCES = [
  { slug: 'aceh', name: 'Aceh', island: 'Sumatra', pop: 5.55, area: 57956, poverty: 14.2, life: 71.3, grdpPc: 52 },
  { slug: 'sumatera-utara', name: 'Sumatera Utara', island: 'Sumatra', pop: 16.03, area: 72981, poverty: 8.3, life: 72.4, grdpPc: 58 },
  { slug: 'sumatera-barat', name: 'Sumatera Barat', island: 'Sumatra', pop: 5.76, area: 42013, poverty: 5.7, life: 73.1, grdpPc: 56 },
  { slug: 'riau', name: 'Riau', island: 'Sumatra', pop: 6.64, area: 87024, poverty: 6.7, life: 72.8, grdpPc: 178 },
  { slug: 'jambi', name: 'Jambi', island: 'Sumatra', pop: 3.61, area: 50058, poverty: 7.4, life: 72.2, grdpPc: 74 },
  { slug: 'sumatera-selatan', name: 'Sumatera Selatan', island: 'Sumatra', pop: 8.84, area: 91592, poverty: 11.8, life: 71.9, grdpPc: 68 },
  { slug: 'bengkulu', name: 'Bengkulu', island: 'Sumatra', pop: 2.04, area: 19919, poverty: 14.0, life: 71.2, grdpPc: 47 },
  { slug: 'lampung', name: 'Lampung', island: 'Sumatra', pop: 9.18, area: 34624, poverty: 10.7, life: 72.0, grdpPc: 48 },
  { slug: 'bangka-belitung', name: 'Kep. Bangka Belitung', island: 'Sumatra', pop: 1.49, area: 16424, poverty: 4.4, life: 72.6, grdpPc: 72 },
  { slug: 'kepulauan-riau', name: 'Kepulauan Riau', island: 'Sumatra', pop: 2.18, area: 8202, poverty: 5.1, life: 73.4, grdpPc: 162 },
  { slug: 'dki-jakarta', name: 'DKI Jakarta', island: 'Java', pop: 10.56, area: 664, poverty: 4.3, life: 75.9, grdpPc: 282 },
  { slug: 'jawa-barat', name: 'Jawa Barat', island: 'Java', pop: 49.94, area: 35378, poverty: 7.5, life: 74.2, grdpPc: 55 },
  { slug: 'jawa-tengah', name: 'Jawa Tengah', island: 'Java', pop: 37.89, area: 32801, poverty: 10.5, life: 75.0, grdpPc: 48 },
  { slug: 'di-yogyakarta', name: 'DI Yogyakarta', island: 'Java', pop: 3.76, area: 3133, poverty: 11.1, life: 75.6, grdpPc: 44 },
  { slug: 'jawa-timur', name: 'Jawa Timur', island: 'Java', pop: 41.81, area: 47803, poverty: 9.8, life: 74.5, grdpPc: 74 },
  { slug: 'banten', name: 'Banten', island: 'Java', pop: 12.43, area: 9663, poverty: 5.6, life: 73.6, grdpPc: 62 },
  { slug: 'bali', name: 'Bali', island: 'Lesser Sunda', pop: 4.41, area: 5780, poverty: 4.0, life: 74.9, grdpPc: 61 },
  { slug: 'nusa-tenggara-barat', name: 'Nusa Tenggara Barat', island: 'Lesser Sunda', pop: 5.62, area: 18572, poverty: 12.7, life: 71.4, grdpPc: 38 },
  { slug: 'nusa-tenggara-timur', name: 'Nusa Tenggara Timur', island: 'Lesser Sunda', pop: 5.66, area: 47931, poverty: 19.0, life: 69.2, grdpPc: 27 },
  { slug: 'kalimantan-barat', name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.80, area: 147307, poverty: 6.9, life: 72.1, grdpPc: 58 },
  { slug: 'kalimantan-tengah', name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2.75, area: 153564, poverty: 5.2, life: 72.4, grdpPc: 71 },
  { slug: 'kalimantan-selatan', name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4.23, area: 38744, poverty: 4.3, life: 73.0, grdpPc: 76 },
  { slug: 'kalimantan-timur', name: 'Kalimantan Timur', island: 'Kalimantan', pop: 3.93, area: 129067, poverty: 6.1, life: 74.0, grdpPc: 232 },
  { slug: 'kalimantan-utara', name: 'Kalimantan Utara', island: 'Kalimantan', pop: 0.73, area: 75467, poverty: 6.5, life: 73.2, grdpPc: 148 },
  { slug: 'sulawesi-utara', name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2.73, area: 13892, poverty: 7.2, life: 72.9, grdpPc: 66 },
  { slug: 'sulawesi-tengah', name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3.10, area: 61841, poverty: 11.9, life: 71.5, grdpPc: 78 },
  { slug: 'sulawesi-selatan', name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.30, area: 46717, poverty: 8.3, life: 73.4, grdpPc: 64 },
  { slug: 'sulawesi-tenggara', name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2.78, area: 38068, poverty: 10.9, life: 71.8, grdpPc: 62 },
  { slug: 'gorontalo', name: 'Gorontalo', island: 'Sulawesi', pop: 1.24, area: 11257, poverty: 15.0, life: 70.8, grdpPc: 41 },
  { slug: 'sulawesi-barat', name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1.57, area: 16787, poverty: 11.2, life: 70.9, grdpPc: 46 },
  { slug: 'maluku', name: 'Maluku', island: 'Maluku', pop: 1.98, area: 46914, poverty: 16.6, life: 69.8, grdpPc: 40 },
  { slug: 'maluku-utara', name: 'Maluku Utara', island: 'Maluku', pop: 1.37, area: 31983, poverty: 6.3, life: 70.6, grdpPc: 58 },
  { slug: 'papua-barat', name: 'Papua Barat', island: 'Papua', pop: 0.56, area: 99671, poverty: 20.4, life: 68.9, grdpPc: 118 },
  { slug: 'papua-barat-daya', name: 'Papua Barat Daya', island: 'Papua', pop: 0.61, area: 39167, poverty: 21.2, life: 68.4, grdpPc: 96 },
  { slug: 'papua', name: 'Papua', island: 'Papua', pop: 1.06, area: 82680, poverty: 21.4, life: 68.1, grdpPc: 88 },
  { slug: 'papua-pegunungan', name: 'Papua Pegunungan', island: 'Papua', pop: 1.47, area: 51213, poverty: 33.1, life: 67.2, grdpPc: 22 },
  { slug: 'papua-tengah', name: 'Papua Tengah', island: 'Papua', pop: 1.36, area: 66130, poverty: 29.4, life: 67.6, grdpPc: 34 },
  { slug: 'papua-selatan', name: 'Papua Selatan', island: 'Papua', pop: 0.54, area: 127280, poverty: 21.0, life: 68.0, grdpPc: 52 },
];

// Latest statistical releases, newest first.
export const RELEASES = [
  { date: '25 Nov 2026', title: 'Consumer Price Index, November 2026', detail: 'Monthly inflation 0.18%; annual inflation 1.55%. Food prices drove the monthly rise.' },
  { date: '14 Nov 2026', title: 'Labour Force Situation, August 2026', detail: 'Open unemployment 4.83%; 142.8 million people in work, 61% of them in informal jobs.' },
  { date: '05 Nov 2026', title: 'Economic Growth, Q3 2026', detail: 'Real GDP grew 5.11% year on year; household consumption up 5.0%, investment up 5.9%.' },
  { date: '21 Oct 2026', title: 'Poverty Profile, March 2026', detail: 'Poverty rate 8.91%; the poverty line is Rp 621,000 per person per month.' },
  { date: '02 Oct 2026', title: 'Population Projection 2025–2045', detail: 'Population peaks near 324 million in the 2040s; the working-age share stays above 68% until 2035.' },
  { date: '15 Sep 2026', title: 'Human Development Index 2025', detail: 'HDI 74.9, up 0.6 points; education and health both improved in every province.' },
];

export function indicator(slug) {
  return INDICATORS.find((i) => i.slug === slug);
}

export function province(slug) {
  return PROVINCES.find((p) => p.slug === slug);
}

// Turn a flat [year, value, year, value, …] array into {year, value} pairs.
export function seriesPairs(ind) {
  const out = [];
  for (let i = 0; i < ind.series.length; i += 2) {
    out.push({ year: ind.series[i], value: ind.series[i + 1] });
  }
  return out;
}

export function fmt(value, decimals = 1) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
