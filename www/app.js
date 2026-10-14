/* Brezi – német szókincsgyakorló (Modul 1, 1–2. lecke) */
(() => {
'use strict';
const D = window.VOCAB;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = a => a[Math.random() * a.length | 0];
const uniq = a => a.filter((x, i) => x && a.indexOf(x) === i);
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= Ikonok ================= */
const I = {
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h11l5 5v9H4z"/><path d="M8 10h6M8 14h8"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 20V11M12 20V5M19 20v-6"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  speak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .2 2 1 3 2 3.3C11 8.5 11.3 5 12 2z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  vocab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="10" rx="2"/><path d="M8 19h11a2 2 0 0 0 2-2V9"/></svg>',
  form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h10M4 17h6"/><path d="M16 15l2 2 4-4"/></svg>',
  verb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h7M4 12h7M4 18h7"/><path d="M15 6h5M15 12h5M15 18h5"/></svg>',
  sit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/></svg>',
  order: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M10 7h4a3 3 0 0 1 3 3v4M7 10v4a3 3 0 0 0 3 3h4"/></svg>',
  mix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h4c4 0 6 10 10 10h4M3 17h4c1.5 0 2.7-1.4 3.7-3M14 9.5C15 8.2 16 7 17 7h4M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4"/></svg>',
  heartOn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z"/></svg>',
  cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="6" y="3" width="13" height="16" rx="2" transform="rotate(8 12 11)"/><rect x="4" y="5" width="13" height="16" rx="2"/></svg>',
  fav: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  favOn: '<svg viewBox="0 0 24 24" fill="#F2B705" stroke="#C99400" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h4l1.5 5h-4zM13 2h4l-3 5h-1.5z" opacity=".6"/><circle cx="12" cy="14.5" r="7"/><path d="M12 10.5l1.2 2.5 2.7.3-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.3z" fill="#fff" opacity=".85"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;color:var(--ink2)"><path d="M9 5l7 7-7 7"/></svg>'
};
const heartSVG = '<svg viewBox="0 0 24 24"><path class="full" d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z"/><path class="l" d="M12 7a4.6 4.6 0 0 0-8 2.8C4 15.8 12 21 12 21l-1.5-6 2-3z"/><path class="r" d="M12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21l-1.5-6 2-3z"/><path class="crack" d="M12 7l-1.5 5 2 3L12 21"/></svg>';

/* Brezi, a perec – saját kabalafigura. mood: normal | happy | sad | cheer | think */
function mascot(mood = 'normal', cls = '') {
  const eyes = {
    happy: '<path d="M60 84q8-9 16 0M124 84q8-9 16 0" stroke="#2A1608" stroke-width="5" fill="none" stroke-linecap="round"/>',
    cheer: '<path d="M60 84q8-9 16 0M124 84q8-9 16 0" stroke="#2A1608" stroke-width="5" fill="none" stroke-linecap="round"/>',
    sad: '<circle cx="68" cy="86" r="6.5" fill="#2A1608"/><circle cx="132" cy="86" r="6.5" fill="#2A1608"/><path d="M58 74l16 5M142 74l-16 5" stroke="#2A1608" stroke-width="4" stroke-linecap="round"/><path d="M138 96q4 8 0 12q-4-4 0-12z" fill="#6BB7F0"/>',
    think: '<circle cx="70" cy="83" r="6.5" fill="#2A1608"/><circle cx="134" cy="83" r="6.5" fill="#2A1608"/>',
    normal: '<circle cx="68" cy="85" r="7" fill="#2A1608"/><circle cx="132" cy="85" r="7" fill="#2A1608"/><circle cx="70.5" cy="82.5" r="2.3" fill="#fff"/><circle cx="134.5" cy="82.5" r="2.3" fill="#fff"/>'
  }[mood] || '';
  const mouth = {
    happy: '<path d="M88 104q12 14 24 0z" fill="#2A1608"/><path d="M93 110q7 4 14 0" fill="#E86A6A"/>',
    cheer: '<path d="M86 102q14 20 28 0z" fill="#2A1608"/><path d="M92 110q8 5 16 0" fill="#E86A6A"/>',
    sad: '<path d="M90 112q10-9 20 0" stroke="#2A1608" stroke-width="5" fill="none" stroke-linecap="round"/>',
    think: '<path d="M92 108h16" stroke="#2A1608" stroke-width="5" stroke-linecap="round"/>',
    normal: '<path d="M90 104q10 9 20 0" stroke="#2A1608" stroke-width="5" fill="none" stroke-linecap="round"/>'
  }[mood] || '';
  const arms = mood === 'cheer' ? '<path d="M30 88l-18-26M170 88l18-26" stroke="#7A3F17" stroke-width="9" stroke-linecap="round"/><circle cx="12" cy="60" r="8" fill="#B8692E"/><circle cx="188" cy="60" r="8" fill="#B8692E"/>' : '';
  const loop = 'M100 122C70 160 22 140 26 96C30 52 84 44 100 84C116 44 170 52 174 96C178 140 130 160 100 122Z';
  return `<svg class="mascot ${cls}" viewBox="0 0 200 190" aria-hidden="true">${arms}
  <path d="M74 170L100 122L126 170" stroke="#7A3F17" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M74 170L100 122L126 170" stroke="#C47A3A" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${loop}" stroke="#7A3F17" stroke-width="34" fill="none" stroke-linejoin="round"/>
  <path d="${loop}" stroke="#C47A3A" stroke-width="24" fill="none" stroke-linejoin="round"/>
  <path d="M40 80C46 62 66 58 78 66M160 80C154 62 134 58 122 66" stroke="#E0A060" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
  <g fill="#FFF8EC"><rect x="44" y="118" width="7" height="4" rx="2" transform="rotate(30 47 120)"/><rect x="150" y="116" width="7" height="4" rx="2" transform="rotate(-20 153 118)"/><rect x="92" y="60" width="7" height="4" rx="2"/><rect x="34" y="96" width="6" height="4" rx="2" transform="rotate(70 37 98)"/><rect x="164" y="100" width="6" height="4" rx="2" transform="rotate(-70 167 102)"/><rect x="118" y="150" width="6" height="4" rx="2" transform="rotate(40 121 152)"/></g>
  <ellipse cx="100" cy="96" rx="34" ry="24" fill="#C47A3A"/>
  ${eyes}${mouth}
  <ellipse cx="54" cy="100" rx="9" ry="6" fill="#E88A6A" opacity=".55"/><ellipse cx="146" cy="100" rx="9" ry="6" fill="#E88A6A" opacity=".55"/>
  </svg>`;
}

/* ================= Adatindexek ================= */
const W = {}, NOUN = {}, VERB = {}, ADJ = {}, EXPR = {}, ITEMS_BY_WORD = {};
D.words.forEach(w => W[w.id] = w);
D.nouns.forEach(n => NOUN[n.word_id] = n);
D.verbs.forEach(v => VERB[v.word_id] = v);
D.adjectives.forEach(a => ADJ[a.word_id] = a);
D.expressions.forEach(e => EXPR[e.word_id] = e);
D.items.forEach(it => { if (it.word_id) (ITEMS_BY_WORD[it.word_id] = ITEMS_BY_WORD[it.word_id] || []).push(it); });
const SECTIONS = Object.keys(D.meta.sections);
const POS_HU = { noun: 'főnév', verb: 'ige', adjective: 'melléknév', adverb: 'határozószó', conjunction: 'kötőszó', preposition: 'elöljárószó', pronoun: 'névmás', expression: 'kifejezés' };

/* ================= Tárolás ================= */
const KEY = 'brezi.v1';
const DEF = { lesson: '1', sections: [], qCount: 10, lives: 3, timer: 0, sound: true, haptics: true, autoSpeak: false, showHu: true, theme: 'system', dailyGoal: 50, name: '' };
const defProg = () => ({ xp: 0, words: {}, items: {}, modes: {}, ach: {}, days: {}, streak: 0, lastDay: '', games: 0, perfect: 0, bestCombo: 0, fav: [], answered: 0, correct: 0 });
let S;
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.settings) return { settings: { ...DEF, ...s.settings }, prog: { ...defProg(), ...s.prog }, onboarded: !!s.onboarded }; } catch (e) {}
  return { settings: { ...DEF }, prog: defProg(), onboarded: false };
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
S = load();

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
const curStreak = () => (S.prog.lastDay === dayKey() || S.prog.lastDay === yesterday()) ? S.prog.streak : 0;
const todayXp = () => S.prog.days[dayKey()] || 0;
const needXp = n => 50 * (n - 1) * n;
const levelOf = xp => { let n = 1; while (xp >= needXp(n + 1)) n++; return n; };

