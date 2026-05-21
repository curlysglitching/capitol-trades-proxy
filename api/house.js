export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const r = await fetch('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json');
    if (!r.ok) throw new Error('S3 returned ' + r.status);
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
