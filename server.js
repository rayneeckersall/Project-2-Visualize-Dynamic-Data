const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'transactions.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all transactions
app.get('/api/transactions', (req, res) => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  res.json(JSON.parse(data));
});

// Save all transactions (full replace)
app.post('/api/transactions', (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});