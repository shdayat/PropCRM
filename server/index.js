import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = process.env.PORT || 3000;

// Restrict CORS to configured frontend origin (default localhost dev port)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

// Logging
app.use(morgan('combined'));

// Security headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      // allow connections to our proxy and same origin
      connectSrc: ["'self'", clientOrigin],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
    },
  })
);
app.use(
  helmet.hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  })
);

// Simple rate limiter to mitigate abuse of the proxy endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
// Apply to API routes
app.use('/api/', limiter);

const apiKey = process.env.GEMINI_API_KEY;
let client = null;
if (apiKey) client = new GoogleGenerativeAI({ apiKey });

app.get('/health', (req, res) => res.json({ ok: true }));

// Lightweight protection middleware: require Basic auth OR an x-api-key header.
function protectApi(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Basic ')) {
    try {
      const creds = Buffer.from(auth.split(' ')[1], 'base64').toString();
      const [user, pass] = creds.split(':');
      if (process.env.PROXY_API_USER && process.env.PROXY_API_PASS) {
        if (user === process.env.PROXY_API_USER && pass === process.env.PROXY_API_PASS) return next();
      }
    } catch (e) {
      // fallthrough
    }
  }
  const apiKeyHeader = req.headers['x-api-key'] || req.headers['x_api_key'];
  if (apiKeyHeader && process.env.PROXY_API_KEY && apiKeyHeader === process.env.PROXY_API_KEY) return next();

  res.setHeader('WWW-Authenticate', 'Basic realm="PropCRM-Proxy"');
  return res.status(401).json({ error: 'Unauthorized' });
}

app.post('/api/gemini', protectApi, async (req, res) => {
  const { params } = req.body || {};
  if (!params) return res.status(400).json({ error: 'Missing params' });
  if (!client) return res.status(500).json({ error: 'Server not configured with GEMINI_API_KEY' });

  const prompt = `Analisis kelayakan KPR dengan parameter berikut:\n- Harga Properti: Rp${params.hargaProperti}\n- Uang Muka (DP): Rp${params.dp}\n- Tenor: ${params.tenor} tahun\n- Bunga: ${params.bunga}%\n- Pendapatan Bersih/Bulan: Rp${params.pendapatan}\n\nBerdasarkan data ini, hitung cicilan per bulan (angsuran tetap), hitung DTI (cicilan/pendapatan*100), berikan status (Aman/Waspada/Beresiko), skor approval (0-100), dan rekomendasi singkat. Jawab hanya dalam format JSON.`;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.();
    const jsonMatch = text?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(502).json({ error: 'Invalid response from Gemini' });
    const parsed = JSON.parse(jsonMatch[0]);
    return res.json({ data: parsed });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
});

app.listen(port, () => {
  console.log(`PropCRM Gemini proxy listening on port ${port}`);
});
