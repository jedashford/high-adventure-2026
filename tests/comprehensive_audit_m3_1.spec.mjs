import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_URL = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');
const INDEX_FILE_URL = 'file://' + path.resolve(__dirname, '../index.html');

// Helper to compute contrast ratio in browser context
const CONTRAST_CHECK_JS = `
(() => {
    function parseRGB(colorStr) {
        if (!colorStr) return null;
        const match = colorStr.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
        if (!match) {
            // Hex parsing fallback
            if (colorStr.startsWith('#')) {
                let hex = colorStr.slice(1);
                if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
                if (hex.length === 6) {
                    const r = parseInt(hex.substring(0,2), 16);
                    const g = parseInt(hex.substring(2,4), 16);
                    const b = parseInt(hex.substring(4,6), 16);
                    return { r, g, b, a: 1 };
                }
            }
            return null;
        }
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
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

    function getEffectiveBgColor(el) {
        let current = el;
        let bgLayers = [];
        while (current && current !== document) {
            const style = window.getComputedStyle(current);
            const bg = parseRGB(style.backgroundColor);
            if (bg && bg.a > 0) {
                bgLayers.push(bg);
                if (bg.a === 1) break;
            }
            current = current.parentElement;
        }
        if (bgLayers.length === 0) return { r: 15, g: 23, b: 42, a: 1 }; // Default dark theme background fallback (#0f172a)

        // Blend layers over solid base if necessary
        let final = { r: 15, g: 23, b: 42 };
        for (let i = bgLayers.length - 1; i >= 0; i--) {
            const layer = bgLayers[i];
            const a = layer.a;
            final.r = Math.round(layer.r * a + final.r * (1 - a));
            final.g = Math.round(layer.g * a + final.g * (1 - a));
            final.b = Math.round(layer.b * a + final.b * (1 - a));
        }
        return final;
    }

    function getContrastRatio(fgStr, bgObj) {
        const fg = parseRGB(fgStr);
        if (!fg) return null;
        // Blend fg if alpha < 1
        const blendedFg = {
            r: Math.round(fg.r * fg.a + bgObj.r * (1 - fg.a)),
            g: Math.round(fg.g * fg.a + bgObj.g * (1 - fg.a)),
            b: Math.round(fg.b * fg.a + bgObj.b * (1 - fg.a))
        };
        const l1 = getLuminance(blendedFg);
        const l2 = getLuminance(bgObj);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    const selectors = [
        '.badge-adult', '.badge-youth', '.badge-both', '.badge-ultralight', '.badge-budget',
        '.discount-tag', '.deal-badge',
        'button', '.tab-btn', '.profile-pill-btn', '.btn', '.btn-primary', '.btn-secondary',
        '.card', '.modal-content', 'body', 'header', '#comparisonDrawer', '#comparisonTable'
    ];

    const results = [];
    selectors.forEach(sel => {
        const els = Array.from(document.querySelectorAll(sel));
        els.forEach((el, index) => {
            if (el.offsetWidth === 0 && el.offsetHeight === 0 && !el.classList.contains('active')) return;
            const style = window.getComputedStyle(el);
            const fgColor = style.color;
            const bgObj = getEffectiveBgColor(el);
            const ratio = getContrastRatio(fgColor, bgObj);
            const fontSize = parseFloat(style.fontSize);
            const fontWeight = style.fontWeight;
            const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
            const reqRatio = isLargeText ? 3.0 : 4.5;
            results.push({
                selector: sel,
                index,
                text: el.innerText ? el.innerText.trim().slice(0, 30) : '',
                fgColor,
                bgColor: \`rgb(\${bgObj.r}, \${bgObj.g}, \${bgObj.b})\`,
                ratio: ratio ? Math.round(ratio * 100) / 100 : null,
                reqRatio,
                passes: ratio ? ratio >= reqRatio : false
            });
        });
    });
    return results;
})()
`;

