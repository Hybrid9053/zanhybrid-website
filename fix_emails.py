import re, glob

FOOTER_RE = re.compile(
    r'<div class="footer-contact-item">\s*'
    r'<span class="contact-icon">✉️</span>\s*'
    r'<span class="contact-text">[^<]*</span>\s*'
    r'</div>',
    re.MULTILINE
)
FOOTER_NEW = (
    '<div class="footer-contact-item">\n'
    '        <span class="contact-icon">\u2709\ufe0f</span>\n'
    '        <span class="contact-text">info@zanhybrid.co.tz</span>\n'
    '      </div>\n'
    '      <div class="footer-contact-item">\n'
    '        <span class="contact-icon">\u2709\ufe0f</span>\n'
    '        <span class="contact-text">ibrahim@zanhybrid.co.tz</span>\n'
    '      </div>'
)

CONTACTPAGE_RE = re.compile(
    r'<div class="contact-info-item reveal-left"><span class="icon">✉️</span><div><h4>Email</h4><p>[^<]*</p></div></div>'
)
CONTACTPAGE_NEW = (
    '<div class="contact-info-item reveal-left"><span class="icon">\u2709\ufe0f</span>'
    '<div><h4>Email</h4><p>info@zanhybrid.co.tz</p><p>ibrahim@zanhybrid.co.tz</p></div></div>'
)

JSONLD_RE = re.compile(r'"email": "[^"]*"')
JSONLD_NEW = '"email": "info@zanhybrid.co.tz"'

files = glob.glob("**/*.html", recursive=True)
changed = []
for path in files:
    with open(path, encoding="utf-8") as f:
        content = f.read()
    orig = content
    content = FOOTER_RE.sub(FOOTER_NEW, content)
    content = CONTACTPAGE_RE.sub(CONTACTPAGE_NEW, content)
    content = JSONLD_RE.sub(JSONLD_NEW, content)
    if content != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        changed.append(path)

print(f"Updated {len(changed)} files:")
for p in changed:
    print(" -", p)
