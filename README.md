# Job Tracker — Work Abroad Schoters

Website internal untuk memantau dan mengelola status aplikasi student di empat program Work Abroad Academy: **WA Blue Collar**, **WA White Collar**, **Tokutei Ginou**, dan **Ausbildung**. Data ditarik langsung dari Airtable, setiap perubahan status tercatat historinya ke Google Sheets, dan tampilan dipisah per file untuk kemudahan maintenance.

🔗 **Live site:** https://schotersdata.github.io/workabroad-job-tracker/

---

## 📁 Struktur File

```
repo/
├── index.html      # Struktur HTML (layout, sidebar, halaman)
├── style.css       # Semua styling
├── app.js          # Semua logika — config, API, render, filter
├── apps-script.js  # Kode Google Apps Script (deploy terpisah ke Google)
└── README.md
```

> Jika ada perubahan tampilan → edit `style.css`
> Jika ada perubahan logika/data → edit `app.js`
> Jika ada perubahan struktur halaman → edit `index.html`

---

## ✨ Fitur

| Halaman | Fitur |
|---|---|
| **Dashboard** | Metrik total student, ringkasan per status (Submitted, Docs Screening, Job Offer, Flew, Rejected), chart per program & per status, tabel cross-tab **Status × Program** |
| **Students** | Tabel lengkap dengan filter Status, Job Role, Job Source, Mitra, dan pencarian nama/email. Toggle **Per Apply** (satu baris per lamaran) dan **Per Student** (dikelompokkan per email, lihat semua lamaran sekaligus + dokumen terkumpul) |
| **Job Source** | Card per sumber lamaran (LinkedIn, AzubiWelt, dll) — menampilkan job role yang tersedia, mitra/perusahaan terkait, jumlah student, dan distribusi status |
| **Pengaturan** | Isi API token, password login, nama tabel, URL Apps Script — tersimpan di browser (override DEFAULT_CFG) |
| **Ubah Status** | Advisor bisa ganti status langsung dari modal detail student, otomatis tersimpan ke Airtable dan terlog ke Google Sheets |

### Status Aplikasi

| Status | Keterangan |
|---|---|
| Submitted | Baru daftar |
| Docs Screening | Sedang review dokumen |
| Partner Interview | Interview dengan mitra |
| User Interview | Interview dengan user/client |
| Job Offer | Sudah dapat offer |
| Work Permit | Proses izin kerja |
| Visa | Proses visa |
| Flew | Sudah berangkat |
| LoA | Letter of Acceptance |
| Rejected | Ditolak |

---

## ⚙️ Konfigurasi Default

Konfigurasi sudah **di-embed di `app.js`** dalam konstanta `DEFAULT_CFG` (sekitar baris 140), supaya siapa pun yang buka link langsung bisa pakai tanpa setting manual.

```javascript
const DEFAULT_CFG = {
  apiToken:     'PASTE_AIRTABLE_TOKEN_DI_SINI',  // ← wajib diisi sebelum deploy
  password:     'workabroad2026',
  tblEnglish:   'Job Apply',
  tblAusbildung:'Job Apply',
  tblTokutei:   'Job Apply',
  sheetsUrl:    'https://script.google.com/macros/s/...',
  changedBy:    'workabroadacademy@schoters.com',
};
```

### Mengisi API Token (wajib sebelum deploy)

1. Buka `app.js` dengan text editor
2. Cari baris: `apiToken: 'PASTE_AIRTABLE_TOKEN_DI_SINI'`
3. Ganti dengan token Airtable asli (format `pat...`)
4. Save → upload ke GitHub

