# PropCRM AI

Aplikasi CRM properti dengan Simulasi KPR berbasis AI (Gemini) dan database Firestore.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

Salin `.env.local.example` ke `.env.local` dan isi konfigurasi:

```bash
cp .env.local.example .env.local
```

Lengkapi nilai berikut di `.env.local`:

- **Firebase**: Dapatkan dari Firebase Console (project settings)
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`

- **Gemini API**: Dapatkan dari [Google AI Studio](https://makersuite.google.com/app/apikey)
  - `VITE_GEMINI_API_KEY`

Security note: don't commit `.env.local` containing secrets. This repo now
includes `server/` — a small proxy you can run to keep the Gemini API key on
the backend. See `server/README.md` for details.

### 3. Jalankan dev server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173/` (atau port berikutnya jika port sibuk).

## Fitur

- **Login**: Username=admin|sales|finance, PIN=1234
- **Dashboard**: Overview leads dan keuangan
- **Konsumen**: Kelola data leads (Firestore)
- **Keuangan**: Kelola transaksi (Firestore)
- **Simulasi AI**: Analisis kelayakan KPR menggunakan Gemini AI

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Database**: Firestore (Real-time listeners)
- **AI**: Google Gemini API
- **Icons**: Lucide React

## Build

```bash
npm run build
npm run preview
```

## Notes

- Firestore memerlukan security rules yang sesuai
- Gemini API memperlukan quota yang cukup
- Environment variables harus diisi sebelum menjalankan aplikasi