/* ================= Natív szolgáltatások ================= */
const P = (window.Capacitor && window.Capacitor.Plugins) || {};
function haptic(kind) {
  if (!S.settings.haptics) return;
  try {
    if (P.Haptics) { kind === 'bad' ? P.Haptics.notification({ type: 'ERROR' }) : kind === 'win' ? P.Haptics.notification({ type: 'SUCCESS' }) : P.Haptics.impact({ style: kind === 'big' ? 'HEAVY' : 'LIGHT' }); }
    else if (navigator.vibrate) navigator.vibrate(kind === 'bad' ? [70, 50, 70] : 25);
  } catch (e) {}
}
function ttsText(t) { return String(t).replace(/___/g, '…').replace(/\(.*?\)/g, '').replace(/\bjdm\b|\bjdn\b|\betw\.?/g, '').replace(/\s+/g, ' ').trim(); }
function speak(text) {
  const t = ttsText(text); if (!t) return;
  try {
    if (P.TextToSpeech) { P.TextToSpeech.stop && P.TextToSpeech.stop().catch(() => {}); P.TextToSpeech.speak({ text: t, lang: 'de-DE', rate: 0.9, pitch: 1.0, volume: 1.0 }).catch(() => toast('A felolvasáshoz telepíts német hangot a telefon beállításaiban.')); }
    else if ('speechSynthesis' in window) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'de-DE'; u.rate = .9; speechSynthesis.speak(u); }
    else toast('A felolvasás ezen az eszközön nem érhető el.');
  } catch (e) {}
}
let actx = null;
function tone(seq) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const t0 = actx.currentTime + .01;
    seq.forEach(([f, d, st, type = 'sine', vol = .16]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t0 + st);
      g.gain.setValueAtTime(.0001, t0 + st); g.gain.exponentialRampToValueAtTime(vol, t0 + st + .015); g.gain.exponentialRampToValueAtTime(.0001, t0 + st + d);
      o.connect(g); g.connect(actx.destination); o.start(t0 + st); o.stop(t0 + st + d + .03);
    });
  } catch (e) {}
}
const SFX = {
  ok: () => tone([[660, .12, 0], [990, .2, .09]]),
  bad: () => tone([[200, .22, 0, 'square', .06], [150, .3, .14, 'square', .06]]),
  combo: () => tone([[660, .1, 0], [880, .1, .08], [1320, .22, .16]]),
  win: () => tone([[523, .14, 0], [659, .14, .14], [784, .14, .28], [1047, .45, .42]]),
  lose: () => tone([[392, .22, 0, 'triangle'], [330, .22, .22, 'triangle'], [262, .55, .44, 'triangle']]),
  tap: () => tone([[520, .04, 0, 'triangle', .05]]),
  flip: () => tone([[300, .06, 0, 'triangle', .05], [450, .06, .05, 'triangle', .05]])
};

/* ================= Effektek ================= */
const fx = $('#fx'), ctx = fx.getContext('2d');
let parts = [], fxRun = false;
function sizeFx() { fx.width = innerWidth * devicePixelRatio; fx.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
sizeFx(); addEventListener('resize', sizeFx);
const CONF_COL = ['#FFD23F', '#23915E', '#2F6FD6', '#D9383C', '#B8692E', '#9B5DE5'];
function burst(x, y, n = 28) {
  if (reduceMotion) n = 6;
  for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 6; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, g: .32, r: 3 + Math.random() * 4, c: rnd(CONF_COL), life: 60 + Math.random() * 30, rot: Math.random() * 6, vr: (Math.random() - .5) * .4, sq: Math.random() < .5 }); }
  runFx();
}
function rain(n = 120) {
  if (reduceMotion) n = 20;
  for (let i = 0; i < n; i++) parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .6, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, g: .04, r: 3 + Math.random() * 4, c: rnd(CONF_COL), life: 220, rot: Math.random() * 6, vr: (Math.random() - .5) * .3, sq: Math.random() < .6 });
  runFx();
}
function runFx() {
  if (fxRun) return; fxRun = true;
  const step = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 30);
    parts.forEach(p => {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life--;
      ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 30); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.sq) ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); else { ctx.beginPath(); ctx.arc(0, 0, p.r * .7, 0, 7); ctx.fill(); }
      ctx.restore();
    });
    if (parts.length) requestAnimationFrame(step); else { fxRun = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  };
  requestAnimationFrame(step);
}
function floatText(txt, x, y) { const e = document.createElement('div'); e.className = 'xpfloat'; e.textContent = txt; e.style.left = x + 'px'; e.style.top = y + 'px'; document.body.appendChild(e); setTimeout(() => e.remove(), 1000); }
let toastT;
function toast(msg, cls = '') { const t = $('#toast'); t.className = cls; t.textContent = msg; requestAnimationFrame(() => t.classList.add('show')); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }

/* ================= Téma ================= */
function applyTheme() {
  const th = S.settings.theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : S.settings.theme;
  document.documentElement.dataset.theme = th;
  const m = $('meta[name=theme-color]'); if (m) m.content = th === 'dark' ? '#121A2C' : '#F3F6FB';
}
applyTheme();
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) {}

/* ================= Hatókör és haladás ================= */
function inScope(x, lessonOverride) {
  const L = lessonOverride || S.settings.lesson;
  if (L !== 'all' && String(x.lesson) !== L) return false;
  const secs = S.settings.sections.filter(s => L === 'all' || s[0] === L);
  return !secs.length || secs.includes(x.section);
}
const wRec = id => S.prog.words[id] || { b: 0, c: 0, w: 0 };
function record(q, ok) {
  const p = S.prog; p.answered++; if (ok) p.correct++;
  const upd = (store, id) => { const r = store[id] || { b: 0, c: 0, w: 0 }; if (ok) { r.c++; r.b = Math.min(5, r.b + 1); } else { r.w++; r.b = Math.max(0, r.b - 2); } r.t = Date.now(); store[id] = r; };
  if (q.wordId) upd(p.words, q.wordId);
  if (q.itemId) upd(p.items, q.itemId);
}
function weight(id, store) { const r = (store || S.prog.words)[id]; if (!r) return 6; return 1 + (5 - r.b) * 1.6 + (r.w > r.c ? 3 : 0); }
function wpick(arr, idf, keyf) {
  let pool = G ? arr.filter(x => !G.used.has(keyf(x))) : arr;
  if (!pool.length) pool = arr;
  let tot = 0; const ws = pool.map(x => { const w = weight(idf(x)); tot += w; return w; });
  let r = Math.random() * tot;
  for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
}
const mastered = id => wRec(id).b >= 3;
function mistakeSets() {
  const w = new Set(), i = new Set();
  Object.entries(S.prog.words).forEach(([id, r]) => { if (r.w > 0 && r.b < 3 && W[id]) w.add(id); });
  Object.entries(S.prog.items).forEach(([id, r]) => { if (r.w > 0 && r.b < 3) i.add(id); });
  return { w, i };
}
const focusW = id => !G || !G.focus || G.focus.w.has(id);
const focusI = it => !G || !G.focus || G.focus.i.has(it.item_id) || (it.word_id && G.focus.w.has(it.word_id));

/* ================= Megjelenítés-segédek ================= */
function deLabel(w) {
  if (w.pos === 'noun') { const n = NOUN[w.id]; return n.singular ? `${n.article} ${n.singular}` : `die ${n.plural}`; }
  if (w.pos === 'verb') return VERB[w.id].display;
  return w.lemma;
}
function deHtml(w) {
  if (w.pos === 'noun') { const n = NOUN[w.id]; return n.singular ? `<span class="art-${n.article}">${n.article}</span> ${esc(n.singular)}` : `<span class="art-die">die</span> ${esc(n.plural)} <small class="muted">(Pl.)</small>`; }
  return esc(deLabel(w));
}
function gapHtml(sentence) { const [a, b] = String(sentence).split('___'); return `${esc(a)}<span class="gap" id="gap"></span>${esc(b || '')}`; }
const PRON = { '1s': 'ich', '2s': 'du', '3s': 'er/sie/es', '1p': 'wir', '2p': 'ihr', '3p': 'sie/Sie' };
const PERS = ['1s', '2s', '3s', '1p', '2p', '3p'];
const REFL = { akk: { '1s': 'mich', '2s': 'dich', '3s': 'sich', '1p': 'uns', '2p': 'euch', '3p': 'sich' }, dat: { '1s': 'mir', '2s': 'dir', '3s': 'sich', '1p': 'uns', '2p': 'euch', '3p': 'sich' } };
const HABEN = { '1s': 'habe', '2s': 'hast', '3s': 'hat', '1p': 'haben', '2p': 'habt', '3p': 'haben' };
const SEIN = { '1s': 'bin', '2s': 'bist', '3s': 'ist', '1p': 'sind', '2p': 'seid', '3p': 'sind' };
function verbForm(v, tense, p, opt = {}) {
  const r = v.reflexive ? REFL[v.reflexive][p] : '';
  if (tense === 'perf') { const aux = (opt.aux || v.auxiliary) === 'sein' ? SEIN[p] : HABEN[p]; return [aux, r, opt.pp || v.partizip2].filter(Boolean).join(' '); }
  return [v[(tense === 'praes' ? 'praes_' : 'praet_') + p], r, v.separable_prefix].filter(Boolean).join(' ');
}
const TENSE_HU = { praes: 'Präsens (jelen)', praet: 'Präteritum (múlt)', perf: 'Perfekt (múlt)' };
function umlaut(w) { for (const [a, b] of [['au', 'äu'], ['a', 'ä'], ['o', 'ö'], ['u', 'ü']]) { const i = w.lastIndexOf(a); if (i >= 0) return w.slice(0, i) + b + w.slice(i + a.length); } return w; }
function pad4(ans, cands, extra = []) { const o = uniq([ans, ...shuffle(uniq(cands)).filter(c => c !== ans)]).slice(0, 4); extra.forEach(e => { if (o.length < 4 && !o.includes(e)) o.push(e); }); return shuffle(o); }

