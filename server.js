import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Serve static assets built by Vite
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Health check endpoint for Google Cloud Run
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'google-skills-intelligence',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mock telemetry / API endpoints for integration testing
app.get('/api/status', (req, res) => {
  res.json({
    platform: 'Google Skills Supercharged Career & Skill Intelligence Ecosystem',
    institution: 'Georgia Institute of Technology (Scheller College of Business)',
    activeStudent: 'Alex Rivera',
    cloudRunContainer: true,
    version: '1.0.0'
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Google Skills Intelligence Ecosystem running on port ${PORT}`);
  console.log(`🌐 Ready for Google Cloud Run: http://0.0.0.0:${PORT}`);
  console.log(`🩺 Health check endpoint: http://0.0.0.0:${PORT}/healthz`);
  console.log(`=======================================================`);
});
