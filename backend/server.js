// ============================================
//   ZANHYBRID - BACKEND SERVER
//   Node.js + Express
// ============================================

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- SECURITY HEADERS ----
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ---- SERVE STATIC FILES ----
app.use(express.static(path.join(__dirname, '..')));

// ---- ROUTES ----

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Pages
['about', 'services', 'portfolio', 'contact'].forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', `${page}.html`));
  });
  app.get(`/pages/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', `${page}.html`));
  });
});

// ---- API: CONTACT FORM ----
app.post('/api/contact', (req, res) => {
  const { fname, lname, email, phone, company, budget, message, services } = req.body;

  // Basic validation
  if (!fname || !lname || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Required fields: fname, lname, email, message' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const submission = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name: `${fname} ${lname}`,
    email,
    phone: phone || 'N/A',
    company: company || 'N/A',
    budget: budget || 'N/A',
    services: Array.isArray(services) ? services.join(', ') : (services || 'N/A'),
    message,
    status: 'new'
  };

  // Save to JSON file (in production, use a real database)
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  
  const dbFile = path.join(dataDir, 'contacts.json');
  let contacts = [];
  if (fs.existsSync(dbFile)) {
    try { contacts = JSON.parse(fs.readFileSync(dbFile, 'utf8')); } catch(e) {}
  }
  contacts.push(submission);
  fs.writeFileSync(dbFile, JSON.stringify(contacts, null, 2));

  console.log(`📧 New contact from: ${submission.name} <${submission.email}>`);

  res.json({ 
    success: true, 
    message: 'Thank you! We will get back to you within 2 business hours.',
    id: submission.id
  });
});

// ---- API: GET CONTACTS (admin) ----
app.get('/api/contacts', (req, res) => {
  const dbFile = path.join(__dirname, 'data', 'contacts.json');
  if (!fs.existsSync(dbFile)) return res.json([]);
  try {
    const contacts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    res.json(contacts);
  } catch(e) {
    res.status(500).json({ error: 'Could not read contacts' });
  }
});

// ---- API: HEALTH CHECK ----
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    service: 'ZanHybrid Website', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ---- 404 HANDLER ----
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'index.html'));
});

// ---- START SERVER ----
app.listen(PORT, () => {
  console.log('\n');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║        ZANHYBRID WEBSITE SERVER       ║');
  console.log('  ║     Anyone · Anywhere · Anytime       ║');
  console.log('  ╠═══════════════════════════════════════╣');
  console.log(`  ║  🌐  http://localhost:${PORT}            ║`);
  console.log('  ║  ✅  Server running successfully       ║');
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('\n');
});