/* ================= Kérdésgenerátorok ================= */
const MODES = {
  vocab: { name: 'Szógyakorlás', desc: 'Mit jelent? Német ↔ magyar', icon: 'vocab' },
  form: { name: 'Melyik alak?', desc: 'Névelő, többes szám, fokozás', icon: 'form' },
  verb: { name: 'Igeragozás', desc: 'Válaszd ki a helyes igealakot', icon: 'verb' },
  situation: { name: 'Mi illik ide?', desc: 'Szó a helyzethez', icon: 'sit' },
  order: { name: 'Mondatépítő', desc: 'Húzd sorba a szavakat', icon: 'order' },
  mix: { name: 'Vegyes kör', desc: 'Minden feladattípus egy körben', icon: 'mix' }
};
const scopeWords = pred => D.words.filter(w => inScope(w) && focusW(w.id) && (!pred || pred(w)));
const scopeItems = types => D.items.filter(it => types.includes(it.exercise_type) && inScope(it) && focusI(it));

function genVocab() {
  const pool = scopeWords(); if (!pool.length) return null;
  const w = wpick(pool, x => x.id, x => 'w' + x.id);
  const all = D.words.filter(x => x.id !== w.id && x.hu !== w.hu && (x.pos === w.pos || (w.pos === 'adverb' && x.pos === 'adjective')));
  const near = all.filter(x => x.lesson === w.lesson);
  const others = shuffle(near.length >= 3 ? near : all);
  const dir = w.pos === 'expression' ? 'de' : (Math.random() < .55 ? 'de' : 'hu');
  if (dir === 'de') {
    const opts = uniq([w.hu, ...others.map(x => x.hu)]).slice(0, 4);
    return { mode: 'vocab', kind: 'mc', key: 'w' + w.id, wordId: w.id, title: 'Mit jelent?', tags: [POS_HU[w.pos]], prompt: `<div class="prompt big de">${deHtml(w)}${sayBtn(deLabel(w))}</div>`, optHu: true, options: shuffle(opts), answer: w.hu, speakOnShow: deLabel(w), fbDe: deLabel(w), fbHu: w.hu };
  }
  const labels = uniq([deLabel(w), ...others.map(deLabel)]).slice(0, 4);
  return { mode: 'vocab', kind: 'mc', key: 'w' + w.id, wordId: w.id, title: 'Hogy mondod németül?', tags: [POS_HU[w.pos]], prompt: `<div class="prompt hu">${esc(w.hu)}</div>`, options: shuffle(labels), answer: deLabel(w), fbDe: deLabel(w), fbHu: w.hu };
}

function itemQ(it, mode, title) {
  const opts = shuffle(it.options.split(' | '));
  const tags = [it.grammar_target].filter(Boolean);
  const hint = S.settings.showHu && it.hint_hu && it.exercise_type !== 'SITUATION' ? it.hint_hu : '';
  let ctxHtml = '';
  if (it.situation_de) ctxHtml = `<div class="context"><div class="de">${esc(it.situation_de)}</div>${S.settings.showHu ? `<div class="hu">${esc(it.situation_hu)}</div>` : `<button class="hu" data-act="showhu" style="text-decoration:underline">Mutasd magyarul</button><div class="hu" hidden>${esc(it.situation_hu)}</div>`}</div>`;
  return { mode, kind: 'mc', key: 'i' + it.item_id, itemId: it.item_id, wordId: it.word_id || null, title, tags, hint, context: ctxHtml,
    prompt: `<div class="prompt de">${gapHtml(it.sentence_de)}${sayBtn(it.full_sentence_de, true)}</div>`, options: opts, answer: it.answer,
    fbDe: it.full_sentence_de, fbHu: it.hu || it.hint_hu, explain: it.exercise_type === 'SITUATION' ? it.hint_hu : '' };
}

function genForm() {
  const items = scopeItems(['ARTICLE', 'PLURAL', 'ADJ_COMPARE', 'EXPRESSION']);
  const nouns = scopeWords(w => w.pos === 'noun' && NOUN[w.id].singular);
  const plurals = nouns.filter(w => NOUN[w.id].plural);
  const adjs = scopeWords(w => ADJ[w.id] && ADJ[w.id].gradable === 'igen');
  const kinds = [];
  if (items.length) kinds.push('item', 'item');
  if (nouns.length) kinds.push('art');
  if (plurals.length) kinds.push('pl');
  if (adjs.length) kinds.push('adj');
  if (!kinds.length) return null;
  const k = rnd(kinds);
  if (k === 'item') { const it = wpick(items, x => x.word_id || x.item_id, x => 'i' + x.item_id); return itemQ(it, 'form', { ARTICLE: 'Válaszd ki a névelőt!', PLURAL: 'Mi a többes szám?', ADJ_COMPARE: 'Fokozd a melléknevet!', EXPRESSION: 'Egészítsd ki a kifejezést!' }[it.exercise_type]); }
  if (k === 'art') {
    const w = wpick(nouns, x => x.id, x => 'a' + x.id), n = NOUN[w.id];
    return { mode: 'form', kind: 'mc', key: 'a' + w.id, wordId: w.id, title: 'Melyik a névelője?', tags: [n.hu], prompt: `<div class="prompt big de"><span class="gap" id="gap"></span> ${esc(n.singular)}</div>`, options: ['der', 'die', 'das'], answer: n.article, fbDe: `${n.article} ${n.singular}`, fbHu: n.hu };
  }
  if (k === 'pl') {
    const w = wpick(plurals, x => x.id, x => 'p' + x.id), n = NOUN[w.id], sg = n.singular;
    const c = [sg, sg + 'e', sg.endsWith('e') ? sg + 'n' : sg + 'en', sg + 's', umlaut(sg) + 'e', sg + 'er', umlaut(sg) + 'er'];
    return { mode: 'form', kind: 'mc', key: 'p' + w.id, wordId: w.id, title: 'Mi a többes száma?', tags: [n.hu], prompt: `<div class="prompt de"><span class="art-${n.article}">${n.article}</span> ${esc(sg)} → <span class="art-die">die</span> <span class="gap" id="gap"></span></div>`, options: pad4(n.plural, c), answer: n.plural, fbDe: `${n.article} ${sg}, die ${n.plural}`, fbHu: n.hu };
  }
  const w = wpick(adjs, x => x.id, x => 'c' + x.id), a = ADJ[w.id], sup = Math.random() < .5, L = a.positive;
  const ans = sup ? a.superlative : a.comparative;
  const c = sup ? [a.comparative, 'am ' + L + 'sten', 'am meisten ' + L, L, 'am ' + L + 'esten'] : [L, 'mehr ' + L, a.superlative, L + 'er', umlaut(L) + 'er'];
  return { mode: 'form', kind: 'mc', key: 'c' + w.id, wordId: w.id, title: sup ? 'Mi a felsőfoka?' : 'Mi a középfoka?', tags: [a.hu], prompt: `<div class="prompt de">${esc(L)} → <span class="gap" id="gap"></span></div>`, options: pad4(ans, c), answer: ans, fbDe: `${L} – ${a.comparative} – ${a.superlative}`, fbHu: a.hu };
}

function genVerb() {
  const items = scopeItems(['VERB_FORM']);
  const verbs = scopeWords(w => w.pos === 'verb');
  if (!verbs.length && !items.length) return null;
  if (items.length && Math.random() < .5) { const it = wpick(items, x => x.word_id || x.item_id, x => 'i' + x.item_id); return itemQ(it, 'verb', 'Melyik igealak illik a mondatba?'); }
  const w = wpick(verbs, x => x.id, x => 'v' + x.id), v = VERB[w.id];
  const tense = rnd(['praes', 'praes', 'praet', 'perf']), p = rnd(PERS);
  const ans = verbForm(v, tense, p);
  let c;
  if (tense === 'perf') {
    const stem = v.infinitive.slice(v.separable_prefix.length).replace(/e?n$/, '');
    const fakePP = v.regular === 'igen' ? v.partizip2.replace(/t$/, 'en') : (v.separable_prefix + 'ge' + stem + 't');
    c = [verbForm(v, 'perf', p, { aux: v.auxiliary === 'sein' ? 'haben' : 'sein' }), verbForm(v, 'perf', p, { pp: fakePP }), verbForm(v, 'perf', rnd(PERS.filter(x => HABEN[x] !== HABEN[p]))), verbForm(v, 'praet', p)];
  } else {
    const other = tense === 'praes' ? 'praet' : 'praes';
    c = [verbForm(v, other, p), ...shuffle(PERS.filter(x => x !== p)).map(x => verbForm(v, tense, x)), verbForm(v, 'perf', p)];
  }
  return { mode: 'verb', kind: 'mc', key: `v${w.id}${tense}${p}`, wordId: w.id, title: 'Ragozd az igét!', tags: [v.display, TENSE_HU[tense]], hint: S.settings.showHu ? v.hu : '',
    prompt: `<div class="prompt de"><span class="pron">${PRON[p]}</span><span class="gap" id="gap"></span></div>`, options: pad4(ans, c), answer: ans,
    fbDe: `${PRON[p].split('/')[0]} ${ans}`, fbHu: `${v.notation} – ${v.hu}`, speakAfter: `${PRON[p].split('/')[0]} ${ans}` };
}

function genSituation() {
  const items = scopeItems(['SITUATION']); if (!items.length) return null;
  const it = wpick(items, x => x.word_id || x.item_id, x => 'i' + x.item_id);
  return itemQ(it, 'situation', 'Melyik szó illik a helyzethez?');
}

