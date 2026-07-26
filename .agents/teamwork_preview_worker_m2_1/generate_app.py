import os

script_code = '''
    <script>
        /**
         * Comprehensive Multi-Category Product Data Model
         * Covers 13 Categories (including 9 major Backpackers.com categories + targeted Youth Sleeping Pads)
         * Structured 3-pick standards (Classic Pick, Budget Pick, Premium Pick) plus Ultralight & Youth Pick Badges
         * WCAG AA Badging & Price Histories
         */
        const PRODUCTS = [
            // ==========================================
            // ⛺ CATEGORY 1: TENTS
            // ==========================================
            {
                id: "tent-rei-halfdome",
                imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Half Dome SL 3+",
                brand: "REI Co-op",
                category: "tents",
                categoryName: "Tents",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth", "value"],
                price: 299,
                currentPrice: 299,
                msrp: 379,
                salePrice: 299,
                weight: "4 lbs 14 oz",
                weightOz: 78,
                weightDisplay: "4 lbs 14 oz (78 oz)",
                dimensions: "21 x 7 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.4,
                rating: 4.7,
                reviewCount: 142,
                specs: {
                    "Freestanding": "Yes (Freestanding)",
                    "Capacity": "3-Person+",
                    "Floor Area": "48.8 sq ft (Real 4P space)",
                    "Peak Height": "44 in",
                    "Packed Size": "21 x 7 in",
                    "Doors/Vestibules": "2 Doors / 2 Vestibules"
                },
                priceHistory: [379, 379, 349, 329, 299],
                pros: ["Roomiest floor in class (48.8 sq ft)", "Footprint included in box", "Near-vertical sidewalls"],
                cons: ["Near 5 lb trail weight", "Slightly bulkier packed volume"],
                buyingAdvice: "Top overall recommendation. Palace for two with zero cramped feel.",
                verdict: "Top overall recommendation. Palace for two with zero cramped feel."
            },
            {
                id: "tent-ba-copperspur",
                imageUrl: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80",
                name: "Big Agnes Copper Spur HV UL3",
                brand: "Big Agnes",
                category: "tents",
                categoryName: "Tents",
                pickType: "Premium Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 539,
                currentPrice: 539,
                msrp: 600,
                salePrice: 539,
                weight: "3 lbs 6 oz",
                weightOz: 54,
                weightDisplay: "3 lbs 6 oz (54 oz)",
                dimensions: "21 x 6.5 in",
                dealBadge: "Premium Pick",
                valueRating: 8.5,
                rating: 4.8,
                reviewCount: 98,
                specs: {
                    "Freestanding": "Yes (Freestanding)",
                    "Capacity": "3-Person",
                    "Floor Area": "41.0 sq ft",
                    "Peak Height": "43 in",
                    "Packed Size": "21 x 6.5 in",
                    "Doors/Vestibules": "2 Awning Vestibules"
                },
                priceHistory: [600, 600, 580, 560, 539],
                pros: ["1.5 lbs lighter than Half Dome", "Awning-style vestibule doors", "Premium materials"],
                cons: ["High cost ($539+)", "Thinner 15D fabric requires care"],
                buyingAdvice: "The premium ultralight 3P pick for multi-week expeditions.",
                verdict: "The premium ultralight 3P pick for multi-week expeditions."
            },
            {
                id: "tent-marmot-tungsten",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "Marmot Tungsten 3P",
                brand: "Marmot",
                category: "tents",
                categoryName: "Tents",
                pickType: "Budget Pick",
                profiles: ["budget", "adult"],
                profileTags: ["budget", "adult", "value"],
                price: 225,
                currentPrice: 225,
                msrp: 329,
                salePrice: 225,
                weight: "6 lbs 0 oz",
                weightOz: 96,
                weightDisplay: "6 lbs 0 oz (96 oz)",
                dimensions: "22 x 8 in",
                dealBadge: "Budget Pick",
                valueRating: 9.0,
                rating: 4.5,
                reviewCount: 86,
                specs: {
                    "Freestanding": "Yes (Freestanding)",
                    "Capacity": "3-Person",
                    "Floor Area": "40.9 sq ft",
                    "Peak Height": "46 in",
                    "Packed Size": "22 x 8 in",
                    "Doors/Vestibules": "2 D-Shaped Doors"
                },
                priceHistory: [329, 329, 280, 249, 225],
                pros: ["Outstanding sale price ($225)", "Footprint included", "Durable 68D polyester"],
                cons: ["6.0 lb trail weight", "Slightly less floor area than REI"],
                buyingAdvice: "The value sniper. Best sub-$250 3-person freestanding tent.",
                verdict: "The value sniper. Best sub-$250 3-person freestanding tent."
            },
            {
                id: "tent-durston-xmid",
                imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
                name: "Durston X-Mid 2 Trekking Pole Tent",
                brand: "Durston Gear",
                category: "tents",
                categoryName: "Tents",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 280,
                currentPrice: 280,
                msrp: 300,
                salePrice: 280,
                weight: "2 lbs 4 oz",
                weightOz: 36,
                weightDisplay: "2 lbs 4 oz (36 oz)",
                dimensions: "12 x 5 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.7,
                rating: 4.9,
                reviewCount: 220,
                specs: {
                    "Freestanding": "No (Trekking Pole Pitch)",
                    "Capacity": "2-Person",
                    "Floor Area": "31.5 sq ft",
                    "Peak Height": "46 in",
                    "Packed Size": "12 x 5 in",
                    "Doors/Vestibules": "2 Doors / 2 Dual Vestibules"
                },
                priceHistory: [300, 300, 290, 285, 280],
                pros: ["Featherweight 36 oz trail weight", "Patented diagonal floor geometry", "Double wall protection"],
                cons: ["Requires 2 trekking poles to pitch", "Takes practice to stake out in sand"],
                buyingAdvice: "The gold standard ultralight trekking pole shelter.",
                verdict: "The gold standard ultralight trekking pole shelter."
            },
            {
                id: "tent-nemo-aurora",
                imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
                name: "NEMO Aurora 3P Tent",
                brand: "NEMO",
                category: "tents",
                categoryName: "Tents",
                pickType: "Youth Pick",
                profiles: ["youth", "adult"],
                profileTags: ["youth", "adult"],
                price: 289,
                currentPrice: 289,
                msrp: 330,
                salePrice: 289,
                weight: "5 lbs 13 oz",
                weightOz: 93,
                weightDisplay: "5 lbs 13 oz (93 oz)",
                dimensions: "23 x 7.5 in",
                dealBadge: "Youth Pick",
                valueRating: 8.8,
                rating: 4.6,
                reviewCount: 64,
                specs: {
                    "Freestanding": "Yes (Freestanding)",
                    "Capacity": "3-Person",
                    "Floor Area": "44.0 sq ft",
                    "Peak Height": "44 in",
                    "Packed Size": "23 x 7.5 in",
                    "Doors/Vestibules": "2 Large Doors"
                },
                priceHistory: [330, 330, 310, 299, 289],
                pros: ["Pre-bent poles for vertical walls", "Includes footprint & pawn print", "Fun color options"],
                cons: ["Heavier than Half Dome", "Pole hubs slightly stiff"],
                buyingAdvice: "Solid contender with steep vertical shoulder room for youth group trips.",
                verdict: "Solid contender with steep vertical shoulder room for youth group trips."
            },

            // ==========================================
            // 🛌 CATEGORY 2: SLEEPING BAGS
            // ==========================================
            {
                id: "bag-nemo-disco-20",
                imageUrl: "https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80",
                name: "NEMO Disco Endless Promise 20 Down Bag",
                brand: "NEMO",
                category: "sleeping_bags",
                categoryName: "Sleeping Bags",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth"],
                price: 279,
                currentPrice: 279,
                msrp: 330,
                salePrice: 279,
                weight: "2 lbs 2 oz",
                weightOz: 34,
                weightDisplay: "2 lbs 2 oz (34 oz)",
                dimensions: "8.5 x 12 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.2,
                rating: 4.8,
                reviewCount: 165,
                specs: {
                    "Temp Rating": "20°F (-6°C)",
                    "Insulation": "650-Fill Hydrophobic Down (RDS Certified)",
                    "Compressed Size": "8.5 x 12 in",
                    "Fit Sizing": "Short 5'6\\\" / Reg 6'0\\\"",
                    "Zipper": "Thermo Gill Vents + Anti-Snag"
                },
                priceHistory: [330, 330, 310, 295, 279],
                pros: ["Classic NEMO Spoon shape gives extra room for side-sleepers", "650-fill RDS hydrophobic down", "Thermo Gill body temp tuning vents"],
                cons: ["Higher price tag than Kelty", "Generous cut adds slight weight over trim mummy bags"],
                buyingAdvice: "The premier down sleeping bag for side sleepers wanting natural loft and elbow room.",
                verdict: "The premier down sleeping bag for side sleepers wanting natural loft and elbow room."
            },
            {
                id: "bag-sd-cloud-20",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "Sierra Designs Cloud 20 Zipperless Down Bag",
                brand: "Sierra Designs",
                category: "sleeping_bags",
                categoryName: "Sleeping Bags",
                pickType: "Premium Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 259,
                currentPrice: 259,
                msrp: 320,
                salePrice: 259,
                weight: "1 lb 13 oz",
                weightOz: 29,
                weightDisplay: "1 lb 13 oz (29 oz)",
                dimensions: "7.5 x 15 in",
                dealBadge: "Premium Pick",
                valueRating: 9.5,
                rating: 4.8,
                reviewCount: 195,
                specs: {
                    "Temp Rating": "20°F (-6°C)",
                    "Insulation": "800-Fill PFC-Free DriDown",
                    "Zipper": "100% Zipperless (Integrated Quilt & Foot Vent)",
                    "Compressed Size": "7.5 x 15 in",
                    "Pad Sleeve": "Integrated Sleeping Pad Sleeve"
                },
                priceHistory: [320, 320, 295, 279, 259],
                pros: ["Iconic zipperless design with integrated comforter flap", "800-fill DriDown offers supreme warmth and packability", "Self-sealing foot vent & pad sleeve"],
                cons: ["Takes 1-2 nights to master quilt tuck technique", "No zipper for traditional side venting"],
                buyingAdvice: "The legendary zipperless down bag. Ultimate bed-like freedom on the trail.",
                verdict: "The legendary zipperless down bag. Ultimate bed-like freedom on the trail."
            },
            {
                id: "bag-kelty-cosmic-down-20",
                imageUrl: "https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80",
                name: "Kelty Cosmic Down 20 Sleeping Bag",
                brand: "Kelty",
                category: "sleeping_bags",
                categoryName: "Sleeping Bags",
                pickType: "Budget Pick",
                profiles: ["adult", "youth", "budget"],
                profileTags: ["adult", "youth", "value", "budget"],
                price: 149,
                currentPrice: 149,
                msrp: 180,
                salePrice: 149,
                weight: "2 lbs 9 oz",
                weightOz: 41,
                weightDisplay: "2 lbs 9 oz (41 oz)",
                dimensions: "8 x 13 in",
                dealBadge: "Budget Pick",
                valueRating: 9.6,
                rating: 4.7,
                reviewCount: 230,
                specs: {
                    "Temp Rating": "20°F (-6°C)",
                    "Insulation": "550-Fill DriDown (Down)",
                    "Compressed Size": "8 x 13 in",
                    "Fit Sizing": "Short 5'6\\\" / Reg 6'0\\\"",
                    "Zipper": "Dual Slider"
                },
                priceHistory: [180, 180, 165, 159, 149],
                pros: ["Unbeatable value for 550-fill water-resistant down", "Packs to size of a bread loaf", "PFC-free DriDown treatment"],
                cons: ["Slightly heavier than 800-fill bags", "Basic draft collar"],
                buyingAdvice: "The undisputed king of budget-friendly down sleeping bags.",
                verdict: "The undisputed king of budget-friendly down sleeping bags."
            },
            {
                id: "bag-sts-spark-20",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "Sea to Summit Spark 20 Down Sleeping Bag",
                brand: "Sea to Summit",
                category: "sleeping_bags",
                categoryName: "Sleeping Bags",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 369,
                currentPrice: 369,
                msrp: 440,
                salePrice: 369,
                weight: "1 lb 1.4 oz",
                weightOz: 17.4,
                weightDisplay: "1 lb 1.4 oz (17.4 oz)",
                dimensions: "5.5 x 9 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.4,
                rating: 4.9,
                reviewCount: 140,
                specs: {
                    "Temp Rating": "20°F (-6°C)",
                    "Insulation": "850+ Fill Goose ULTRA-DRY Down",
                    "Compressed Size": "5.5 x 9 in (Ultra Compact)",
                    "Fit Sizing": "Reg 6'0\\\" / Long 6'6\\\"",
                    "Zipper": "1/2 Length YKK Zipper"
                },
                priceHistory: [440, 440, 410, 389, 369],
                pros: ["Incredible 1.08 lb total weight for a true 20°F down bag", "Packs smaller than a 1-liter Nalgene bottle", "850+ fill goose down offers supreme warmth-to-weight ratio"],
                cons: ["Trim mummy fit requires narrow sleeping style", "High price point"],
                buyingAdvice: "Top-tier ultralight goose down sleeping bag for weight-conscious backpackers.",
                verdict: "Top-tier ultralight goose down sleeping bag for weight-conscious backpackers."
            },
            {
                id: "bag-rei-trailmade-youth",
                imageUrl: "https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Trailmade 20 Youth Bag",
                brand: "REI Co-op",
                category: "sleeping_bags",
                categoryName: "Sleeping Bags",
                pickType: "Youth Pick",
                profiles: ["youth", "budget"],
                profileTags: ["youth", "budget", "value"],
                price: 89,
                currentPrice: 89,
                msrp: 110,
                salePrice: 89,
                weight: "2 lbs 8 oz",
                weightOz: 40,
                weightDisplay: "2 lbs 8 oz (40 oz)",
                dimensions: "8 x 14 in",
                dealBadge: "Youth Pick",
                valueRating: 9.5,
                rating: 4.7,
                reviewCount: 110,
                specs: {
                    "Temp Rating": "20°F (-6°C)",
                    "Insulation": "Water-Resistant Synthetic Fill",
                    "Fit Sizing": "Youth Fit (Up to 5'4\\\")",
                    "Compressed Size": "8 x 14 in",
                    "Zipper": "Anti-Snag Full Length"
                },
                priceHistory: [110, 110, 99, 95, 89],
                pros: ["Sized specifically for youth up to 5'4\\\"", "Water-resistant synthetic insulation", "Sub-$90 value price"],
                cons: ["Synthetic fill is slightly bulkier than down", "Weight 2.5 lbs"],
                buyingAdvice: "Best youth-specific 20°F bag designed for scouts.",
                verdict: "Best youth-specific 20°F bag designed for scouts."
            },

            // ==========================================
            // 🧘 CATEGORY 3: SLEEPING PADS (R2 Youth Expansion)
            // ==========================================
            {
                id: "pad-rei-helix",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Helix Insulated Air Pad",
                brand: "REI Co-op",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Classic Pick / Best Value Air",
                profiles: ["youth", "adult", "budget"],
                profileTags: ["youth", "adult", "value", "budget"],
                price: 99,
                currentPrice: 99,
                msrp: 129,
                salePrice: 99,
                weight: "17 oz",
                weightOz: 17,
                weightDisplay: "1 lb 1 oz (17 oz)",
                dimensions: "72 x 25 in",
                dealBadge: "Classic Pick / Best Value Air",
                valueRating: 9.5,
                rating: 4.8,
                reviewCount: 180,
                specs: {
                    "Thickness": "3.25\\\"",
                    "Width": "25\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "4.9",
                    "Weight": "17 oz",
                    "Type": "Insulated Air"
                },
                priceHistory: [129, 129, 119, 109, 99],
                pros: ["3.25\\\" thick air matrix provides excellent cushion for side-sleepers", "High 4.9 R-Value keeps cold ground away", "Lightweight 17 oz trail weight"],
                cons: ["Requires pump sack for inflation", "Pricier than foam"],
                buyingAdvice: "Classic Pick / Best Value Air pad for youth (5'1\\\"–5'4\\\").",
                verdict: "Classic Pick / Best Value Air pad for youth (5'1\\\"–5'4\\\")."
            },
            {
                id: "pad-ba-rapide-sl",
                imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
                name: "Big Agnes Rapide SL Insulated Pad",
                brand: "Big Agnes",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Plush Side-Sleeper Pick",
                profiles: ["youth", "adult"],
                profileTags: ["youth", "adult"],
                price: 129,
                currentPrice: 129,
                msrp: 149,
                salePrice: 129,
                weight: "19-21 oz",
                weightOz: 19,
                weightDisplay: "1 lb 3 oz (19-21 oz)",
                dimensions: "72 x 25 in",
                dealBadge: "Plush Side-Sleeper Pick",
                valueRating: 9.3,
                rating: 4.8,
                reviewCount: 210,
                specs: {
                    "Thickness": "3.5\\\" (4\\\" rails)",
                    "Width": "25\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "4.8",
                    "Weight": "19-21 oz",
                    "Type": "Insulated Air with Rails"
                },
                priceHistory: [149, 149, 139, 134, 129],
                pros: ["3.5\\\" thickness with 4\\\" side rails keeps youth centered", "Warm R4.8 PrimaLoft insulation", "25\\\" width provides room to move"],
                cons: ["19-21 oz weight is heavier than ultralight pads", "Takes 3 mins to inflate"],
                buyingAdvice: "Plush side-sleeper pick with 4\\\" outer rails for maximum sleeping comfort.",
                verdict: "Plush side-sleeper pick with 4\\\" outer rails for maximum sleeping comfort."
            },
            {
                id: "pad-klymit-static-v-wide",
                imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
                name: "Klymit Insulated Static V Wide Pad",
                brand: "Klymit",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Budget Wide Pick",
                profiles: ["youth", "adult", "budget"],
                profileTags: ["youth", "adult", "value", "budget"],
                price: 64,
                currentPrice: 64,
                msrp: 80,
                salePrice: 64,
                weight: "25 oz",
                weightOz: 25,
                weightDisplay: "1 lb 9 oz (25 oz)",
                dimensions: "72 x 25 in",
                dealBadge: "Budget Wide Pick",
                valueRating: 9.4,
                rating: 4.6,
                reviewCount: 340,
                specs: {
                    "Thickness": "3.0\\\"",
                    "Width": "25\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "4.4",
                    "Weight": "25 oz",
                    "Type": "V-Chamber Air"
                },
                priceHistory: [80, 80, 75, 69, 64],
                pros: ["Generous 25\\\" width at an affordable sub-$70 budget price", "V-chamber limits air shift", "R4.4 warmth"],
                cons: ["25 oz weight", "Deep V grooves collect debris"],
                buyingAdvice: "Budget Wide Pick for youth requiring maximum width at low cost.",
                verdict: "Budget Wide Pick for youth requiring maximum width at low cost."
            },
            {
                id: "pad-exped-ultra-mw",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "Exped Ultra 3R / 5R Medium Wide Pad",
                brand: "Exped",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Ergonomic Pick",
                profiles: ["youth", "adult", "ultralight"],
                profileTags: ["youth", "adult", "ultralight"],
                price: 129,
                currentPrice: 129,
                msrp: 150,
                salePrice: 129,
                weight: "18-20 oz",
                weightOz: 19,
                weightDisplay: "1 lb 3 oz (18-20 oz)",
                dimensions: "72 x 25 in",
                dealBadge: "Ergonomic Pick",
                valueRating: 9.2,
                rating: 4.7,
                reviewCount: 165,
                specs: {
                    "Thickness": "3.0\\\"",
                    "Width": "25\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "3.0-4.8",
                    "Weight": "18-20 oz",
                    "Type": "Longitudinal Baffles"
                },
                priceHistory: [150, 150, 140, 135, 129],
                pros: ["Vertical baffles cradle youth body naturally", "Schnozzel pumpbag included for 1-minute inflation", "100% recycled fabric"],
                cons: ["Higher cost ($130-$160)", "Requires pumpbag care"],
                buyingAdvice: "Ergonomic Pick with vertical comfort baffles.",
                verdict: "Ergonomic Pick with vertical comfort baffles."
            },
            {
                id: "pad-therm-neoair-xlite",
                imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
                name: "Therm-a-Rest NeoAir Topo / XLite NXT RW",
                brand: "Therm-a-Rest",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Ultralight Pick",
                profiles: ["youth", "adult", "ultralight"],
                profileTags: ["youth", "adult", "ultralight"],
                price: 179,
                currentPrice: 179,
                msrp: 210,
                salePrice: 179,
                weight: "16-19 oz",
                weightOz: 16,
                weightDisplay: "1 lb 0 oz (16-19 oz)",
                dimensions: "72 x 25 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.3,
                rating: 4.8,
                reviewCount: 310,
                specs: {
                    "Thickness": "3.0\\\"",
                    "Width": "25\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "3.7-4.5",
                    "Weight": "16-19 oz",
                    "Type": "ThermaCapture Core"
                },
                priceHistory: [210, 210, 195, 189, 179],
                pros: ["3.0\\\" cushion weighing only 16 oz", "R3.7-4.5 warmth for cold alpine nights", "Quieter NXT fabric construction"],
                cons: ["Higher price point", "Requires inflation pump sack"],
                buyingAdvice: "Ultralight Pick for weight-conscious youth.",
                verdict: "Ultralight Pick for weight-conscious youth."
            },
            {
                id: "pad-therm-zlite-sol",
                imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
                name: "Therm-a-Rest Z Lite Sol Short / Regular",
                brand: "Therm-a-Rest",
                category: "sleeping_pads",
                categoryName: "Sleeping Pads",
                pickType: "Foam Reference Pick",
                profiles: ["youth", "budget", "ultralight"],
                profileTags: ["youth", "value", "ultralight", "budget"],
                price: 45,
                currentPrice: 45,
                msrp: 55,
                salePrice: 45,
                weight: "10-14 oz",
                weightOz: 14,
                weightDisplay: "0 lbs 14 oz (10-14 oz)",
                dimensions: "72 x 20 in",
                dealBadge: "Foam Reference Pick",
                valueRating: 9.7,
                rating: 4.7,
                reviewCount: 420,
                specs: {
                    "Thickness": "0.75\\\"",
                    "Width": "20\\\"",
                    "Height Fit": "5'1\\\"–5'4\\\" (Youth)",
                    "R-Value": "2.6",
                    "Weight": "10-14 oz",
                    "Type": "Closed-Cell Foam"
                },
                priceHistory: [55, 55, 49, 47, 45],
                pros: ["100% puncture proof - cannot leak or pop", "Instant 3-second setup", "Lightweight 10-14 oz"],
                cons: ["0.75\\\" foam cushion is firmer than air pads", "R2.6 is best above freezing"],
                buyingAdvice: "Foam Reference Pick for indestructible reliability.",
                verdict: "Foam Reference Pick for indestructible reliability."
            },

            // ==========================================
            // 🎒 CATEGORY 4: BACKPACKS
            // ==========================================
            {
                id: "pack-osprey-atmos-65",
                imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
                name: "Osprey Atmos AG 65",
                brand: "Osprey",
                category: "backpacks",
                categoryName: "Backpacks",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 279,
                currentPrice: 279,
                msrp: 340,
                salePrice: 279,
                weight: "4 lbs 9 oz",
                weightOz: 73,
                weightDisplay: "4 lbs 9 oz (73 oz)",
                dimensions: "34 x 15 x 15 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.2,
                rating: 4.8,
                reviewCount: 410,
                specs: {
                    "Volume": "65 Liters",
                    "Suspension": "Anti-Gravity Mesh Trampoline",
                    "Torso Fit": "17-21 in (Adult Heavy)",
                    "Max Load": "50 lbs",
                    "Raincover": "Included"
                },
                priceHistory: [340, 340, 310, 299, 279],
                pros: ["Anti-Gravity mesh back feels weightless on hips", "Carries 40+ lbs comfortably", "Osprey All Mighty Lifetime Guarantee"],
                cons: ["Heavier empty weight (4.6 lbs)", "Lots of straps and buckles"],
                buyingAdvice: "The king of comfort for heavy load hauls.",
                verdict: "The king of comfort for heavy load hauls."
            },
            {
                id: "pack-hmg-southwest",
                imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
                name: "Hyperlite Mountain Gear Southwest 2400",
                brand: "Hyperlite",
                category: "backpacks",
                categoryName: "Backpacks",
                pickType: "Premium Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 349,
                currentPrice: 349,
                msrp: 379,
                salePrice: 349,
                weight: "1 lb 14 oz",
                weightOz: 30,
                weightDisplay: "1 lb 14 oz (30 oz)",
                dimensions: "30 x 13 in",
                dealBadge: "Premium Pick",
                valueRating: 9.1,
                rating: 4.9,
                reviewCount: 170,
                specs: {
                    "Volume": "40 Liters + 9.8L Pockets",
                    "Material": "Dyneema Composite Fabrics (DCF)",
                    "Waterproof": "100% Waterproof Fabric & Taped Seams",
                    "Max Load": "40 lbs",
                    "Suspension": "Removable Aluminum Stays"
                },
                priceHistory: [379, 379, 369, 359, 349],
                pros: ["100% waterproof Dyneema construction eliminates pack cover", "Ultra-durable hardline hipbelt pockets", "Featherweight sub-2lb pack"],
                cons: ["Premium price tag ($349+)", "Minimalist back padding"],
                buyingAdvice: "The premier Dyneema ultralight pack for multi-week thru-hikes.",
                verdict: "The premier Dyneema ultralight pack for multi-week thru-hikes."
            },
            {
                id: "pack-granite-crown3-60",
                imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
                name: "Granite Gear Crown3 60",
                brand: "Granite Gear",
                category: "backpacks",
                categoryName: "Backpacks",
                pickType: "Budget Pick",
                profiles: ["ultralight", "budget", "adult"],
                profileTags: ["ultralight", "budget", "adult", "value"],
                price: 189,
                currentPrice: 189,
                msrp: 240,
                salePrice: 189,
                weight: "2 lbs 8 oz",
                weightOz: 40,
                weightDisplay: "2 lbs 8 oz (40 oz)",
                dimensions: "31 x 14 in",
                dealBadge: "Budget Pick",
                valueRating: 9.5,
                rating: 4.7,
                reviewCount: 110,
                specs: {
                    "Volume": "60 Liters",
                    "Suspension": "VC Mark 3 Frame Sheet",
                    "Torso Fit": "18-21 in",
                    "Max Load": "35 lbs (43 lbs w/ frame)",
                    "Raincover": "Not Included"
                },
                priceHistory: [240, 240, 219, 199, 189],
                pros: ["Lightweight 2.5 lb empty weight", "Removable lid converts to waist pack", "Fully customizable hipbelt fit"],
                cons: ["Less ventilated than mesh trampolines", "Water bottle pockets tight when pack full"],
                buyingAdvice: "The ultimate sweet spot between ultralight weight and real load carrying.",
                verdict: "The ultimate sweet spot between ultralight weight and real load carrying."
            },
            {
                id: "pack-rei-flash-55",
                imageUrl: "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Flash 55 Pack",
                brand: "REI Co-op",
                category: "backpacks",
                categoryName: "Backpacks",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "budget"],
                profileTags: ["ultralight", "budget", "value"],
                price: 159,
                currentPrice: 159,
                msrp: 199,
                salePrice: 159,
                weight: "2 lbs 9 oz",
                weightOz: 41,
                weightDisplay: "2 lbs 9 oz (41 oz)",
                dimensions: "30 x 14 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.3,
                rating: 4.6,
                reviewCount: 180,
                specs: {
                    "Volume": "55 Liters",
                    "Suspension": "3D Molded Foam Back",
                    "Torso Fit": "17-20 in",
                    "Max Load": "30 lbs",
                    "Raincover": "Not Included"
                },
                priceHistory: [199, 199, 179, 169, 159],
                pros: ["Modular Packmod straps strip down weight", "Water bottle holsters angled forward for easy reach", "Sub-$160 price point"],
                cons: ["Max load 30-32 lbs limit", "Less rigid frame sheet"],
                buyingAdvice: "Fantastic modular ultralight pack for streamlined gear kits.",
                verdict: "Fantastic modular ultralight pack for streamlined gear kits."
            },
            {
                id: "pack-osprey-ace-50",
                imageUrl: "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80",
                name: "Osprey Ace 50 Youth Pack",
                brand: "Osprey",
                category: "backpacks",
                categoryName: "Backpacks",
                pickType: "Youth Pick",
                profiles: ["youth", "budget"],
                profileTags: ["youth", "budget", "value"],
                price: 149,
                currentPrice: 149,
                msrp: 180,
                salePrice: 149,
                weight: "2 lbs 12 oz",
                weightOz: 44,
                weightDisplay: "2 lbs 12 oz (44 oz)",
                dimensions: "27 x 13 in",
                dealBadge: "Youth Pick",
                valueRating: 9.7,
                rating: 4.9,
                reviewCount: 125,
                specs: {
                    "Volume": "50 Liters",
                    "Suspension": "AirSpeed Mesh Backpanel",
                    "Torso Fit": "11-17 in (Grows with kid)",
                    "Max Load": "30 lbs",
                    "Raincover": "Included"
                },
                priceHistory: [180, 180, 169, 159, 149],
                pros: ["Adjustable torso grows 6 inches with youth", "Top tier Osprey hipbelt padding", "Integrated raincover"],
                cons: ["Max load 30 lbs limit", "Fixed lid pocket"],
                buyingAdvice: "The definitive pack for growing 10-14 year old youth scouts.",
                verdict: "The definitive pack for growing 10-14 year old youth scouts."
            },

            // ==========================================
            // 🍳 CATEGORY 5: STOVES & COOKING
            // ==========================================
            {
                id: "stove-msr-pocketrocket-2",
                imageUrl: "https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80",
                name: "MSR PocketRocket 2 Stove",
                brand: "MSR",
                category: "stoves",
                categoryName: "Stoves & Cooking",
                pickType: "Classic Pick / Best Overall",
                profiles: ["ultralight", "budget", "adult", "youth"],
                profileTags: ["ultralight", "budget", "adult", "youth", "value"],
                price: 39,
                currentPrice: 39,
                msrp: 50,
                salePrice: 39,
                weight: "2.6 oz",
                weightOz: 2.6,
                weightDisplay: "0 lbs 2.6 oz (2.6 oz)",
                dimensions: "3.4 x 2.0 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.8,
                rating: 4.8,
                reviewCount: 550,
                specs: {
                    "Burner Type": "Canister Micro Burner",
                    "Boil Speed": "3.5 min / 1 Liter",
                    "Fuel Type": "Isobutane-Propane Canister",
                    "Case": "Hard Protective Case",
                    "Wind Shield": "WindClip Shield"
                },
                priceHistory: [50, 50, 45, 42, 39],
                pros: ["Tiny 2.6 oz weight", "Boils 1 liter of water in 3.5 mins", "Bulletproof reliability"],
                cons: ["No igniter button (requires lighter)", "Windy conditions reduce boil speed"],
                buyingAdvice: "The standard micro canister stove every backpacker should consider.",
                verdict: "The standard micro canister stove every backpacker should consider."
            },
            {
                id: "stove-jetboil-flash",
                imageUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
                name: "Jetboil Flash Cooking System",
                brand: "Jetboil",
                category: "stoves",
                categoryName: "Stoves & Cooking",
                pickType: "Premium Pick",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth"],
                price: 109,
                currentPrice: 109,
                msrp: 130,
                salePrice: 109,
                weight: "13.1 oz",
                weightOz: 13.1,
                weightDisplay: "0 lbs 13.1 oz (13.1 oz)",
                dimensions: "4.1 x 7.1 in",
                dealBadge: "Premium Pick",
                valueRating: 9.3,
                rating: 4.8,
                reviewCount: 380,
                specs: {
                    "Burner Type": "Integrated Heat-Exchange Pot",
                    "Boil Speed": "100 sec / 0.5 Liter",
                    "Fuel Type": "Isobutane Canister",
                    "Case": "Insulated Cozy w/ Color Indicator",
                    "Wind Shield": "FluxRing Guard"
                },
                priceHistory: [130, 130, 120, 115, 109],
                pros: ["Blazing fast 100-second boil time", "Push-button piezo igniter", "Thermo-chromatic color change indicator"],
                cons: ["13.1 oz system weight", "Only boils water (simmer control limited)"],
                buyingAdvice: "Best for quick freeze-dried meal prep and coffee for duo teams.",
                verdict: "Best for quick freeze-dried meal prep and coffee for duo teams."
            },
            {
                id: "stove-soto-amicus",
                imageUrl: "https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80",
                name: "Soto Amicus Stove with Igniter",
                brand: "Soto",
                category: "stoves",
                categoryName: "Stoves & Cooking",
                pickType: "Budget Pick",
                profiles: ["budget", "ultralight"],
                profileTags: ["budget", "ultralight", "value"],
                price: 34,
                currentPrice: 34,
                msrp: 45,
                salePrice: 34,
                weight: "2.9 oz",
                weightOz: 2.9,
                weightDisplay: "0 lbs 2.9 oz (2.9 oz)",
                dimensions: "3.0 x 1.8 in",
                dealBadge: "Budget Pick",
                valueRating: 9.6,
                rating: 4.7,
                reviewCount: 190,
                specs: {
                    "Burner Type": "Recessed Wind-Resistant Burner",
                    "Boil Speed": "3.5 min / 1 Liter",
                    "Fuel Type": "Isobutane Canister",
                    "Igniter": "Integrated Stealth Piezo",
                    "Pot Supports": "4 Spring-Loaded Arms"
                },
                priceHistory: [45, 45, 40, 37, 34],
                pros: ["Recessed burner head resists wind without extra shield", "Integrated piezo igniter", "Sub-$35 budget price"],
                cons: ["Igniter can fail in wet conditions (carry backup match)", "Pot arms slightly stiff"],
                buyingAdvice: "Best sub-$40 wind-resistant stove with piezo ignition.",
                verdict: "Best sub-$40 wind-resistant stove with piezo ignition."
            },
            {
                id: "pot-toaks-750ml",
                imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
                name: "TOAKS Titanium 750ml Pot",
                brand: "TOAKS",
                category: "stoves",
                categoryName: "Stoves & Cooking",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "budget"],
                profileTags: ["ultralight", "budget", "value"],
                price: 31,
                currentPrice: 31,
                msrp: 37,
                salePrice: 31,
                weight: "3.6 oz",
                weightOz: 3.6,
                weightDisplay: "0 lbs 3.6 oz (3.6 oz)",
                dimensions: "3.75 x 4.3 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.7,
                rating: 4.8,
                reviewCount: 320,
                specs: {
                    "Capacity": "750 ml (25.4 oz)",
                    "Material": "Grade 1 Pure Titanium",
                    "Dimensions": "3.75 in W x 4.3 in H",
                    "Nesting": "Fits 110g Canister + Stove",
                    "Extras": "Handles, Lid, Mesh Sack"
                },
                priceHistory: [37, 37, 35, 33, 31],
                pros: ["Featherweight 3.6 oz titanium construction", "Nests 110g fuel canister + PocketRocket 2 inside", "Graduated volume markings"],
                cons: ["Titanium has hot spots (boiling water only, no gourmet frying)"],
                buyingAdvice: "The ideal solo/duo water boiling pot.",
                verdict: "The ideal solo/duo water boiling pot."
            },
            {
                id: "stove-msr-deluxe",
                imageUrl: "https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80",
                name: "MSR PocketRocket Deluxe Stove",
                brand: "MSR",
                category: "stoves",
                categoryName: "Stoves & Cooking",
                pickType: "Youth Pick",
                profiles: ["youth", "adult"],
                profileTags: ["youth", "adult"],
                price: 69,
                currentPrice: 69,
                msrp: 85,
                salePrice: 69,
                weight: "2.9 oz",
                weightOz: 2.9,
                weightDisplay: "0 lbs 2.9 oz (2.9 oz)",
                dimensions: "3.3 x 2.2 in",
                dealBadge: "Youth Pick",
                valueRating: 9.2,
                rating: 4.8,
                reviewCount: 280,
                specs: {
                    "Burner Type": "Pressure-Regulated Burner",
                    "Boil Speed": "3.3 min / 1 Liter",
                    "Igniter": "Push-Button Piezo Igniter",
                    "Wind Shield": "Broad Lip Wind Protection",
                    "Weight": "2.9 oz"
                },
                priceHistory: [85, 85, 79, 74, 69],
                pros: ["Pressure regulator maintains strong flame in cold weather & low fuel", "Push-button piezo igniter makes it easy for youth", "Broader pot support base"],
                cons: ["Slightly pricier than standard PocketRocket 2"],
                buyingAdvice: "Best regulated stove for easy push-button ignition in cold weather.",
                verdict: "Best regulated stove for easy push-button ignition in cold weather."
            },

            // ==========================================
            // 🥾 CATEGORY 6: FOOTWEAR
            // ==========================================
            {
                id: "boot-hoka-anacapa",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                name: "HOKA Anacapa 2 Mid GTX Hiking Boots",
                brand: "HOKA",
                category: "footwear",
                categoryName: "Footwear",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth", "value"],
                price: 155,
                currentPrice: 155,
                msrp: 195,
                salePrice: 155,
                weight: "1 lb 12 oz",
                weightOz: 28,
                weightDisplay: "1 lb 12 oz (28 oz pair)",
                dimensions: "Mid-Ankle Height",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.4,
                rating: 4.8,
                reviewCount: 310,
                specs: {
                    "Waterproofing": "GORE-TEX Waterproof Membrane",
                    "Outsole": "Vibram Megagrip w/ 5mm Lugs",
                    "Cushion": "Plush CMEVA Foam Midsole",
                    "Upper": "Leather Working Group Gold-Rated Nubuck",
                    "Fit": "Regular / Wide Options"
                },
                priceHistory: [195, 195, 180, 169, 155],
                pros: ["Maximalist CMEVA cushioning saves knees on steep descents", "Vibram Megagrip offers unmatched traction on wet granite", "Lightweight for a waterproof mid boot"],
                cons: ["Exposed foam midsole scuffs on sharp scree", "Distinctive thick sole look"],
                buyingAdvice: "Ultimate trail comfort boot for heavy loads and high mileage.",
                verdict: "Ultimate trail comfort boot for heavy loads and high mileage."
            },
            {
                id: "boot-salomon-xultra-4",
                imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
                name: "Salomon X Ultra 4 Mid GTX Boots",
                brand: "Salomon",
                category: "footwear",
                categoryName: "Footwear",
                pickType: "Premium Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 145,
                currentPrice: 145,
                msrp: 175,
                salePrice: 145,
                weight: "1 lb 14 oz",
                weightOz: 30,
                weightDisplay: "1 lb 14 oz (30 oz pair)",
                dimensions: "Mid-Ankle Height",
                dealBadge: "Premium Pick",
                valueRating: 9.2,
                rating: 4.7,
                reviewCount: 420,
                specs: {
                    "Waterproofing": "GORE-TEX Waterproof Membrane",
                    "Outsole": "Contagrip MA Rubber",
                    "Chassis": "ADV-C Chassis Lateral Stability",
                    "Upper": "Synthetic / Textile",
                    "Lacing": "Traditional Lace System"
                },
                priceHistory: [175, 175, 165, 155, 145],
                pros: ["Outstanding ankle support without restricting flex", "Aggressive Contagrip lug pattern", "Protective toe cap for rocky terrain"],
                cons: ["Slightly narrow toe box for wide feet", "Firm initial feel"],
                buyingAdvice: "The agile alpine boot for technical mountain loops.",
                verdict: "The agile alpine boot for technical mountain loops."
            },
            {
                id: "boot-merrell-moab-3",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                name: "Merrell Moab 3 Mid WP Boots",
                brand: "Merrell",
                category: "footwear",
                categoryName: "Footwear",
                pickType: "Budget Pick",
                profiles: ["adult", "budget"],
                profileTags: ["adult", "budget", "value"],
                price: 110,
                currentPrice: 110,
                msrp: 145,
                salePrice: 110,
                weight: "2 lbs 4 oz",
                weightOz: 36,
                weightDisplay: "2 lbs 4 oz (36 oz pair)",
                dimensions: "Mid-Ankle Height",
                dealBadge: "Budget Pick",
                valueRating: 9.5,
                rating: 4.6,
                reviewCount: 890,
                specs: {
                    "Waterproofing": "Merrell Waterproof Membrane",
                    "Outsole": "Vibram TC5+ Rubber",
                    "Cushion": "Air Cushion in Heel + EVA Midsole",
                    "Upper": "Pigskin Leather & Mesh",
                    "Fit": "Out-of-the-Box Wide Fit Available"
                },
                priceHistory: [145, 145, 135, 120, 110],
                pros: ["Proven out-of-the-box comfort zero break-in needed", "Durable pigskin leather upper", "Sub-$110 value price"],
                cons: ["Heavier empty weight (36 oz)", "Dries slower if fully submerged"],
                buyingAdvice: "The king of budget hiking boots for decades.",
                verdict: "The king of budget hiking boots for decades."
            },
            {
                id: "boot-altra-lone-peak-8",
                imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
                name: "Altra Lone Peak 8 Trail Running Shoes",
                brand: "Altra",
                category: "footwear",
                categoryName: "Footwear",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 119,
                currentPrice: 119,
                msrp: 150,
                salePrice: 119,
                weight: "1 lb 5 oz",
                weightOz: 21,
                weightDisplay: "1 lb 5 oz (21 oz pair)",
                dimensions: "Low-Cut Trail Runner",
                dealBadge: "Ultralight Pick",
                valueRating: 9.3,
                rating: 4.7,
                reviewCount: 510,
                specs: {
                    "Drop": "ZeroDrop (0mm Heel-to-Toe)",
                    "Toe Box": "FootShape Wide Toe Box",
                    "Outsole": "MaxTrac Rubber Lugs",
                    "Cushion": "EGO Midsole Foam",
                    "Weight": "10.7 oz per shoe"
                },
                priceHistory: [150, 150, 139, 129, 119],
                pros: ["FootShape toe box lets toes splay naturally", "Zero drop promotes natural stride", "Dries blazingly fast after stream crossings"],
                cons: ["Requires adaptation for zero-drop calves", "Less ankle support under 40+ lb loads"],
                buyingAdvice: "The thru-hiker standard trail running shoe.",
                verdict: "The thru-hiker standard trail running shoe."
            },
            {
                id: "boot-merrell-youth-moab",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                name: "Merrell Youth Moab Speed Low / Mid",
                brand: "Merrell",
                category: "footwear",
                categoryName: "Footwear",
                pickType: "Youth Pick",
                profiles: ["youth", "budget"],
                profileTags: ["youth", "budget", "value"],
                price: 55,
                currentPrice: 55,
                msrp: 70,
                salePrice: 55,
                weight: "1 lb 2 oz",
                weightOz: 18,
                weightDisplay: "1 lb 2 oz (18 oz pair)",
                dimensions: "Youth Sizing (Child 1-7)",
                dealBadge: "Youth Pick",
                valueRating: 9.6,
                rating: 4.8,
                reviewCount: 230,
                specs: {
                    "Waterproofing": "Water-Resistant Mesh & Leather",
                    "Outsole": "Non-Marking Grip Outsole",
                    "Closure": "Lace-Up with Padded Collar",
                    "Fit": "Youth Sizing",
                    "Weight": "9 oz per shoe"
                },
                priceHistory: [70, 70, 65, 60, 55],
                pros: ["Sub-$60 value for high traction youth shoe", "Lightweight 18 oz pair", "Protective toe cap for rocky trails"],
                cons: ["Youth grow out of sizes in 1 season"],
                buyingAdvice: "Best hiking shoe for youth scouts.",
                verdict: "Best hiking shoe for youth scouts."
            },

            // ==========================================
            // 🧥 CATEGORY 7: RAIN SHELLS
            // ==========================================
            {
                id: "shell-patagonia-torrentshell",
                imageUrl: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80",
                name: "Patagonia Torrentshell 3L Rain Jacket",
                brand: "Patagonia",
                category: "rain_shells",
                categoryName: "Rain Shells",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth", "value"],
                price: 139,
                currentPrice: 139,
                msrp: 179,
                salePrice: 139,
                weight: "14.1 oz",
                weightOz: 14.1,
                weightDisplay: "0 lbs 14.1 oz (14.1 oz)",
                dimensions: "Stuffs into Left Pocket",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.6,
                rating: 4.8,
                reviewCount: 310,
                specs: {
                    "Waterproofing": "3-Layer H2No Performance Standard",
                    "Pit Zips": "Dual Underarm Pit Zips",
                    "Pockets": "2 Zippered Handwarmer",
                    "Packable": "Stuffs into Left Pocket",
                    "Hood": "2-Way Adjustable Visor Hood"
                },
                priceHistory: [179, 179, 159, 149, 139],
                pros: ["Durable 3-layer construction doesn't wet out", "Dual pit zips for intense uphill venting", "100% recycled nylon face fabric"],
                cons: ["Slightly crinkly fabric sound", "14 oz weight is average"],
                buyingAdvice: "The definitive 3-layer rain jacket for mountain cloudbursts.",
                verdict: "The definitive 3-layer rain jacket for mountain cloudbursts."
            },
            {
                id: "shell-arcteryx-beta-lt",
                imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
                name: "Arc'teryx Beta LT GORE-TEX Jacket",
                brand: "Arc'teryx",
                category: "rain_shells",
                categoryName: "Rain Shells",
                pickType: "Premium Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 399,
                currentPrice: 399,
                msrp: 450,
                salePrice: 399,
                weight: "13.9 oz",
                weightOz: 13.9,
                weightDisplay: "0 lbs 13.9 oz (13.9 oz)",
                dimensions: "StormHood Helmet Compatible",
                dealBadge: "Premium Pick",
                valueRating: 8.8,
                rating: 4.9,
                reviewCount: 180,
                specs: {
                    "Waterproofing": "3-Layer GORE-TEX with Tricot Backer",
                    "Pit Zips": "WaterTight Underarm Zips",
                    "Hood": "StormHood Helmet Compatible",
                    "Fit": "Trim Athletic Alpine Fit",
                    "Weight": "13.9 oz"
                },
                priceHistory: [450, 450, 430, 410, 399],
                pros: ["GORE-TEX 3L armor against torrential downpours", "Ergonomic articulation movement", "WaterTight zippers"],
                cons: ["High premium cost ($399+)", "Trim fit requires careful layering"],
                buyingAdvice: "Pinnacle alpine storm shell.",
                verdict: "Pinnacle alpine storm shell."
            },
            {
                id: "shell-rei-rainier",
                imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Rainier Rain Jacket",
                brand: "REI Co-op",
                category: "rain_shells",
                categoryName: "Rain Shells",
                pickType: "Budget Pick",
                profiles: ["budget", "youth"],
                profileTags: ["budget", "youth", "value"],
                price: 69,
                currentPrice: 69,
                msrp: 100,
                salePrice: 69,
                weight: "12.5 oz",
                weightOz: 12.5,
                weightDisplay: "0 lbs 12.5 oz (12.5 oz)",
                dimensions: "Stuffs into Hand Pocket",
                dealBadge: "Budget Pick",
                valueRating: 9.4,
                rating: 4.5,
                reviewCount: 280,
                specs: {
                    "Waterproofing": "2.5-Layer Peakproof Shield",
                    "Pit Zips": "Yes Underarm Zips",
                    "Pockets": "2 Zippered Hand + 2 Internal Drop",
                    "Windproof": "Up to 60 mph",
                    "Fit": "Relaxed Fit"
                },
                priceHistory: [100, 95, 85, 75, 69],
                pros: ["Outstanding sub-$70 price point", "Includes pit zips for ventilation", "Windproof up to 60 mph"],
                cons: ["2.5-layer membrane can feel clammy against bare skin", "DWR requires re-treatment after 1 season"],
                buyingAdvice: "Best budget rain shell for scouts and youth backpackers.",
                verdict: "Best budget rain shell for scouts and youth backpackers."
            },
            {
                id: "shell-or-helium",
                imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
                name: "Outdoor Research Helium Rain Jacket",
                brand: "Outdoor Research",
                category: "rain_shells",
                categoryName: "Rain Shells",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 129,
                currentPrice: 129,
                msrp: 170,
                salePrice: 129,
                weight: "6.3 oz",
                weightOz: 6.3,
                weightDisplay: "0 lbs 6.3 oz (6.3 oz)",
                dimensions: "Packs to Size of an Apple",
                dealBadge: "Ultralight Pick",
                valueRating: 9.3,
                rating: 4.7,
                reviewCount: 240,
                specs: {
                    "Waterproofing": "Pertex Shield Diamond Fuse 2.5L",
                    "Weight": "6.3 oz Total",
                    "Packable": "Stuffs into Own Chest Pocket w/ Carabiner Loop",
                    "Fit": "Standard Active Fit",
                    "Hood": "Single-Separate Hood Adjustment"
                },
                priceHistory: [170, 170, 155, 140, 129],
                pros: ["Mind-blowing 6.3 oz featherweight", "Pertex Diamond Fuse resists snags", "Packs smaller than an apple"],
                cons: ["No pit zips", "Single chest pocket only"],
                buyingAdvice: "The gold standard emergency rain shell for ultralight hikers.",
                verdict: "The gold standard emergency rain shell for ultralight hikers."
            },
            {
                id: "shell-columbia-youth-watertight",
                imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80",
                name: "Columbia Youth Watertight Jacket",
                brand: "Columbia",
                category: "rain_shells",
                categoryName: "Rain Shells",
                pickType: "Youth Pick",
                profiles: ["youth", "budget"],
                profileTags: ["youth", "budget", "value"],
                price: 39,
                currentPrice: 39,
                msrp: 55,
                salePrice: 39,
                weight: "9.0 oz",
                weightOz: 9.0,
                weightDisplay: "0 lbs 9.0 oz (9.0 oz)",
                dimensions: "Youth Fit",
                dealBadge: "Youth Pick",
                valueRating: 9.5,
                rating: 4.6,
                reviewCount: 310,
                specs: {
                    "Waterproofing": "Omni-Tech Waterproof / Breathable",
                    "Seams": "Fully Seam Sealed",
                    "Reflective": "Reflective Safety Details",
                    "Pockets": "Zippered Hand Pockets",
                    "Fit": "Youth Standard Fit"
                },
                priceHistory: [55, 55, 49, 44, 39],
                pros: ["Sub-$40 value for 100% seam-sealed youth rain jacket", "Reflective safety accents", "Lightweight 9 oz"],
                cons: ["No pit zips"],
                buyingAdvice: "Best youth rain jacket for scout trips.",
                verdict: "Best youth rain jacket for scout trips."
            },

            // ==========================================
            // 🔦 CATEGORY 8: LIGHTING & HEADLAMPS
            // ==========================================
            {
                id: "light-nitecore-ut27",
                imageUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
                name: "Nitecore UT27 800 Lumen Headlamp",
                brand: "Nitecore",
                category: "lighting",
                categoryName: "Lighting & Headlamps",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "ultralight"],
                profileTags: ["adult", "ultralight", "value"],
                price: 49,
                currentPrice: 49,
                msrp: 60,
                salePrice: 49,
                weight: "2.6 oz",
                weightOz: 2.6,
                weightDisplay: "0 lbs 2.6 oz (74g)",
                dimensions: "Dual Spot + Flood",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.8,
                rating: 4.9,
                reviewCount: 220,
                specs: {
                    "Max Lumens": "800 Lumens (Dual Spot + Flood)",
                    "Battery Life / Runtime": "Low (6 lm): 11 hrs | Med (200 lm): 6.5 hrs | High (800 lm): 2.5 hrs",
                    "Power Source": "HLB1300 USB-C Li-ion (Includes 2-Pack) or 3 AAA Backups",
                    "Beam Distance": "168 meters",
                    "Water Rating": "IP66 Water & Dust Proof"
                },
                priceHistory: [60, 60, 55, 52, 49],
                pros: ["Rated #1 Overall headlamp for 2026", "Blazing 800 lumens output in ultra-light 2.6 oz body", "Dual battery capability (USB-C rechargeable battery pack + AAA backup support)"],
                cons: ["High mode drops to medium after thermal limit", "Slightly higher cost than basic AAA lights"],
                buyingAdvice: "The best headlamp on the market for 2026. Unbeatable 800-lumen output and runtime versatility.",
                verdict: "The best headlamp on the market for 2026. Unbeatable 800-lumen output and runtime versatility."
            },
            {
                id: "light-petzl-actik-core",
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
                name: "Petzl Actik Core 600 Headlamp",
                brand: "Petzl",
                category: "lighting",
                categoryName: "Lighting & Headlamps",
                pickType: "Premium Pick",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth"],
                price: 64,
                currentPrice: 64,
                msrp: 80,
                salePrice: 64,
                weight: "3.1 oz",
                weightOz: 3.1,
                weightDisplay: "0 lbs 3.1 oz (88g)",
                dimensions: "Phosphorescent Bezel",
                dealBadge: "Premium Pick",
                valueRating: 9.3,
                rating: 4.8,
                reviewCount: 210,
                specs: {
                    "Max Lumens": "600 Lumens",
                    "Battery Life / Runtime": "Low (7 lm): 100 hrs | Med (100 lm): 7 hrs | High (600 lm): 2 hrs",
                    "Power Source": "Included USB Core Battery or 3 AAA Batteries",
                    "Beam Distance": "115 meters",
                    "Water Rating": "IPX4 Weather Resistant"
                },
                priceHistory: [80, 80, 75, 69, 64],
                pros: ["Insane 100-hour battery runtime on low camp setting", "Includes USB-rechargeable Petzl CORE battery pack", "Glow-in-the-dark phosphorescent bezel so you find it inside tent"],
                cons: ["IPX4 water rating is splashproof (not fully submersable)", "Heavy at 3.1 oz vs Nitecore"],
                buyingAdvice: "Reliable high-output headlamp with 100hr low-mode battery life.",
                verdict: "Reliable high-output headlamp with 100hr low-mode battery life."
            },
            {
                id: "light-bd-spot-400-r",
                imageUrl: "https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80",
                name: "Black Diamond Spot 400-R Headlamp",
                brand: "Black Diamond",
                category: "lighting",
                categoryName: "Lighting & Headlamps",
                pickType: "Budget Pick",
                profiles: ["adult", "youth", "budget"],
                profileTags: ["adult", "youth", "budget", "value"],
                price: 39,
                currentPrice: 39,
                msrp: 50,
                salePrice: 39,
                weight: "2.6 oz",
                weightOz: 2.6,
                weightDisplay: "0 lbs 2.6 oz (73g)",
                dimensions: "IPX8 Waterproof",
                dealBadge: "Budget Pick",
                valueRating: 9.5,
                rating: 4.8,
                reviewCount: 340,
                specs: {
                    "Max Lumens": "400 Lumens",
                    "Battery Life / Runtime": "Low (6 lm): 225 hrs | Med (200 lm): 8 hrs | High (400 lm): 4 hrs",
                    "Power Source": "Integrated 1500 mAh Micro-USB Rechargeable Li-ion",
                    "Beam Distance": "100 meters",
                    "Water Rating": "IPX8 Waterproof (Submersible to 1.1m)"
                },
                priceHistory: [50, 50, 45, 42, 39],
                pros: ["225-hour monster battery runtime on low setting", "IPX8 waterproof housing tolerates total submersion in downpours", "PowerTap technology instantly toggles max beam"],
                cons: ["Button tap sequences take 5 minutes to memorize", "Micro-USB charging instead of USB-C"],
                buyingAdvice: "The most waterproof workhorse headlamp with up to 225 hours of battery life.",
                verdict: "The most waterproof workhorse headlamp with up to 225 hours of battery life."
            },
            {
                id: "light-nitecore-nu25-ul",
                imageUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
                name: "Nitecore NU25 UL 400 Lumen Headlamp",
                brand: "Nitecore",
                category: "lighting",
                categoryName: "Lighting & Headlamps",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "budget"],
                profileTags: ["ultralight", "budget", "value"],
                price: 29,
                currentPrice: 29,
                msrp: 37,
                salePrice: 29,
                weight: "1.6 oz",
                weightOz: 1.6,
                weightDisplay: "0 lbs 1.6 oz (45g)",
                dimensions: "Paracord Headband",
                dealBadge: "Ultralight Pick",
                valueRating: 9.9,
                rating: 4.9,
                reviewCount: 310,
                specs: {
                    "Max Lumens": "400 Lumens",
                    "Battery Life / Runtime": "Low (6 lm): 45 hrs | Mid (200 lm): 4.5 hrs | High (400 lm): 2.7 hrs",
                    "Power Source": "Integrated 650mAh USB-C Rechargeable Li-ion",
                    "Beam Distance": "64 meters",
                    "Water Rating": "IP66 Water & Dust Resistant"
                },
                priceHistory: [37, 37, 33, 31, 29],
                pros: ["Mind-blowing 1.6 oz featherweight (paracord headband design)", "Runs up to 45 hours on low mode", "Fast USB-C charging directly into housing"],
                cons: ["Integrated battery cannot be swapped in field (requires power bank top-off)", "Minimalist strap"],
                buyingAdvice: "The gold standard headlamp for ultralight backpackers counting every single gram.",
                verdict: "The gold standard headlamp for ultralight backpackers counting every single gram."
            },
            {
                id: "light-biolite-325",
                imageUrl: "https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80",
                name: "BioLite HeadLamp 325",
                brand: "BioLite",
                category: "lighting",
                categoryName: "Lighting & Headlamps",
                pickType: "Youth Pick",
                profiles: ["youth", "ultralight"],
                profileTags: ["youth", "ultralight"],
                price: 32,
                currentPrice: 32,
                msrp: 40,
                salePrice: 32,
                weight: "1.8 oz",
                weightOz: 1.8,
                weightDisplay: "0 lbs 1.8 oz (1.8 oz)",
                dimensions: "Flush 3D Fit",
                dealBadge: "Youth Pick",
                valueRating: 9.2,
                rating: 4.6,
                reviewCount: 110,
                specs: {
                    "Max Lumens": "325 Lumens",
                    "Power Source": "USB Micro-Rechargeable",
                    "Weight": "1.76 oz",
                    "Design": "3D SlimFit Flush Front",
                    "Modes": "White Spot, White Strobe, Red Flood, Dimming"
                },
                priceHistory: [40, 40, 36, 34, 32],
                pros: ["Flush 3D SlimFit front sits completely flat against forehead without bouncing", "Ultra-soft moisture wicking fabric band", "1.8 oz ultralight profile"],
                cons: ["Micro-USB charging (not USB-C)", "325 lumens is moderate max brightness"],
                buyingAdvice: "Best bounce-free flush headlamp for trail running and active youth.",
                verdict: "Best bounce-free flush headlamp for trail running and active youth."
            },

            // ==========================================
            // 💧 CATEGORY 9: WATER FILTRATION
            // ==========================================
            {
                id: "filter-sawyer-squeeze",
                imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                name: "Sawyer Squeeze Water Filter System",
                brand: "Sawyer",
                category: "water_filtration",
                categoryName: "Water Filtration",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth", "ultralight", "budget"],
                profileTags: ["adult", "youth", "ultralight", "budget", "value"],
                price: 34,
                currentPrice: 34,
                msrp: 41,
                salePrice: 34,
                weight: "3.0 oz",
                weightOz: 3.0,
                weightDisplay: "0 lbs 3.0 oz (3.0 oz)",
                dimensions: "5 x 2 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.9,
                rating: 4.9,
                reviewCount: 850,
                specs: {
                    "Filter Media": "0.1 Micron Hollow Fiber",
                    "Flow Rate": "1.7 Liters / Min",
                    "Lifespan": "Up to 100,000 Gallons",
                    "Threads": "Standard 28mm (Smartwater Compatible)",
                    "Weight": "3.0 oz Filter Unit"
                },
                priceHistory: [41, 41, 38, 36, 34],
                pros: ["Threads directly onto standard Smartwater bottles", "Removes 99.9999% of bacteria & protozoa", "Field cleanable with cleaning syringe"],
                cons: ["Included squeeze pouches can wear out over time (use Smartwater bottle instead)", "Must protect from freezing in sub-32°F weather"],
                buyingAdvice: "The undisputed gold standard filter for backcountry water purification.",
                verdict: "The undisputed gold standard filter for backcountry water purification."
            },
            {
                id: "filter-katadyn-befree",
                imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                name: "Katadyn BeFree 1.0L Water Filter Bottle",
                brand: "Katadyn",
                category: "water_filtration",
                categoryName: "Water Filtration",
                pickType: "Premium Pick",
                profiles: ["adult", "ultralight"],
                profileTags: ["adult", "ultralight"],
                price: 44,
                currentPrice: 44,
                msrp: 55,
                salePrice: 44,
                weight: "2.3 oz",
                weightOz: 2.3,
                weightDisplay: "0 lbs 2.3 oz (2.3 oz)",
                dimensions: "1.0 Liter Collapsible Flask",
                dealBadge: "Premium Pick",
                valueRating: 9.4,
                rating: 4.8,
                reviewCount: 390,
                specs: {
                    "Filter Media": "0.1 Micron EZ-Clean Membrane",
                    "Flow Rate": "2.0 Liters / Min (Fastest Flow)",
                    "Capacity": "1.0 Liter Hydrapak Flask",
                    "Cleaning": "Shake or Swish to Clean (No syringe needed)",
                    "Weight": "2.3 oz Total"
                },
                priceHistory: [55, 55, 50, 47, 44],
                pros: ["Mind-blowing 2L/min flow rate for instant drinking", "Easy swish-to-clean maintenance in field", "Soft collapsible Hydrapak flask"],
                cons: ["42mm wide mouth threads are unique (won't thread Smartwater bottles)", "Soft flask requires care around sharp needles"],
                buyingAdvice: "Fastest flow rate water filter for quick trail stops.",
                verdict: "Fastest flow rate water filter for quick trail stops."
            },
            {
                id: "filter-aquatabs",
                imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                name: "Aquatabs Water Purification Tablets (50 Pack)",
                brand: "Aquatabs",
                category: "water_filtration",
                categoryName: "Water Filtration",
                pickType: "Budget Pick",
                profiles: ["budget", "ultralight"],
                profileTags: ["budget", "ultralight", "value"],
                price: 11,
                currentPrice: 11,
                msrp: 15,
                salePrice: 11,
                weight: "0.5 oz",
                weightOz: 0.5,
                weightDisplay: "0 lbs 0.5 oz (0.5 oz)",
                dimensions: "50 Foil Strip Tablets",
                dealBadge: "Budget Pick",
                valueRating: 9.7,
                rating: 4.7,
                reviewCount: 410,
                specs: {
                    "Active Ingredient": "Sodium Dichloroisocyanurate (NaDCC)",
                    "Treats": "50 Liters of Clear Water",
                    "Wait Time": "30 Minutes",
                    "Weight": "0.5 oz Foil Pack"
                },
                priceHistory: [15, 15, 13, 12, 11],
                pros: ["Ultra-lightweight emergency backup weighing less than 1 oz", "No pump or squeeze mechanics required", "$11 budget price for 50L"],
                cons: ["30-minute wait time before drinking", "Slight chlorine taste in clear water"],
                buyingAdvice: "Essential ultralight backup purification tablets for emergency kits.",
                verdict: "Essential ultralight backup purification tablets for emergency kits."
            },
            {
                id: "filter-sawyer-mini",
                imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                name: "Sawyer Micro Squeeze Water Filter",
                brand: "Sawyer",
                category: "water_filtration",
                categoryName: "Water Filtration",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "budget"],
                profileTags: ["ultralight", "budget", "value"],
                price: 28,
                currentPrice: 28,
                msrp: 35,
                salePrice: 28,
                weight: "2.0 oz",
                weightOz: 2.0,
                weightDisplay: "0 lbs 2.0 oz (2.0 oz)",
                dimensions: "4 x 1.5 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.5,
                rating: 4.6,
                reviewCount: 290,
                specs: {
                    "Filter Media": "0.1 Micron Hollow Fiber",
                    "Flow Rate": "1.2 Liters / Min",
                    "Lifespan": "Up to 100,000 Gallons",
                    "Weight": "2.0 oz"
                },
                priceHistory: [35, 35, 32, 30, 28],
                pros: ["Compact 2.0 oz size fits in pocket", "Attaches to standard 28mm bottles", "Sub-$30 value price"],
                cons: ["Slightly slower flow rate than standard Sawyer Squeeze"],
                buyingAdvice: "Ultralight 2 oz filter for fast-and-light solo trips.",
                verdict: "Ultralight 2 oz filter for fast-and-light solo trips."
            },
            {
                id: "filter-platypus-gravityworks",
                imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                name: "Platypus GravityWorks 2.0L Filter System",
                brand: "Platypus",
                category: "water_filtration",
                categoryName: "Water Filtration",
                pickType: "Youth Pick",
                profiles: ["youth", "adult"],
                profileTags: ["youth", "adult"],
                price: 99,
                currentPrice: 99,
                msrp: 120,
                salePrice: 99,
                weight: "9.5 oz",
                weightOz: 9.5,
                weightDisplay: "0 lbs 9.5 oz (9.5 oz)",
                dimensions: "2.0L Reservoir Pair",
                dealBadge: "Youth Pick",
                valueRating: 9.2,
                rating: 4.8,
                reviewCount: 180,
                specs: {
                    "Filter Type": "Gravity-Fed Hollow Fiber",
                    "Capacity": "2.0 Liters Clean / Dirty Reservoirs",
                    "Flow Rate": "1.5 Liters / Min (Zero Squeezing)",
                    "Weight": "9.5 oz System"
                },
                priceHistory: [120, 120, 110, 105, 99],
                pros: ["Zero-effort gravity filtering (hang from branch and relax)", "2.0L clean reservoir stores water at camp", "Great for youth scout groups"],
                cons: ["9.5 oz system weight", "Requires branch to hang"],
                buyingAdvice: "Best hands-free gravity filter for camp group water supply.",
                verdict: "Best hands-free gravity filter for camp group water supply."
            },

            // ==========================================
            // 📻 CATEGORY 10: RADIOS & COMMS
            // ==========================================
            {
                id: "radio-rocky-mountain",
                imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
                name: "Rocky Talkie Mountain Radio (FRS)",
                brand: "Rocky Talkie",
                category: "radios",
                categoryName: "Radios & Comms",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth"],
                profileTags: ["adult", "youth", "value"],
                price: 95,
                currentPrice: 95,
                msrp: 110,
                salePrice: 95,
                weight: "7.9 oz",
                weightOz: 7.9,
                weightDisplay: "0 lbs 7.9 oz (224g)",
                dimensions: "Carabiner Attached",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.8,
                rating: 4.9,
                reviewCount: 380,
                specs: {
                    "Service Type": "FRS (No License Required)",
                    "Power Output": "2.0 Watts (Max Legal FRS)",
                    "Battery Life": "3 to 5 Days (1800 mAh Li-ion USB-C)",
                    "Durability": "IP56 Splashtight / Shatterproof TPU Case",
                    "Attachment": "Heavy-Duty Carabiner + Leash Included"
                },
                priceHistory: [110, 110, 105, 99, 95],
                pros: ["Specifically built for backcountry abuse with shatterproof housing", "Mammoth 3-5 day battery life on a single charge", "Heavy-duty steel carabiner & leash keeps it secured to pack strap"],
                cons: ["Line-of-sight range limited by mountain topography (1-3 mi in trees)", "Fixed antenna"],
                buyingAdvice: "The best grab-and-go license-free mountain radio for hikers, climbers, and scouts.",
                verdict: "The best grab-and-go license-free mountain radio for hikers, climbers, and scouts."
            },
            {
                id: "radio-rocky-5w-expedition",
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
                name: "Rocky Talkie 5-Watt Expedition GMRS Radio",
                brand: "Rocky Talkie",
                category: "radios",
                categoryName: "Radios & Comms",
                pickType: "Premium Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 145,
                currentPrice: 145,
                msrp: 165,
                salePrice: 145,
                weight: "9.2 oz",
                weightOz: 9.2,
                weightDisplay: "0 lbs 9.2 oz (260g)",
                dimensions: "IP67 Waterproof",
                dealBadge: "Premium Pick",
                valueRating: 9.5,
                rating: 4.9,
                reviewCount: 190,
                specs: {
                    "Service Type": "GMRS (5W High Power - FCC License Required)",
                    "Power Output": "5.0 Watts (Max GMRS Output)",
                    "Battery Life": "4 to 6 Days (2000 mAh Li-ion USB-C)",
                    "Water Rating": "IP67 Waterproof (Submersible up to 30 mins)",
                    "Channels": "22 GMRS Channels + 8 Repeater Channels + NOAA Weather"
                },
                priceHistory: [165, 165, 155, 149, 145],
                pros: ["Full 5W power penetrates dense timber and canyon walls far better than 2W FRS", "IP67 100% waterproof submersible construction", "Supports GMRS repeaters for long distance emergency comms"],
                cons: ["Requires $35 10-year FCC GMRS license (no test required)", "Slightly heavier"],
                buyingAdvice: "The ultimate 5-Watt waterproof GMRS radio for serious wilderness expeditions.",
                verdict: "The ultimate 5-Watt waterproof GMRS radio for serious wilderness expeditions."
            },
            {
                id: "radio-baofeng-uv5r",
                imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                name: "Baofeng UV-5R Dual Band Radio",
                brand: "Baofeng",
                category: "radios",
                categoryName: "Radios & Comms",
                pickType: "Budget Pick",
                profiles: ["budget"],
                profileTags: ["budget", "value"],
                price: 24,
                currentPrice: 24,
                msrp: 35,
                salePrice: 24,
                weight: "7.4 oz",
                weightOz: 7.4,
                weightDisplay: "0 lbs 7.4 oz (210g)",
                dimensions: "Dual-Band Handheld",
                dealBadge: "Budget Pick",
                valueRating: 8.8,
                rating: 4.4,
                reviewCount: 850,
                specs: {
                    "Service Type": "Ham / Amateur VHF/UHF (Ham License Required for TX)",
                    "Power Output": "4.0 Watts",
                    "Frequency Range": "136-174 MHz (VHF) / 400-520 MHz (UHF)",
                    "Battery": "1800 mAh Li-ion",
                    "Channels": "128 Programmable Memory Channels"
                },
                priceHistory: [35, 35, 29, 26, 24],
                pros: ["Crazy $24 price point for a 4W dual-band radio", "Manual keypad frequency programming", "Massive aftermarket accessory ecosystem"],
                cons: ["Requires FCC Amateur Radio (Ham) license to transmit legally", "Steep learning curve to program frequencies", "Not waterproof"],
                buyingAdvice: "The ultra-budget choice for licensed ham radio operators and tech hobbyists.",
                verdict: "The ultra-budget choice for licensed ham radio operators and tech hobbyists."
            },
            {
                id: "radio-motorola-t800",
                imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
                name: "Motorola Talkabout T800 Radios (Pair)",
                brand: "Motorola",
                category: "radios",
                categoryName: "Radios & Comms",
                pickType: "Youth Pick",
                profiles: ["adult", "youth", "budget"],
                profileTags: ["adult", "youth", "budget", "value"],
                price: 89,
                currentPrice: 89,
                msrp: 110,
                salePrice: 89,
                weight: "7.5 oz",
                weightOz: 7.5,
                weightDisplay: "0 lbs 7.5 oz (214g per radio)",
                dimensions: "Bluetooth App Connected",
                dealBadge: "Youth Pick",
                valueRating: 9.1,
                rating: 4.5,
                reviewCount: 210,
                specs: {
                    "Service Type": "FRS (No License Required)",
                    "Special Feature": "Bluetooth App Connectivity for Offline Text & Location Sharing",
                    "Channels": "22 Channels + 121 Privacy Codes + NOAA Weather",
                    "Power Source": "Dual Power (Rechargeable NiMH included or 3 AA)",
                    "Water Rating": "IPX4 Weatherproof"
                },
                priceHistory: [110, 110, 99, 95, 89],
                pros: ["Pairs with phone app to send offline text messages & share GPS pin locations via radio frequency", "Includes NOAA weather alerts", "Dual-power flexibility (NiMH pack or AA batteries)"],
                cons: ["App setup requires Bluetooth pairing before entering trail", "Less durable than Rocky Talkie"],
                buyingAdvice: "Best smart FRS radio for offline texting and GPS location mapping.",
                verdict: "Best smart FRS radio for offline texting and GPS location mapping."
            },

            // ==========================================
            // 📡 CATEGORY 11: ELECTRONICS & NAVIGATION
            // ==========================================
            {
                id: "elec-garmin-inreach-mini2",
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
                name: "Garmin inReach Mini 2 Satellite Communicator",
                brand: "Garmin",
                category: "electronics",
                categoryName: "Electronics & Nav",
                pickType: "Classic Pick / Best Overall",
                profiles: ["adult", "youth", "ultralight"],
                profileTags: ["adult", "youth", "ultralight", "value"],
                price: 349,
                currentPrice: 349,
                msrp: 400,
                salePrice: 349,
                weight: "3.5 oz",
                weightOz: 3.5,
                weightDisplay: "0 lbs 3.5 oz (3.5 oz)",
                dimensions: "2.0 x 3.9 in",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.6,
                rating: 4.9,
                reviewCount: 340,
                specs: {
                    "Network": "100% Global Iridium Satellite",
                    "Battery Life": "Up to 14 Days (10-min tracking)",
                    "Features": "2-Way Text, SOS, Live Location",
                    "Water Rating": "IPX7 Waterproof",
                    "Display": "Monochrome Sun-Readable"
                },
                priceHistory: [400, 400, 379, 369, 349],
                pros: ["Lifesaving 2-way satellite SOS communications anywhere on Earth", "14-day battery life in standard tracking mode", "Completely independent of cell service"],
                cons: ["Requires monthly satellite subscription (~$15/mo)", "Initial hardware cost"],
                buyingAdvice: "Essential group safety lifeline for remote Sawtooth wilderness trips.",
                verdict: "Essential group safety lifeline for remote Sawtooth wilderness trips."
            },
            {
                id: "elec-nitecore-nb10000",
                imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80",
                name: "Nitecore NB10000 Gen 3 Power Bank",
                brand: "Nitecore",
                category: "electronics",
                categoryName: "Electronics & Nav",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult", "youth"],
                profileTags: ["ultralight", "adult", "youth", "value"],
                price: 49,
                currentPrice: 49,
                msrp: 60,
                salePrice: 49,
                weight: "5.3 oz",
                weightOz: 5.3,
                weightDisplay: "0 lbs 5.3 oz (5.3 oz)",
                dimensions: "4.8 x 2.3 in",
                dealBadge: "Ultralight Pick",
                valueRating: 9.7,
                rating: 4.8,
                reviewCount: 210,
                specs: {
                    "Capacity": "10,000 mAh (38.5Wh)",
                    "Material": "Carbon Fiber Frame",
                    "Ports": "Dual USB-C (22.5W Fast Charge)",
                    "Pass-Through": "Supported",
                    "Water Rating": "IPX5 Weather Resistant"
                },
                priceHistory: [60, 60, 55, 52, 49],
                pros: ["World's lightest 10,000mAh power bank (5.3 oz)", "Sleek carbon fiber anti-drop frame", "Fast charges phone + Garmin simultaneously"],
                cons: ["Higher cost per mAh than bulky plastic bricks", "Carbon weave shows minor scuffs"],
                buyingAdvice: "The ultimate ultralight power bank for backpacking.",
                verdict: "The ultimate ultralight power bank for backpacking."
            },
            {
                id: "elec-garmin-etrex-22x",
                imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
                name: "Garmin eTrex 22x Handheld GPS",
                brand: "Garmin",
                category: "electronics",
                categoryName: "Electronics & Nav",
                pickType: "Premium Pick",
                profiles: ["adult", "budget"],
                profileTags: ["adult", "budget"],
                price: 169,
                currentPrice: 169,
                msrp: 200,
                salePrice: 169,
                weight: "5.0 oz",
                weightOz: 5.0,
                weightDisplay: "0 lbs 5.0 oz (5.0 oz)",
                dimensions: "2.1 x 4.0 in",
                dealBadge: "Premium Pick",
                valueRating: 8.8,
                rating: 4.4,
                reviewCount: 180,
                specs: {
                    "Screen": "2.2 in 65k Color Sunlight Display",
                    "Maps": "Preloaded TopoActive Mapping",
                    "Battery Life": "25 hours (2 AA Batteries)",
                    "Constellation": "GPS + GLONASS",
                    "Memory": "8 GB Internal + MicroSD"
                },
                priceHistory: [200, 200, 189, 179, 169],
                pros: ["Preloaded TopoActive topographic maps", "Runs on standard AA batteries for easy swap", "Rugged waterproof body"],
                cons: ["Non-touchscreen joystick navigation", "Smaller 2.2-inch screen size"],
                buyingAdvice: "Reliable standalone GPS with preloaded topo maps.",
                verdict: "Reliable standalone GPS with preloaded topo maps."
            },
            {
                id: "elec-anker-325-20k",
                imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80",
                name: "Anker 325 Power Bank 20,000mAh",
                brand: "Anker",
                category: "electronics",
                categoryName: "Electronics & Nav",
                pickType: "Budget Pick",
                profiles: ["budget"],
                profileTags: ["budget", "value"],
                price: 35,
                currentPrice: 35,
                msrp: 50,
                salePrice: 35,
                weight: "12.8 oz",
                weightOz: 12.8,
                weightDisplay: "0 lbs 12.8 oz (12.8 oz)",
                dimensions: "6.2 x 2.9 in",
                dealBadge: "Budget Pick",
                valueRating: 8.9,
                rating: 4.6,
                reviewCount: 450,
                specs: {
                    "Capacity": "20,000 mAh",
                    "Material": "Polycarbonate Shell",
                    "Ports": "USB-C + USB-A",
                    "Pass-Through": "Standard Charge",
                    "Weight": "12.8 oz"
                },
                priceHistory: [50, 48, 42, 38, 35],
                pros: ["Massive 20,000mAh capacity (4-5 full phone charges)", "Budget $35 price point", "Proven Anker safety circuit"],
                cons: ["Heavy 12.8 oz weight", "Slower recharging time"],
                buyingAdvice: "High-capacity power bank for multi-person group trips on a budget.",
                verdict: "High-capacity power bank for multi-person group trips on a budget."
            },

            // ==========================================
            // 🦯 CATEGORY 12: TREKKING POLES
            // ==========================================
            {
                id: "poles-durston-iceline",
                imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
                name: "Durston Iceline Carbon Trekking Poles",
                brand: "Durston Gear",
                category: "poles",
                categoryName: "Trekking Poles",
                pickType: "Classic Pick / Best Overall",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult", "value"],
                price: 149,
                currentPrice: 149,
                msrp: 149,
                salePrice: 149,
                weight: "10.2 oz",
                weightOz: 10.2,
                weightDisplay: "0 lbs 10.2 oz (290g pair)",
                dimensions: "Max 127 cm",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.8,
                rating: 4.9,
                reviewCount: 180,
                specs: {
                    "Rank / Overall Score": "#1 (Highest Strength-to-Weight Ratio)",
                    "Weight": "145g (5.1 oz) per pole",
                    "Deflection & Stiffness": "Top 3 Stiffest (Minimal center/end deflection)",
                    "Reverb & Noise": "Quietest (Dual O-Ring Ferrule Dampeners)",
                    "Lock System": "Hybrid Telescoping Flip-Lock + QuickConnect Ferrule",
                    "Grip & Strap": "Thin Soft Mesh Strap + Light Ergonomic Foam Grip",
                    "Max Length": "127 cm (Fits hikers up to ~6 ft)"
                },
                priceHistory: [149, 149, 149, 149, 149],
                pros: ["#1 ranked strength-to-weight ratio out of 30 tested poles", "Dual ferrule O-rings completely eliminate rattle & reverb", "Ultra-packable hybrid telescoping quick-connect design"],
                cons: ["Max 127 cm length may not fit very tall hikers or tall trekking shelters"],
                buyingAdvice: "The best trekking pole in the world. Unmatched strength-to-weight with zero rattle.",
                verdict: "The best trekking pole in the world. Unmatched strength-to-weight with zero rattle."
            },
            {
                id: "poles-bd-alpine-cork",
                imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
                name: "Black Diamond Alpine Carbon Cork Poles",
                brand: "Black Diamond",
                category: "poles",
                categoryName: "Trekking Poles",
                pickType: "Premium Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 169,
                currentPrice: 169,
                msrp: 200,
                salePrice: 169,
                weight: "17.1 oz",
                weightOz: 17.1,
                weightDisplay: "1 lb 1.1 oz (485g pair)",
                dimensions: "Max 130 cm",
                dealBadge: "Premium Pick",
                valueRating: 9.3,
                rating: 4.8,
                reviewCount: 310,
                specs: {
                    "Rank / Overall Score": "#2 Overall (#1 Pure Strength)",
                    "Weight": "242g (8.5 oz) per pole",
                    "Deflection & Stiffness": "3 cm Center Deflection (Practically Indestructible)",
                    "Reverb & Noise": "Low Reverb (Solid Carbon Shafts)",
                    "Lock System": "FlickLock Pro Metal Clamps (Best in Biz)",
                    "Grip & Strap": "Premium 100% Natural Cork Grip + Padded Strap",
                    "Max Length": "130 cm (Collapsed 61 cm)"
                },
                priceHistory: [200, 200, 185, 175, 169],
                pros: ["Strongest pole tested (only 3 cm deflection under 35 lb load)", "Best metal FlickLock Pro clamps on the market", "Premium natural cork grip absorbs hand sweat"],
                cons: ["Midweight (8.5 oz per pole), heavier than ultralight models", "Clunky padded wrist strap"],
                buyingAdvice: "Indestructible workhorse for thru-hikers, heavy loads, and rugged alpine travel.",
                verdict: "Indestructible workhorse for thru-hikers, heavy loads, and rugged alpine travel."
            },
            {
                id: "poles-cascade-ultralight",
                imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
                name: "Cascade Mountain Tech Carbon Poles",
                brand: "Cascade Mountain Tech",
                category: "poles",
                categoryName: "Trekking Poles",
                pickType: "Budget Pick",
                profiles: ["adult", "youth", "budget", "ultralight"],
                profileTags: ["adult", "youth", "budget", "ultralight", "value"],
                price: 54,
                currentPrice: 54,
                msrp: 65,
                salePrice: 54,
                weight: "14.4 oz",
                weightOz: 14.4,
                weightDisplay: "0 lbs 14.4 oz (410g pair)",
                dimensions: "Max 135 cm",
                dealBadge: "Budget Pick",
                valueRating: 9.9,
                rating: 4.7,
                reviewCount: 540,
                specs: {
                    "Rank / Overall Score": "#3 Overall (Best Value under $70)",
                    "Weight": "205g (7.2 oz) per pole",
                    "Deflection & Stiffness": "High Stiffness (Single Flip Lock Reinforcement)",
                    "Reverb & Noise": "Moderate Reverb",
                    "Lock System": "Single Quick Flip-Lock (2-Piece Shaft)",
                    "Grip & Strap": "EVA Foam Grip + Extension (Basic Nylon Strap)",
                    "Max Length": "135 cm"
                },
                priceHistory: [65, 65, 59, 56, 54],
                pros: ["Incredible strength-to-weight ratio for just $54/pair", "2-piece single flip-lock architecture reinforces center against deflection", "Includes foam grip extension"],
                cons: ["Taller minimum collapsed height (less ideal for running vests/small daypacks)", "Basic nylon webbing wrist strap"],
                buyingAdvice: "The ultimate value sniper. Outstanding stiffness-to-weight ratio at 1/3 the cost of premium brands.",
                verdict: "The ultimate value sniper. Outstanding stiffness-to-weight ratio at 1/3 the cost of premium brands."
            },
            {
                id: "poles-leki-ultratrail-fx",
                imageUrl: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1200&q=80",
                name: "Leki Ultra Trail FX.One Folding Carbon Poles",
                brand: "Leki",
                category: "poles",
                categoryName: "Trekking Poles",
                pickType: "Ultralight Pick",
                profiles: ["ultralight", "adult"],
                profileTags: ["ultralight", "adult"],
                price: 189,
                currentPrice: 189,
                msrp: 220,
                salePrice: 189,
                weight: "9.6 oz",
                weightOz: 9.6,
                weightDisplay: "0 lbs 9.6 oz (274g pair)",
                dimensions: "Push-Button Folding Z-Pole",
                dealBadge: "Ultralight Pick",
                valueRating: 9.0,
                rating: 4.8,
                reviewCount: 95,
                specs: {
                    "Rank / Overall Score": "Honorable Mention (Best Folding / Ultramarathon)",
                    "Weight": "137g (4.8 oz) per pole",
                    "Deflection & Stiffness": "Lightweight Carbon Folding Z-Pole Structure",
                    "Reverb & Noise": "Low Reverb Internal Cord System",
                    "Lock System": "Push-Button Release Collapsible Z-Pole System",
                    "Grip & Strap": "Shark System Glove Strap (Direct Power Transfer)",
                    "Max Length": "130 cm (Fixed/Collapsible sizes)"
                },
                priceHistory: [220, 220, 210, 199, 189],
                pros: ["Ultra-fast folding push-button design for rapid stowing", "Unique Shark System glove strap maximizes arm-to-ground power transfer", "Ultra-lightweight 137g per pole for trail runners"],
                cons: ["Fixed length sizes require careful height selection", "Higher price point"],
                buyingAdvice: "The trusted choice of elite ultramarathoners for maximum speed, power transfer, and fast stowing.",
                verdict: "The trusted choice of elite ultramarathoners for maximum speed, power transfer, and fast stowing."
            },

            // ==========================================
            // 🪑 CATEGORY 13: CAMP CHAIRS
            // ==========================================
            {
                id: "chair-helinox-zero",
                imageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
                name: "Helinox Chair Zero",
                brand: "Helinox",
                category: "chairs",
                categoryName: "Camp Chairs",
                pickType: "Classic Pick / Best Overall",
                profiles: ["ultralight", "adult", "youth"],
                profileTags: ["ultralight", "adult", "youth", "value"],
                price: 119,
                currentPrice: 119,
                msrp: 150,
                salePrice: 119,
                weight: "17.0 oz",
                weightOz: 17.0,
                weightDisplay: "1 lb 1 oz (17 oz / 490g)",
                dimensions: "13.8 x 3.9 in Packed",
                dealBadge: "Classic Pick / Best Overall",
                valueRating: 9.2,
                rating: 4.8,
                reviewCount: 260,
                specs: {
                    "Weight Limit / Capacity": "265 lbs (120 kg)",
                    "Category Rank": "#1 Overall Ultralight Gold Standard",
                    "Frame": "DAC TH72M Featherlight Aluminum Alloy",
                    "Seat Height": "11.0 in",
                    "Packed Size": "13.8 x 3.9 in (Bottle size)"
                },
                priceHistory: [150, 150, 135, 125, 119],
                pros: ["The undisputed gold standard 1 lb backpacking chair", "Packs down to the size of a 1-liter water bottle", "DAC TH72M aluminum frame holds up to 265 lbs"],
                cons: ["11-inch seat height requires a low squat", "Feet can sink into soft soil without ground sheet"],
                buyingAdvice: "The best overall ultralight chair on the market. Gold standard weight-to-comfort ratio.",
                verdict: "The best overall ultralight chair on the market. Gold standard weight-to-comfort ratio."
            },
            {
                id: "chair-ba-skyline-ul",
                imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
                name: "Big Agnes Skyline UL Chair",
                brand: "Big Agnes",
                category: "chairs",
                categoryName: "Camp Chairs",
                pickType: "Premium Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 139,
                currentPrice: 139,
                msrp: 170,
                salePrice: 139,
                weight: "27.0 oz",
                weightOz: 27.0,
                weightDisplay: "1 lb 11 oz (27 oz / 765g)",
                dimensions: "3.5 x 17 in Packed",
                dealBadge: "Premium Pick",
                valueRating: 9.0,
                rating: 4.7,
                reviewCount: 145,
                specs: {
                    "Weight Limit / Capacity": "275 lbs (125 kg)",
                    "Category Rank": "Best for Stability & Camp Comfort",
                    "Frame": "Pre-bent Hubless Aircraft Aluminum",
                    "Seat Height": "15.0 in (Taller & Easier Sit)",
                    "Packed Size": "3.5 x 17 in"
                },
                priceHistory: [170, 170, 155, 149, 139],
                pros: ["Hubless bent-leg frame architecture provides superior anti-tip stability", "Taller 15-inch seat height is much easier on knees", "Wider seat bucket for extended lounging comfort"],
                cons: ["10 oz heavier than Helinox Chair Zero", "Slightly longer packed dimension"],
                buyingAdvice: "The most stable and comfortable camp chair on uneven mountain terrain.",
                verdict: "The most stable and comfortable camp chair on uneven mountain terrain."
            },
            {
                id: "chair-nemo-moonlite",
                imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
                name: "NEMO Moonlite Reclining Chair",
                brand: "NEMO",
                category: "chairs",
                categoryName: "Camp Chairs",
                pickType: "Luxury Recline Pick",
                profiles: ["adult"],
                profileTags: ["adult"],
                price: 129,
                currentPrice: 129,
                msrp: 160,
                salePrice: 129,
                weight: "29.0 oz",
                weightOz: 29.0,
                weightDisplay: "1 lb 13 oz (29 oz / 830g)",
                dimensions: "Pulley Recline System",
                dealBadge: "Luxury Recline Pick",
                valueRating: 8.9,
                rating: 4.8,
                reviewCount: 110,
                specs: {
                    "Weight Limit / Capacity": "300 lbs (136 kg)",
                    "Category Rank": "Best Reclining Luxury Chair",
                    "Frame": "Forged 6061 Aluminum & Polymer Hubs",
                    "Seat Height": "10.5 in",
                    "Special Feature": "Custom Pulley Smooth Recline System"
                },
                priceHistory: [160, 160, 145, 135, 129],
                pros: ["Patent-pending pulley system lets you adjust recline angle seamlessly from upright dining to campfire lounging", "Supports up to 300 lbs capacity", "Seamless mesh seat skin eliminates pressure points"],
                cons: ["Heaviest of the group at 1 lb 13 oz", "Higher price tag"],
                buyingAdvice: "The ultimate luxury reclining chair for stargazing and camp lounging.",
                verdict: "The ultimate luxury reclining chair for stargazing and camp lounging."
            },
            {
                id: "chair-rei-flexlite-air",
                imageUrl: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80",
                name: "REI Co-op Flexlite Air Chair",
                brand: "REI Co-op",
                category: "chairs",
                categoryName: "Camp Chairs",
                pickType: "Budget Pick",
                profiles: ["budget", "ultralight"],
                profileTags: ["budget", "ultralight", "value"],
                price: 79,
                currentPrice: 79,
                msrp: 100,
                salePrice: 79,
                weight: "16.0 oz",
                weightOz: 16.0,
                weightDisplay: "1 lb 0 oz (16 oz / 453g)",
                dimensions: "15 x 5 in Packed",
                dealBadge: "Budget Pick",
                valueRating: 9.6,
                rating: 4.6,
                reviewCount: 175,
                specs: {
                    "Weight Limit / Capacity": "250 lbs (113 kg)",
                    "Category Rank": "Best Value 1 lb Chair under $80",
                    "Frame": "Aluminum Alloy",
                    "Seat Height": "11.0 in",
                    "Packed Size": "15 x 5 in"
                },
                priceHistory: [100, 100, 89, 85, 79],
                pros: ["Featherweight 1.0 lb trail weight", "$79 sale price is $40–$70 cheaper than Helinox/NEMO", "Fast 10-second setup"],
                cons: ["Slightly narrower seating bucket", "250 lb weight capacity"],
                buyingAdvice: "The best value 1-lb ultralight chair for long days on the trail.",
                verdict: "The best value 1-lb ultralight chair for long days on the trail."
            }
        ];

        /**
         * Category Meta Definitions
         * Includes all 9 Backpackers.com major categories + bonus categories
         */
        const CATEGORIES = [
            { id: "all", name: "All Categories", icon: "🌐" },
            { id: "tents", name: "Tents", icon: "⛺" },
            { id: "sleeping_bags", name: "Sleeping Bags", icon: "🛌" },
            { id: "sleeping_pads", name: "Sleeping Pads", icon: "🧘" },
            { id: "backpacks", name: "Backpacks", icon: "🎒" },
            { id: "stoves", name: "Stoves & Cooking", icon: "🍳" },
            { id: "footwear", name: "Footwear", icon: "🥾" },
            { id: "rain_shells", name: "Rain Shells", icon: "🧥" },
            { id: "lighting", name: "Lighting & Headlamps", icon: "🔦" },
            { id: "water_filtration", name: "Water Filtration", icon: "💧" },
            { id: "radios", name: "Radios & Comms", icon: "📻" },
            { id: "electronics", name: "Electronics & Nav", icon: "📡" },
            { id: "poles", name: "Trekking Poles", icon: "🦯" },
            { id: "chairs", name: "Camp Chairs", icon: "🪑" }
        ];

        /**
         * Central Reactive Application State
         */
        const state = {
            activeCategory: 'all',
            activeProfile: 'all',
            searchQuery: '',
            sortBy: 'value',
            dealsOnly: false,
            viewMode: 'auto', // 'auto', 'table', 'grid'
            selectedCompareIds: []
        };

        /**
         * Initialize App
         */
        document.addEventListener('DOMContentLoaded', () => {
            renderTabs();
            renderProducts();
            setupKeyboardNav();
        });

        /**
         * Render Category Tabs with Dynamic Match Counts
         */
        function renderTabs() {
            const tabsNav = document.getElementById('categoryTabs');
            const filteredByProfileAndSearch = getFilteredProductsBase();
            
            tabsNav.innerHTML = CATEGORIES.map(cat => {
                let count = 0;
                if (cat.id === 'all') {
                    count = filteredByProfileAndSearch.length;
                } else {
                    count = filteredByProfileAndSearch.filter(p => p.category === cat.id).length;
                }

                const isActive = state.activeCategory === cat.id;
                return `
                    <button class="tab-btn ${isActive ? 'active' : ''}" 
                            onclick="setCategoryFilter('${cat.id}')"
                            role="tab"
                            aria-selected="${isActive}">
                        <span>${cat.icon} ${cat.name}</span>
                        <span class="tab-count-badge">${count}</span>
                    </button>
                `;
            }).join('');
        }

        /**
         * Get base filtered products (ignoring active category to compute tab badges)
         */
        function getFilteredProductsBase() {
            return PRODUCTS.filter(product => {
                // Profile filter
                if (state.activeProfile !== 'all') {
                    const tags = product.profileTags || product.profiles || [];
                    if (!tags.includes(state.activeProfile)) return false;
                }

                // Search query
                if (state.searchQuery.trim() !== '') {
                    const q = state.searchQuery.trim().toLowerCase();
                    const nameMatch = product.name.toLowerCase().includes(q);
                    const brandMatch = product.brand.toLowerCase().includes(q);
                    const categoryMatch = product.categoryName.toLowerCase().includes(q);
                    const pickMatch = (product.pickType || '').toLowerCase().includes(q);
                    const specMatch = Object.values(product.specs).some(v => String(v).toLowerCase().includes(q));
                    const verdictMatch = (product.verdict || product.buyingAdvice || '').toLowerCase().includes(q);
                    if (!nameMatch && !brandMatch && !categoryMatch && !pickMatch && !specMatch && !verdictMatch) return false;
                }

                // Deals only filter
                if (state.dealsOnly) {
                    if (product.discountPercent < 15) return false;
                }

                return true;
            });
        }

        /**
         * Get fully filtered and sorted products for display
         */
        function getFilteredAndSortedProducts() {
            let list = getFilteredProductsBase();

            // Category filter
            if (state.activeCategory !== 'all') {
                list = list.filter(p => p.category === state.activeCategory);
            }

            // Sorting
            list.sort((a, b) => {
                switch (state.sortBy) {
                    case 'price-asc':
                        return a.currentPrice - b.currentPrice;
                    case 'price-desc':
                        return b.currentPrice - a.currentPrice;
                    case 'rating':
                        return b.rating - a.rating;
                    case 'weight':
                        return a.weightOz - b.weightOz;
                    case 'discount':
                        return b.discountPercent - a.discountPercent;
                    case 'value':
                    default:
                        return b.valueRating - a.valueRating;
                }
            });

            return list;
        }

        /**
         * Category CDN Fallback Map
         */
        const CATEGORY_CDN_FALLBACKS = {
            'tents': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
            'sleeping_bags': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
            'sleeping_pads': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
            'backpacks': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            'stoves': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=800&q=80',
            'footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            'rain_shells': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
            'lighting': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
            'water_filtration': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            'electronics': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
            'poles': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
            'chairs': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
            'radios': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
        };

        /**
         * Universal Base Equipment SVG Data-URI (Tier 4 Fallback)
         */
        const UNIVERSAL_EQUIPMENT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#0f172a"/><circle cx="60" cy="60" r="45" fill="none" stroke="#38bdf8" stroke-width="4"/><path d="M60 25 L85 75 H35 Z" fill="none" stroke="#22c55e" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="55" r="8" fill="#f59e0b"/><path d="M40 90 H80" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>')}`;

        /**
         * Generates Dynamic Vector SVG Data-URI by Category
         */
        function getCategorySvgDataUri(category) {
            const catKey = (category || '').toLowerCase().trim().replace(/[\\s-]+/g, '_');
            const categorySvgs = {
                'tents': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 L100 90 H20 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/><path d="M60 25 L60 90 M40 90 L60 50 L80 90" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M15 90 H105" stroke="#94a3b8" stroke-width="3"/></svg>`,
                'sleeping_bags': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="35" y="20" width="50" height="80" rx="25" fill="none" stroke="#f59e0b" stroke-width="4"/><path d="M35 50 H85 M35 70 H85" stroke="#38bdf8" stroke-width="3"/><circle cx="60" cy="35" r="8" fill="#38bdf8"/></svg>`,
                'sleeping_pads': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="25" width="60" height="70" rx="6" fill="none" stroke="#22c55e" stroke-width="4"/><line x1="30" y1="40" x2="90" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="55" x2="90" y2="55" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="70" x2="90" y2="70" stroke="#38bdf8" stroke-width="2"/></svg>`,
                'backpacks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M35 35 C35 25, 85 25, 85 35 L80 95 C80 98, 40 98, 40 95 Z" fill="none" stroke="#38bdf8" stroke-width="4"/><rect x="42" y="45" width="36" height="25" rx="4" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M45 25 V15 H75 V25" fill="none" stroke="#22c55e" stroke-width="3"/></svg>`,
                'stoves': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M45 85 H75 V60 H45 Z" fill="none" stroke="#94a3b8" stroke-width="3"/><path d="M35 60 H85 M60 60 V40" stroke="#38bdf8" stroke-width="4"/><path d="M50 40 L60 20 L70 40 Z" fill="#f59e0b" stroke="#ef4444" stroke-width="2"/></svg>`,
                'footwear': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M25 80 L35 45 L65 45 L85 65 L95 80 Z" fill="none" stroke="#38bdf8" stroke-width="4"/><rect x="25" y="80" width="70" height="15" rx="4" fill="#22c55e"/></svg>`,
                'rain_shells': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M40 30 L60 40 L80 30 L95 45 L85 55 L80 50 V95 H40 V50 L35 55 L25 45 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/></svg>`,
                'lighting': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="40" y="45" width="40" height="30" rx="5" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="60" cy="60" r="8" fill="#38bdf8"/><path d="M20 60 H40 M80 60 H100" stroke="#94a3b8" stroke-width="4"/></svg>`,
                'water_filtration': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 C60 25, 85 65, 85 80 C85 93, 73 105, 60 105 C46 105, 35 93, 35 80 C35 65, 60 25, 60 25 Z" fill="none" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'electronics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="30" width="60" height="60" rx="10" fill="none" stroke="#38bdf8" stroke-width="4"/><circle cx="60" cy="60" r="15" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M60 20 V30 M60 90 V100 M20 60 H30 M90 60 H100" stroke="#f59e0b" stroke-width="3"/></svg>`,
                'poles': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="40" width="60" height="40" rx="6" fill="none" stroke="#f59e0b" stroke-width="4"/><line x1="40" y1="80" x2="30" y2="105" stroke="#38bdf8" stroke-width="4"/><line x1="80" y1="80" x2="90" y2="105" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'radios': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="35" y="40" width="50" height="60" rx="6" fill="none" stroke="#38bdf8" stroke-width="4"/><line x1="60" y1="20" x2="60" y2="40" stroke="#f59e0b" stroke-width="4"/><circle cx="50" cy="55" r="5" fill="#22c55e"/><circle cx="70" cy="55" r="5" fill="#22c55e"/><rect x="45" y="70" width="30" height="20" fill="#94a3b8"/></svg>`
            };

            const svgContent = categorySvgs[catKey];
            if (svgContent) {
                return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
            }
            return UNIVERSAL_EQUIPMENT_SVG;
        }

        /**
         * Product Image URL Resolver with 4-Tier Fallback Hierarchy
         */
        function getProductImageUrl(product) {
            if (product && product.imageUrl) return product.imageUrl;
            
            const catKey = product && product.category ? product.category.toLowerCase().trim().replace(/[\\s-]+/g, '_') : '';
            if (catKey && CATEGORY_CDN_FALLBACKS[catKey]) {
                return CATEGORY_CDN_FALLBACKS[catKey];
            }
            
            return getCategorySvgDataUri(product ? product.category : '');
        }

        /**
         * Runtime Image Error Handler
         */
        function handleImageError(imgEl, category) {
            if (!imgEl) return;

            let tier = parseInt(imgEl.dataset.fallbackTier || '1', 10);
            const catKey = (category || imgEl.dataset.category || '').toLowerCase().trim().replace(/[\\s-]+/g, '_');

            if (tier === 1) {
                imgEl.dataset.fallbackTier = '2';
                const cdnUrl = CATEGORY_CDN_FALLBACKS[catKey] || CATEGORY_CDN_FALLBACKS['tents'];
                if (cdnUrl && imgEl.src !== cdnUrl) {
                    imgEl.src = cdnUrl;
                    return;
                }
                tier = 2;
            }

            if (tier === 2) {
                imgEl.dataset.fallbackTier = '3';
                const categorySvg = getCategorySvgDataUri(catKey);
                if (categorySvg && imgEl.src !== categorySvg) {
                    imgEl.onerror = null;
                    imgEl.src = categorySvg;
                    return;
                }
                tier = 3;
            }

            imgEl.dataset.fallbackTier = '4';
            imgEl.onerror = null;
            imgEl.src = UNIVERSAL_EQUIPMENT_SVG;
        }

        /**
         * Image Lightbox Modal Interactive Viewer
         */
        function openImageLightbox(productId) {
            const product = PRODUCTS.find(p => p.id === productId);
            if (!product) return;

            document.getElementById('lightboxTitle').innerText = `${product.brand} - ${product.name}`;
            const imgEl = document.getElementById('lightboxImg');
            imgEl.dataset.fallbackTier = '1';
            imgEl.src = getProductImageUrl(product);
            imgEl.onerror = () => handleImageError(imgEl, product.category);
            
            document.getElementById('lightboxMeta').innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:0.95rem;">Category: <strong style="color:var(--accent-blue);">${product.categoryName}</strong></span>
                    <span class="price-sale" style="font-size:1.25rem; font-weight:800;">$${product.currentPrice} ${product.msrp > product.currentPrice ? `<span class="price-original" style="font-size:0.9rem; font-weight:400; text-decoration:line-through; color:var(--text-muted);">$${product.msrp}</span>` : ''}</span>
                </div>
                <div style="color:var(--text-muted); font-size:0.88rem; margin-bottom:10px;">
                    Weight: <strong>${product.weightDisplay}</strong> • Rating: ⭐ <strong>${product.rating}</strong> (${product.reviewCount} reviews) • Value Score: <strong style="color:var(--accent-green-light);">${product.valueRating}/10</strong>
                </div>
                <div style="font-style:italic; color:var(--accent-blue); background:rgba(56, 189, 248, 0.08); padding:10px 14px; border-radius:8px; border-left:4px solid var(--accent-blue); font-size:0.92rem; text-align:left;">
                    "${product.verdict || product.buyingAdvice}"
                </div>
            `;

            const modal = document.getElementById('imageLightboxModal');
            modal.style.display = 'flex';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeImageLightbox(evt) {
            if (!evt || evt.target.id === 'imageLightboxModal' || evt.target.classList.contains('modal-close-btn')) {
                const modal = document.getElementById('imageLightboxModal');
                modal.style.display = 'none';
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        /**
         * Main Render Controller: Updates both Table Matrix and Mobile Cards
         */
        function renderProducts() {
            const products = getFilteredAndSortedProducts();
            const tableBody = document.getElementById('gearTableBody');
            const cardGrid = document.getElementById('cardContainer');
            const emptyState = document.getElementById('emptyState');
            const tableWrapper = document.getElementById('tableContainer');

            // Update Header/Summary info
            document.getElementById('resultsCount').innerText = products.length;
            const activeCatObj = CATEGORIES.find(c => c.id === state.activeCategory);
            document.getElementById('activeCategoryName').innerText = activeCatObj ? activeCatObj.name : 'All Categories';
            
            let filterTags = [];
            if (state.activeProfile !== 'all') filterTags.push(`Profile: ${state.activeProfile.toUpperCase()}`);
            if (state.dealsOnly) filterTags.push('Deals Only (>15% Off)');
            if (state.searchQuery) filterTags.push(`Search: "${state.searchQuery}"`);
            document.getElementById('activeFiltersTag').innerText = filterTags.length > 0 ? `Active Filters: ${filterTags.join(' • ')}` : '';

            // Handle empty state
            if (products.length === 0) {
                tableWrapper.style.display = 'none';
                cardGrid.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            } else {
                emptyState.style.display = 'none';
                applyViewLayoutMode();
            }

            // Render Desktop Table Matrix Rows
            tableBody.innerHTML = products.map(p => {
                const isSelected = state.selectedCompareIds.includes(p.id);
                return `
                    <tr id="tr-${p.id}">
                        <td style="text-align: center;">
                            <input type="checkbox" 
                                   aria-label="Select ${p.name} for comparison"
                                   ${isSelected ? 'checked' : ''} 
                                   onchange="toggleCompareItem('${p.id}')">
                        </td>
                        <td>
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="width:48px; height:48px; min-width:48px; border-radius:8px; overflow:hidden; background:#1e293b; border:1px solid var(--card-border); flex-shrink:0;">
                                    <img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, '${p.category}')" onclick="openImageLightbox('${p.id}')" title="Click to enlarge product image">
                                </div>
                                <div>
                                    <div style="font-size:0.75rem; font-weight:700; color:var(--accent-blue); text-transform:uppercase;">${p.brand}</div>
                                    <div style="font-weight:700; color:var(--text-primary); font-size:1.02rem;">${p.name}</div>
                                    ${p.pickType ? `<span class="badge badge-pick" style="margin-top:2px;">🏷️ ${p.pickType}</span>` : ''}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">${p.categoryName}</div>
                            <div>${renderProfileBadges(p.profiles || p.profileTags)}</div>
                        </td>
                        <td>
                            <div class="card-price-row">
                                <span class="price-sale">$${p.currentPrice}</span>
                                ${p.msrp > p.currentPrice ? `<span class="price-original">$${p.msrp}</span>` : ''}
                                ${p.discountPercent > 0 ? `<span class="discount-tag">${p.discountPercent}% OFF</span>` : ''}
                            </div>
                            <div style="margin-top:6px;">
                                ${renderSparklineSVG(p.priceHistory, p.msrp, p.currentPrice)}
                            </div>
                        </td>
                        <td>
                            <div style="font-weight:600; color:var(--text-primary);">${p.weightDisplay}</div>
                        </td>
                        <td>
                            <div><span class="value-score-badge">Value ${p.valueRating}/10</span></div>
                            <div class="rating-stars" style="margin-top:4px;">⭐ ${p.rating} <span style="font-size:0.75rem; color:var(--text-muted);">(${p.reviewCount})</span></div>
                        </td>
                        <td>
                            <ul style="list-style:none; font-size:0.82rem; color:var(--text-secondary);">
                                ${Object.entries(p.specs).slice(0, 3).map(([k, v]) => `<li><strong style="color:var(--text-muted);">${k}:</strong> ${v}</li>`).join('')}
                            </ul>
                        </td>
                        <td>
                            <div style="font-size:0.82rem; font-style:italic; color:var(--accent-blue); margin-bottom:4px;">"${p.verdict || p.buyingAdvice}"</div>
                            <ul class="pros-list">
                                ${p.pros.slice(0, 2).map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>
                `;
            }).join('');

            // Render Mobile Card Grid
            cardGrid.innerHTML = products.map(p => {
                const isSelected = state.selectedCompareIds.includes(p.id);
                return `
                    <article class="product-card">
                        <div>
                            <div class="card-header">
                                <div style="display:flex; align-items:center; gap:12px;">
                                    <div style="width:44px; height:44px; min-width:44px; border-radius:8px; overflow:hidden; background:#1e293b; border:1px solid var(--card-border); flex-shrink:0;">
                                        <img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, '${p.category}')" onclick="openImageLightbox('${p.id}')" title="Click to enlarge product image">
                                    </div>
                                    <div>
                                        <div class="card-brand">${p.brand}</div>
                                        <div class="card-title">${p.name}</div>
                                        ${p.pickType ? `<span class="badge badge-pick" style="margin-top:2px;">🏷️ ${p.pickType}</span>` : ''}
                                    </div>
                                </div>
                                <label style="display:flex; align-items:center; gap:4px; font-size:0.8rem; font-weight:600; cursor:pointer;">
                                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleCompareItem('${p.id}')">
                                    Compare
                                </label>
                            </div>

                            <div style="margin-bottom: 10px;">
                                ${renderProfileBadges(p.profiles || p.profileTags)}
                            </div>

                            <div class="card-body">
                                <div class="card-price-row">
                                    <span class="price-sale">$${p.currentPrice}</span>
                                    ${p.msrp > p.currentPrice ? `<span class="price-original">$${p.msrp}</span>` : ''}
                                    ${p.discountPercent > 0 ? `<span class="discount-tag">${p.discountPercent}% OFF</span>` : ''}
                                    <span class="value-score-badge" style="margin-left:auto;">Value ${p.valueRating}/10</span>
                                </div>

                                <div class="card-sparkline">
                                    ${renderSparklineSVG(p.priceHistory, p.msrp, p.currentPrice)}
                                </div>

                                <ul class="card-specs-list">
                                    <li><span class="spec-name">Weight:</span> <span class="spec-val">${p.weightDisplay}</span></li>
                                    <li><span class="spec-name">Rating:</span> <span class="spec-val">⭐ ${p.rating} (${p.reviewCount})</span></li>
                                    ${Object.entries(p.specs).slice(0, 2).map(([k, v]) => `<li><span class="spec-name">${k}:</span> <span class="spec-val">${v}</span></li>`).join('')}
                                </ul>

                                <div class="card-verdict">
                                    "${p.verdict || p.buyingAdvice}"
                                </div>
                            </div>
                        </div>

                        <div class="card-footer">
                            <div style="font-size: 0.78rem; color: var(--badge-deal-border); font-weight:700;">🏷️ ${p.pickType || p.dealBadge}</div>
                        </div>
                    </article>
                `;
            }).join('');

            renderFloatingCompareBar();
        }

        /**
         * Render WCAG AA Compliant Badges for Profiles
         */
        function renderProfileBadges(profiles) {
            if (!profiles) return '';
            return profiles.map(pr => {
                switch(pr) {
                    case 'adult':
                        return `<span class="badge badge-adult">Adult 230lb</span>`;
                    case 'youth':
                        return `<span class="badge badge-youth">Youth 105lb</span>`;
                    case 'ultralight':
                        return `<span class="badge badge-ultralight">Ultralight</span>`;
                    case 'budget':
                    case 'value':
                        return `<span class="badge badge-budget">Budget Pick</span>`;
                    default:
                        return `<span class="badge badge-both">${pr}</span>`;
                }
            }).join(' ');
        }

        /**
         * Dynamic Lightweight Inline SVG Sparkline Generator
         */
        function renderSparklineSVG(history, msrp, current) {
            if (!history || history.length < 2) return '';

            const min = Math.min(...history);
            const max = Math.max(...history);
            const w = 110;
            const h = 28;
            const pad = 4;

            const points = history.map((val, idx) => {
                const x = pad + (idx / (history.length - 1)) * (w - 2 * pad);
                let y;
                if (max === min) {
                    y = h / 2;
                } else {
                    y = h - pad - ((val - min) / (max - min)) * (h - 2 * pad);
                }
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');

            const isPriceDropping = history[history.length - 1] <= history[0];
            const lineColor = isPriceDropping ? '#22c55e' : '#38bdf8';

            return `
                <div class="sparkline-box" title="Price History Trend: Min $${min} | Max $${max}">
                    <svg class="sparkline-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
                        <polyline fill="none" stroke="${lineColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
                        ${history.map((val, idx) => {
                            const x = pad + (idx / (history.length - 1)) * (w - 2 * pad);
                            const y = max === min ? h/2 : h - pad - ((val - min) / (max - min)) * (h - 2 * pad);
                            const isLast = idx === history.length - 1;
                            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isLast ? 3.5 : 2}" fill="${isLast ? lineColor : '#94a3b8'}" />`;
                        }).join('')}
                    </svg>
                    <div class="sparkline-meta">
                        <div>Low: <strong style="color:var(--accent-green-light);">$${min}</strong></div>
                        <div>High: $${max}</div>
                    </div>
                </div>
            `;
        }

        /**
         * State Filter Event Handlers
         */
        function setCategoryFilter(catId) {
            state.activeCategory = catId;
            renderTabs();
            renderProducts();
        }

        function setProfileFilter(profileId) {
            state.activeProfile = profileId;
            document.querySelectorAll('.profile-pill-btn').forEach(btn => {
                const p = btn.getAttribute('data-profile');
                if (p === profileId) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });
            renderTabs();
            renderProducts();
        }

        function onSearchInput(evt) {
            state.searchQuery = evt.target.value;
            const clearBtn = document.getElementById('clearSearchBtn');
            if (clearBtn) clearBtn.style.display = state.searchQuery.trim() ? 'block' : 'none';
            renderTabs();
            renderProducts();
        }

        function clearSearch() {
            state.searchQuery = '';
            const input = document.getElementById('gearSearch');
            if (input) input.value = '';
            const clearBtn = document.getElementById('clearSearchBtn');
            if (clearBtn) clearBtn.style.display = 'none';
            renderTabs();
            renderProducts();
        }

        function onSortChange(evt) {
            state.sortBy = evt.target.value;
            renderProducts();
        }

        function onDealsOnlyToggle(evt) {
            state.dealsOnly = evt.target.checked;
            renderTabs();
            renderProducts();
        }

        function setViewMode(mode) {
            state.viewMode = mode;
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            if (mode === 'auto') document.getElementById('viewBtnAuto').classList.add('active');
            if (mode === 'table') document.getElementById('viewBtnTable').classList.add('active');
            if (mode === 'grid') document.getElementById('viewBtnGrid').classList.add('active');
            applyViewLayoutMode();
        }

        function applyViewLayoutMode() {
            const tableWrapper = document.getElementById('tableContainer');
            const cardGrid = document.getElementById('cardContainer');
            if (state.viewMode === 'table') {
                tableWrapper.style.display = 'block';
                tableWrapper.classList.remove('desktop-table-view');
                cardGrid.style.display = 'none';
                cardGrid.classList.remove('mobile-card-view');
            } else if (state.viewMode === 'grid') {
                tableWrapper.style.display = 'none';
                tableWrapper.classList.remove('desktop-table-view');
                cardGrid.style.display = 'grid';
                cardGrid.classList.remove('mobile-card-view');
            } else { // 'auto'
                tableWrapper.style.display = '';
                tableWrapper.classList.add('desktop-table-view');
                cardGrid.style.display = '';
                cardGrid.classList.add('mobile-card-view');
            }
        }

        function resetFilters() {
            state.activeCategory = 'all';
            state.activeProfile = 'all';
            state.searchQuery = '';
            state.dealsOnly = false;
            state.sortBy = 'value';
            document.getElementById('gearSearch').value = '';
            const clearBtn = document.getElementById('clearSearchBtn');
            if (clearBtn) clearBtn.style.display = 'none';
            document.getElementById('dealsOnlyCheck').checked = false;
            document.getElementById('sortSelect').value = 'value';
            setProfileFilter('all');
        }

        /**
         * Comparison Drawer & Selection Manager
         */
        function toggleCompareItem(id) {
            const idx = state.selectedCompareIds.indexOf(id);
            if (idx > -1) {
                state.selectedCompareIds.splice(idx, 1);
                if (state.selectedCompareIds.length < 2) {
                    closeCompareModal();
                }
            } else {
                if (state.selectedCompareIds.length >= 4) {
                    alert('You can select a maximum of 4 items for side-by-side comparison.');
                    renderProducts();
                    return;
                }
                state.selectedCompareIds.push(id);
            }
            renderProducts();
        }

        function removeFromCompareModal(id) {
            const idx = state.selectedCompareIds.indexOf(id);
            if (idx > -1) {
                state.selectedCompareIds.splice(idx, 1);
            }
            if (state.selectedCompareIds.length < 2) {
                closeCompareModal();
            } else {
                openCompareModal();
            }
            renderProducts();
        }

        function clearCompareSelection() {
            state.selectedCompareIds = [];
            closeCompareModal();
            renderProducts();
        }

        function renderFloatingCompareBar() {
            const bar = document.getElementById('floatingCompareBar');
            const countNum = document.getElementById('compareCountNum');
            const chipsContainer = document.getElementById('compareChipsContainer');

            countNum.innerText = state.selectedCompareIds.length;

            if (state.selectedCompareIds.length > 0) {
                bar.classList.add('visible');
                chipsContainer.innerHTML = state.selectedCompareIds.map(id => {
                    const item = PRODUCTS.find(p => p.id === id);
                    if (!item) return '';
                    return `
                        <span class="compare-chip">
                            ${item.name}
                            <span class="compare-chip-remove" onclick="toggleCompareItem('${item.id}')" title="Remove from compare">&times;</span>
                        </span>
                    `;
                }).join('');
            } else {
                bar.classList.remove('visible');
            }
        }

        /**
         * Side-by-Side Comparison Matrix Modal Generator
         */
        function openCompareModal() {
            if (state.selectedCompareIds.length < 2) {
                closeCompareModal();
                alert('Please select at least 2 items to perform a side-by-side comparison.');
                return;
            }

            const modal = document.getElementById('compareModal');
            const headerRow = document.getElementById('modalTableHeaderRow');
            const tableBody = document.getElementById('modalTableBody');

            const selectedItems = state.selectedCompareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

            // Populate Modal Table Header
            headerRow.innerHTML = `
                <th scope="col" class="feature-col">Feature / Metric</th>
                ${selectedItems.map(item => `
                    <th scope="col" style="background-color: #0f172a; border-bottom: 2px solid var(--accent-blue);">
                        <div style="width:60px; height:60px; margin:0 auto 8px auto; border-radius:8px; overflow:hidden; background:#1e293b; border:1px solid var(--card-border);">
                            <img src="${getProductImageUrl(item)}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, '${item.category}')" onclick="openImageLightbox('${item.id}')" title="Click to enlarge product image">
                        </div>
                        <div style="font-size:0.75rem; color:var(--accent-blue); text-transform:uppercase;">${item.brand}</div>
                        <div style="font-weight:700; color:var(--text-primary); font-size:1.05rem;">${item.name}</div>
                        ${item.pickType ? `<div style="margin-top:2px;"><span class="badge badge-pick">🏷️ ${item.pickType}</span></div>` : ''}
                        <div style="margin-top:6px;">
                            <span class="price-sale">$${item.currentPrice}</span>
                            ${item.msrp > item.currentPrice ? `<span class="price-original">$${item.msrp}</span>` : ''}
                        </div>
                        <button class="btn btn-secondary" style="padding:3px 10px; font-size:0.75rem; margin-top:8px;" onclick="removeFromCompareModal('${item.id}')">Remove</button>
                    </th>
                `).join('')}
            `;

            // Define Comparison Feature Rows
            const featureRows = [
                {
                    name: 'Category & Pick Standard',
                    render: item => `
                        <div><strong>${item.categoryName}</strong></div>
                        ${item.pickType ? `<div style="margin-top:2px;"><span class="badge badge-pick">🏷️ ${item.pickType}</span></div>` : ''}
                        <div style="margin-top:4px;">${renderProfileBadges(item.profiles || item.profileTags)}</div>
                    `
                },
                {
                    name: 'Price',
                    render: item => `
                        <div><strong style="color:var(--accent-green-light); font-size:1.1rem;">$${item.currentPrice}</strong> ${item.msrp > item.currentPrice ? `<span style="text-decoration:line-through; color:var(--text-muted);">$${item.msrp}</span>` : ''}</div>
                    `
                },
                {
                    name: 'Rating',
                    render: item => `
                        <div class="rating-stars">⭐ ${item.rating}/5 <span style="font-size:0.8rem; color:var(--text-muted);">(${item.reviewCount} reviews)</span></div>
                    `
                },
                {
                    name: 'Weight',
                    render: item => `<strong>${item.weightDisplay}</strong>`
                },
                {
                    name: 'Thickness (in)',
                    render: item => `<span>${item.specs['Thickness'] || item.specs['Thickness (in)'] || 'N/A'}</span>`
                },
                {
                    name: 'Width (in)',
                    render: item => `<span>${item.specs['Width'] || item.specs['Width (in)'] || 'N/A'}</span>`
                },
                {
                    name: 'Height Fit',
                    render: item => `<span>${item.specs['Height Fit'] || 'N/A'}</span>`
                },
                {
                    name: 'R-Value',
                    render: item => `<span>${item.specs['R-Value'] || 'N/A'}</span>`
                },
                {
                    name: 'Value Score',
                    render: item => `<span class="value-score-badge">Value Score: ${item.valueRating}/10</span>`
                },
                {
                    name: 'Price History Trend',
                    render: item => renderSparklineSVG(item.priceHistory, item.msrp, item.currentPrice)
                },
                {
                    name: 'Key Specifications',
                    render: item => `
                        <ul style="list-style:none; padding-left:0; font-size:0.85rem;">
                            ${Object.entries(item.specs).map(([k, v]) => `<li><strong style="color:var(--text-muted);">${k}:</strong> ${v}</li>`).join('')}
                        </ul>
                    `
                },
                {
                    name: 'Pros',
                    render: item => `
                        <ul class="pros-list">
                            ${item.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    `
                },
                {
                    name: 'Cons',
                    render: item => `
                        <ul class="cons-list">
                            ${item.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    `
                },
                {
                    name: 'Buying Advice / Verdict',
                    render: item => `<div style="font-style:italic; color:var(--text-primary); font-size:0.9rem;">"${item.verdict || item.buyingAdvice}"</div>`
                }
            ];

            // Render Table Rows
            tableBody.innerHTML = featureRows.map(row => `
                <tr>
                    <th scope="row" class="feature-col">${row.name}</th>
                    ${selectedItems.map(item => `
                        <td class="product-col">${row.render(item)}</td>
                    `).join('')}
                </tr>
            `).join('');

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCompareModal() {
            const modal = document.getElementById('compareModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function setupKeyboardNav() {
            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeCompareModal();
                    closeImageLightbox();
                }
            });

            // Close modal when clicking backdrop
            document.getElementById('compareModal').addEventListener('click', (e) => {
                if (e.target.id === 'compareModal') {
                    closeCompareModal();
                }
            });
        }
    </script>
</body>
</html>
'''
