import json
import os

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Backpacking Gear Comparison Hub — High-Adventure Deal Matrix</title>
    <style>
        :root {
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --card-border: #334155;
            --accent-green: #22c55e;
            --accent-green-light: #4ade80;
            --accent-blue: #38bdf8;
            --accent-amber: #f59e0b;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            
            /* WCAG 2.1 AA Compliant Badge Colors (Contrast ratio >= 4.5:1) */
            --badge-adult-bg: #1d4ed8;
            --badge-adult-text: #ffffff;
            --badge-adult-border: #3b82f6;

            --badge-youth-bg: #be185d;
            --badge-youth-text: #ffffff;
            --badge-youth-border: #f472b6;

            --badge-ultralight-bg: #047857;
            --badge-ultralight-text: #ffffff;
            --badge-ultralight-border: #10b981;

            --badge-budget-bg: #b45309;
            --badge-budget-text: #ffffff;
            --badge-budget-border: #f59e0b;

            --badge-both-bg: #6d28d9;
            --badge-both-text: #ffffff;
            --badge-both-border: #a78bfa;

            --badge-deal-bg: #065f46;
            --badge-deal-text: #ffffff;
            --badge-deal-border: #34d399;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            line-height: 1.5;
            padding: 20px 15px 100px 15px;
        }

        /* Keyboard Focus Accessibility */
        :focus-visible {
            outline: 3px solid var(--accent-blue);
            outline-offset: 2px;
        }

        header {
            max-width: 1350px;
            margin: 0 auto 25px auto;
            text-align: center;
            padding: 24px 20px;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        h1 {
            font-size: 2.2rem;
            color: var(--text-primary);
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }

        header p {
            color: var(--text-secondary);
            font-size: 1.05rem;
            max-width: 900px;
            margin: 0 auto;
        }

        /* Profile Filter Pills Bar */
        .user-profiles-section {
            margin-top: 18px;
        }

        .user-profiles-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            margin-bottom: 10px;
            font-weight: 700;
        }

        .user-profiles {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .profile-pill-btn {
            background-color: #1e293b;
            color: var(--text-secondary);
            border: 1px solid var(--card-border);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .profile-pill-btn:hover {
            border-color: var(--accent-blue);
            color: var(--text-primary);
            transform: translateY(-1px);
        }

        .profile-pill-btn.active {
            background-color: var(--accent-blue);
            color: #0f172a;
            border-color: var(--accent-blue);
            font-weight: 700;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        }

        .profile-pill-btn.adult-target.active {
            background-color: var(--badge-adult-bg);
            color: var(--badge-adult-text);
            border-color: var(--badge-adult-border);
        }
        .profile-pill-btn.youth-target.active {
            background-color: var(--badge-youth-bg);
            color: var(--badge-youth-text);
            border-color: var(--badge-youth-border);
        }
        .profile-pill-btn.ultralight-target.active {
            background-color: var(--badge-ultralight-bg);
            color: var(--badge-ultralight-text);
            border-color: var(--badge-ultralight-border);
        }
        .profile-pill-btn.budget-target.active {
            background-color: var(--badge-budget-bg);
            color: var(--badge-budget-text);
            border-color: var(--badge-budget-border);
        }

        /* Container & Tabs */
        .container {
            max-width: 1350px;
            margin: 0 auto;
        }

        .tabs-wrapper {
            position: relative;
            margin-bottom: 20px;
        }

        .tabs {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--card-border);
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
        }

        .tab-btn {
            background-color: var(--card-bg);
            color: var(--text-secondary);
            border: 1px solid var(--card-border);
            padding: 10px 18px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            white-space: nowrap;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .tab-btn:hover {
            background-color: #334155;
            color: var(--text-primary);
        }

        .tab-btn.active {
            background-color: var(--accent-green);
            color: #0f172a;
            border-color: var(--accent-green);
            font-weight: 700;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }

        .tab-count-badge {
            background-color: rgba(255, 255, 255, 0.15);
            color: currentColor;
            padding: 2px 7px;
            border-radius: 12px;
            font-size: 0.78rem;
            font-weight: 700;
        }

        .tab-btn.active .tab-count-badge {
            background-color: rgba(15, 23, 42, 0.25);
            color: #0f172a;
        }

        /* Toolbar & Filtering */
        .toolbar {
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            padding: 16px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
            justify-content: space-between;
        }

        .search-group {
            flex: 1 1 300px;
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-input {
            width: 100%;
            padding: 10px 36px 10px 16px;
            background-color: #0f172a;
            border: 1px solid var(--card-border);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 0.95rem;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--accent-blue);
        }

        .clear-search-btn {
            position: absolute;
            right: 10px;
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 2px 6px;
            line-height: 1;
        }

        .clear-search-btn:hover {
            color: #f87171;
        }

        .filter-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
        }

        .filter-control-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .filter-control-item label {
            font-weight: 600;
            cursor: pointer;
        }

        .select-input {
            background-color: #0f172a;
            color: var(--text-primary);
            border: 1px solid var(--card-border);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.88rem;
            cursor: pointer;
        }

        .checkbox-label {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            font-weight: 600;
            color: var(--text-secondary);
            user-select: none;
        }

        .checkbox-label input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: var(--accent-green);
            cursor: pointer;
        }

        .view-toggle-btns {
            display: flex;
            background-color: #0f172a;
            padding: 3px;
            border-radius: 6px;
            border: 1px solid var(--card-border);
        }

        .view-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .view-btn.active {
            background-color: var(--card-bg);
            color: var(--accent-blue);
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .results-summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .results-count {
            font-weight: 700;
            color: var(--text-primary);
        }

        /* Desktop Table View */
        .table-wrapper {
            overflow-x: auto;
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            margin-bottom: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.92rem;
        }

        th {
            background-color: #0f172a;
            color: var(--accent-blue);
            padding: 14px 16px;
            font-weight: 700;
            border-bottom: 2px solid var(--card-border);
            white-space: nowrap;
        }

        td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--card-border);
            vertical-align: middle;
        }

        tr:hover {
            background-color: rgba(255, 255, 255, 0.025);
        }

        /* Mobile Fluid Card Grid View */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .product-card {
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .product-card:hover {
            border-color: var(--accent-blue);
            transform: translateY(-2px);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .card-brand {
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--accent-blue);
            font-weight: 700;
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-top: 2px;
            line-height: 1.3;
        }

        .card-body {
            margin-bottom: 15px;
        }

        .card-price-row {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 10px;
        }

        .card-sparkline {
            margin: 10px 0;
            padding: 8px;
            background-color: #0f172a;
            border-radius: 6px;
            border: 1px solid var(--card-border);
        }

        .card-specs-list {
            list-style: none;
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 12px;
        }

        .card-specs-list li {
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
        }

        .spec-name {
            color: var(--text-muted);
        }

        .spec-val {
            font-weight: 600;
            color: var(--text-primary);
        }

        .card-verdict {
            font-style: italic;
            font-size: 0.88rem;
            color: var(--accent-blue);
            background: rgba(56, 189, 248, 0.08);
            padding: 10px;
            border-radius: 6px;
            border-left: 3px solid var(--accent-blue);
            margin-top: 10px;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid var(--card-border);
        }

        /* WCAG AA Compliant Badges */
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .badge-adult {
            background-color: var(--badge-adult-bg);
            color: var(--badge-adult-text);
            border: 1px solid var(--badge-adult-border);
        }

        .badge-youth {
            background-color: var(--badge-youth-bg);
            color: var(--badge-youth-text);
            border: 1px solid var(--badge-youth-border);
        }

        .badge-ultralight {
            background-color: var(--badge-ultralight-bg);
            color: var(--badge-ultralight-text);
            border: 1px solid var(--badge-ultralight-border);
        }

        .badge-budget {
            background-color: var(--badge-budget-bg);
            color: var(--badge-budget-text);
            border: 1px solid var(--badge-budget-border);
        }

        .badge-both {
            background-color: var(--badge-both-bg);
            color: var(--badge-both-text);
            border: 1px solid var(--badge-both-border);
        }

        .badge-deal {
            background-color: var(--badge-deal-bg);
            color: var(--badge-deal-text);
            border: 1px solid var(--badge-deal-border);
        }

        .badge-pick {
            background-color: #b45309;
            color: #ffffff;
            border: 1px solid #f59e0b;
        }

        .price-original {
            text-decoration: line-through;
            color: var(--text-muted);
            font-size: 0.88rem;
            margin-right: 4px;
        }

        .price-sale {
            color: var(--accent-green-light);
            font-weight: 700;
            font-size: 1.1rem;
        }

        .discount-tag {
            color: #ffffff;
            font-weight: 700;
            font-size: 0.8rem;
            background-color: #991b1b;
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid #f87171;
            margin-left: 4px;
        }

        .rating-stars {
            color: var(--accent-amber);
            font-weight: 700;
            font-size: 0.9rem;
        }

        .value-score-badge {
            background-color: rgba(34, 197, 94, 0.15);
            color: var(--accent-green-light);
            border: 1px solid rgba(34, 197, 94, 0.4);
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.82rem;
            display: inline-block;
        }

        /* SVG Sparkline Container */
        .sparkline-box {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .sparkline-svg {
            overflow: visible;
        }

        .sparkline-meta {
            font-size: 0.72rem;
            color: var(--text-muted);
            line-height: 1.2;
        }

        /* Pros and Cons lists */
        .pros-list, .cons-list {
            list-style: none;
            padding-left: 0;
            font-size: 0.82rem;
        }

        .pros-list li {
            color: #86efac;
            position: relative;
            padding-left: 14px;
            margin-bottom: 3px;
        }

        .pros-list li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--accent-green);
            font-weight: 700;
        }

        .cons-list li {
            color: #fca5a5;
            position: relative;
            padding-left: 14px;
            margin-bottom: 3px;
        }

        .cons-list li::before {
            content: "✗";
            position: absolute;
            left: 0;
            color: #ef4444;
            font-weight: 700;
        }

        /* Recommendation Box */
        .guide-box {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid var(--accent-blue);
            border-radius: 12px;
            padding: 24px;
            margin-top: 30px;
            box-shadow: 0 4px 20px rgba(56, 189, 248, 0.15);
        }

        .guide-box h2 {
            color: var(--accent-blue);
            font-size: 1.4rem;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .guide-box p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 16px;
        }

        .build-matrix-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
        }

        .build-card {
            background-color: #0f172a;
            border: 1px solid var(--card-border);
            border-radius: 8px;
            padding: 16px;
        }

        .build-card.recommended {
            border-color: var(--accent-green);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }

        .build-title {
            font-weight: 700;
            font-size: 1rem;
            color: var(--text-primary);
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
        }

        /* Buttons */
        .btn {
            background-color: var(--accent-blue);
            color: #0f172a;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-secondary {
            background-color: #334155;
            color: var(--text-primary);
            border: 1px solid var(--card-border);
        }

        .btn-green {
            background-color: var(--accent-green);
            color: #0f172a;
        }

        /* Floating Compare Drawer Bar */
        .floating-compare-bar {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(120px);
            background-color: #1e293b;
            border: 2px solid var(--accent-blue);
            border-radius: 30px;
            padding: 10px 24px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 1000;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .floating-compare-bar.visible {
            transform: translateX(-50%) translateY(0);
        }

        .compare-count {
            font-weight: 700;
            font-size: 0.92rem;
            color: var(--text-primary);
        }

        .compare-chips {
            display: flex;
            gap: 6px;
            max-width: 500px;
            overflow-x: auto;
        }

        .compare-chip {
            background-color: #0f172a;
            color: var(--accent-blue);
            border: 1px solid var(--accent-blue);
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .compare-chip-remove {
            cursor: pointer;
            color: #f87171;
            font-weight: 700;
        }

        /* Side-by-Side Specs Comparison Modal */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(5px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            padding: 20px;
        }

        .modal-backdrop.active {
            display: flex;
        }

        .modal-container {
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            width: 100%;
            max-width: 1200px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            overflow: hidden;
        }

        .modal-header {
            padding: 18px 24px;
            border-bottom: 1px solid var(--card-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #0f172a;
        }

        .modal-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--text-primary);
        }

        .modal-close-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.6rem;
            cursor: pointer;
            padding: 0 8px;
            line-height: 1;
        }

        .modal-close-btn:hover {
            color: #f87171;
        }

        .modal-body {
            padding: 20px;
            overflow-x: auto;
            overflow-y: auto;
        }

        .compare-matrix-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 700px;
        }

        .compare-matrix-table th, .compare-matrix-table td {
            padding: 14px;
            border: 1px solid var(--card-border);
            vertical-align: top;
        }

        .compare-matrix-table th.feature-col {
            background-color: #0f172a;
            color: var(--accent-blue);
            width: 160px;
            font-weight: 700;
            position: sticky;
            left: 0;
            z-index: 10;
        }

        .compare-matrix-table td.product-col {
            width: 25%;
            background-color: var(--card-bg);
        }

        /* Mobile Viewport Optimizations */
        @media (max-width: 768px) {
            h1 {
                font-size: 1.6rem;
            }
            header p {
                font-size: 0.95rem;
            }
            .profile-pill-btn {
                font-size: 0.8rem;
                padding: 6px 12px;
            }
            .toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            .filter-controls {
                justify-content: space-between;
            }
            /* Auto-switch to cards on mobile */
            .desktop-table-view {
                display: none !important;
            }
            .mobile-card-view {
                display: grid !important;
            }
            .floating-compare-bar {
                flex-direction: column;
                gap: 8px;
                border-radius: 16px;
                padding: 12px 16px;
                bottom: 10px;
            }
            .compare-chips {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>

    <!-- Header Section with Accessibility Roles -->
    <header role="banner">
        <h1>Ultimate Backpacking Gear Hub</h1>
        <p>High-Adventure Multi-Category Deal Matrix &amp; Sawtooth Wilderness Fit Profile Analyzer</p>
        
        <div class="user-profiles-section">
            <div class="user-profiles-title">Filter By Target User Profile:</div>
            <div class="user-profiles" role="tablist" aria-label="Target User Profiles">
                <button class="profile-pill-btn active" data-profile="all" onclick="setProfileFilter('all')" role="tab" aria-selected="true">
                    🌐 All Gear
                </button>
                <button class="profile-pill-btn adult-target" data-profile="adult" onclick="setProfileFilter('adult')" role="tab" aria-selected="false">
                    👨 Adult (230 lb)
                </button>
                <button class="profile-pill-btn youth-target" data-profile="youth" onclick="setProfileFilter('youth')" role="tab" aria-selected="false">
                    👦 Youth / Child (5'1"-5'4")
                </button>
                <button class="profile-pill-btn ultralight-target" data-profile="ultralight" onclick="setProfileFilter('ultralight')" role="tab" aria-selected="false">
                    ⚡ Ultralight
                </button>
                <button class="profile-pill-btn budget-target" data-profile="budget" onclick="setProfileFilter('budget')" role="tab" aria-selected="false">
                    💰 Budget Value
                </button>
            </div>
        </div>
    </header>

    <main class="container" role="main">
        
        <!-- Category Navigation Tabs -->
        <div class="tabs-wrapper">
            <nav class="tabs" id="categoryTabs" role="tablist" aria-label="Gear Categories">
                <!-- Dynamically Rendered Category Tabs -->
            </nav>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="toolbar" role="search" aria-label="Product Search and Filters">
            <div class="search-group">
                <input type="text" id="gearSearch" class="search-input" placeholder="🔍 Search gear by name, brand, spec, or keyword..." aria-label="Search gear by name, brand, spec, or keyword" oninput="onSearchInput(event)">
                <button id="clearSearchBtn" class="clear-search-btn" onclick="clearSearch()" aria-label="Clear search" style="display:none;">✕</button>
            </div>

            <div class="filter-controls">
                <div class="filter-control-item">
                    <label for="sortSelect">Sort By:</label>
                    <select id="sortSelect" class="select-input" onchange="onSortChange(event)">
                        <option value="value">⭐ Value Rating (High to Low)</option>
                        <option value="price-asc">💵 Price (Low to High)</option>
                        <option value="price-desc">💎 Price (High to Low)</option>
                        <option value="rating">🏆 Customer Rating</option>
                        <option value="weight">🪶 Weight (Lightest First)</option>
                        <option value="discount">🔥 Discount % (High to Low)</option>
                    </select>
                </div>

                <div class="filter-control-item">
                    <label class="checkbox-label">
                        <input type="checkbox" id="dealsOnlyCheck" onchange="onDealsOnlyToggle(event)">
                        <span>🔥 Deals Only (&gt;15% Off)</span>
                    </label>
                </div>

                <div class="view-toggle-btns" role="group" aria-label="View Layout Toggle">
                    <button class="view-btn active" id="viewBtnAuto" onclick="setViewMode('auto')" title="Responsive Auto View">📱 Auto</button>
                    <button class="view-btn" id="viewBtnTable" onclick="setViewMode('table')" title="Force Table Matrix">📊 Table</button>
                    <button class="view-btn" id="viewBtnGrid" onclick="setViewMode('grid')" title="Force Cards Grid">🎴 Cards</button>
                </div>
            </div>
        </div>

        <!-- Results Summary Bar -->
        <div class="results-summary">
            <div>Showing <span class="results-count" id="resultsCount">0</span> products in <span id="activeCategoryName">All Categories</span></div>
            <div id="activeFiltersTag" style="font-size: 0.85rem; color: var(--accent-blue);"></div>
        </div>

        <!-- Desktop Table Matrix View -->
        <div class="table-wrapper desktop-table-view" id="tableContainer">
            <table id="gearTable" aria-label="Backpacking Gear Deal Matrix">
                <thead>
                    <tr>
                        <th scope="col" style="width: 40px; text-align: center;">Compare</th>
                        <th scope="col">Product &amp; Brand</th>
                        <th scope="col">Category &amp; Profiles</th>
                        <th scope="col">Deal Price &amp; History</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Value &amp; Rating</th>
                        <th scope="col">Key Specifications</th>
                        <th scope="col">Pros / Cons &amp; Verdict</th>
                    </tr>
                </thead>
                <tbody id="gearTableBody">
                    <!-- Dynamic Table Rows Rendered via JavaScript -->
                </tbody>
            </table>
        </div>

        <!-- Mobile Fluid Grid Cards View -->
        <div class="card-grid mobile-card-view" id="cardContainer" style="display: none;">
            <!-- Dynamic Cards Rendered via JavaScript -->
        </div>

        <!-- Empty State Message -->
        <div id="emptyState" style="display: none; text-align: center; padding: 50px 20px; background-color: var(--card-bg); border-radius: 12px; border: 1px solid var(--card-border); margin-bottom: 25px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
            <h3 style="color: var(--text-primary); margin-bottom: 8px;">No gear matches your current filters</h3>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 15px auto;">Try clearing your keyword search or switching to "All Profiles" to see all available items.</p>
            <button class="btn" onclick="resetFilters()">Reset All Filters</button>
        </div>

        <!-- Sawtooth Wilderness Duo Pick Guide Box -->
        <section class="guide-box" aria-labelledby="guideHeading">
            <h2 id="guideHeading">⛺ Sawtooth Wilderness Duo Builds (Jed + Ollie Trip Recommender)</h2>
            <p>Based on our 2026 Sawtooth trip parameters (nights in the 30s at Alice/Toxaway Lakes, 22-mile loop, 22 lb youth ceiling), here are the top 3 balanced duo builds:</p>
            
            <div class="build-matrix-grid">
                <div class="build-card">
                    <div class="build-title">
                        <span>💰 Budget Build</span>
                        <span style="color: var(--accent-green-light); font-weight:700;">~$585 Total</span>
                    </div>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 16px; margin-bottom: 8px;">
                        <li><strong>Tent:</strong> Marmot Tungsten 3P (on sale ~$225)</li>
                        <li><strong>Bags:</strong> Kelty Cosmic Down 20 ×2 (~$220)</li>
                        <li><strong>Pads:</strong> Therm-a-Rest Z Lite Sol ×2 (~$100)</li>
                        <li><strong>Pillows:</strong> Trekology Aluft ×2 (~$40)</li>
                    </ul>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">Combined weight ~15 lbs → Split ~8.5 lb / 6.5 lb</div>
                </div>

                <div class="build-card recommended">
                    <div class="build-title">
                        <span>⭐ Best Value Build (Recommended)</span>
                        <span style="color: var(--accent-green-light); font-weight:700;">~$1,020 Total</span>
                    </div>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 16px; margin-bottom: 8px;">
                        <li><strong>Tent:</strong> REI Half Dome SL 3+ (~$379 / sale ~$299)</li>
                        <li><strong>Bags:</strong> Kelty Cosmic Down 20 ×2 (~$360)</li>
                        <li><strong>Pads:</strong> Dad: REI Helix Air · Ollie: Z Lite Sol (~$180)</li>
                        <li><strong>Pillows:</strong> Sea to Summit Aeros ×2 (~$100)</li>
                    </ul>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">Combined weight ~12 lbs → Split ~7 lb / 5 lb</div>
                </div>

                <div class="build-card">
                    <div class="build-title">
                        <span>⚡ Premium Ultralight</span>
                        <span style="color: var(--accent-green-light); font-weight:700;">~$1,900 Total</span>
                    </div>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 16px; margin-bottom: 8px;">
                        <li><strong>Tent:</strong> Big Agnes Copper Spur UL3 (~$600)</li>
                        <li><strong>Bags:</strong> REI Magma 15 ×2 (~$780)</li>
                        <li><strong>Pads:</strong> Therm-a-Rest NeoAir XLite NXT ×2 (~$420)</li>
                        <li><strong>Pillows:</strong> Sea to Summit Aeros ×2 (~$100)</li>
                    </ul>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">Combined weight ~9.5 lbs → Split ~5.5 lb / 4 lb</div>
                </div>
            </div>
        </section>
    </main>

    <!-- Persistent Floating Comparison Bar -->
    <div class="floating-compare-bar" id="floatingCompareBar" aria-label="Comparison Selection Drawer">
        <div class="compare-count">
            Selected for Compare: <span id="compareCountNum">0</span>/4
        </div>
        <div class="compare-chips" id="compareChipsContainer">
            <!-- Selected item chips rendered here -->
        </div>
        <div style="display: flex; gap: 8px;">
            <button class="btn btn-green" id="openCompareModalBtn" onclick="openCompareModal()">Compare Now</button>
            <button class="btn btn-secondary" onclick="clearCompareSelection()">Clear All</button>
        </div>
    </div>

    <!-- Side-by-Side Comparison Matrix Modal -->
    <div class="modal-backdrop" id="compareModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="modal-title" id="modalTitle">Side-by-Side Gear Specifications Comparison</h3>
                <button class="modal-close-btn" onclick="closeCompareModal()" aria-label="Close comparison modal">&times;</button>
            </div>
            <div class="modal-body">
                <table class="compare-matrix-table">
                    <thead>
                        <tr id="modalTableHeaderRow">
                            <!-- Dynamic Product Headers -->
                        </tr>
                    </thead>
                    <tbody id="modalTableBody">
                        <!-- Dynamic Comparison Matrix Rows -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Product Image Lightbox Modal -->
    <div id="imageLightboxModal" class="modal-backdrop" onclick="closeImageLightbox(event)" style="display:none; align-items:center; justify-content:center;">
        <div class="modal-content" style="max-width: 650px; text-align: center; padding: 24px; position:relative; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); color: var(--text-primary);" onclick="event.stopPropagation()">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 id="lightboxTitle" style="color:var(--text-primary); font-size:1.25rem; font-weight:700; margin:0;">Product Image Preview</h3>
                <button onclick="closeImageLightbox()" class="modal-close-btn" aria-label="Close image preview">&times;</button>
            </div>
            <div style="width:100%; height:380px; display:flex; align-items:center; justify-content:center; overflow:hidden; border-radius:12px; border:1px solid var(--card-border); background:#0f172a; margin-bottom:16px;">
                <img id="lightboxImg" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="" style="max-width:100%; max-height:100%; object-fit:contain;">
            </div>
            <div id="lightboxMeta" style="color:var(--text-secondary); font-size:0.9rem; text-align:left; line-height:1.5;"></div>
        </div>
    </div>
'''

print("Static HTML header ready, length:", len(html_content))