function genOrder() {
  const items = D.items.filter(it => inScope(it) && focusI(it) && it.hu && it.full_sentence_de && (() => { const n = it.full_sentence_de.split(' ').length; return n >= 4 && n <= 9; })());
  if (!items.length) return null;
  const it = wpick(items, x => x.word_id || x.item_id, x => 'o' + x.item_id);
  const toks = it.full_sentence_de.split(' ');
  let sh = shuffle(toks), tries = 0; while (sh.join(' ') === toks.join(' ') && tries++ < 10) sh = shuffle(toks);
  return { mode: 'order', kind: 'order', key: 'o' + it.item_id, itemId: it.item_id, wordId: it.word_id || null, title: 'Rakd sorba a szavakat!', tags: ['mondatépítés'],
    prompt: `<div class="prompt hu">${esc(it.hu)}</div>`, tokens: sh, answer: it.full_sentence_de, fbDe: it.full_sentence_de, fbHu: it.hu };
}

const GEN = { vocab: genVocab, form: genForm, verb: genVerb, situation: genSituation, order: genOrder,
  mix: () => GEN[rnd(['vocab', 'form', 'verb', 'situation', 'order'])]() };
function sayBtn(text, small) { return `<button class="iconbtn say" data-say="${esc(text)}" aria-label="Felolvasás">${I.speak}</button>`; }

/* ================= Navigáció ================= */
let cur = 'home', G = null, modalOpen = null;
const app = $('#app');
function go(screen, arg) {
  cur = screen; closeModal(true);
  const tabs = ['home', 'dict', 'stats', 'settings'];
  const render = { home: rHome, dict: rDict, stats: rStats, settings: rSettings, onboarding: rOnb, game: rGame, result: rResult, cards: rCards }[screen];
  app.innerHTML = render(arg) + (tabs.includes(screen) ? navHtml(screen) : '');
  const v = $('.view', app); if (v) v.scrollTop = 0;
  ({ dict: afterDict, game: afterGame, result: afterResult, cards: afterCards, home: afterHome }[screen] || (() => {}))(arg);
}
function navHtml(on) {
  const b = (id, ic, t) => `<button data-go="${id}" class="${on === id ? 'on' : ''}">${I[ic]}<span>${t}</span></button>`;
  return `<nav class="nav">${b('home', 'play', 'Játék')}${b('dict', 'book', 'Szótár')}${b('stats', 'chart', 'Haladás')}${b('settings', 'gear', 'Beállítások')}</nav>`;
}

/* ================= Onboarding ================= */
function rOnb() {
  return `<div class="view"><div class="onb">${mascot('cheer', 'jump')}
  <h1>Szia! Brezi vagyok.</h1>
  <div class="bubble">Segítek megtanulni a német szavakat az 1. és 2. leckéből. Hogy hívnak?</div>
  <input id="onb-name" class="textin mt" maxlength="20" placeholder="A neved" value="${esc(S.settings.name)}">
  <div class="muted small mt">Melyik leckével kezdesz?</div>
  <div class="seg" id="onb-lesson" style="width:100%">${['1', '2', 'all'].map(l => `<button data-l="${l}" class="${S.settings.lesson === l ? 'on' : ''}">${l === 'all' ? 'Mindkettő' : l + '. lecke'}</button>`).join('')}</div>
  <button class="btn mt" data-act="onb-go">Kezdjük</button></div></div>`;
}

/* ================= Kezdőlap ================= */
function rHome() {
  const st = S.settings, lvl = levelOf(S.prog.xp), lo = needXp(lvl), hi = needXp(lvl + 1);
  const goalPct = Math.min(1, todayXp() / st.dailyGoal), C = 2 * Math.PI * 24;
  const mist = mistakeSets(), mc = mist.w.size + mist.i.size;
  const lt = st.lesson === 'all' ? 'Mindkét lecke szavai' : D.meta.lessons[st.lesson];
  const secs = st.sections.filter(s => st.lesson === 'all' || s[0] === st.lesson);
  const kk = m => `<button class="kk" data-play="${m}"><div class="kk-t">${I[MODES[m].icon].replace('<svg', '<svg class="kk-ic"')}${MODES[m].name}</div><div class="kk-d">${MODES[m].desc}</div></button>`;
  return `<div class="view with-nav">
  <div class="hello">${mascot(goalPct >= 1 ? 'happy' : 'normal')}<div class="spacer"><h1>Szia${st.name ? ', ' + esc(st.name) : ''}!</h1><div class="muted small">${goalPct >= 1 ? 'Megvan a mai cél. Szép munka!' : 'Gyakoroljunk egy kicsit.'}</div></div>
  <span class="chip flame">${I.flame}${curStreak()}</span></div>
  <div class="goal"><svg class="ring" viewBox="0 0 58 58"><circle class="bg" cx="29" cy="29" r="24"/><circle class="fg" cx="29" cy="29" r="24" transform="rotate(-90 29 29)" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - goalPct)}"/><text x="29" y="34" text-anchor="middle" font-size="14" font-weight="800" fill="currentColor">${Math.round(goalPct * 100)}%</text></svg>
  <div class="spacer"><div class="row"><b>${lvl}. szint</b><span class="spacer"></span><span class="muted small">${S.prog.xp} XP</span></div><div class="bar mt" style="margin-top:8px"><i style="width:${Math.round((S.prog.xp - lo) / (hi - lo) * 100)}%"></i></div><div class="muted small" style="margin-top:6px">Mai cél: ${todayXp()} / ${st.dailyGoal} XP</div></div></div>
  <div class="seg mt" id="home-lesson">${['1', '2', 'all'].map(l => `<button data-l="${l}" class="${st.lesson === l ? 'on' : ''}">${l === 'all' ? 'Mindkettő' : l + '. lecke'}</button>`).join('')}</div>
  <div class="lesson-title muted">${esc(lt)}${secs.length ? ` – szakaszok: ${secs.join(', ')}` : ''}</div>
  <button class="kk hero mt" data-play="mix">${mascot('cheer')}<div class="kk-t">${MODES.mix.name}</div><div class="kk-d">${st.qCount} kérdés, ${st.lives ? st.lives + ' élet' : 'végtelen élet'}</div></button>
  <div class="grid2 mt">${['vocab', 'form', 'verb', 'situation'].map(kk).join('')}</div>
  <div class="mt">${kk('order')}</div>
  <div class="mt2">
   <button class="list-btn" data-act="mistakes">${I.redo}<div class="spacer"><b>Hibáim gyakorlása</b><span class="muted small">A rosszul megválaszolt szavak újra</span></div><span class="badge ${mc ? '' : 'zero'}">${mc}</span></button>
   <button class="list-btn" data-act="favplay">${I.fav}<div class="spacer"><b>Kedvenc szavaim</b><span class="muted small">A Szótárban csillaggal jelölt szavak</span></div><span class="badge zero">${S.prog.fav.length}</span></button>
   <button class="list-btn" data-go="cards">${I.cards}<div class="spacer"><b>Szókártyák</b><span class="muted small">Tanulás élet és pontozás nélkül</span></div>${I.chev}</button>
  </div></div>`;
}
function afterHome() {}

