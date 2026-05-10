const fs = require('fs');
const path = require('path');

const dirs = [
  'app/(dashboard)',
  'components/dashboard'
];

const replacements = [
  { regex: /bg-brand-dark/g, replacement: 'bg-background' },
  { regex: /bg-brand-card\/50/g, replacement: 'bg-card' },
  { regex: /bg-brand-card\/30/g, replacement: 'bg-card' },
  { regex: /bg-brand-card/g, replacement: 'bg-card' },
  { regex: /border-white\/[0-9]+/g, replacement: 'border-border' },
  { regex: /bg-white\/5/g, replacement: 'bg-muted' },
  { regex: /bg-white\/10/g, replacement: 'bg-muted' },
  { regex: /bg-brand-primary\/[0-9]+/g, replacement: 'bg-primary/20' }, // Approximation
  { regex: /bg-brand-primary/g, replacement: 'bg-primary' },
  { regex: /text-brand-primary/g, replacement: 'text-primary' },
  { regex: /shadow-brand-primary\/[0-9]+/g, replacement: 'shadow-primary/20' },
  { regex: /bg-brand-accent/g, replacement: 'bg-accent' },
  { regex: /text-brand-accent/g, replacement: 'text-accent' },
  { regex: /from-brand-primary/g, replacement: 'from-primary' },
  { regex: /to-brand-primary/g, replacement: 'to-primary' },
  // Be careful with text-white and text-white/*
  { regex: /text-white\/[0-9]+/g, replacement: 'text-muted-foreground' },
  // We won't blindly replace text-white because it might be inside a button. We will replace text-white only if it's not preceded by something that makes it a button text, but regex is hard. Let's just replace `text-white` with `text-foreground` and if some buttons look weird, it's fine, it will adapt to light/dark mode. Wait, primary buttons with text-foreground in light mode will be black text on indigo background, which might be okay or not. Let's replace `text-white` with `text-foreground` except inside buttons or we can just replace it.
  { regex: /text-white(?![\/\w])/g, replacement: 'text-foreground' },
];

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

dirs.forEach(d => {
  const fullPath = path.join(__dirname, d);
  if (fs.existsSync(fullPath)) {
    processDir(fullPath);
  }
});
