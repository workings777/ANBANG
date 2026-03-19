import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwJj4oic0LX5oYFPYKiPfVVjzX3_EymztcAgCcWlinynPqjycSTtgRndJ4369sdb6PPbg/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { year, month, reason } = req.body;

  try {
    await axios.post(GAS_WEBAPP_URL, JSON.stringify({ action: 'saveMemo', year, month, reason }), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
    res.json({ success: true });
  } catch (error: any) {
    console.error('GAS save error:', error.message);
    res.status(500).json({ error: 'Failed to save memo' });
  }
}
