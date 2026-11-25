// charts.js — small SVG chart builders. No library, no network: every chart is
// drawn from the data in data.js into an inline <svg>.

const TEAL = '#0c5c56';
const TEAL_LIGHT = '#3d8a83';
const AMBER = '#e8a020';
const GRID = '#e3e9e7';
const MUTED = '#5b6b68';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Nice round axis steps for a data range.
function axisTicks(min, max, count = 4) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US');
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2).replace(/0$/, '');
}

// A line chart with labelled axes and a dot on the last point.
// points: [{year, value}], width/height in px (viewBox).
export function lineChart(points, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 260;
  const padL = 52, padR = 14, padT = 14, padB = 30;
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const { lo, hi, ticks } = axisTicks(min, max);
  const x = (i) => padL + (i * (w - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (h - padT - padB);
  let s = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${path} L${x(points.length - 1).toFixed(1)},${h - padB} L${x(0).toFixed(1)},${h - padB} Z" fill="${TEAL}" fill-opacity="0.07" stroke="none"/>`;
  s += `<path d="${path}" fill="none" stroke="${opts.color || TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    if (i % 2 === 0 || i === points.length - 1) {
      s += `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`;
    }
  });
  const last = points[points.length - 1];
  s += `<circle cx="${x(points.length - 1)}" cy="${y(last.value)}" r="4.5" fill="${opts.color || TEAL}" stroke="#fff" stroke-width="1.5"/>`;
  s += `<text x="${x(points.length - 1) - 6}" y="${y(last.value) - 10}" text-anchor="end" font-size="12" font-weight="700" fill="${TEAL}">${fmtTick(last.value)}</text>`;
  s += '</svg>';
  return s;
}

// Horizontal bars: [{label, value, display}], sorted largest first by the caller.
export function barChart(rows, opts = {}) {
  const w = opts.width || 640;
  const rowH = 30;
  const h = Math.max(60, rows.length * rowH + 14);
  const max = Math.max(...rows.map((r) => r.value), 1);
  const labelW = opts.labelWidth || 170;
  let s = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - 70) * r.value) / max;
    s += `<text x="0" y="${y + 13}" font-size="12.5" fill="#1c2422">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y}" width="${Math.max(bw, 2)}" height="18" rx="4" fill="${r.color || TEAL}"/>`;
    s += `<text x="${labelW + Math.max(bw, 2) + 7}" y="${y + 13}" font-size="12.5" font-weight="700" fill="${TEAL}">${esc(r.display ?? fmtTick(r.value))}</text>`;
  });
  s += '</svg>';
  return s;
}

// Donut chart with a centre label and a matching HTML legend beside it.
export function donutChart(rows, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const stroke = 34;
  const total = rows.reduce((a, b) => a + b.value, 0) || 1;
  const colors = ['#0c5c56', '#e8a020', '#3d8a83', '#7fb069', '#c97b2d', '#5b7fa6', '#8e6fb8', '#b23b2e', '#9db8b3'];
  const circ = 2 * Math.PI * r;
  let offset = 0;
  let s = `<svg class="chart" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="${esc(opts.label || 'Donut chart')}">`;
  rows.forEach((row, i) => {
    const frac = row.value / total;
    const len = Math.max(frac * circ - 2, 0);
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${stroke}" stroke-dasharray="${len.toFixed(1)} ${circ.toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += frac * circ;
  });
  s += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="24" font-weight="800" fill="#083f3b">${esc(opts.centre || '')}</text>`;
  s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11.5" fill="${MUTED}">${esc(opts.centreLabel || '')}</text>`;
  s += '</svg>';
  return s;
}

// Legend rows for a donut: [{name, value, display}].
export function donutLegend(rows) {
  const colors = ['#0c5c56', '#e8a020', '#3d8a83', '#7fb069', '#c97b2d', '#5b7fa6', '#8e6fb8', '#b23b2e', '#9db8b3'];
  return rows.map((row, i) =>
    `<div class="legend-row"><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(row.name)} — <b>${esc(row.display ?? row.value)}</b></div>`).join('');
}