/* ================= Játék ================= */
function startGame(mode, focus) {
  const st = S.settings;
  G = { mode, idx: 0, total: st.qCount, lives: st.lives || Infinity, maxLives: st.lives || 0, correct: 0, wrong: 0, combo: 0, bestCombo: 0, xp: 0, used: new Set(), mistakes: [], focus: focus || null, q: null, answered: false };
  if (!makeQuestion()) { G = null; toast(focus ? 'Ehhez nincs elég szó. Játssz előbb egy kört!' : 'A kiválasztott szakaszokban ehhez a játékhoz nincs feladat.'); return; }
  go('game');
}
function makeQuestion() {
  let q = null;
  for (let t = 0; t < 40 && !q; t++) { q = GEN[G.mode](); if (q && G.used.has(q.key) && t < 25) q = null; }
  if (!q) return false;
  G.q = q; G.used.add(q.key); G.answered = false; return true;
}
function heartsHtml() {
  if (!G.maxLives) return `<div class="hearts"><span style="width:26px;height:26px;color:var(--bad)">${I.heartOn}</span><span class="inf">∞</span></div>`;
  let h = ''; for (let i = 0; i < G.maxLives; i++) h += `<span class="heart ${i < G.lives ? '' : 'empty'}" data-h="${i}">${heartSVG}</span>`;
  return `<div class="hearts">${h}</div>`;
}
function rGame() {
  const q = G.q, opts = q.kind === 'mc' ? `<div class="opts" id="opts">${q.options.map((o, i) => `<button class="opt ${q.optHu ? 'hu' : ''}" data-opt="${esc(o)}"><span class="k">${i + 1}</span><span class="t">${esc(o)}</span></button>`).join('')}</div>` :
    `<div class="ord-ans" id="ord-ans" aria-label="Mondat"></div><div class="ord-pool" id="ord-pool">${q.tokens.map((t, i) => `<span class="tok" tabindex="0" data-w="${esc(t)}" data-i="${i}">${esc(t)}</span>`).join('')}</div><div class="muted small ord-hint">Koppints a szavakra, vagy húzd őket a vonalra.</div>`;
  const tags = (q.tags || []).filter(Boolean).map(t => `<span class="tag">${esc(t)}</span>`).join('') + (q.hint ? `<span class="tag">${esc(q.hint)}</span>` : '');
  return `<div class="game" id="game">
  <div class="gtop"><button class="iconbtn" data-act="quit" aria-label="Kilépés">${I.close}</button><div class="bar"><i id="gprog" style="width:${G.idx / G.total * 100}%"></i></div>${heartsHtml()}</div>
  ${S.settings.timer ? '<div class="timer"><i id="tbar"></i></div>' : ''}
  <div class="combo" id="combo"></div>
  <div class="qwrap" id="qwrap"><div class="qtitle">${esc(q.title)}</div>${tags ? `<div class="qsub">${tags}</div>` : ''}${q.context || ''}<div id="pcard">${q.prompt}</div>${opts}</div>
  ${q.kind === 'order' ? `<div class="row" style="gap:10px"><button class="btn ghost" style="width:auto;flex:none" data-act="ord-reset" aria-label="Újrakezdés">${I.redo.replace('<svg', '<svg style="width:22px;height:22px"')}</button><button class="btn" id="ord-check" data-act="ord-check" disabled>Ellenőrzés</button></div>` : ''}
  </div><div class="sheet" id="sheet"></div>`;
}
let timerRaf = null;
function afterGame() {
  if (G.q.kind === 'order') setupOrder();
  if (S.settings.autoSpeak && G.q.speakOnShow) setTimeout(() => speak(G.q.speakOnShow), 250);
  startTimer();
}
function startTimer() {
  cancelAnimationFrame(timerRaf); const lim = S.settings.timer; if (!lim) return;
  const t0 = performance.now(), bar = $('#tbar');
  const step = now => { if (!G || G.answered || cur !== 'game') return; const f = 1 - (now - t0) / (lim * 1000); if (bar) bar.style.transform = `scaleX(${Math.max(0, f)})`; if (f <= 0) { G.q.kind === 'order' ? checkOrder(true) : answer(null, null, true); return; } timerRaf = requestAnimationFrame(step); };
  timerRaf = requestAnimationFrame(step);
}
function answer(choice, btn, timeout) {
  if (G.answered) return; G.answered = true; cancelAnimationFrame(timerRaf);
  const q = G.q, ok = choice === q.answer;
  $('#opts') && $('#opts').classList.add('locked');
  $$('.opt').forEach(b => { const o = b.dataset.opt; if (o === q.answer) b.classList.add('right'); else if (b === btn) b.classList.add('wrong'); else b.classList.add('dim'); });
  const gap = $('#gap'); if (gap) { gap.textContent = q.answer; gap.classList.add('filled'); }
  resolve(ok, btn, timeout);
}
function resolve(ok, btn, timeout) {
  const q = G.q; record(q, ok); G.idx++;
  $('#gprog').style.width = (G.idx / G.total * 100) + '%';
  if (ok) {
    G.correct++; G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
    let gain = 10 + (G.combo >= 3 ? 5 : 0); G.xp += gain;
    const r = (btn || $('#pcard')).getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, G.combo >= 3 ? 40 : 26); floatText('+' + gain + ' XP', r.left + r.width / 2, r.top - 4);
    if ([3, 5, 10, 15, 20].includes(G.combo)) { const c = $('#combo'); c.innerHTML = `${I.flame}${G.combo} egymás után!`; c.classList.remove('show'); void c.offsetWidth; c.classList.add('show'); SFX.combo(); haptic('big'); } else { SFX.ok(); haptic('ok'); }
  } else {
    G.wrong++; G.combo = 0; G.mistakes.push({ q: q.title, de: q.fbDe, hu: q.fbHu, ans: q.answer });
    SFX.bad(); haptic('bad');
    $('#qwrap').classList.add('shake'); const fl = document.createElement('div'); fl.className = 'flash'; document.body.appendChild(fl); setTimeout(() => fl.remove(), 600);
    if (G.maxLives) { G.lives--; const h = $(`.heart[data-h="${G.lives}"]`); if (h) { h.classList.add('breaking'); setTimeout(() => { h.classList.remove('breaking'); h.classList.add('empty'); }, 700); } }
  }
  if (q.speakAfter && S.settings.autoSpeak) setTimeout(() => speak(q.speakAfter), 300);
  save(); showSheet(ok, timeout);
}
const OK_T = ['Szuper!', 'Pontosan!', 'Ügyes!', 'Telitalálat!', 'Sehr gut!', 'Prima!', 'Genau!', 'Klasse!'];
const BAD_T = ['Majdnem!', 'Nem egészen.', 'Ezt még gyakoroljuk.', 'Most nem jött össze.'];
function showSheet(ok, timeout) {
  const q = G.q, sh = $('#sheet'), last = G.idx >= G.total || G.lives <= 0;
  sh.className = 'sheet ' + (ok ? 'ok' : 'bad');
  sh.innerHTML = `<div class="fb-head">${mascot(ok ? (G.combo >= 3 ? 'cheer' : 'happy') : 'sad', ok ? 'jump' : 'wobble')}<div class="spacer"><div class="fb-t">${timeout ? 'Lejárt az idő!' : ok ? rnd(OK_T) : rnd(BAD_T)}</div>${ok ? '' : `<div class="small">Helyes válasz: <b class="de">${esc(q.answer)}</b></div>`}</div>${q.fbDe ? sayBtn(q.fbDe) : ''}</div>
  ${q.fbDe ? `<div class="fb-sent">${esc(q.fbDe)}</div>` : ''}${q.fbHu ? `<div class="fb-hu">${esc(q.fbHu)}</div>` : ''}${q.explain && !ok ? `<div class="fb-hu">${esc(q.explain)}</div>` : ''}
  <button class="btn ${ok ? 'ok' : 'bad'}" data-act="next">${G.lives <= 0 ? 'Tovább' : last ? 'Eredmény' : 'Tovább'}</button>`;
  requestAnimationFrame(() => { sh.classList.add('show'); const qw = $('#qwrap'); qw.style.paddingBottom = (sh.offsetHeight + 12) + 'px';
    const tgt = $('.opt.right') || $('#ord-ans') || $('#pcard'); if (tgt) setTimeout(() => tgt.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' }), 120); });
}
function next() {
  if (G.lives <= 0) return finish(true);
  if (G.idx >= G.total) return finish(false);
  if (!makeQuestion()) return finish(false);
  go('game');
}
function finish(dead) {
  const p = S.prog, acc = G.idx ? G.correct / G.idx : 0;
  const stars = dead ? 0 : acc >= .9 ? 3 : acc >= .7 ? 2 : 1;
  let bonus = 0; if (!dead) { bonus += 20; if (G.wrong === 0) { bonus += 30; p.perfect++; } }
  G.xp += bonus; G.stars = stars; G.dead = dead; G.bonus = bonus;
  const before = levelOf(p.xp);
  p.xp += G.xp; const dk = dayKey(); p.days[dk] = (p.days[dk] || 0) + G.xp;
  if (p.lastDay !== dk) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = dk; }
  p.games++; p.bestCombo = Math.max(p.bestCombo, G.bestCombo);
  const m = p.modes[G.mode] || { played: 0, c: 0, n: 0, best: 0 }; m.played++; m.c += G.correct; m.n += G.idx; m.best = Math.max(m.best, stars); p.modes[G.mode] = m;
  G.levelUp = levelOf(p.xp) > before ? levelOf(p.xp) : 0;
  G.newAch = checkAch();
  save(); go('result');
}
function rResult() {
  const acc = G.idx ? Math.round(G.correct / G.idx * 100) : 0;
  const title = G.dead ? 'Elfogyott az életed' : G.stars === 3 ? 'Kiváló kör!' : G.stars === 2 ? 'Szép munka!' : 'Kör teljesítve';
  return `<div class="view"><div class="result">${mascot(G.dead ? 'sad' : G.stars >= 2 ? 'cheer' : 'happy', G.dead ? 'wobble' : 'jump')}
  <h1>${title}</h1>
  ${G.dead ? `<div class="muted mt" style="margin-top:8px">${G.idx}. kérdésnél fogytak el a szívek. A megszerzett XP megmaradt.</div>` : `<div class="stars">${[0, 1, 2].map(i => `<span class="star ${i < G.stars ? 'on' : ''}">${I.star}</span>`).join('')}</div>`}
  <div class="statgrid"><div class="stat"><b id="xpcount">0</b><span>XP</span></div><div class="stat"><b>${acc}%</b><span>pontosság</span></div><div class="stat"><b>${G.bestCombo}</b><span>leghosszabb sorozat</span></div></div>
  ${G.bonus ? `<div class="muted small mt">Ebből bónusz: ${G.bonus} XP${G.wrong === 0 ? ' (hibátlan kör)' : ''}</div>` : ''}
  ${G.mistakes.length ? `<div class="mist"><h3>Ezeket érdemes átnézni</h3><ul>${G.mistakes.map(m => `<li><div class="de">${esc(m.de || m.ans)}</div><div class="muted small">${esc(m.hu || '')}</div></li>`).join('')}</ul></div>` : ''}
  <button class="btn mt2" data-act="again">Új kör</button>
  ${G.mistakes.length ? '<button class="btn ghost mt" data-act="mistakes">Hibáim gyakorlása</button>' : ''}
  <button class="btn ghost mt" data-go="home">Vissza a főmenübe</button></div></div>`;
}
function afterResult() {
  const lvUp = G.levelUp, newAch = G.newAch || [];
  if (G.dead) { parts = []; SFX.lose(); haptic('bad'); } else { SFX.win(); haptic('win'); if (G.stars >= 2) rain(G.stars === 3 ? 160 : 80); }
  $$('.star').forEach((s, i) => setTimeout(() => { s.classList.add('in'); if (s.classList.contains('on')) tone([[700 + i * 180, .15, 0]]); }, 350 + i * 280));
  const el = $('#xpcount'), tgt = G.xp, t0 = performance.now();
  const step = n => { const f = Math.min(1, (n - t0) / 900); el.textContent = Math.round(tgt * f); if (f < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
  setTimeout(() => { if (cur !== 'result') return; if (lvUp) showLevelUp(lvUp); newAch.forEach((a, i) => setTimeout(() => toast('Új jelvény: ' + a.t, 'ach'), 400 + i * 2800)); }, 1300);
}
function showLevelUp(l) {
  const e = document.createElement('div'); e.className = 'levelup';
  e.innerHTML = `<div class="box">${mascot('cheer', 'jump').replace('class="mascot', 'style="width:120px;height:120px" class="mascot')}<div class="muted">Új szint</div><div class="lvl">${l}</div><button class="btn mt">Szuper</button></div>`;
  document.body.appendChild(e); rain(100); SFX.win();
  e.addEventListener('click', ev => { if (ev.target.closest('button')) e.remove(); });
}
function confirmQuit() {
  openModal(`<div class="modal center">${mascot('sad').replace('class="mascot', 'style="width:110px;height:110px" class="mascot')}<h2 class="mt">Biztosan kilépsz?</h2><p class="muted">A kör félbeszakad, a pontok erre a körre nem számítanak.</p>
  <button class="btn" data-act="mclose">Folytatom</button><button class="btn ghost mt" data-act="quit-yes">Kilépek</button></div>`, true);
}

/* --- Mondatépítő: koppintás és húzás --- */
function setupOrder() {
  const area = $('#qwrap'), ans = $('#ord-ans'), pool = $('#ord-pool');
  let drag = null;
  const refresh = () => { $('#ord-check').disabled = !ans.children.length || G.answered; };
  const move = t => { if (G.answered) return; SFX.tap(); (t.parentElement === ans ? pool : ans).appendChild(t); refresh(); };
  area.addEventListener('pointerdown', e => {
    const t = e.target.closest('.tok'); if (!t || G.answered) return;
    drag = { t, x0: e.clientX, y0: e.clientY, moved: false, g: null, id: e.pointerId };
    try { t.setPointerCapture(e.pointerId); } catch (_) {}
  });
  area.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 7) {
      drag.moved = true; const r = drag.t.getBoundingClientRect();
      drag.g = drag.t.cloneNode(true); drag.g.classList.add('ghost'); drag.g.style.width = r.width + 'px';
      drag.ox = e.clientX - r.left; drag.oy = e.clientY - r.top; document.body.appendChild(drag.g); drag.t.classList.add('placeholder');
    }
    if (drag.moved) {
      drag.g.style.transform = `translate(${e.clientX - drag.ox}px,${e.clientY - drag.oy}px) scale(1.08)`;
      const ar = ans.getBoundingClientRect();
      if (e.clientY > ar.top - 20 && e.clientY < ar.bottom + 10) placeInto(ans, drag.t, e.clientX, e.clientY);
    }
  });
  const end = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    if (!d.moved) { move(d.t); return; }
    d.g.remove(); d.t.classList.remove('placeholder');
    const ar = ans.getBoundingClientRect();
    if (e.clientY > ar.top - 20 && e.clientY < ar.bottom + 10) placeInto(ans, d.t, e.clientX, e.clientY); else pool.appendChild(d.t);
    SFX.tap(); haptic('ok'); refresh();
  };
  area.addEventListener('pointerup', end); area.addEventListener('pointercancel', end);
  area.addEventListener('keydown', e => { const t = e.target.closest('.tok'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); move(t); } });
  refresh();
}
function placeInto(zone, tok, x, y) {
  const kids = Array.from(zone.children).filter(k => k !== tok);
  let before = null;
  for (const k of kids) { const r = k.getBoundingClientRect(); if (y < r.top) { before = k; break; } if (y <= r.bottom && x < r.left + r.width / 2) { before = k; break; } }
  if (before) { if (tok.nextSibling !== before) zone.insertBefore(tok, before); } else if (zone.lastElementChild !== tok) zone.appendChild(tok);
}
function checkOrder(timeout) {
  if (G.answered) return; G.answered = true; cancelAnimationFrame(timerRaf);
  const ans = $('#ord-ans'), built = $$('.tok', ans).map(t => t.dataset.w).join(' ');
  const ok = !timeout && built === G.q.answer;
  const target = G.q.answer.split(' ');
  $$('.tok', ans).forEach((t, i) => t.classList.add(t.dataset.w === target[i] ? 'okt' : 'badt'));
  $('#ord-check').disabled = true;
  resolve(ok, ok ? ans : null, timeout);
}

