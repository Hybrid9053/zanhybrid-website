# ZanHybrid Website
## Anyone. Anywhere. Anytime.

A full multi-page corporate website for ZanHybrid ICT company.

---

## 📁 Project Structure

```
zanhybrid/
├── index.html              ← Home Page
├── pages/
│   ├── about.html          ← About Us
│   ├── services.html       ← Services (ICT, Cloud, Consultant, Security)
│   ├── portfolio.html      ← Portfolio / Case Studies
│   └── contact.html        ← Contact Form
├── css/
│   └── style.css           ← Global styles (gold theme)
├── js/
│   └── main.js             ← Animations, interactions
├── images/
│   └── logo.png            ← Your ZanHybrid logo
├── backend/
│   ├── server.js           ← Node.js Express server
│   └── data/
│       └── contacts.json   ← Form submissions (auto-created)
└── package.json
```

---

## 🚀 LOCAL HOSTING (Two Options)

### Option 1: Simple — Python (No install needed)

If you have Python installed, open terminal in the `zanhybrid` folder:

```bash
# Python 3
python3 -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```
Then open: **http://localhost:3000**

---

### Option 2: Full Backend — Node.js (Recommended)

**Step 1: Install Node.js**
Download from: https://nodejs.org (LTS version)

**Step 2: Install dependencies**
```bash
cd zanhybrid
npm install
```

**Step 3: Start the server**
```bash
npm start
```

**Step 4: Open your browser**
Go to: **http://localhost:3000**

---

### Option 3: VS Code Live Server

1. Install VS Code: https://code.visualstudio.com
2. Install extension: **Live Server** by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**

---

## 📧 Contact Form

When using the Node.js backend:
- Form submissions are saved to `backend/data/contacts.json`
- View all contacts: **http://localhost:3000/api/contacts**
- Health check: **http://localhost:3000/api/health**

---

## 🌐 Deploy Online (Free Options)

### Netlify (Easiest - Static)
1. Go to https://netlify.com
2. Drag & drop the `zanhybrid` folder
3. Your site is live instantly!

### GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Deploy from branch

### Vercel
```bash
npm install -g vercel
vercel
```

### VPS / Cloud Server (Full Backend)
```bash
# Install Node.js on your server
# Upload files via FTP/SFTP
# Run:
npm install
npm start

# For production, use PM2:
npm install -g pm2
pm2 start backend/server.js --name zanhybrid
pm2 startup
pm2 save
```

---

## 🎨 Customization

### Update Contact Info
Search for `+255 XXX XXX XXX` in all HTML files and replace with your real number.
Search for `info@zanhybrid.com` and replace with your real email.
Search for `123 Tech Plaza` and replace with your real address.

### Change Colors
Edit `css/style.css` — modify the `:root` variables at the top:
```css
--gold-primary: #FFD700;  /* Main gold color */
--gold-dark: #B8860B;     /* Dark gold */
```

---

## 📋 Pages Summary

| Page | File | Description |
|------|------|-------------|
| Home | index.html | Hero, services overview, stats, testimonials |
| About | pages/about.html | Story, team, values, timeline |
| Services | pages/services.html | Detailed ICT, Cloud, Consultant, Security |
| Portfolio | pages/portfolio.html | 9 projects + 2 case studies, filterable |
| Contact | pages/contact.html | Form, map, FAQ, business hours |

---

**© 2024 ZanHybrid — Anyone. Anywhere. Anytime.**
