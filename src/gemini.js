import { GoogleGenerativeAI } from '@google/generative-ai';

// Keep a lightweight local fallback calculation so the app keeps working
// even when no remote Gemini key is available.
function localAnalyze(params) {
  const hargaProperti = Number(params.hargaProperti);
  const dp = Number(params.dp);
  const tenor = Number(params.tenor);
  const bunga = Number(params.bunga);
  const pendapatan = Number(params.pendapatan);

  const pokok = hargaProperti - dp;
  const bungaBulanan = bunga / 100 / 12;
  const bulanTotal = tenor * 12;

  let cicilanBulan;
  if (bungaBulanan === 0) {
    cicilanBulan = pokok / bulanTotal;
  } else {
    const numerator = bungaBulanan * Math.pow(1 + bungaBulanan, bulanTotal);
    const denominator = Math.pow(1 + bungaBulanan, bulanTotal) - 1;
    cicilanBulan = pokok * (numerator / denominator);
  }

  const dti = (cicilanBulan / pendapatan) * 100;
  let status, score, message;
  if (dti < 30) {
    status = 'Aman';
    score = 85 + Math.random() * 15;
    message = `DTI ${dti.toFixed(1)}% termasuk kategori aman. Persetujuan KPR tinggi dengan cicilan terjangkau.`;
  } else if (dti < 40) {
    status = 'Waspada';
    score = 60 + Math.random() * 25;
    message = `DTI ${dti.toFixed(1)}% di zona waspada. Pertimbangkan cicilan lebih rendah atau tenor lebih panjang.`;
  } else {
    status = 'Beresiko';
    score = 30 + Math.random() * 30;
    message = `DTI ${dti.toFixed(1)}% terlalu tinggi. Naikkan uang muka atau tingkatkan pendapatan.`;
  }

  return {
    cicilanBulan: Math.round(cicilanBulan),
    dti: Number(dti.toFixed(1)),
    status,
    score: Math.round(score),
    message,
  };
}

const FRONTEND_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const hasClientKey = Boolean(FRONTEND_KEY);
let genAI = null;
if (hasClientKey) {
  genAI = new GoogleGenerativeAI({ apiKey: FRONTEND_KEY });
}

async function callLocalGemini(params) {
  // Call backend proxy at /api/gemini which should be hosted by the app owner.
  try {
    const resp = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ params }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Proxy error: ${resp.status} ${text}`);
    }
    const body = await resp.json();
    if (body && body.data) return body.data;
    throw new Error('Invalid proxy response');
  } catch (err) {
    console.warn('Gemini proxy call failed:', err.message);
    throw err;
  }
}

export async function analyzeKPR(params) {
  const prompt = `Analisis kelayakan KPR dengan parameter berikut:\n- Harga Properti: Rp${params.hargaProperti}\n- Uang Muka (DP): Rp${params.dp}\n- Tenor: ${params.tenor} tahun\n- Bunga: ${params.bunga}%\n- Pendapatan Bersih/Bulan: Rp${params.pendapatan}\n\nBerdasarkan data ini, hitung cicilan per bulan (angsuran tetap), hitung DTI (cicilan/pendapatan*100), berikan status (Aman/Waspada/Beresiko), skor approval (0-100), dan rekomendasi singkat. Jawab hanya dalam format JSON.`;

  // Priority: 1) frontend key (NOT recommended for production) 2) backend proxy 3) local fallback
  if (hasClientKey && genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      if (!result || !result.response) throw new Error('No response from Gemini SDK');
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Unable to parse JSON from Gemini response');
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    } catch (err) {
      console.warn('Client Gemini call failed, trying proxy:', err.message);
    }
  }

  // Try backend proxy
  try {
    const parsed = await callLocalGemini(params);
    return parsed;
  } catch (err) {
    console.warn('Proxy unavailable, falling back to local analyzer.');
    return localAnalyze(params);
  }
}