/* ================= Szókártyák ================= */
let FC = null;
function rCards() {
  if (!FC) {
    const pool = D.words.filter(w => inScope(w));
    const deck = []; const used = new Set();
    while (deck.length < Math.min(10, pool.length)) { const w = wpick(pool.filter(x => !used.has(x.id)), x => x.id, x => x.id); used.add(w.id); deck.push(w); }
    FC = { deck, i: 0, known: 0 };
  }
  if (FC.i >= FC.deck.length) {
    return `<div class="view"><div class="result">${mascot('cheer', 'jump')}<h1>Pakli kész!</h1><p class="muted">${FC.deck.length} kártyából ${FC.known} ment biztosan.</p>
    <button class="btn mt" data-act="cards-again">Új pakli</button><button class="btn ghost mt" data-act="cards-home">Vissza a főmenübe</button></div></div>`;
  }
  const w = FC.deck[FC.i];
  return `<div class="view"><div class="row"><button class="iconbtn" data-act="cards-home" aria-label="Vissza">${I.back}</button><h2 class="spacer">Szókártyák</h2><span class="muted">${FC.i + 1} / ${FC.deck.length}</span></div>
  <div class="bar mt"><i style="width:${FC.i / FC.deck.length * 100}%"></i></div>
  <div class="fc-wrap"><div class="fc" id="fc" data-act="flip"><div class="fc-face"><div class="dword">${deHtml(w)}</div><div class="muted small mt">${POS_HU[w.pos]}</div><div class="muted small" style="position:absolute;bottom:14px">Koppints a megfordításhoz</div></div>
  <div class="fc-face fc-back"><div class="fc-hu">${esc(w.hu)}</div><div class="muted mt de">${esc(extraLine(w))}</div></div></div></div>
  <div class="row mt" style="justify-content:center">${sayBtn(deLabel(w))}</div>
  <div class="row mt"><button class="btn ghost" data-act="fc-no">Még tanulom</button><button class="btn ok" data-act="fc-yes">Tudom</button></div></div>`;
}
function extraLine(w) {
  if (w.pos === 'noun') { const n = NOUN[w.id]; return n.singular ? (n.plural ? `die ${n.plural}` : 'nincs többes száma') : 'csak többes számú'; }
  if (w.pos === 'verb') return VERB[w.id].notation;
  if (ADJ[w.id] && ADJ[w.id].gradable === 'igen') return `${ADJ[w.id].comparative} – ${ADJ[w.id].superlative}`;
  return '';
}
function afterCards() { if (FC && FC.i < FC.deck.length && S.settings.autoSpeak) speak(deLabel(FC.deck[FC.i])); }
function fcAnswer(known) {
  const w = FC.deck[FC.i]; record({ wordId: w.id }, known);
  if (known) { FC.known++; S.prog.xp += 2; const dk = dayKey(); S.prog.days[dk] = (S.prog.days[dk] || 0) + 2; SFX.ok(); const r = $('#fc').getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 16); } else SFX.flip();
  save(); FC.i++; go('cards');
}

