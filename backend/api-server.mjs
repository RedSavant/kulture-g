import express from 'express';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import crypto from 'node:crypto';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'backend-data');
const pfpDir = join(__dirname, '..', 'pfp-data');

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}
if (!existsSync(pfpDir)) {
  mkdirSync(pfpDir, { recursive: true });
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
    hearts: 9,
    lastHeartRefill: new Date().toISOString(),
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

app.post('/api/users/:token/pfp', (req, res) => {
  const { token } = req.params;
  const filePath = userFilePath(token);
  if (!existsSync(filePath)) {
    res.status(404).json({ error: 'Utilisateur introuvable' });
    return;
  }
  const user = JSON.parse(readFileSync(filePath, 'utf-8'));
  const userPfpDir = join(pfpDir, token);
  if (!existsSync(userPfpDir)) {
    mkdirSync(userPfpDir, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (_r, _f, cb) => cb(null, userPfpDir),
    filename: (_r, file, cb) => cb(null, `pfp${extname(file.originalname) || '.png'}`),
  });
  const single = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }).single('pfp');
  single(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: 'Erreur lors du téléchargement' });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: 'Aucun fichier fourni' });
      return;
    }
    const pfpPath = `/api/users/${token}/pfp/file`;
    user.pfp = pfpPath;
    writeFileSync(filePath, JSON.stringify(user, null, 2));
    res.json({ pfp: pfpPath });
  });
});

app.get('/api/users/:token/pfp/file', (req, res) => {
  const { token } = req.params;
  const filePath = userFilePath(token);
  if (!existsSync(filePath)) {
    res.status(404).json({ error: 'Utilisateur introuvable' });
    return;
  }
  const userPfpDir = join(pfpDir, token);
  const pfpFile = join(userPfpDir, 'pfp.png');
  const pfpJpg = join(userPfpDir, 'pfp.jpg');
  const pfpJpeg = join(userPfpDir, 'pfp.jpeg');
  const pfpWebp = join(userPfpDir, 'pfp.webp');
  if (existsSync(pfpFile)) {
    res.sendFile(pfpFile);
  } else if (existsSync(pfpJpg)) {
    res.sendFile(pfpJpg);
  } else if (existsSync(pfpJpeg)) {
    res.sendFile(pfpJpeg);
  } else if (existsSync(pfpWebp)) {
    res.sendFile(pfpWebp);
  } else {
    res.status(404).json({ error: 'Photo introuvable' });
  }
});

const port = process.env['API_PORT'] || 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
