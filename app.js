// ========== CONSTANTS ==========
const BASES = {
  English:       { id: 'appoL1kdbV0UyLwL4' },
  Ausbildung:    { id: 'appNCTwB49kyXbR1V' },
  'Tokutei Ginou': { id: 'app81I9rWfsU9PjVv' },
};

// Program tampilan (bisa beda dari base — English base dipecah jadi 2 program)
const PROGRAM_META = {
  'WA Blue Collar':  { baseKey: 'English',        color: '#378ADD', bg: '#E6F1FB', dk: '#0C447C' },
  'WA White Collar': { baseKey: 'English',        color: '#534AB7', bg: '#EEEDFE', dk: '#26215C' },
  'Ausbildung':      { baseKey: 'Ausbildung',     color: '#993C1D', bg: '#FAECE7', dk: '#712B13' },
  'Tokutei Ginou':   { baseKey: 'Tokutei Ginou',  color: '#0F6E56', bg: '#E1F5EE', dk: '#04342C' },
};
const PROGRAM_KEYS = Object.keys(PROGRAM_META);

function progSlug(p) { return String(p).replace(/[^a-zA-Z0-9]/g, ''); }

// Tentukan program tampilan dari record mentah Airtable berdasarkan field "Program"
function resolveProgram(baseKey, rawRecord) {
  if (baseKey === 'English') {
    const val = (rawRecord.fields['Program'] || '').toString().toLowerCase();
    if (val.includes('white')) return 'WA White Collar';
    return 'WA Blue Collar';
  }
  return baseKey;
}

const STATUS = {
  'Submitted':         { label: 'Submitted',        bg: '#F1EFE8', color: '#5F5E5A', dk: '#2C2C2A' },
  'Docs Screening':    { label: 'Docs Screening',   bg: '#E6F1FB', color: '#378ADD', dk: '#0C447C' },
  'Partner Interview': { label: 'Partner Interview', bg: '#EEEDFE', color: '#534AB7', dk: '#26215C' },
  'User Interview':    { label: 'User Interview',   bg: '#E1F5EE', color: '#0F6E56', dk: '#04342C' },
  'Job Offer':         { label: 'Job Offer',        bg: '#FAEEDA', color: '#BA7517', dk: '#412402' },
  'Work Permit':       { label: 'Work Permit',      bg: '#EAF3DE', color: '#639922', dk: '#173404' },
  'Visa':              { label: 'Visa',             bg: '#F0EAFA', color: '#7B3DB5', dk: '#3D1260' },
  'Flew':              { label: 'Flew',             bg: '#E0F4FF', color: '#0077B6', dk: '#004A73' },
  'LoA':               { label: 'LoA',             bg: '#FFF3E0', color: '#E65100', dk: '#8D3200' },
  'Rejected':          { label: 'Rejected',         bg: '#FCEBEB', color: '#A32D2D', dk: '#501313' },
};
const STATUS_KEYS = Object.keys(STATUS);


// ========== PROGRAM FIELD CONFIG ==========
const PROG_CONFIG = {
  'WA Blue Collar': {
    mitra:   '[31] List Mitra (from Job ID (Sync))',
    company: 'Company Name (from Job ID (Sync))',
    jobRole: 'Job Role (from Job ID (Sync))', jobSource: 'Job Source (from Job ID (Sync))', country: 'Country',
    prevStatus: 'Prev Status ID', needProcess: 'Need Process',
    konfirmasi: 'Konfirmasi Pendaftaran',
    docs: [
      { label: 'CV', field: 'CV (PDF)', icon: 'ti-file-text' },
      { label: 'Paspor', field: 'Paspor', icon: 'ti-file-text' },
      { label: 'Sertifikat Bhs Inggris', field: 'Sertifikat Bahasa Inggris (PDF)', icon: 'ti-certificate' },
      { label: 'Recommendation Letter', field: 'Recommendation Letter (PDF)', icon: 'ti-file-text' },
      { label: 'Motivation Letter', field: 'Motivation Letter (PDF)', icon: 'ti-file-text' },
      { label: 'Study Plan', field: 'Study Plan (PDF)', icon: 'ti-file-text' },
      { label: 'Research Plan', field: 'Research Plan (PDF)', icon: 'ti-file-text' },
      { label: 'Ijazah Terakhir', field: 'Ijazah Pendidikan Terakhir (PDF)', icon: 'ti-school' },
      { label: 'Transkrip Nilai', field: 'Transkrip Nilai Pendidikan Terakhir (PDF)', icon: 'ti-clipboard-list' },
      { label: 'Language Proficiency', field: 'Language Proficiency Test (IELTS, TOEFL iBT, TOPIK, JLPT, etc)', icon: 'ti-language' },
    ],
    urls: [{ label: 'LinkedIn', field: 'Link Linkedin', icon: 'ti-brand-linkedin' }],
    special: []
  },
  'WA White Collar': {
    mitra:   '[31] List Mitra (from Job ID (Sync))',
    company: 'Company Name (from Job ID (Sync))',
    jobRole: 'Job Role (from Job ID (Sync))', jobSource: 'Job Source (from Job ID (Sync))', country: 'Country',
    prevStatus: 'Prev Status ID', needProcess: 'Need Process',
    konfirmasi: 'Konfirmasi Pendaftaran',
    docs: [
      { label: 'CV', field: 'CV (PDF)', icon: 'ti-file-text' },
      { label: 'Paspor', field: 'Paspor', icon: 'ti-file-text' },
      { label: 'Sertifikat Bhs Inggris', field: 'Sertifikat Bahasa Inggris (PDF)', icon: 'ti-certificate' },
      { label: 'Recommendation Letter', field: 'Recommendation Letter (PDF)', icon: 'ti-file-text' },
      { label: 'Motivation Letter', field: 'Motivation Letter (PDF)', icon: 'ti-file-text' },
      { label: 'Study Plan', field: 'Study Plan (PDF)', icon: 'ti-file-text' },
      { label: 'Research Plan', field: 'Research Plan (PDF)', icon: 'ti-file-text' },
      { label: 'Ijazah Terakhir', field: 'Ijazah Pendidikan Terakhir (PDF)', icon: 'ti-school' },
      { label: 'Transkrip Nilai', field: 'Transkrip Nilai Pendidikan Terakhir (PDF)', icon: 'ti-clipboard-list' },
      { label: 'Language Proficiency', field: 'Language Proficiency Test (IELTS, TOEFL iBT, TOPIK, JLPT, etc)', icon: 'ti-language' },
    ],
    urls: [{ label: 'LinkedIn', field: 'Link Linkedin', icon: 'ti-brand-linkedin' }],
    special: []
  },
  Ausbildung: {
    mitra:   '[31] List Mitra (from Job ID (Sync))',
    company: 'Company Name (from Job ID (Sync))',
    jobRole: 'Job Role (from Job ID (Sync))', jobSource: 'Job Source (from Job ID (Sync))', country: 'Country',
    prevStatus: 'Prev Status ID', needProcess: 'Need Process',
    konfirmasi: 'Konfirmasi Pendaftaran',
    docs: [
      { label: 'CV', field: 'CV (PDF)', icon: 'ti-file-text' },
      { label: 'Paspor', field: 'Paspor', icon: 'ti-file-text' },
      { label: 'Sertifikat Bhs Jerman', field: 'Sertifikat Bahasa Jerman (PDF)', icon: 'ti-certificate' },
      { label: 'Sertifikat Keahlian', field: 'Sertifikat Keahlian (PDF)', icon: 'ti-award' },
      { label: 'Motivation Letter', field: 'Motivation Letter (PDF)', icon: 'ti-file-text' },
      { label: 'Video Perkenalan', field: 'Video Perkenalan (Mp4)', icon: 'ti-video' },
      { label: 'Tanda Tangan', field: 'Tanda Tangan (JPG/PNG)', icon: 'ti-signature' },
      { label: 'KTP', field: 'KTP (JPG/PNG)', icon: 'ti-id' },
      { label: 'KK', field: 'KK (JPG/PNG)', icon: 'ti-users' },
      { label: 'Dokumen Apostille', field: 'Dokumen Apostille (Akta Lahir & Ijazah)', icon: 'ti-file-certificate' },
      { label: 'Terjemahan Tersumpah', field: 'Terjemahan Tersumpah Akta Lahir & Ijazah', icon: 'ti-file-text' },
    ],
    urls: [],
    special: []
  },
  'Tokutei Ginou': {
    mitra:   '[31] List Mitra (from Job ID (Sync))',
    company: 'Company Name (from Job ID (Sync))',
    jobRole: 'Job Role (from Job ID (Sync))', jobSource: 'Job Source (from Job ID (Sync))', country: 'Country',
    prevStatus: 'Prev Status ID', needProcess: 'Need Process',
    konfirmasi: 'Konfirmasi Pendaftaran',
    docs: [
      { label: 'CV', field: 'CV (PDF)', icon: 'ti-file-text' },
      { label: 'Paspor', field: 'Paspor', icon: 'ti-file-text' },
      { label: 'KTP', field: 'KTP (JPG/PNG)', icon: 'ti-id' },
      { label: 'Ijazah SMA/SMK', field: 'Ijazah SMA/SMK (PDF)', icon: 'ti-school' },
      { label: 'Pas Foto Resmi', field: 'Pas Foto Resmi (JPG/PNG)', icon: 'ti-user-circle' },
      { label: 'Akta Lahir', field: 'Akta Lahir (PDF)', icon: 'ti-file-text' },
      { label: 'Sertifikat JLPT/JFT', field: 'Sertifikat Bahasa JLPT/JFT (PDF)', icon: 'ti-certificate' },
      { label: 'Sertifikat SSW', field: 'Sertifikat SSW (PDF)', icon: 'ti-award' },
    ],
    urls: [{ label: 'LinkedIn', field: 'Link LinkedIn', icon: 'ti-brand-linkedin' }],
    special: [
      { label: 'Username JLPT', field: 'Username JLPT', isPass: false },
      { label: 'Password JLPT', field: 'Password JLPT', isPass: true },
      { label: 'Username JFT',  field: 'Username JFT',  isPass: false },
      { label: 'Password JFT',  field: 'Password JFT',  isPass: true },
    ]
  }
};