/* ================= Szótár ================= */
let DQ = { q: '', pos: 'all', lesson: null };
function rDict() {
  if (!DQ.lesson) DQ.lesson = S.settings.lesson;
  const chip = (k, v, t) => `<button data-${k}="${v}" class="${DQ[k] === v ? 'on' : ''}">${t}</button>`;
  return `<div class="view with-nav"><h1>Szótár</h1>
  <div class="search">${I.search}<input id="dq" type="search" placeholder="Keresés németül vagy magyarul" value="${esc(DQ.q)}" autocomplete="off"></div>
  <div class="chips">${chip('lesson', '1', '1. lecke')}${chip('lesson', '2', '2. lecke')}${chip('lesson', 'all', 'Mindkettő')}<span style="width:8px;flex:none"></span>${chip('pos', 'all', 'Mind')}${chip('pos', 'noun', 'Főnév')}${chip('pos', 'verb', 'Ige')}${chip('pos', 'adj', 'Melléknév')}${chip('pos', 'expression', 'Kifejezés')}${chip('pos', 'fav', 'Kedvencek')}</div>
  <div class="wl" id="wl"></div></div>`;
}
function dictList() {
  const q = DQ.q.trim().toLowerCase();
  const fav = new Set(S.prog.fav);
  const list = D.words.filter(w => (DQ.lesson === 'all' || String(w.lesson) === DQ.lesson) &&
    (DQ.pos === 'all' || (DQ.pos === 'adj' ? ['adjective', 'adverb', 'conjunction', 'preposition', 'pronoun'].includes(w.pos) : DQ.pos === 'fav' ? fav.has(w.id) : w.pos === DQ.pos)) &&
    (!q || deLabel(w).toLowerCase().includes(q) || w.hu.toLowerCase().includes(q)));
  $('#wl').innerHTML = list.length ? list.map(w => { const b = wRec(w.id).b; return `<button class="wi" data-word="${w.id}"><div class="txt"><div class="w1">${deHtml(w)}</div><div class="w2">${esc(w.hu)}</div></div>${fav.has(w.id) ? I.favOn.replace('<svg', '<svg style="width:18px;height:18px"') : ''}<div class="dots" aria-label="Tudás: ${b}/5">${[0, 1, 2, 3, 4].map(i => `<i class="${i < b ? 'on' : ''}"></i>`).join('')}</div></button>`; }).join('')
    : `<div class="empty">${DQ.pos === 'fav' ? 'Még nincs kedvenc szavad. Nyiss meg egy szót, és jelöld meg csillaggal.' : 'Nincs találat. Próbáld más szóval, vagy válts leckét.'}</div>`;
}
function afterDict() { dictList(); const i = $('#dq'); i.addEventListener('input', () => { DQ.q = i.value; dictList(); }); }
function wordDetail(id) {
  const w = W[id], fav = S.prog.fav.includes(id), r = wRec(id);
  let body = '';
  if (w.pos === 'noun') { const n = NOUN[id]; body = `<table class="ctable"><tr><th>Névelő</th><th>Egyes szám</th><th>Többes szám</th></tr><tr><td class="art-${n.singular ? n.article : 'die'}">${n.singular ? n.article : 'die'}</td><td class="de">${esc(n.singular || '–')}</td><td class="de">${esc(n.plural || '–')}</td></tr></table>`; }
  if (w.pos === 'verb') {
    const v = VERB[id];
    body = `<div class="mt de" style="font-size:17px">${esc(v.notation)}</div>${v.rection ? `<div class="muted small">Vonzat: ${esc(v.rection)}</div>` : ''}${v.reflexive ? `<div class="muted small">Visszaható (${v.reflexive === 'akk' ? 'mich, dich, sich…' : 'mir, dir, sich…'})</div>` : ''}
    <table class="ctable"><tr><th></th><th>Präsens</th><th>Präteritum</th><th>Perfekt</th></tr>${PERS.map(p => `<tr><th>${PRON[p].split('/')[0]}</th><td class="de">${esc(verbForm(v, 'praes', p))}</td><td class="de">${esc(verbForm(v, 'praet', p))}</td><td class="de">${esc(verbForm(v, 'perf', p))}</td></tr>`).join('')}</table>`;
  }
  if (ADJ[id] && ADJ[id].gradable === 'igen') { const a = ADJ[id]; body = `<table class="ctable"><tr><th>Alapfok</th><th>Középfok</th><th>Felsőfok</th></tr><tr><td class="de">${esc(a.positive)}</td><td class="de">${esc(a.comparative)}</td><td class="de">${esc(a.superlative)}</td></tr></table>`; }
  const ex = (ITEMS_BY_WORD[id] || []).slice(0, 3);
  openModal(`<div class="modal"><div class="grab"></div>
  <div class="row"><div class="spacer"><div class="dword">${deHtml(w)}</div><div style="font-size:18px;margin-top:4px">${esc(w.hu)}</div></div>${sayBtn(deLabel(w))}<button class="iconbtn" data-fav="${id}" aria-label="Kedvenc">${fav ? I.favOn : I.fav}</button></div>
  <div class="qsub"><span class="tag">${POS_HU[w.pos]}</span><span class="tag">${w.section} szakasz</span><span class="tag">Tudás: ${r.b}/5</span>${r.c + r.w ? `<span class="tag">${r.c} jó, ${r.w} rossz</span>` : ''}</div>
  ${body}
  ${ex.length ? `<h3 class="mt">Példamondatok</h3>${ex.map(e => `<div class="ex"><div class="row"><div class="spacer de">${esc(e.full_sentence_de)}</div>${sayBtn(e.full_sentence_de)}</div><div class="muted small">${esc(e.hu || '')}</div></div>`).join('')}` : ''}
  <button class="btn ghost mt" data-act="mclose">Bezárás</button></div>`);
}