Buat token baru di [airtable.com/create/tokens](https://airtable.com/create/tokens):
- **Scope:** `data.records:read` dan `data.records:write`
- **Access:** pilih ketiga base — `[7] SSO WA ENGLISH`, `[6] SSO WA AUSBILDUNG`, `[8] SSO WA TOKUTEI GINOU`

### Override via Pengaturan (opsional)

Buka website → login → **Pengaturan** → isi field yang ingin di-override → **Simpan & Muat Data**. Perubahan tersimpan di `localStorage` browser tersebut saja (tidak mengubah file `app.js`).

---

## 🗂 Sumber Data (Airtable)

| Program Tampilan | Base | Base ID | Tabel |
|---|---|---|---|
| WA Blue Collar | `[7] SSO WA ENGLISH` | `appoL1kdbV0UyLwL4` | `Job Apply` |
| WA White Collar | `[7] SSO WA ENGLISH` | `appoL1kdbV0UyLwL4` | `Job Apply` |
| Ausbildung | `[6] SSO WA AUSBILDUNG` | `appNCTwB49kyXbR1V` | `Job Apply` |
| Tokutei Ginou | `[8] SSO WA TOKUTEI GINOU` | `app81I9rWfsU9PjVv` | `Job Apply` |

**WA Blue Collar dan WA White Collar** berasal dari base & tabel yang sama, dipisah otomatis berdasarkan isi field **`Program`** di setiap record (mengandung kata "White" → White Collar, selain itu → Blue Collar).

### Field Airtable yang Digunakan

| Field | Keterangan |
|---|---|
| `Name` | Nama student (formula) |
| `Final Email` | Email student |
| `Apply Status` | Status lamaran (single select) |
| `Program` | Untuk memisahkan Blue/White Collar (khusus base English) |
| `Job Role (from Job ID (Sync))` | Posisi yang dilamar |
| `Job Source (from Job ID (Sync))` | Sumber lamaran (LinkedIn, dll) |
| `[31] List Mitra (from Job ID (Sync))` | Nama mitra/perusahaan |
| `Company Name (from Job ID (Sync))` | Nama perusahaan |
| `Konfirmasi Pendaftaran` | Checkbox konfirmasi |
| `Prev Status ID` | Status sebelumnya |
| `Need Process` | Flag perlu proses |
| Berbagai field dokumen | Attachment PDF/JPG per program |

---

## 📊 Google Sheets History

Setiap perubahan status dari website otomatis terkirim ke Google Sheets melalui **Google Apps Script**.

### Struktur Sheet

Sheet punya 3 tab, masing-masing per program:

| Tab | Program |
|---|---|
| `WA english history` | WA Blue Collar & WA White Collar |
| `WA tokutei ginou history` | Tokutei Ginou |
| `WA ausbildung history` | Ausbildung |

Kolom per baris: **History ID · Apply ID · Student ID · Old Status · New Status · Changed At · Changed By**

### Setup / Update Apps Script

1. Buka Google Sheet history → **Extensions → Apps Script**
2. Hapus kode lama, paste seluruh isi `apps-script.js`
3. **Deploy → Manage deployments → Edit (ikon pensil) → Version: New version → Deploy**
4. URL deployment tidak berubah, tidak perlu update di `app.js`

---

## 🔒 Catatan Keamanan

Website ini berjalan murni di sisi **client** (HTML + CSS + JS, tanpa backend). Artinya:

- API token Airtable & password login **bisa dilihat** siapapun yang punya link, lewat **View Page Source** di browser
- Hanya boleh digunakan untuk **Internal** Work Abroad.

---

## 🛠 Panduan Edit Kode

### Menambah / mengubah status

Di `app.js`, cari konstanta `STATUS` (sekitar baris 30):

```javascript
const STATUS = {
  'Submitted': { label: 'Submitted', bg: '#F1EFE8', color: '#5F5E5A', dk: '#2C2C2A' },
  // tambah status baru di sini
};
```

### Menambah / mengubah field dokumen per program

Di `app.js`, cari konstanta `PROG_CONFIG` (sekitar baris 45). Tiap program punya array `docs` (attachment) dan `urls` (link), dengan:
- `label`: nama tampilan
- `field`: nama kolom **persis** di Airtable
- `icon`: nama ikon dari [tabler.io/icons](https://tabler.io/icons)

### Menambah program baru

1. Tambahkan base ke konstanta `BASES` di `app.js`
2. Tambahkan mapping ke `PROGRAM_META`
3. Tambahkan konfigurasi field ke `PROG_CONFIG`
4. Update fungsi `resolveProgram()` jika perlu split
5. Tambahkan input tabel baru di `renderSettings()` dan `saveSettings()`
6. Tambahkan tab baru di Google Sheet dan update `SHEET_MAP` di Apps Script

---

## 📋 Changelog

| Versi | Perubahan |
|---|---|
| Split file | Pisah jadi `index.html`, `style.css`, `app.js` untuk kemudahan maintenance |
| Job Source view | Halaman baru di sidebar — lihat job source, mitra, dan job role yang tersedia |
| Status baru | Update ke: Submitted, Docs Screening, Partner Interview, User Interview, Job Offer, Work Permit, Visa, Flew, LoA, Rejected |
| Dashboard cross-tab | Tabel Status × Program dengan count dan persentase |
| Per Student view | Grouping by email — lihat semua aplikasi + dokumen terkumpul sekaligus |
| Filter tambahan | Filter Job Role, Job Source, Mitra di halaman Students |
| Embed konfigurasi | `DEFAULT_CFG` di `app.js` — tidak perlu setting ulang per browser |
| Split program | WA Blue Collar & WA White Collar dipisah berdasarkan field `Program` |
| History log | Perubahan status otomatis terlog ke Google Sheets via Apps Script |
