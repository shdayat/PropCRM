import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI({ apiKey }) : null;

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

export async function analyzeKPR(params) {
  // Strict mode: require Gemini API. If API call fails, throw error so
  // debugging can surface the exact failure.
  if (!genAI) {
    throw new Error('Gemini API key not configured (VITE_GEMINI_API_KEY missing in .env.local)');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Analisis kelayakan KPR dengan parameter berikut:\n- Harga Properti: Rp${params.hargaProperti}\n- Uang Muka (DP): Rp${params.dp}\n- Tenor: ${params.tenor} tahun\n- Bunga: ${params.bunga}%\n- Pendapatan Bersih/Bulan: Rp${params.pendapatan}\n\nBerdasarkan data ini, hitung cicilan per bulan (angsuran tetap), hitung DTI (cicilan/pendapatan*100), berikan status (Aman/Waspada/Beresiko), skor approval (0-100), dan rekomendasi singkat. Jawab hanya dalam format JSON.`;

  // Call Gemini and propagate any errors to the caller
  const result = await model.generateContent(prompt);
  console.debug('Gemini raw result object:', result);
  if (!result || !result.response) {
    throw new Error('No response from Gemini API');
  }

  const text = result.response.text();
  console.debug('Gemini raw response:', text);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Unable to parse JSON from Gemini response');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  if (!('cicilanBulan' in parsed) || !('dti' in parsed) || !('status' in parsed)) {
    throw new Error('Gemini response missing required fields');
  }

  return parsed;
}
