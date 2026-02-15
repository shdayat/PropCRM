// KPR Calculation Engine (Local - No API)
// Formula: Cicilan = [P * r * (1+r)^n] / [(1+r)^n - 1]
// Dimana: P = Pokok, r = bunga bulanan, n = jumlah bulan

export async function analyzeKPR(params) {
  try {
    // Extract parameters
    const hargaProperti = Number(params.hargaProperti);
    const dp = Number(params.dp);
    const tenor = Number(params.tenor);
    const bunga = Number(params.bunga);
    const pendapatan = Number(params.pendapatan);

    // Validate inputs
    if (hargaProperti <= 0 || dp <= 0 || tenor <= 0 || bunga < 0 || pendapatan <= 0) {
      throw new Error('Semua nilai harus lebih besar dari 0');
    }

    // Calculate loan principal
    const pokok = hargaProperti - dp;
    
    if (pokok <= 0) {
      throw new Error('Uang muka tidak boleh lebih besar dari harga properti');
    }

    // Monthly interest rate
    const bungaBulanan = bunga / 100 / 12;
    
    // Number of months
    const bulanTotal = tenor * 12;

    // Calculate monthly installment using annuity formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let cicilanBulan;
    if (bungaBulanan === 0) {
      cicilanBulan = pokok / bulanTotal;
    } else {
      const numerator = bungaBulanan * Math.pow(1 + bungaBulanan, bulanTotal);
      const denominator = Math.pow(1 + bungaBulanan, bulanTotal) - 1;
      cicilanBulan = pokok * (numerator / denominator);
    }

    // Calculate DTI (Debt-to-Income Ratio)
    const dti = (cicilanBulan / pendapatan) * 100;

    // Determine status based on DTI
    let status, score, message;

    if (dti < 30) {
      status = 'Aman';
      score = 85 + Math.random() * 15; // 85-100
      message = `DTI ${dti.toFixed(1)}% termasuk kategori aman. Persetujuan KPR tinggi dengan cicilan terjangkau.`;
    } else if (dti < 40) {
      status = 'Waspada';
      score = 60 + Math.random() * 25; // 60-85
      message = `DTI ${dti.toFixed(1)}% di zona waspada. Pertimbangkan cicilan lebih rendah atau tenor lebih panjang.`;
    } else {
      status = 'Beresiko';
      score = 30 + Math.random() * 30; // 30-60
      message = `DTI ${dti.toFixed(1)}% terlalu tinggi. Naikkan uang muka atau tingkatkan pendapatan.`;
    }

    return {
      cicilanBulan: Math.round(cicilanBulan),
      dti: dti,
      status: status,
      score: Math.round(score),
      message: message
    };
  } catch (error) {
    console.error('Error analyzing KPR:', error);
    throw new Error(`Gagal menganalisa KPR: ${error.message}`);
  }
}