// ========== KONFIGURASI DEFAULT (sudah di-embed, tidak perlu setting manual lagi) ==========
// PENTING: isi apiToken di bawah ini SEKALI sebelum upload ke GitHub/Netlify.
// Siapapun yang punya link bisa lihat token ini lewat "View Page Source",
// jadi pastikan token hanya punya scope read+write ke 3 base ini saja.
const DEFAULT_CFG = {
  apiToken: 'PASTE_AIRTABLE_TOKEN_KAMU_DI_SINI',
  password: 'workabroad2026',
  tblEnglish: 'Job Apply',
  tblAusbildung: 'Job Apply',
  tblTokutei: 'Job Apply',
  sheetsUrl: 'https://script.google.com/macros/s/AKfycbx6f1FRc1d6-5ueUXEiVXN_jfvNH6UulVOFbzv61oriay_bAnw0IIMK7i7tQbaQnWFp/exec',
  changedBy: 'workabroadacademy@schoters.com',
};

// ========== STATE ==========
let cfg = {};
let students = [];
let progFilter = 'all';
let statusFilter = 'all';
let search = '';
let saving = false;
let filterJobRole = 'all';
let filterJobSource = 'all';
let filterMitra = 'all';
let viewMode = 'list'; // 'list' or 'student'

// ========== CONFIG ==========
function loadCfg() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('jt_cfg') || '{}'); } catch { saved = {}; }
  cfg = { ...DEFAULT_CFG };
  for (const k in saved) {
    if (saved[k] !== '' && saved[k] !== null && saved[k] !== undefined) cfg[k] = saved[k];
  }
}
function saveCfg() { localStorage.setItem('jt_cfg', JSON.stringify(cfg)); }
function isConfigured() {
  return cfg.apiToken && (cfg.tblEnglish || cfg.tblAusbildung || cfg.tblTokutei);
}
function fld(name) { return cfg['fld_' + name] || name; }

// ========== AUTH ==========
function tryLogin() {
  const p = document.getElementById('pass-inp').value;
  const stored = cfg.password || 'workabroad2026';
  const errEl = document.getElementById('login-err');
  if (p === stored) {
    errEl.style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    initApp();
  } else {
    errEl.style.display = 'flex';
  }
}
function logout() {
  document.getElementById('app-screen').style.display = 'none';
  document.getElementById('login-screen').style.display = '';
  document.getElementById('pass-inp').value = '';
}

