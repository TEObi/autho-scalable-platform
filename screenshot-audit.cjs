/**
 * AutoTrader.ca UX Audit Screenshot Script
 * Captures screenshots for each of the 14 identified issues.
 *
 * Run with:
 *   node screenshot-audit.cjs
 *
 * Output: ./audit-screenshots/ folder with 14 annotated PNG files
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'audit-screenshots');

// Each capture defines what to screenshot and how
const captures = [
  {
    id: 1,
    title: 'No location auto-detection on load',
    action: 'homepage-search',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 500 },
    note: 'No location pre-filled in search bar',
  },
  {
    id: 2,
    title: 'Search form lacks advanced filters upfront',
    action: 'homepage-search',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 500 },
    note: 'Only basic fields visible — no budget, fuel type, or transmission',
  },
  {
    id: 3,
    title: 'Most Popular Searches not personalized',
    action: 'scroll',
    selector: null,
    scrollY: 1400,
    clip: null,
    note: 'Generic listings shown to all users regardless of history',
  },
  {
    id: 4,
    title: 'Listing titles are messy and inconsistent',
    action: 'scroll',
    selector: null,
    scrollY: 1400,
    clip: null,
    note: 'Pipe-separated, truncated, mixed-language titles',
  },
  {
    id: 5,
    title: 'Mixed French/English content — no language toggle',
    action: 'scroll',
    selector: null,
    scrollY: 1400,
    clip: null,
    note: 'French listing titles on English homepage, no visible language switcher in header',
  },
  {
    id: 6,
    title: '"Brand New Arrivals" label is misleading',
    action: 'scroll',
    selector: null,
    scrollY: 2400,
    clip: null,
    note: 'Section shows used cars from 2017-2022 labelled as "brand new arrivals"',
  },
  {
    id: 7,
    title: 'No price rating badges on homepage cards',
    action: 'scroll',
    selector: null,
    scrollY: 1400,
    clip: null,
    note: 'No "Great Deal / Fair Price" indicators visible on listing cards',
  },
  {
    id: 8,
    title: 'Dealer vs private seller distinction is subtle',
    action: 'scroll',
    selector: null,
    scrollY: 1400,
    clip: null,
    note: 'Small "Dealer" tag is easy to miss on listing cards',
  },
  {
    id: 9,
    title: 'No fraud/scam warning visible on homepage',
    action: 'scroll',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 600 },
    note: 'No trust/safety signal near search — safety tips buried in footer',
  },
  {
    id: 10,
    title: 'Cookie consent banner blocks content — no top-level Reject',
    action: 'cookie-banner',
    selector: null,
    scrollY: 0,
    clip: null,
    note: 'Modal fires immediately, no "Reject All" at top level',
  },
  {
    id: 11,
    title: 'German-language text in autocomplete',
    action: 'autocomplete',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 500 },
    note: 'German placeholder text leaking from AutoScout24 integration',
  },
  {
    id: 12,
    title: 'Footer link overload — SEO-driven clutter',
    action: 'footer',
    selector: null,
    scrollY: 99999,
    clip: null,
    note: 'Hundreds of city/model links create overwhelming footer',
  },
  {
    id: 13,
    title: 'No vehicle comparison tool',
    action: 'scroll',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 700 },
    note: 'No compare feature visible anywhere on homepage',
  },
  {
    id: 14,
    title: 'EV/hybrid filtering not prominent',
    action: 'scroll',
    selector: null,
    scrollY: 0,
    clip: { x: 0, y: 0, width: 1280, height: 700 },
    note: 'No dedicated EV section or filter on homepage',
  },
];

async function addLabel(page, id, title, note) {
  await page.evaluate(
    ({ id, title, note }) => {
      // Remove any existing label
      const existing = document.getElementById('kiro-audit-label');
      if (existing) existing.remove();

      const label = document.createElement('div');
      label.id = 'kiro-audit-label';
      label.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 999999;
        background: #1a1a2e;
        color: #fff;
        font-family: Arial, sans-serif;
        font-size: 14px;
        padding: 10px 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      `;
      label.innerHTML = `
        <span style="background:#e63946;color:#fff;font-weight:bold;padding:2px 8px;border-radius:4px;white-space:nowrap;font-size:13px;">
          Issue #${id}
        </span>
        <span>
          <strong>${title}</strong>
          <span style="color:#aaa;margin-left:8px;font-size:12px;">${note}</span>
        </span>
      `;
      document.body.prepend(label);
    },
    { id, title, note }
  );
}

async function run() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  // --- Issue #10: Cookie banner (capture before dismissing) ---
  {
    const capture = captures.find(c => c.id === 10);
    console.log(`Capturing Issue #${capture.id}: ${capture.title}`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('https://www.autotrader.ca/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000); // let banner appear
    await addLabel(page, capture.id, capture.title, capture.note);
    await page.waitForTimeout(500);
    const filePath = path.join(OUTPUT_DIR, `issue-${String(capture.id).padStart(2, '0')}-cookie-banner.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`  Saved: ${filePath}`);
    await page.close();
  }

  // --- All other issues: dismiss cookie banner first, then capture ---
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('Loading autotrader.ca...');
  await page.goto('https://www.autotrader.ca/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Dismiss cookie banner if present
  try {
    const acceptBtn = await page.$('button:has-text("Accept")');
    if (acceptBtn) {
      await acceptBtn.click();
      await page.waitForTimeout(1000);
      console.log('  Cookie banner dismissed.');
    }
  } catch (_) {
    console.log('  No cookie banner found or already dismissed.');
  }

  for (const capture of captures) {
    if (capture.id === 10) continue; // already captured above

    console.log(`Capturing Issue #${capture.id}: ${capture.title}`);

    // Scroll to position
    await page.evaluate(y => window.scrollTo(0, y), capture.scrollY);
    await page.waitForTimeout(600);

    // Special handling per action type
    if (capture.action === 'footer') {
      // Scroll to actual bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(600);
    }

    if (capture.action === 'autocomplete') {
      // Type in search to trigger autocomplete
      try {
        const searchInput = await page.$('input[type="text"], input[placeholder*="Make"], input[placeholder*="Search"]');
        if (searchInput) {
          await searchInput.click();
          await searchInput.type('Honda', { delay: 80 });
          await page.waitForTimeout(1000);
        }
      } catch (_) {
        console.log('  Could not trigger autocomplete.');
      }
    }

    await addLabel(page, capture.id, capture.title, capture.note);
    await page.waitForTimeout(300);

    const slug = capture.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const filePath = path.join(OUTPUT_DIR, `issue-${String(capture.id).padStart(2, '0')}-${slug}.png`);

    if (capture.clip) {
      await page.screenshot({ path: filePath, clip: capture.clip });
    } else {
      await page.screenshot({ path: filePath, fullPage: false });
    }

    console.log(`  Saved: ${filePath}`);

    // Reset autocomplete state
    if (capture.action === 'autocomplete') {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      try {
        const acceptBtn = await page.$('button:has-text("Accept")');
        if (acceptBtn) { await acceptBtn.click(); await page.waitForTimeout(800); }
      } catch (_) {}
    }
  }

  await page.close();
  await browser.close();

  console.log('\n✅ All screenshots saved to:', OUTPUT_DIR);
  console.log('Files:');
  fs.readdirSync(OUTPUT_DIR).forEach(f => console.log(' ', f));
}

run().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
