import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import crypto from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'backend-data');

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const app = express();
app.use(express.json());

function userFilePath(token) {
  return join(dataDir, `${token}.json`);
}

app.post('/api/users', (req, res) => {
  const { pseudo } = req.body;
  if (!pseudo || typeof pseudo !== 'string' || !pseudo.trim()) {
    res.status(400).json({ error: 'Le pseudo est requis' });
    return;
  }
  const token = crypto.randomUUID();
  const user = {
    pseudo: pseudo.trim(),
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    lessons: {},
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
  writeFileSync(userFilePath(token), JSON.stringify(user, null, 2));
  res.status(201).json({ token, user });
});

app.get('/api/users/:token', (req, res) => {
  const { token } = req.params;
  const filePath = userFilePath(token);
  if (!existsSync(filePath)) {
    res.status(404).json({ error: 'Utilisateur introuvable' });
    return;
  }
  try {
    const user = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' });
  }
});

app.put('/api/users/:token', (req, res) => {
  const { token } = req.params;
  const filePath = userFilePath(token);
  if (!existsSync(filePath)) {
    res.status(404).json({ error: 'Utilisateur introuvable' });
    return;
  }
  try {
    const current = JSON.parse(readFileSync(filePath, 'utf-8'));
    const updated = { ...current, ...req.body, lastLoginAt: new Date().toISOString() };
    writeFileSync(filePath, JSON.stringify(updated, null, 2));
    res.json({ user: updated });
  } catch {
    res.status(500).json({ error: 'Erreur de mise à jour' });
  }
});

app.delete('/api/users/:token', (req, res) => {
  const { token } = req.params;
  const filePath = userFilePath(token);
  if (!existsSync(filePath)) {
    res.status(404).json({ error: 'Utilisateur introuvable' });
    return;
  }
  try {
    unlinkSync(filePath);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Erreur de suppression' });
  }
});

const port = process.env['API_PORT'] || 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