// ========== API ==========
async function fetchPage(baseId, table, offset) {
  let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?pageSize=100`;
  if (offset) url += `&offset=${offset}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${cfg.apiToken}` } });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}
async function fetchAll(baseId, table) {
  let recs = [], offset;
  do {
    const d = await fetchPage(baseId, table, offset);
    recs = recs.concat(d.records);
    offset = d.offset;
  } while (offset);
  return recs;
}
async function patchRecord(baseId, table, id, fields) {
  const r = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${cfg.apiToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

// ========== DATA HELPERS ==========
function sf(rec, key) {
  const v = rec.fields[key];
  if (!v) return '';
  if (Array.isArray(v)) return v.map(x => x.name || x).filter(Boolean).join(', ');
  return String(v);
}
function photoUrl(rec, key) {
  const v = rec.fields[key];
  if (!Array.isArray(v) || !v[0]) return null;
  return v[0].thumbnails?.large?.url || v[0].url;
}
function attachments(rec, key) {
  const v = rec.fields[key];
  if (!Array.isArray(v)) return [];
  return v.map(a => ({ name: a.filename, url: a.url }));
}
function initials(name) {
  return (name || '?').split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
}
function avatarHtml(rec, size = 32) {
  const fn = fld('Photo');
  const url = photoUrl(rec, fn);
  const name = sf(rec, fld('Name')) || '?';
  const s = `width:${size}px;height:${size}px;border-radius:50%;background:var(--blue-bg);display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.35)}px;font-weight:600;color:var(--blue-dk);flex-shrink:0;overflow:hidden`;
  if (url) return `<div style="${s}"><img src="${url}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='${initials(name)}'"></div>`;
  return `<div style="${s}">${initials(name)}</div>`;
}
function badgeHtml(status) {
  if (!status) return `<span class="badge" style="background:var(--bg3);color:var(--text3)">—</span>`;
  const m = STATUS[status];
  if (!m) return `<span class="badge" style="background:var(--bg3);color:var(--text3)">${status}</span>`;
  return `<span class="badge" style="background:${m.bg};color:${m.dk}">${m.label}</span>`;
}

// ========== LOAD DATA ==========
async function loadData() {
  if (!isConfigured()) { renderAll(); return; }
  const btn = document.getElementById('refresh-btn');
  btn.disabled = true; btn.innerHTML = '<i class="ti ti-refresh" style="animation:spin .7s linear infinite"></i> Loading...';
  students = [];
  const pairs = [
    ['English',        cfg.tblEnglish],
    ['Ausbildung',     cfg.tblAusbildung],
    ['Tokutei Ginou',  cfg.tblTokutei],
  ].filter(([,t]) => t);
  const results = await Promise.allSettled(
    pairs.map(([baseKey, tbl]) =>
      fetchAll(BASES[baseKey].id, tbl).then(recs => recs.map(r => {
        const prog = resolveProgram(baseKey, r);
        return { ...r, _prog: prog, _base: BASES[baseKey].id, _tbl: tbl };
      }))
    )
  );
  let errs = [];
  for (const r of results) {
    if (r.status === 'fulfilled') students = students.concat(r.value);
    else errs.push(r.reason?.message);
  }
  btn.disabled = false; btn.innerHTML = '<i class="ti ti-refresh"></i> Refresh';
  if (errs.length) showToast('Error: ' + errs[0], 'err');
  else showToast(`${students.length} student dimuat`, 'ok');
  renderAll();
}

// ========== FILTERS ==========
function filtered() {
  return students.filter(s => {
    const status    = sf(s, fld('Apply Status'));
    const name      = sf(s, fld('Name'));
    const email     = sf(s, fld('Email')) || sf(s, 'Final Email');
    const jobRole   = sf(s, 'Job Role (from Job ID (Sync))');
    const jobSource = sf(s, 'Job Source (from Job ID (Sync))');
    const mitra     = sf(s, '[31] List Mitra (from Job ID (Sync))');
    if (progFilter !== 'all' && s._prog !== progFilter) return false;
    if (statusFilter !== 'all' && status !== statusFilter) return false;
    if (filterJobRole !== 'all' && jobRole !== filterJobRole) return false;
    if (filterJobSource !== 'all' && jobSource !== filterJobSource) return false;
    if (filterMitra !== 'all' && mitra !== filterMitra) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!name.toLowerCase().includes(q) && !email.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function uniqueVals(fieldName) {
  const vals = new Set();
  students.forEach(s => { const v = sf(s, fieldName); if (v && v !== '—') vals.add(v); });
  return [...vals].sort();
}

function getStudentGroups(list) {
  const groups = new Map();
  list.forEach(s => {
    const key = sf(s, fld('Email')) || sf(s, 'Final Email') || s.id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  });
  return groups;
}

function getConsolidatedDocs(records) {
  const result = {};
  records.forEach(s => {
    const pc = PROG_CONFIG[s._prog];
    if (!pc) return;
    [...pc.docs, ...pc.urls].forEach(d => {
      if (!result[d.label]) result[d.label] = { label: d.label, field: d.field, icon: d.icon || 'ti-file-text', found: false, url: null, isUrl: !!d.field?.match?.(/linkedin/i) };
      if (!result[d.label].found) {
        const files = attachments(s, d.field);
        if (files.length) { result[d.label].found = true; result[d.label].url = files[0].url; return; }
        const urlVal = sf(s, d.field);
        if (urlVal && urlVal.startsWith('http')) { result[d.label].found = true; result[d.label].url = urlVal; }
      }
    });
  });
  return Object.values(result);
}
function setSearch(v) { search = v; renderStudents(); }
function resetFilters() { filterJobRole='all'; filterJobSource='all'; filterMitra='all'; renderStudents(); }
function resetBtnHtml() { return '<button class="chip" onclick="resetFilters()" style="color:var(--red);border-color:var(--red)"><i class=\"ti ti-x\"></i> Reset filter</button>'; }
function filterByProgram(prog, el) {
  progFilter = prog; statusFilter = 'all'; search = '';
  document.querySelector('.search-box input').value = '';
  showPage('students', document.querySelector('[data-page="students"]'));
  renderStudents();
}

// ========== RENDER ALL ==========
function renderAll() {
  const page = document.querySelector('.page.active')?.id?.replace('page-','');
  if (page === 'dashboard') renderDashboard();
  else if (page === 'students') renderStudents();
  else if (page === 'mitra') renderJobSource();
  else if (page === 'settings') renderSettings();
}

// ========== DASHBOARD ==========
function renderDashboard() {
  const el = document.getElementById('dash-inner');
  if (!isConfigured()) { el.innerHTML = noCfgHtml(); return; }
  if (!students.length) { el.innerHTML = '<div class="loading"><div class="spinner"></div><span>Memuat data...</span></div>'; return; }

  const total = students.length;
  const counts = {};
  STATUS_KEYS.forEach(k => counts[k] = students.filter(s => sf(s, fld('Apply Status')) === k).length);
  const progCounts = {};
  Object.keys(PROGRAM_META).forEach(p => progCounts[p] = students.filter(s => s._prog === p).length);
  const maxProg = Math.max(...Object.values(progCounts), 1);

  el.innerHTML = `
  <div class="metrics">
    <div class="metric" onclick="statusFilter='all';showPage('students',document.querySelector('[data-page=students]'))">
      <div class="metric-lbl">Total</div><div class="metric-val">${total}</div><div class="metric-sub">Semua student</div>
    </div>
    ${['Submitted','Docs Screening','Job Offer','Flew','Rejected'].map(k => `
    <div class="metric" onclick="statusFilter='${k}';showPage('students',document.querySelector('[data-page=students]'));renderStudents()">
      <div class="metric-lbl">${STATUS[k].label}</div>
      <div class="metric-val" style="color:${STATUS[k].color}">${counts[k]||0}</div>
      <div class="metric-sub">${((counts[k]||0)/total*100).toFixed(0)}% dari total</div>
    </div>`).join('')}
  </div>
  <div class="two-col">
    <div class="card" style="padding:18px">
      <div class="sect-title">Per Program</div>
      <div class="prog-bars">
        ${Object.entries(PROGRAM_META).map(([prog, b]) => `
        <div class="prog-row">
          <span class="prog-nm">${prog}</span>
          <div class="prog-track"><div class="prog-fill" style="width:${Math.round((progCounts[prog]||0)/maxProg*100)}%;background:${b.color}"></div></div>
          <span class="prog-n">${progCounts[prog]||0}</span>
        </div>`).join('')}
      </div>
      <div style="margin-top:18px" class="sect-title">Per Status</div>
      <div class="prog-bars">
        ${STATUS_KEYS.map(k => `
        <div class="prog-row">
          <span class="prog-nm">${STATUS[k].label}</span>
          <div class="prog-track"><div class="prog-fill" style="width:${Math.round((counts[k]||0)/total*100)}%;background:${STATUS[k].color}"></div></div>
          <span class="prog-n">${counts[k]||0}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card" style="padding:18px">
      <div class="sect-title">Student Terbaru</div>
      <div style="display:flex;flex-direction:column;gap:0">
        ${students.slice(0,8).map(s => {
          const name = sf(s, fld('Name')) || '—';
          const status = sf(s, fld('Apply Status'));
          const b = PROGRAM_META[s._prog];
          return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:0.5px solid var(--border);cursor:pointer" onclick='openModal(${JSON.stringify(s._id||s.id||"")})'>
            ${avatarHtml(s, 28)}
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
              <div style="font-size:11px;color:var(--text3)">${s._prog}</div>
            </div>
            ${badgeHtml(status)}
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;

  // re-bind clicks
  students.slice(0,8).forEach((s,i) => {
    const divs = document.getElementById('dash-inner').querySelectorAll('[onclick^="openModal"]');
    if (divs[i]) divs[i].onclick = () => openModal(s);
  });

  // Cross-tab: status per program
  const SHORT_STATUS = STATUS_KEYS.filter(k => !['Partner Interview','User Interview','Work Permit','Visa'].includes(k));
  el.innerHTML += `
  <div class="card" style="padding:18px;margin-top:16px;overflow-x:auto">
    <div class="sect-title">Status per Program</div>
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:7px 10px;border-bottom:0.5px solid var(--border);background:var(--bg3);font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap">Program</th>
          ${STATUS_KEYS.map(k => `<th style="text-align:center;padding:7px 8px;border-bottom:0.5px solid var(--border);background:var(--bg3);font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;min-width:70px"><span class="badge" style="background:${STATUS[k].bg};color:${STATUS[k].dk}">${STATUS[k].label}</span></th>`).join('')}
          <th style="text-align:center;padding:7px 10px;border-bottom:0.5px solid var(--border);background:var(--bg3);font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Total</th>
        </tr>
      </thead>
      <tbody>
        ${PROGRAM_KEYS.map(prog => {
          const ps = students.filter(s => s._prog === prog);
          const total = ps.length;
          if (!total) return '';
          return `<tr>
            <td style="padding:9px 10px;border-bottom:0.5px solid var(--border)"><span class="pill-prog p-${progSlug(prog)}">${prog}</span></td>
            ${STATUS_KEYS.map(k => {
              const cnt = ps.filter(s => sf(s, fld('Apply Status')) === k).length;
              const pct = total ? Math.round(cnt/total*100) : 0;
              return `<td style="padding:9px 8px;border-bottom:0.5px solid var(--border);text-align:center">
                ${cnt > 0
                  ? `<div style="font-weight:600">${cnt}</div><div style="font-size:10px;color:var(--text3)">${pct}%</div>`
                  : `<span style="color:var(--border2)">—</span>`}
              </td>`;
            }).join('')}
            <td style="padding:9px 10px;border-bottom:0.5px solid var(--border);text-align:center;font-weight:600">${total}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
}

// ========== MITRA VIEW ==========
function renderJobSource() {
  const el = document.getElementById('mitra-inner');
  if (!isConfigured() || !students.length) {
    el.innerHTML = '<div class="empty"><i class="ti ti-arrows-right-left"></i><span>Data belum dimuat — klik Refresh dulu</span></div>';
    return;
  }

  const SRC_FIELD   = 'Job Source (from Job ID (Sync))';
  const ROLE_FIELD  = 'Job Role (from Job ID (Sync))';
  const MITRA_FIELD = '[31] List Mitra (from Job ID (Sync))';

  // Group by Job Source
  const srcMap = new Map();
  students.forEach(s => {
    const src = sf(s, SRC_FIELD) || '(Tidak ada)';
    if (!srcMap.has(src)) srcMap.set(src, []);
    srcMap.get(src).push(s);
  });
  const entries = [...srcMap.entries()]
    .filter(([k]) => k !== '(Tidak ada)')
    .sort((a, b) => b[1].length - a[1].length);

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <div class="search-box" style="flex:1;max-width:320px">
        <i class="ti ti-search"></i>
        <input type="text" placeholder="Cari job source..." oninput="filterJobSourceCards(this.value)">
      </div>
      <span style="font-size:13px;color:var(--text3)">${entries.length} job source</span>
    </div>
    <div id="jobsrc-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">
      ${entries.map(([src, recs]) => {
        const roles   = [...new Set(recs.map(s => sf(s, ROLE_FIELD)).filter(Boolean))].sort();
        const mitras  = [...new Set(recs.map(s => sf(s, MITRA_FIELD)).filter(Boolean))].sort();
        const progs   = [...new Set(recs.map(s => s._prog))];
        const statusCounts = {};
        recs.forEach(s => {
          const st = sf(s, fld('Apply Status')) || '—';
          statusCounts[st] = (statusCounts[st] || 0) + 1;
        });
        const topStatuses = Object.entries(statusCounts).sort((a,b)=>b[1]-a[1]).slice(0,4);
        return `<div class="card jobsrc-card" data-src="${src.toLowerCase()}" style="padding:16px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <i class="ti ti-arrows-right-left" style="font-size:16px;color:var(--blue)"></i>
            <span style="font-size:14px;font-weight:600;color:var(--text)">${src}</span>
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
            ${progs.map(p => `<span class="pill-prog p-${progSlug(p)}">${p}</span>`).join('')}
          </div>
          <div style="font-size:12px;color:var(--text2);margin-bottom:12px;display:flex;gap:14px">
            <span><strong>${recs.length}</strong> student</span>
            <span><strong>${roles.length}</strong> job role</span>
            <span><strong>${mitras.length}</strong> mitra</span>
          </div>

          <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">Job Roles</div>
          <div style="display:flex;flex-direction:column;gap:3px;margin-bottom:12px">
            ${roles.slice(0,5).map(role => {
              const cnt = recs.filter(s => sf(s, ROLE_FIELD) === role).length;
              const pct = Math.round(cnt/recs.length*100);
              return `<div style="font-size:11px;padding:5px 9px;background:var(--bg3);border-radius:var(--r);border:0.5px solid var(--border);display:flex;align-items:center;gap:8px">
                <span style="font-weight:500;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${role}</span>
                <span style="color:var(--text3);flex-shrink:0;font-size:10px">${cnt}x · ${pct}%</span>
              </div>`;
            }).join('')}
            ${roles.length > 5 ? `<div style="font-size:11px;color:var(--text3);padding:3px 9px">+${roles.length-5} lainnya</div>` : ''}
          </div>

          <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">Mitra / Perusahaan</div>
          <div style="display:flex;flex-direction:column;gap:3px;margin-bottom:12px">
            ${mitras.slice(0,4).map(m => {
              const cnt = recs.filter(s => sf(s, MITRA_FIELD) === m).length;
              return `<div style="font-size:11px;padding:4px 9px;background:var(--blue-bg);border-radius:var(--r);color:var(--blue-dk);display:flex;justify-content:space-between">
                <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${m}</span>
                <span style="flex-shrink:0;margin-left:8px;color:var(--blue)">${cnt}x</span>
              </div>`;
            }).join('')}
            ${mitras.length > 4 ? `<div style="font-size:11px;color:var(--text3);padding:3px 9px">+${mitras.length-4} lainnya</div>` : ''}
          </div>

          <div style="display:flex;gap:5px;flex-wrap:wrap">
            ${topStatuses.map(([st,cnt]) => `<span class="badge" style="background:${(STATUS[st]||{bg:'var(--bg3)'}).bg};color:${(STATUS[st]||{dk:'var(--text3)'}).dk};font-size:10px">${st} (${cnt})</span>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function filterJobSourceCards(q) {
  document.querySelectorAll('.jobsrc-card').forEach(card => {
    card.style.display = card.dataset.src.includes(q.toLowerCase()) ? '' : 'none';
  });
}

// ========== STUDENTS TABLE ==========
function renderStudents() {
  const chipsEl = document.getElementById('status-chips');
  const wrapEl  = document.getElementById('students-wrap');
  if (!isConfigured()) { chipsEl.innerHTML=''; wrapEl.innerHTML = noCfgHtml(); return; }

  // Row 1: status chips + view toggle
  const allStatus = [{ k:'all', label:'Semua' }, ...STATUS_KEYS.map(k => ({ k, label: STATUS[k].label }))];
  chipsEl.innerHTML = `
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center;width:100%">
      <div style="display:flex;gap:7px;flex-wrap:wrap;flex:1">
        ${allStatus.map(({ k, label }) =>
          `<button class="chip ${statusFilter===k?'active':''}" onclick="statusFilter='${k}';renderStudents()">${label}</button>`
        ).join('')}
      </div>
      <div class="view-toggle">
        <button class="vt-btn ${viewMode==='list'?'active':''}" onclick="viewMode='list';renderStudents()">
          <i class="ti ti-list"></i> Per Apply
        </button>
        <button class="vt-btn ${viewMode==='student'?'active':''}" onclick="viewMode='student';renderStudents()">
          <i class="ti ti-user"></i> Per Student
        </button>
      </div>
    </div>
    <div class="filter-bar2" style="margin-top:8px">
      ${buildFilterSel('Job Role', 'Job Role (from Job ID (Sync))', filterJobRole, 'filterJobRole')}
      ${buildFilterSel('Job Source', 'Job Source (from Job ID (Sync))', filterJobSource, 'filterJobSource')}
      ${buildFilterSel('Mitra', '[31] List Mitra (from Job ID (Sync))', filterMitra, 'filterMitra')}
      ${(filterJobRole!=='all'||filterJobSource!=='all'||filterMitra!=='all') ? resetBtnHtml() : ''}
    </div>`;

  const list = filtered();
  if (!list.length) {
    wrapEl.innerHTML = `<div class="empty"><i class="ti ti-users"></i><span>Tidak ada data ditemukan</span></div>`;
    return;
  }

  if (viewMode === 'student') {
    renderStudentGroupView(list, wrapEl);
  } else {
    renderListView(list, wrapEl);
  }
}

function buildFilterSel(label, fieldName, current, stateKey) {
  const vals = uniqueVals(fieldName);
  if (!vals.length) return '';
  const isActive = current !== 'all';
  return `<select class="filter-sel ${isActive?'active':''}" onchange="${stateKey}=this.value;renderStudents()">
    <option value="all">${label}: Semua</option>
    ${vals.map(v => `<option value="${v}" ${current===v?'selected':''}>${v}</option>`).join('')}
  </select>`;
}

function renderListView(list, wrapEl) {
  wrapEl.innerHTML = `<div class="card">
    <table class="tbl">
      <thead><tr>
        <th>Student</th><th>Program</th><th>Job Role</th><th>Company</th><th>Status</th><th>Docs</th>
      </tr></thead>
      <tbody id="list-tbody"></tbody>
    </table>
  </div>`;
  const tbody = document.getElementById('list-tbody');
  tbody.innerHTML = list.map((s,i) => {
    const name      = sf(s, fld('Name')) || '—';
    const status    = sf(s, fld('Apply Status'));
    const jobRole   = sf(s, 'Job Role (from Job ID (Sync))') || '—';
    const company   = sf(s, 'Company Name (from Job ID (Sync))') || '—';
    const pc        = PROG_CONFIG[s._prog] || { docs:[], urls:[] };
    const uploaded  = [...pc.docs, ...pc.urls].filter(d => {
      const files = attachments(s, d.field);
      if (files.length) return true;
      const v = sf(s, d.field); return v && v.startsWith('http');
    }).length;
    const total = pc.docs.length + pc.urls.length;
    const pct = total ? Math.round(uploaded/total*100) : 0;
    const barColor = pct===100?'var(--green)':pct>=50?'var(--amber)':'var(--red)';
    return `<tr data-idx="${i}">
      <td><div class="name-cell">${avatarHtml(s,32)}<div style="font-weight:500;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</div></div></td>
      <td><span class="pill-prog p-${progSlug(s._prog)}">${s._prog}</span></td>
      <td style="font-size:12px;color:var(--text2);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${jobRole}</td>
      <td style="font-size:12px;color:var(--text2);max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${company}</td>
      <td>${badgeHtml(status)}</td>
      <td style="min-width:80px">
        <div style="font-size:11px;color:var(--text3);margin-bottom:3px">${uploaded}/${total}</div>
        <div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${barColor};border-radius:2px;transition:.3s"></div>
        </div>
      </td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('tr[data-idx]').forEach(tr => {
    tr.onclick = () => openModal(list[+tr.dataset.idx]);
  });
}

function renderStudentGroupView(list, wrapEl) {
  const groups = getStudentGroups(list);
  const entries = [...groups.entries()];
  wrapEl.innerHTML = `<div class="card">
    <table class="tbl">
      <thead><tr>
        <th>Student</th><th>Program</th><th>Aplikasi</th><th>Status</th><th>Dokumen Terkumpul</th>
      </tr></thead>
      <tbody id="group-tbody"></tbody>
    </table>
  </div>`;
  const tbody = document.getElementById('group-tbody');
  tbody.innerHTML = entries.map(([email, recs], gi) => {
    const s = recs[0];
    const name = sf(s, fld('Name')).split(' - ')[0] || sf(s, fld('Name')) || '—';
    const progs = [...new Set(recs.map(r => r._prog))];
    const statuses = [...new Set(recs.map(r => sf(r, fld('Apply Status'))).filter(Boolean))];
    const allDocs = getConsolidatedDocs(recs);
    const foundDocs = allDocs.filter(d => d.found);
    const pct = allDocs.length ? Math.round(foundDocs.length/allDocs.length*100) : 0;
    const barColor = pct===100?'var(--green)':pct>=50?'var(--amber)':'var(--red)';
    return `<tr data-gi="${gi}" style="cursor:pointer">
      <td><div class="name-cell">${avatarHtml(s,32)}<div>
        <div style="font-weight:500">${name}</div>
        <div style="font-size:11px;color:var(--text3)">${email}</div>
      </div></div></td>
      <td>${progs.map(p => `<span class="pill-prog p-${progSlug(p)}">${p}</span>`).join(' ')}</td>
      <td><span class="count-badge">${recs.length}x apply</span></td>
      <td style="max-width:160px">${statuses.slice(0,3).map(k => badgeHtml(k)).join(' ')}</td>
      <td style="min-width:100px">
        <div style="font-size:11px;color:var(--text3);margin-bottom:3px">${foundDocs.length}/${allDocs.length} dokumen</div>
        <div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${barColor};border-radius:2px;transition:.3s"></div>
        </div>
      </td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('tr[data-gi]').forEach(tr => {
    tr.onclick = () => {
      const [email, recs] = entries[+tr.dataset.gi];
      openStudentProfile(email, recs);
    };
  });
}

function openStudentProfile(email, records) {
  const s = records[0];
  const name = sf(s, fld('Name')).split(' - ')[0] || sf(s, fld('Name')) || '—';
  const progs = [...new Set(records.map(r => r._prog))];
  const allDocs = getConsolidatedDocs(records);
  const foundDocs = allDocs.filter(d => d.found);

  const appsHtml = records.map((rec, i) => {
    const jobRole = sf(rec, 'Job Role (from Job ID (Sync))') || '—';
    const company = sf(rec, 'Company Name (from Job ID (Sync))') || '—';
    const mitra   = sf(rec, '[31] List Mitra (from Job ID (Sync))') || '—';
    const status  = sf(rec, fld('Apply Status'));
    return `<div class="sp-app-row" data-ri="${i}">
      <div class="sp-app-num">${i+1}</div>
      <span class="pill-prog p-${progSlug(rec._prog)}" style="flex-shrink:0">${rec._prog}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${company}</div>
        <div style="font-size:11px;color:var(--text3)">${jobRole} · Mitra: ${mitra}</div>
      </div>
      ${badgeHtml(status)}
      <i class="ti ti-chevron-right" style="font-size:14px;color:var(--text3);flex-shrink:0"></i>
    </div>`;
  }).join('');

  const docsHtml = allDocs.map(d => {
    if (d.found) {
      return `<a href="${d.url}" target="_blank" class="doc-sum-item has">
        <i class="ti ${d.icon}"></i><span>${d.label}</span>
        <i class="ti ti-check" style="flex-shrink:0;margin-left:auto"></i>
      </a>`;
    }
    return `<div class="doc-sum-item no">
      <i class="ti ${d.icon}"></i><span>${d.label}</span>
      <i class="ti ti-minus" style="flex-shrink:0;margin-left:auto"></i>
    </div>`;
  }).join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-hdr">
      <div style="display:flex;align-items:center;gap:14px">
        ${avatarHtml(s, 52)}
        <div>
          <div class="modal-name">${name}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">${email}</div>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
            ${progs.map(p => `<span class="pill-prog p-${progSlug(p)}">${p}</span>`).join('')}
            <span class="count-badge">${records.length} aplikasi</span>
            <span style="font-size:11px;color:var(--teal);background:var(--teal-bg);padding:2px 8px;border-radius:20px;font-weight:500">${foundDocs.length}/${allDocs.length} dok</span>
          </div>
        </div>
      </div>
      <button class="modal-close" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>

    <div class="sect-hdr"><span><i class="ti ti-list-check"></i> Semua Aplikasi</span><span>klik untuk lihat detail</span></div>
    <div class="card" style="overflow:hidden;margin-bottom:0">
      <div class="sp-apps" id="sp-apps">${appsHtml}</div>
    </div>

    <div class="sect-hdr" style="margin-top:16px">
      <span><i class="ti ti-paperclip"></i> Dokumen Terkumpul</span>
      <span>${foundDocs.length}/${allDocs.length} uploaded</span>
    </div>
    <div class="doc-sum-grid">${docsHtml}</div>`;

  document.getElementById('modal-overlay').style.display = 'flex';

  // bind app row clicks
  document.getElementById('sp-apps').querySelectorAll('.sp-app-row').forEach(el => {
    el.onclick = () => openModal(records[+el.dataset.ri]);
  });
}

// ========== PIPELINE ==========
function renderPipeline() {
  const board = document.getElementById('pip-board');
  if (!isConfigured()) { board.innerHTML = noCfgHtml(); return; }
  const list = filtered();
  board.innerHTML = STATUS_KEYS.map(k => {
    const m = STATUS[k];
    const cards = list.filter(s => sf(s, fld('Apply Status')) === k);
    return `<div class="pip-col">
      <div class="pip-head" style="background:${m.bg};color:${m.dk}">
        ${m.label} <span style="opacity:.7">${cards.length}</span>
      </div>
      <div class="pip-body" id="pip-${k}">
        ${cards.length ? cards.map((s,i) => {
          const name = sf(s, fld('Name')) || '—';
          return `<div class="pip-card" data-k="${k}" data-i="${i}">
            <div class="pc-name">${name}</div>
            <div class="pc-prog">${s._prog}</div>
          </div>`;
        }).join('') : `<div style="font-size:12px;color:var(--text3);text-align:center;padding:12px 0">—</div>`}
      </div>
    </div>`;
  }).join('');

  STATUS_KEYS.forEach(k => {
    const cards = list.filter(s => sf(s, fld('Apply Status')) === k);
    document.getElementById('pip-' + k)?.querySelectorAll('.pip-card').forEach((el, i) => {
      el.onclick = () => openModal(cards[i]);
    });
  });
}

// ========== MODAL ==========
let modalStudent = null;
let modalStatus = null;

function docCardHtml(s, d) {
  const files = attachments(s, d.field);
  if (files.length) {
    return `<a href="${files[0].url}" target="_blank" class="doc-card has">
      <i class="ti ${d.icon} dc-i"></i>
      <span class="dc-n">${d.label}</span>
      <i class="ti ti-check dc-s"></i>
    </a>`;
  }
  return `<div class="doc-card no">
    <i class="ti ${d.icon} dc-i"></i>
    <span class="dc-n">${d.label}</span>
    <i class="ti ti-minus dc-s"></i>
  </div>`;
}

function urlCardHtml(s, u) {
  const val = sf(s, u.field);
  if (val) {
    return `<a href="${val}" target="_blank" class="doc-card has" style="border-color:var(--blue);background:var(--blue-bg);color:var(--blue-dk)">
      <i class="ti ${u.icon} dc-i"></i>
      <span class="dc-n">${u.label}</span>
      <i class="ti ti-external-link dc-s"></i>
    </a>`;
  }
  return `<div class="doc-card no"><i class="ti ${u.icon} dc-i"></i><span class="dc-n">${u.label}</span><i class="ti ti-minus dc-s"></i></div>`;
}

function openModal(s) {
  modalStudent = s;
  modalStatus = sf(s, fld('Apply Status')) || null;
  const name    = sf(s, fld('Name')) || '—';
  const email   = sf(s, fld('Email')) || sf(s, 'Final Email') || '—';
  const pc      = PROG_CONFIG[s._prog] || { docs:[], urls:[], special:[] };

  const jobRole    = sf(s, pc.jobRole)    || '—';
  const jobSource  = sf(s, pc.jobSource)  || '—';
  const company    = sf(s, pc.company)    || '—';
  const mitra      = sf(s, pc.mitra)      || '—';
  const country    = sf(s, pc.country)    || '—';
  const prevStatus = sf(s, pc.prevStatus) || '—';
  const needProc   = s.fields[pc.needProcess] ? '<i class="ti ti-check" style="color:var(--green)"></i> Ya' : '<span style="color:var(--text3)">—</span>';
  const konfirm    = s.fields[pc.konfirmasi]   ? '<i class="ti ti-check" style="color:var(--green)"></i> Konfirmasi' : '<span style="color:var(--text3)">Belum</span>';

  const uploaded = pc.docs.filter(d => attachments(s, d.field).length > 0).length;
  const total    = pc.docs.length + pc.urls.length;

  const docsHtml = [
    ...pc.docs.map(d => docCardHtml(s, d)),
    ...pc.urls.map(u => urlCardHtml(s, u)),
  ].join('');

  let credHtml = '';
  if (pc.special.length) {
    credHtml = `<div class="sect-hdr"><span><i class="ti ti-key"></i> Kredensial</span></div>
    <div class="cred-grid">${pc.special.map((sp, i) => {
      const val = sf(s, sp.field) || '—';
      if (sp.isPass) {
        return `<div class="cred-item">
          <div class="cred-lbl">${sp.label}</div>
          <div class="cred-val">
            <span id="cv${i}" data-v="${val}">●●●●●●</span>
            <button class="eye-btn" onclick="toggleCred('cv${i}')"><i class="ti ti-eye"></i></button>
          </div></div>`;
      }
      return `<div class="cred-item"><div class="cred-lbl">${sp.label}</div><div class="cred-val">${val}</div></div>`;
    }).join('')}</div>`;
  }

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-hdr">
      <div style="display:flex;align-items:center;gap:14px">
        ${avatarHtml(s, 56)}
        <div>
          <div class="modal-name">${name}</div>
          <div class="modal-meta" style="display:flex;align-items:center;gap:6px;margin-top:4px">
            <span class="pill-prog p-${progSlug(s._prog)}">${s._prog}</span>
            ${badgeHtml(modalStatus)}
          </div>
        </div>
      </div>
      <button class="modal-close" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>

    <div class="sect-hdr"><span><i class="ti ti-info-circle"></i> Informasi</span></div>
    <div class="info-grid">
      <div class="info-item"><div class="ii-lbl">Email</div><div class="ii-val" title="${email}">${email}</div></div>
      <div class="info-item"><div class="ii-lbl">Job Role</div><div class="ii-val" title="${jobRole}">${jobRole}</div></div>
      <div class="info-item"><div class="ii-lbl">Job Source</div><div class="ii-val">${jobSource}</div></div>
      <div class="info-item"><div class="ii-lbl">Country</div><div class="ii-val">${country}</div></div>
      <div class="info-item"><div class="ii-lbl">Company</div><div class="ii-val" title="${company}">${company}</div></div>
      <div class="info-item"><div class="ii-lbl">Mitra</div><div class="ii-val" title="${mitra}">${mitra}</div></div>
      <div class="info-item"><div class="ii-lbl">Prev Status</div><div class="ii-val">${prevStatus}</div></div>
      <div class="info-item"><div class="ii-lbl">Konfirmasi</div><div class="ii-val">${konfirm}</div></div>
      <div class="info-item"><div class="ii-lbl">Need Process</div><div class="ii-val">${needProc}</div></div>
    </div>

    <div class="sect-hdr">
      <span><i class="ti ti-paperclip"></i> Dokumen</span>
      <span>${uploaded}/${total} uploaded</span>
    </div>
    <div class="doc-grid">${docsHtml}</div>

    ${credHtml}

    <div class="status-section">
      <div class="status-lbl">Ubah Status</div>
      <div class="status-grid" id="status-opts">
        ${STATUS_KEYS.map(k => {
          const m = STATUS[k];
          const sel = modalStatus === k;
          return `<button class="s-opt ${sel?'sel':''}" data-k="${k}"
            style="background:${m.bg};color:${m.dk};border-color:${sel?m.color:'transparent'}"
            onclick="selectStatus('${k}')">${m.label}</button>`;
        }).join('')}
      </div>
      <button class="btn primary" style="margin-top:14px;width:100%" id="save-btn" onclick="saveStatus()">
        <i class="ti ti-check"></i> Simpan Perubahan
      </button>
    </div>`;

  document.getElementById('modal-overlay').style.display = 'flex';
}

function toggleCred(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const v = el.dataset.v;
  el.textContent = el.textContent.includes('●') ? v : '●'.repeat(v.length);
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  modalStudent = null;
}

function selectStatus(k) {
  modalStatus = k;
  document.querySelectorAll('.s-opt').forEach(btn => {
    const bk = btn.dataset.k;
    const m = STATUS[bk];
    const sel = bk === k;
    btn.className = `s-opt ${sel?'sel':''}`;
    btn.style.background = m.bg;
    btn.style.color = m.dk;
    btn.style.borderColor = sel ? m.color : 'transparent';
  });
}

async function saveStatus() {
  if (!modalStudent || saving) return;
  saving = true;
  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="ti ti-loader" style="animation:spin .7s linear infinite"></i> Menyimpan...';
  try {
    const oldStatus = sf(modalStudent, fld('Apply Status'));
    const fields = { [fld('Apply Status')]: modalStatus };
    await patchRecord(modalStudent._base, modalStudent._tbl, modalStudent.id, fields);
    const idx = students.findIndex(s => s.id === modalStudent.id);
    if (idx > -1) students[idx].fields[fld('Apply Status')] = modalStatus;
    logToSheets(modalStudent, oldStatus, modalStatus);
    showToast('Status berhasil diubah!', 'ok');
    closeModal();
    renderAll();
  } catch (e) {
    showToast('Gagal simpan: ' + e.message, 'err');
    btn.disabled = false;
    btn.innerHTML = '<i class="ti ti-check"></i> Simpan Perubahan';
  }
  saving = false;
}

async function logToSheets(student, oldStatus, newStatus) {
  if (!cfg.sheetsUrl) return;
  try {
    await fetch(cfg.sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        program:   student._prog,
        applyId:   student.id,
        studentId: sf(student, fld('Name')),
        oldStatus: oldStatus || '—',
        newStatus: newStatus,
        changedBy: cfg.changedBy || 'Website',
      })
    });
  } catch (e) {
    console.warn('Gagal log ke Sheets:', e.message);
  }
}

// ========== SETTINGS ==========
function renderSettings() {
  document.getElementById('settings-inner').innerHTML = `
  <div class="settings-sect">
    <div class="settings-title"><i class="ti ti-key"></i> API & Akses</div>
    <div class="form-group">
      <label class="form-lbl">Airtable Personal Access Token</label>
      <input class="form-inp" id="cfg-token" type="password" value="${cfg.apiToken||''}" placeholder="pat...">
      <div class="form-note">Buat di airtable.com/create/tokens · Scope: data.records:read, data.records:write</div>
    </div>
    <div class="form-group">
      <label class="form-lbl">Password Login</label>
      <input class="form-inp" id="cfg-pass" type="password" value="${cfg.password||''}" placeholder="workabroad2026">
      <div class="form-note">Biarkan kosong untuk pakai default: workabroad2026</div>
    </div>
  </div>

  <div class="settings-sect">
    <div class="settings-title"><i class="ti ti-table"></i> Nama Tabel per Base</div>
    <div class="form-group">
      <label class="form-lbl">English — Blue/White Collar (appoL1kdbV0UyLwL4)</label>
      <input class="form-inp" id="cfg-tbl-en" value="${cfg.tblEnglish||''}" placeholder="Nama tabel di base English...">
    </div>
    <div class="form-group">
      <label class="form-lbl">Ausbildung (appNCTwB49kyXbR1V)</label>
      <input class="form-inp" id="cfg-tbl-au" value="${cfg.tblAusbildung||''}" placeholder="Nama tabel di base Ausbildung...">
    </div>
    <div class="form-group">
      <label class="form-lbl">Tokutei Ginou (app81I9rWfsU9PjVv)</label>
      <input class="form-inp" id="cfg-tbl-tk" value="${cfg.tblTokutei||''}" placeholder="Nama tabel di base Tokutei...">
    </div>
  </div>

  <div class="settings-sect">
    <div class="settings-title"><i class="ti ti-tags"></i> Nama Field (sesuaikan dengan Airtable kamu)</div>
    <div class="grid2">
      <div class="form-group">
        <label class="form-lbl">Field Nama</label>
        <input class="form-inp" id="cfg-fld-name" value="${fld('Name')}" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="form-lbl">Field Email</label>
        <input class="form-inp" id="cfg-fld-email" value="${fld('Email')}" placeholder="Email">
      </div>
      <div class="form-group">
        <label class="form-lbl">Field Foto</label>
        <input class="form-inp" id="cfg-fld-photo" value="${fld('Photo')}" placeholder="Photo">
      </div>
      <div class="form-group">
        <label class="form-lbl">Field Dokumen</label>
        <input class="form-inp" id="cfg-fld-docs" value="${fld('Documents')}" placeholder="Dokumen">
      </div>
      <div class="form-group">
        <label class="form-lbl">Field Apply Status</label>
        <input class="form-inp" id="cfg-fld-status" value="${fld('Apply Status')}" placeholder="Apply Status">
      </div>
    </div>
  </div>

  <div class="settings-sect">
    <div class="settings-title"><i class="ti ti-brand-google"></i> Google Sheets History</div>
    <div class="form-group">
      <label class="form-lbl">Apps Script URL</label>
      <input class="form-inp" id="cfg-sheets-url" value="${cfg.sheetsUrl||''}" placeholder="https://script.google.com/macros/s/...">
      <div class="form-note">URL dari Apps Script yang sudah di-deploy sebagai Web App</div>
    </div>
    <div class="form-group">
      <label class="form-lbl">Nama / Email (Changed By)</label>
      <input class="form-inp" id="cfg-changed-by" value="${cfg.changedBy||''}" placeholder="admin@schoters.com">
      <div class="form-note">Akan tercatat di kolom "Changed By" setiap kali status diubah</div>
    </div>
  </div>

  <button class="btn primary" style="width:100%;padding:11px" onclick="saveSettings()">
    <i class="ti ti-device-floppy"></i> Simpan & Muat Data
  </button>`;
}

function saveSettings() {
  cfg.apiToken   = document.getElementById('cfg-token').value.trim();
  cfg.password   = document.getElementById('cfg-pass').value || 'workabroad2026';
  cfg.tblEnglish = document.getElementById('cfg-tbl-en').value.trim();
  cfg.tblAusbildung = document.getElementById('cfg-tbl-au').value.trim();
  cfg.tblTokutei = document.getElementById('cfg-tbl-tk').value.trim();
  cfg['fld_Name']    = document.getElementById('cfg-fld-name').value.trim() || 'Name';
  cfg['fld_Email']   = document.getElementById('cfg-fld-email').value.trim() || 'Email';
  cfg['fld_Photo']   = document.getElementById('cfg-fld-photo').value.trim() || 'Photo';
  cfg['fld_Documents'] = document.getElementById('cfg-fld-docs').value.trim() || 'Documents';
  cfg['fld_Apply Status'] = document.getElementById('cfg-fld-status').value.trim() || 'Apply Status';
  cfg.sheetsUrl  = document.getElementById('cfg-sheets-url').value.trim();
  cfg.changedBy  = document.getElementById('cfg-changed-by').value.trim();
  saveCfg();
  showToast('Pengaturan disimpan!', 'ok');
  loadData();
}

// ========== NAVIGATION ==========
function showPage(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  if (el) {
    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
  }
  const titles = { dashboard:'Dashboard', students:'Students', mitra:'Job Source', settings:'Pengaturan' };
  document.getElementById('pg-title').textContent = titles[page] || page;
  if (page === 'dashboard') renderDashboard();
  else if (page === 'students') renderStudents();
  else if (page === 'mitra') renderJobSource();
  else if (page === 'mitra') renderJobSource();
  else if (page === 'settings') renderSettings();
}

// ========== TOAST ==========
function showToast(msg, type='ok') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="ti ti-${type==='ok'?'check':'alert-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ========== HELPER ==========
function noCfgHtml() {
  return `<div class="no-cfg">
    <i class="ti ti-settings-off"></i>
    <h3>Belum dikonfigurasi</h3>
    <p>Masukkan API Token dan nama tabel di halaman Pengaturan untuk mulai menggunakan Job Tracker.</p>
    <button class="btn primary" onclick="showPage('settings',document.querySelector('[data-page=settings]'))">
      <i class="ti ti-settings"></i> Buka Pengaturan
    </button>
  </div>`;
}

// ========== INIT ==========
function initApp() {
  if (!isConfigured()) {
    showPage('settings', document.querySelector('[data-page="settings"]'));
    showToast('Lengkapi pengaturan dulu ya!', 'err');
  } else {
    loadData();
  }
}

loadCfg();