/* ================= Haladás ================= */
const ACH = [
  { id: 'first', t: 'Első kör', d: 'Fejezz be egy kört.', ok: p => p.games >= 1 },
  { id: 'perfect', t: 'Hibátlan', d: 'Egy kör hiba nélkül.', ok: p => p.perfect >= 1 },
  { id: 'combo5', t: 'Sorozat', d: '5 jó válasz egymás után.', ok: p => p.bestCombo >= 5 },
  { id: 'combo10', t: 'Megállíthatatlan', d: '10 jó válasz egymás után.', ok: p => p.bestCombo >= 10 },
  { id: 'xp500', t: '500 XP', d: 'Gyűjts 500 XP-t.', ok: p => p.xp >= 500 },
  { id: 'xp2000', t: '2000 XP', d: 'Gyűjts 2000 XP-t.', ok: p => p.xp >= 2000 },
  { id: 'streak3', t: '3 nap', d: '3 egymást követő nap.', ok: p => curStreak() >= 3 },
  { id: 'streak7', t: 'Egy hét', d: '7 egymást követő nap.', ok: p => curStreak() >= 7 },
  { id: 'allmodes', t: 'Mindenes', d: 'Mind az 5 játékmód.', ok: p => ['vocab', 'form', 'verb', 'situation', 'order'].every(m => p.modes[m]) },
  { id: 'm50', t: '50 biztos szó', d: '50 szó 3+ tudásszinten.', ok: p => D.words.filter(w => mastered(w.id)).length >= 50 },
  { id: 'l1', t: '1. lecke mestere', d: 'Az 1. lecke szavainak 80%-a.', ok: () => lessonPct('1') >= .8 },
  { id: 'l2', t: '2. lecke mestere', d: 'A 2. lecke szavainak 80%-a.', ok: () => lessonPct('2') >= .8 }
];
function lessonPct(l) { const ws = D.words.filter(w => String(w.lesson) === l); return ws.filter(w => mastered(w.id)).length / ws.length; }
function checkAch() { const out = []; ACH.forEach(a => { if (!S.prog.ach[a.id] && a.ok(S.prog)) { S.prog.ach[a.id] = dayKey(); out.push(a); } }); return out; }
function rStats() {
  const p = S.prog, acc = p.answered ? Math.round(p.correct / p.answered * 100) : 0;
  const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push({ k: dayKey(d), l: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'][d.getDay()] }); }
  const mx = Math.max(S.settings.dailyGoal, ...days.map(d => p.days[d.k] || 0));
  const hard = Object.entries(p.words).filter(([id, r]) => r.w > 0 && W[id]).sort((a, b) => (b[1].w - b[1].c) - (a[1].w - a[1].c)).slice(0, 8);
  return `<div class="view with-nav"><h1>Haladás</h1>
  <div class="kpis"><div class="kpi"><b>${levelOf(p.xp)}.</b><span>szint, ${p.xp} XP</span></div><div class="kpi"><b>${curStreak()}</b><span>napos sorozat</span></div><div class="kpi"><b>${acc}%</b><span>pontosság, ${p.answered} válasz</span></div><div class="kpi"><b>${p.games}</b><span>lejátszott kör</span></div></div>
  <h3 class="mt2">Az elmúlt 7 nap</h3><div class="week">${days.map(d => `<div><i class="${d.k === dayKey() ? 'today' : ''}" style="height:${Math.round((p.days[d.k] || 0) / mx * 80)}px"></i><span>${d.l}</span></div>`).join('')}</div>
  <h3 class="mt2">Leckék</h3>${['1', '2'].map(l => { const ws = D.words.filter(w => String(w.lesson) === l), m = ws.filter(w => mastered(w.id)).length; return `<div class="prog-row"><div class="row"><span class="spacer">${l}. ${esc(D.meta.lessons[l])}</span><b>${m} / ${ws.length}</b></div><div class="bar"><i style="width:${m / ws.length * 100}%"></i></div></div>`; }).join('')}
  <h3 class="mt2">Játékmódok</h3>${['vocab', 'form', 'verb', 'situation', 'order', 'mix'].map(k => { const m = p.modes[k]; const a = m && m.n ? Math.round(m.c / m.n * 100) : 0; return `<div class="prog-row"><div class="row"><span class="spacer">${MODES[k].name}</span><span class="muted small">${m ? m.played + ' kör, ' + a + '%' : 'még nem játszottál'}</span></div><div class="bar"><i style="width:${a}%;background:var(--ok)"></i></div></div>`; }).join('')}
  <h3 class="mt2">Jelvények</h3><div class="achs">${ACH.map(a => `<div class="ach ${p.ach[a.id] ? '' : 'locked'}">${I.medal}<b>${a.t}</b><span class="muted">${a.d}</span></div>`).join('')}</div>
  ${hard.length ? `<h3 class="mt2">Legnehezebb szavaid</h3><div class="wl">${hard.map(([id, r]) => `<button class="wi" data-word="${id}"><div class="txt"><div class="w1">${deHtml(W[id])}</div><div class="w2">${esc(W[id].hu)}</div></div><span class="muted small">${r.w} hiba</span></button>`).join('')}</div>` : ''}
  </div>`;
}

/* ================= Beállítások ================= */
function rSettings() {
  const st = S.settings;
  const seg = (k, vals) => `<div class="seg" data-set="${k}">${vals.map(([v, t]) => `<button data-v="${v}" class="${String(st[k]) === String(v) ? 'on' : ''}">${t}</button>`).join('')}</div>`;
  const sw = (k, t, d) => `<div class="set-row"><div class="lbl">${t}${d ? `<small>${d}</small>` : ''}</div><button class="sw ${st[k] ? 'on' : ''}" data-sw="${k}" role="switch" aria-checked="${!!st[k]}" aria-label="${t}"></button></div>`;
  const secOpts = SECTIONS.filter(s => st.lesson === 'all' || s[0] === st.lesson);
  return `<div class="view with-nav"><h1>Beállítások</h1>
  <div class="set-group"><h3>Tanulás</h3><div class="set">
   <div class="set-row col"><div class="lbl">Lecke</div>${seg('lesson', [['1', '1. lecke'], ['2', '2. lecke'], ['all', 'Mindkettő']])}</div>
   <div class="set-row col"><div class="lbl">Szakaszok<small>Ha egyet sem jelölsz ki, a lecke összes szakasza szerepel.</small></div><div class="chips" style="flex-wrap:wrap;padding-top:4px">${secOpts.map(s => `<button data-sec="${s}" class="${st.sections.includes(s) ? 'on' : ''}">${s} ${esc(D.meta.sections[s])}</button>`).join('')}</div></div>
   <div class="set-row col"><div class="lbl">Kérdések egy körben</div>${seg('qCount', [[5, '5'], [10, '10'], [15, '15'], [20, '20']])}</div>
   <div class="set-row col"><div class="lbl">Napi cél</div>${seg('dailyGoal', [[20, '20 XP'], [50, '50 XP'], [100, '100 XP'], [200, '200 XP']])}</div>
  </div></div>
  <div class="set-group"><h3>Játék</h3><div class="set">
   <div class="set-row col"><div class="lbl">Életek száma</div>${seg('lives', [[3, '3'], [5, '5'], [0, 'Végtelen']])}</div>
   <div class="set-row col"><div class="lbl">Időkorlát kérdésenként</div>${seg('timer', [[0, 'Nincs'], [30, '30 mp'], [15, '15 mp'], [8, '8 mp']])}</div>
   ${sw('showHu', 'Magyar segítség', 'Szituációk fordítása és jelentés-tippek')}
  </div></div>
  <div class="set-group"><h3>Hang és rezgés</h3><div class="set">
   ${sw('sound', 'Hangeffektek')}${sw('haptics', 'Rezgés')}${sw('autoSpeak', 'Automatikus felolvasás', 'A német szó vagy mondat elhangzik magától')}
   <div class="set-row"><div class="lbl">Felolvasás kipróbálása</div><button class="btn ghost" style="width:auto;min-height:42px;font-size:16px" data-say="Hallo! Ich bin Brezi.">Teszt</button></div>
  </div></div>
  <div class="set-group"><h3>Megjelenés</h3><div class="set">
   <div class="set-row col"><div class="lbl">Téma</div>${seg('theme', [['system', 'Rendszer'], ['light', 'Világos'], ['dark', 'Sötét']])}</div>
   <div class="set-row col"><div class="lbl">Neved</div><input class="textin" id="set-name" maxlength="20" value="${esc(st.name)}" placeholder="A neved"></div>
  </div></div>
  <div class="set-group"><h3>Adatok</h3><div class="set">
   <button class="set-row" style="width:100%;text-align:left" data-act="reset"><span class="lbl danger">Haladás törlése</span></button>
   <div class="set-row"><div class="lbl">Brezi 1.0<small>${D.words.length} szó, ${D.items.length} példamondat, Modul 1, 1–2. lecke</small></div></div>
  </div></div></div>`;
}

/* ================= Modális ablak ================= */
function openModal(html, center) {
  closeModal(true);
  const bg = document.createElement('div'); bg.className = 'modal-bg' + (center ? ' c' : ''); bg.innerHTML = html;
  $('#layer').appendChild(bg); modalOpen = bg; requestAnimationFrame(() => bg.classList.add('show'));
  bg.addEventListener('click', e => { if (e.target === bg) closeModal(); });
}
function closeModal(instant) {
  if (!modalOpen) return; const m = modalOpen; modalOpen = null;
  if (instant) m.remove(); else { m.classList.remove('show'); setTimeout(() => m.remove(), 220); }
}

/* ================= Eseménykezelés ================= */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-play],[data-act],[data-opt],[data-l],[data-say],[data-word],[data-fav],[data-sw],[data-v],[data-sec],[data-lesson],[data-pos]');
  if (!t) return;
  const d = t.dataset;
  if (d.say !== undefined) { e.stopPropagation(); speak(d.say); return; }
  if (d.go) { if (d.go === 'cards') FC = null; SFX.tap(); go(d.go); return; }
  if (d.play) { SFX.tap(); startGame(d.play); return; }
  if (d.opt !== undefined && G && !G.answered) { answer(d.opt, t); return; }
  if (d.word) { wordDetail(d.word); return; }
  if (d.fav) { const f = S.prog.fav, i = f.indexOf(d.fav); if (i >= 0) f.splice(i, 1); else { f.push(d.fav); haptic('ok'); } save(); t.innerHTML = f.includes(d.fav) ? I.favOn : I.fav; if (cur === 'dict') dictList(); return; }
  if (d.sw) { S.settings[d.sw] = !S.settings[d.sw]; t.classList.toggle('on'); t.setAttribute('aria-checked', S.settings[d.sw]); save(); if (d.sw === 'sound' && S.settings.sound) SFX.ok(); if (d.sw === 'haptics') haptic('big'); return; }
  if (d.v !== undefined && t.parentElement.dataset.set) {
    const k = t.parentElement.dataset.set, num = ['qCount', 'lives', 'timer', 'dailyGoal'].includes(k);
    S.settings[k] = num ? Number(d.v) : d.v; save(); SFX.tap();
    if (k === 'theme') applyTheme();
    if (k === 'lesson') { DQ.lesson = null; go('settings'); return; }
    $$('button', t.parentElement).forEach(b => b.classList.toggle('on', b === t)); return;
  }
  if (d.sec) { const s = S.settings.sections, i = s.indexOf(d.sec); i >= 0 ? s.splice(i, 1) : s.push(d.sec); t.classList.toggle('on'); save(); return; }
  if (d.lesson) { DQ.lesson = d.lesson; $$('[data-lesson]').forEach(b => b.classList.toggle('on', b === t)); dictList(); return; }
  if (d.pos) { DQ.pos = d.pos; $$('[data-pos]').forEach(b => b.classList.toggle('on', b === t)); dictList(); return; }
  if (d.l) {
    $$('[data-l]', t.parentElement).forEach(b => b.classList.toggle('on', b === t)); S.settings.lesson = d.l; save(); SFX.tap();
    if (cur === 'home') go('home'); return;
  }
  switch (d.act) {
    case 'onb-go': S.settings.name = $('#onb-name').value.trim(); S.onboarded = true; save(); go('home'); break;
    case 'next': next(); break;
    case 'quit': confirmQuit(); break;
    case 'quit-yes': G = null; go('home'); break;
    case 'mclose': closeModal(); break;
    case 'again': startGame(G.focus ? G.mode : G.mode, G.focus ? mistakeSets() : null); break;
    case 'mistakes': { const f = mistakeSets(); if (!f.w.size && !f.i.size) { toast('Nincs hibás szavad. Így tovább!'); break; } startGame('mix', f); break; }
    case 'favplay': { if (!S.prog.fav.length) { toast('Jelölj meg szavakat csillaggal a Szótárban.'); break; } const prevL = S.settings.lesson, prevS = S.settings.sections; S.settings.lesson = 'all'; S.settings.sections = []; startGame('vocab', { w: new Set(S.prog.fav), i: new Set() }); S.settings.lesson = prevL; S.settings.sections = prevS; break; }
    case 'flip': $('#fc').classList.toggle('flip'); SFX.flip(); break;
    case 'fc-yes': fcAnswer(true); break;
    case 'fc-no': fcAnswer(false); break;
    case 'cards-again': FC = null; go('cards'); break;
    case 'cards-home': FC = null; go('home'); break;
    case 'ord-check': checkOrder(false); break;
    case 'ord-reset': if (!G.answered) { $$('#ord-ans .tok').forEach(tk => $('#ord-pool').appendChild(tk)); $('#ord-check').disabled = true; } break;
    case 'showhu': t.nextElementSibling.hidden = false; t.remove(); break;
    case 'reset': openModal(`<div class="modal center"><h2>Törlöd a haladást?</h2><p class="muted">Az XP, a sorozat, a jelvények és a szavak tudásszintje is törlődik. A beállítások megmaradnak.</p><button class="btn bad" data-act="reset-yes">Törlés</button><button class="btn ghost mt" data-act="mclose">Mégse</button></div>`, true); break;
    case 'reset-yes': S.prog = defProg(); save(); closeModal(); toast('A haladás törölve.'); break;
  }
});
document.addEventListener('input', e => { if (e.target.id === 'set-name') { S.settings.name = e.target.value.trim(); save(); } });
document.addEventListener('keydown', e => {
  if (cur === 'game' && G && !G.answered && G.q.kind === 'mc' && /^[1-4]$/.test(e.key)) { const b = $$('.opt')[+e.key - 1]; if (b) answer(b.dataset.opt, b); }
  else if (cur === 'game' && G && G.answered && e.key === 'Enter') next();
});
/* A modális lapok a modális rétegben vannak, de a játék közbeni szövegek a fő nézetben – a rétegre is figyelünk. */

/* Android vissza gomb */
function onBack() {
  if (modalOpen) return closeModal();
  if ($('.levelup')) return $('.levelup').remove();
  if (cur === 'game') return confirmQuit();
  if (cur === 'onboarding') return P.App && P.App.exitApp();
  if (cur !== 'home') { FC = null; return go('home'); }
  if (P.App) P.App.exitApp();
}
try { if (P.App) P.App.addListener('backButton', onBack); } catch (e) {}
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });

/* Indulás */
const startScreen = S.onboarded ? 'home' : 'onboarding';
go(startScreen);
window.__brezi = { S, go, startGame, mascot, get G() { return G; } };
})();
