import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test.describe('Comprehensive M3.1 Review Audit Suite', () => {

    test('1. WCAG 2.1 AA Color Contrast Analysis across all elements', async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');

        // Switch view modes to ensure both table and card elements are evaluated
        const cardViewBtn = page.locator('#viewCardsBtn');
        if (await cardViewBtn.isVisible()) {
            await cardViewBtn.click();
            await page.waitForTimeout(100);
        }
        const tableViewBtn = page.locator('#viewTableBtn');
        if (await tableViewBtn.isVisible()) {
            await tableViewBtn.click();
            await page.waitForTimeout(100);
        }

        const auditResults = await page.evaluate(() => {
            function parseRGB(colorStr) {
                if (!colorStr) return null;
                // Match rgb(r, g, b) or rgb(r g b) or rgba(r, g, b, a) or rgba(r g b / a)
                const match = colorStr.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/);
                if (!match) return null;
                return {
                    r: parseFloat(match[1]),
                    g: parseFloat(match[2]),
                    b: parseFloat(match[3]),
                    a: match[4] !== undefined ? parseFloat(match[4]) : 1
                };
            }

            function getLuminance({ r, g, b }) {
                const [rs, gs, bs] = [r, g, b].map(c => {
                    const s = c / 255;
                    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
            }

            function getEffectiveBg(el) {
                let curr = el;
                let layers = [];
                while (curr && curr !== document && curr !== document.documentElement) {
                    const style = window.getComputedStyle(curr);
                    const bg = parseRGB(style.backgroundColor);
                    if (bg && bg.a > 0) {
                        layers.push(bg);
                        if (bg.a === 1) break;
                    }
                    curr = curr.parentElement;
                }
                let base = { r: 15, g: 23, b: 42 }; // default dark theme #0f172a
                for (let i = layers.length - 1; i >= 0; i--) {
                    const l = layers[i];
                    base.r = Math.round(l.r * l.a + base.r * (1 - l.a));
                    base.g = Math.round(l.g * l.a + base.g * (1 - l.a));
                    base.b = Math.round(l.b * l.a + base.b * (1 - l.a));
                }
                return base;
            }

            function calcRatio(fgStr, bgObj) {
                const fg = parseRGB(fgStr);
                if (!fg) return null;
                const blended = {
                    r: Math.round(fg.r * fg.a + bgObj.r * (1 - fg.a)),
                    g: Math.round(fg.g * fg.a + bgObj.g * (1 - fg.a)),
                    b: Math.round(fg.b * fg.a + bgObj.b * (1 - fg.a))
                };
                const l1 = getLuminance(blended);
                const l2 = getLuminance(bgObj);
                return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            }

            const targetSelectors = [
                '.badge-adult', '.badge-youth', '.badge-both', '.badge-ultralight', '.badge-budget',
                '.badge-pick', '.badge-deal', '.discount-tag', '.value-score-badge', '.tab-count-badge',
                'button', '.tab-btn', '.profile-pill-btn', '.btn', '.modal-close-btn',
                '.product-card', '.card-title', '.card-brand', '.card-verdict', '.spec-name', '.spec-val',
                'body', 'header', '#floatingCompareBar', '#compareModal', '#imageLightboxModal'
            ];

            const items = [];
            targetSelectors.forEach(sel => {
                const els = Array.from(document.querySelectorAll(sel));
                els.forEach((el, idx) => {
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden') return;
                    const fg = style.color;
                    const bg = getEffectiveBg(el);
                    const ratio = calcRatio(fg, bg);
                    const fontSize = parseFloat(style.fontSize);
                    const fontWeight = style.fontWeight;
                    const isLarge = fontSize >= 24 || (fontSize >= 18.66 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
                    const req = isLarge ? 3.0 : 4.5;
                    items.push({
                        selector: sel,
                        idx,
                        text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
                        fg,
                        bg: `rgb(${bg.r},${bg.g},${bg.b})`,
                        ratio: ratio ? Math.round(ratio * 100) / 100 : null,
                        req,
                        passes: ratio ? ratio >= req : false
                    });
                });
            });
            return items;
        });

        console.log(`Total Contrast audited elements: ${auditResults.length}`);
        const failures = auditResults.filter(i => !i.passes);
        console.log(`Failures count: ${failures.length}`);
        failures.forEach(f => {
            console.log(`FAIL: ${f.selector} #${f.idx} "${f.text}" FG=${f.fg} BG=${f.bg} Ratio=${f.ratio} Req=${f.req}`);
        });

        const categories = ['.badge-adult', '.badge-youth', '.badge-both', '.badge-ultralight', '.badge-budget', '.discount-tag', '.badge-deal', '.badge-pick', '.value-score-badge'];
        categories.forEach(cat => {
            const matches = auditResults.filter(r => r.selector === cat);
            if (matches.length > 0) {
                const minRatio = Math.min(...matches.map(m => m.ratio));
                console.log(`Category ${cat}: ${matches.length} tested, min ratio=${minRatio}:1`);
            } else {
                console.log(`Category ${cat}: 0 rendered elements currently visible.`);
            }
        });

        expect(failures.length).toBe(0);
    });

    test('2. Multi-viewport Layout Responsiveness & Fluidity', async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');

        const viewports = [
            { w: 1280, h: 800, name: 'Desktop 1280px' },
            { w: 1920, h: 1080, name: 'Desktop 1920px' },
            { w: 768, h: 1024, name: 'Tablet 768px' },
            { w: 375, h: 812, name: 'Mobile 375px' },
            { w: 414, h: 896, name: 'Mobile 414px' }
        ];

        for (const vp of viewports) {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await page.waitForTimeout(150);

            for (const viewMode of ['table', 'cards']) {
                if (viewMode === 'cards') {
                    const cardsBtn = page.locator('#viewCardsBtn');
                    if (await cardsBtn.isVisible()) await cardsBtn.click();
                } else {
                    const tableBtn = page.locator('#viewTableBtn');
                    if (await tableBtn.isVisible()) await tableBtn.click();
                }
                await page.waitForTimeout(100);

                const res = await page.evaluate((vpW) => {
                    const scrollW = document.documentElement.scrollWidth;
                    const winW = window.innerWidth;

                    const overflowEls = Array.from(document.querySelectorAll('body *')).filter(el => {
                        let p = el.parentElement;
                        while (p && p !== document.body) {
                            const ox = window.getComputedStyle(p).overflowX;
                            if (ox === 'auto' || ox === 'scroll') return false;
                            p = p.parentElement;
                        }
                        const r = el.getBoundingClientRect();
                        return r.right > winW + 2;
                    }).map(el => ({ tag: el.tagName, id: el.id, cls: el.className, right: el.getBoundingClientRect().right }));

                    return {
                        scrollW,
                        winW,
                        hasBreakout: scrollW > winW + 2,
                        overflowCount: overflowEls.length,
                        overflowEls: overflowEls.slice(0, 3)
                    };
                }, vp.w);

                console.log(`[${vp.name}] [Mode: ${viewMode}] scrollWidth=${res.scrollW} winWidth=${res.winW} breakout=${res.hasBreakout}`);
                expect(res.hasBreakout, `Horizontal scroll breakout at ${vp.w}px in ${viewMode} mode!`).toBe(false);
            }
        }
    });

    test('3. Exhaustive JS Console Error Monitoring & DOM Integrity Audit', async ({ page }) => {
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', msg => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        page.on('pageerror', err => {
            pageErrors.push(err.message || err.toString());
        });

        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');

        // Profile pills
        const profileBtns = page.locator('.profile-pill-btn');
        for (let i = 0; i < await profileBtns.count(); i++) {
            await profileBtns.nth(i).click();
            await page.waitForTimeout(40);
        }

        // Category tabs
        const tabBtns = page.locator('#categoryTabs .tab-btn');
        for (let i = 0; i < await tabBtns.count(); i++) {
            await tabBtns.nth(i).click();
            await page.waitForTimeout(40);
        }

        // Search input
        const searchInput = page.locator('#gearSearch');
        await searchInput.fill('Osprey');
        await page.waitForTimeout(40);
        await searchInput.fill('');

        // Sort options
        const sortSelect = page.locator('#sortSelect');
        const sortOptions = await sortSelect.locator('option').all();
        for (let i = 0; i < sortOptions.length; i++) {
            const val = await sortOptions[i].getAttribute('value');
            await sortSelect.selectOption(val);
            await page.waitForTimeout(40);
        }

        // Deals only checkbox
        const dealsCheck = page.locator('#dealsOnlyCheck');
        await dealsCheck.check();
        await page.waitForTimeout(40);
        await dealsCheck.uncheck();

        // Check DOM Integrity
        const domScan = await page.evaluate(() => {
            const issues = [];
            const ids = new Set();
            document.querySelectorAll('*').forEach(el => {
                if (el.id) {
                    if (ids.has(el.id)) issues.push(`Duplicate ID: #${el.id}`);
                    ids.add(el.id);
                }
            });

            const text = document.body.innerText;
            if (/\bundefined\b/i.test(text)) issues.push('Rendered "undefined" found in visible body text');
            if (/\bNaN\b/.test(text)) issues.push('Rendered "NaN" found in visible body text');
            if (/\b\[object Object\]\b/.test(text)) issues.push('Rendered "[object Object]" found in visible body text');

            return issues;
        });

        console.log('Console Errors count:', consoleErrors.length);
        console.log('Page Errors count:', pageErrors.length);
        console.log('DOM Scan Issues count:', domScan.length);

        expect(consoleErrors.length).toBe(0);
        expect(pageErrors.length).toBe(0);
        expect(domScan.length).toBe(0);
    });

    test('4. Modal & Comparison Drawer Ergonomics & ARIA Audit', async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');

        // Audit Comparison Drawer & Modal
        const checkboxes = page.locator('#gearTableBody input[type="checkbox"]');
        expect(await checkboxes.count()).toBeGreaterThan(1);

        await checkboxes.nth(0).check();
        await checkboxes.nth(1).check();

        const compareBar = page.locator('#floatingCompareBar');
        await expect(compareBar).toBeVisible();

        const barAriaLabel = await compareBar.getAttribute('aria-label');
        console.log('Floating Compare Bar aria-label:', barAriaLabel);

        const openModalBtn = page.locator('#openCompareModalBtn');
        await openModalBtn.click();

        const compareModal = page.locator('#compareModal');
        await expect(compareModal).toBeVisible();

        const compareModalAria = await compareModal.evaluate(el => ({
            role: el.getAttribute('role'),
            ariaModal: el.getAttribute('aria-modal'),
            ariaLabelledby: el.getAttribute('aria-labelledby'),
            bodyOverflow: window.getComputedStyle(document.body).overflow
        }));
        console.log('Compare Modal ARIA:', compareModalAria);

        expect(compareModalAria.role).toBe('dialog');
        expect(compareModalAria.ariaModal).toBe('true');
        expect(compareModalAria.ariaLabelledby).toBe('modalTitle');
        expect(compareModalAria.bodyOverflow).toBe('hidden');

        await page.keyboard.press('Escape');
        await expect(compareModal).toBeHidden();

        const overflowAfterEscape = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
        expect(overflowAfterEscape).not.toBe('hidden');

        // Test Lightbox Modal
        const img = page.locator('#gearTableBody img').first();
        await img.click();

        const lightboxModal = page.locator('#imageLightboxModal');
        await expect(lightboxModal).toBeVisible();

        const lightboxAria = await lightboxModal.evaluate(el => ({
            role: el.getAttribute('role'),
            ariaModal: el.getAttribute('aria-modal'),
            ariaLabelledby: el.getAttribute('aria-labelledby'),
            ariaLabel: el.getAttribute('aria-label')
        }));
        console.log('Lightbox Modal ARIA Audit:', lightboxAria);

        await page.keyboard.press('Escape');
        await expect(lightboxModal).toBeHidden();

        const overflowAfterLightbox = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
        expect(overflowAfterLightbox).not.toBe('hidden');

        // Check if Lightbox has required ARIA attributes
        const lightboxHasRole = lightboxAria.role === 'dialog';
        const lightboxHasAriaModal = lightboxAria.ariaModal === 'true';
        const lightboxHasAriaLabel = !!(lightboxAria.ariaLabelledby || lightboxAria.ariaLabel);

        console.log(`Lightbox ARIA checks -> role="dialog": ${lightboxHasRole}, aria-modal="true": ${lightboxHasAriaModal}, aria-labelledby/label: ${lightboxHasAriaLabel}`);
    });

});