test.describe('M3.1 Verification Suite', () => {

    test('Verification 1: WCAG 2.1 AA Color Contrast Ratios', async ({ page }) => {
        const consoleLogs = [];
        page.on('console', msg => consoleLogs.push(msg.text()));

        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const contrastData = await page.evaluate(CONTRAST_CHECK_JS);

        console.log('--- WCAG Contrast Audit Results ---');
        let failures = [];
        contrastData.forEach(item => {
            console.log(`[${item.passes ? 'PASS' : 'FAIL'}] ${item.selector} #${item.index} ("${item.text}") | FG: ${item.fgColor} BG: ${item.bgColor} | Ratio: ${item.ratio}:1 (Min: ${item.reqRatio}:1)`);
            if (!item.passes) failures.push(item);
        });

        // Specifically check required badges & tags
        const requiredBadges = ['.badge-adult', '.badge-youth', '.badge-both', '.discount-tag', '.deal-badge'];
        requiredBadges.forEach(badgeSel => {
            const badgeItems = contrastData.filter(i => i.selector === badgeSel);
            console.log(`Checked badge selector ${badgeSel}: ${badgeItems.length} elements found.`);
        });

        expect(failures.length, `Found ${failures.length} contrast violations!`).toBe(0);
    });

    test('Verification 2: Responsive UI Across Layout Widths (1280, 1920, 768, 375, 414)', async ({ page }) => {
        const viewports = [
            { width: 1280, height: 800, name: 'Desktop 1280' },
            { width: 1920, height: 1080, name: 'Desktop 1920' },
            { width: 768, height: 1024, name: 'Tablet 768' },
            { width: 375, height: 812, name: 'Mobile 375' },
            { width: 414, height: 896, name: 'Mobile 414' }
        ];

        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        for (const vp of viewports) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.waitForTimeout(200);

            const overflowInfo = await page.evaluate(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                
                // Find elements causing horizontal overflow outside valid table/responsive wrappers
                const bodyChildren = Array.from(document.querySelectorAll('body *'));
                const overflowingElements = bodyChildren.filter(el => {
                    // Ignore container if inside table-responsive or overflow container
                    let parent = el.parentElement;
                    while (parent && parent !== document.body) {
                        const overflowX = window.getComputedStyle(parent).overflowX;
                        if (overflowX === 'auto' || overflowX === 'scroll') return false;
                        parent = parent.parentElement;
                    }
                    const rect = el.getBoundingClientRect();
                    return rect.right > winWidth + 2; // 2px margin tolerance
                }).map(el => ({
                    tagName: el.tagName,
                    id: el.id,
                    className: el.className,
                    right: el.getBoundingClientRect().right
                }));

                return {
                    docWidth,
                    winWidth,
                    hasDocOverflow: docWidth > winWidth + 2,
                    overflowingCount: overflowingElements.length,
                    overflowingElements: overflowingElements.slice(0, 5)
                };
            });

            console.log(`Viewport ${vp.name} (${vp.width}px): Document Scroll Width=${overflowInfo.docWidth}px, Window Width=${overflowInfo.winWidth}px, Doc Overflow=${overflowInfo.hasDocOverflow}`);
            if (overflowInfo.overflowingCount > 0) {
                console.log(`Overflowing elements at ${vp.width}px:`, JSON.stringify(overflowInfo.overflowingElements));
            }
            expect(overflowInfo.hasDocOverflow, `Horizontal scroll breakout detected at ${vp.width}px!`).toBe(false);
        }
    });

    test('Verification 3: Zero JS Console Errors & Clean DOM', async ({ page }) => {
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        page.on('pageerror', error => {
            pageErrors.push(error.message || error.toString());
        });

        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // Interact with features to trigger any potential runtime errors
        // 1. Search
        const searchInput = page.locator('#gearSearch');
        if (await searchInput.isVisible()) {
            await searchInput.fill('tent');
            await page.waitForTimeout(100);
            await searchInput.fill('');
        }

        // 2. Sort
        const sortSelect = page.locator('#sortSelect');
        if (await sortSelect.isVisible()) {
            await sortSelect.selectOption({ index: 1 });
            await page.waitForTimeout(100);
        }

        // 3. Category tabs
        const tabBtns = page.locator('#categoryTabs .tab-btn');
        const count = await tabBtns.count();
        for (let i = 0; i < Math.min(count, 5); i++) {
            await tabBtns.nth(i).click();
            await page.waitForTimeout(50);
        }

        // 4. Profile pills
        const profileBtns = page.locator('.profile-pill-btn');
        const pCount = await profileBtns.count();
        for (let i = 0; i < pCount; i++) {
            await profileBtns.nth(i).click();
            await page.waitForTimeout(50);
        }

        // Check DOM structure for duplicate IDs or invalid attribute references
        const domIssues = await page.evaluate(() => {
            const issues = [];
            const allElements = Array.from(document.querySelectorAll('*'));
            const idMap = new Map();
            allElements.forEach(el => {
                if (el.id) {
                    if (idMap.has(el.id)) {
                        issues.push(`Duplicate ID found: #${el.id}`);
                    } else {
                        idMap.set(el.id, true);
                    }
                }
            });
            // Check text for undefined / NaN / null text node renders
            const bodyText = document.body.innerText;
            if (/undefined/i.test(bodyText)) {
                // Check if it's literal string "undefined" in UI
                issues.push('Literal "undefined" text found in rendered page text');
            }
            if (/\bNaN\b/.test(bodyText)) {
                issues.push('Literal "NaN" text found in rendered page text');
            }
            return issues;
        });

        console.log('Console Errors:', consoleErrors);
        console.log('Page Errors:', pageErrors);
        console.log('DOM Issues:', domIssues);

        expect(consoleErrors.length, `JS Console Errors found: ${consoleErrors.join('; ')}`).toBe(0);
        expect(pageErrors.length, `Unhandled Page Errors found: ${pageErrors.join('; ')}`).toBe(0);
        expect(domIssues.length, `DOM Issues found: ${domIssues.join('; ')}`).toBe(0);
    });

    test('Verification 4: Modal & Comparison Drawer Ergonomics', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // Check Lightbox Modal attributes & keyboard handling
        const thumbnail = page.locator('#gearTableBody tr img').first();
        if (await thumbnail.isVisible()) {
            await thumbnail.click();
            
            const modal = page.locator('#imageLightboxModal');
            await expect(modal).toBeVisible();

            // Check ARIA attributes
            const modalAttrs = await modal.evaluate(el => ({
                role: el.getAttribute('role'),
                ariaModal: el.getAttribute('aria-modal'),
                ariaLabelledby: el.getAttribute('aria-labelledby'),
                ariaLabel: el.getAttribute('aria-label'),
                bodyOverflow: window.getComputedStyle(document.body).overflow
            }));

            console.log('Lightbox Modal ARIA/Scroll State:', modalAttrs);

            // Escape key handling
            await page.keyboard.press('Escape');
            await expect(modal).toBeHidden();

            const postCloseBodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
            console.log('Post-close body overflow:', postCloseBodyOverflow);
            expect(postCloseBodyOverflow).not.toBe('hidden');
        }

        // Check Comparison Drawer / Modal (if present)
        const compareCheckboxes = page.locator('.compare-checkbox');
        const compareCount = await compareCheckboxes.count();
        console.log(`Found ${compareCount} compare checkboxes.`);
        if (compareCount >= 2) {
            await compareCheckboxes.nth(0).check();
            await compareCheckboxes.nth(1).check();

            const drawer = page.locator('#comparisonDrawer, .comparison-drawer, #comparisonModal, .comparison-modal').first();
            if (await drawer.isVisible()) {
                const drawerAttrs = await drawer.evaluate(el => ({
                    role: el.getAttribute('role'),
                    ariaModal: el.getAttribute('aria-modal'),
                    ariaLabel: el.getAttribute('aria-label'),
                    id: el.id,
                    className: el.className
                }));
                console.log('Comparison Drawer/Modal ARIA attrs:', drawerAttrs);

                // Test escape key on drawer
                await page.keyboard.press('Escape');
                await page.waitForTimeout(100);
                const isStillVisible = await drawer.isVisible();
                console.log('Drawer visible after Escape:', isStillVisible);
            }
        }
    });

});
