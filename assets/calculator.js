const $ = (s) => document.querySelector(s);
const norm = (s) => (s ?? "").toString().toLowerCase().trim();
const esc = (s) => (s ?? "").toString().replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
}[m]));

let currentCapMode = "max"; // 'max' or 'reborn5'

// --- Suffix Handling ---
const ALL_SUFFIXES = (function () {
    const first = ["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"];
    const second = ["", "De", "Vt", "Tg", "qg", "Qg", "sg", "Sg", "Og", "Ng"];
    const third = ["", "Ce", "Du", "Tr", "Qa", "Qi", "Se", "Si", "Ot", "Ni"];
    const mult = ["", "Mi", "Mc", "Na", "Pi", "Fm", "At", "Zp", "Yc", "Xo", "Ve", "Me", "Due", "Tre", "Te", "Pt", "He", "Hp", "Oct", "En", "Ic", "Mei", "Dui", "Tri", "Teti", "Pti", "Hei", "Hp", "Oci", "Eni", "Tra", "TeC", "MTc", "DTc", "TrTc", "TeTc", "PeTc", "HTc", "HpT", "OcT", "EnT", "TetC", "MTetc", "DTetc", "TrTetc", "TeTetc", "PeTetc", "HTetc", "HpTetc", "OcTetc", "EnTetc", "PcT", "MPcT", "DPcT", "TPCt", "TePCt", "PePCt", "HePCt", "HpPct", "OcPct", "EnPct", "HCt", "MHcT", "DHcT", "THCt", "TeHCt", "PeHCt", "HeHCt", "HpHct", "OcHct", "EnHct", "HpCt", "MHpcT", "DHpcT", "THpCt", "TeHpCt", "PeHpCt", "HeHpCt", "HpHpct", "OcHpct", "EnHpct", "OCt", "MOcT", "DOcT", "TOCt", "TeOCt", "PeOCt", "HeOCt", "HpOct", "OcOct", "EnOct", "Ent", "MEnT", "DEnT", "TEnt", "TeEnt", "PeEnt", "HeEnt", "HpEnt", "OcEnt", "EnEnt", "Hect", "MeHect"];
    let res = ["", "k", "M", "B", "T"];
    for (let n = 5; n < 1000; n++) {
        let i = n - 1;
        let f = first[i % 10];
        let s = second[Math.floor(i / 10) % 10];
        let t = third[Math.floor(i / 100) % 10];
        let m = mult[Math.floor(i / 1000)] || "";
        let combined = f + s + t + m;
        if (combined && !res.includes(combined)) res.push(combined);
    }
    return res;
})();

const SUFFIX_ALIASES = {};

function formatSuffix(num) {
    if (Math.abs(num) < 0.000001) return "0";
    let val = Math.abs(num);
    let sIdx = 0;

    if (val < 1 && val > 0) {
        let str = val.toFixed(10).replace(/\.?0+$/, "");
        if (str === "0") return val.toExponential(2);
        return (num < 0 ? "-" : "") + str;
    }

    while (val >= 1000 && sIdx < ALL_SUFFIXES.length - 1) {
        val /= 1000;
        sIdx++;
    }

    let formatted = val.toFixed(2).replace(/\.?0+$/, "");
    return (num < 0 ? "-" : "") + formatted + ALL_SUFFIXES[sIdx];
}

function parseSuffix(valStr) {
    if (!valStr || valStr.toString().trim() === "") return 0;
    // Remove 'x' or 'x+' prefix if present for parsing
    let clean = valStr.toString().trim().replace(/^x\+?\s*/i, "");

    const match = clean.match(/^([\d.e+-]+)\s*([a-z]+)?$/i);
    if (!match) return 0;

    let val = parseFloat(match[1]);
    let suf = match[2] ? match[2].toLowerCase() : '';

    if (suf) {
        if (SUFFIX_ALIASES[suf]) suf = SUFFIX_ALIASES[suf].toLowerCase();
        const foundIdx = ALL_SUFFIXES.findIndex(s => s.toLowerCase() === suf);
        if (foundIdx > 0) val *= Math.pow(1000, foundIdx);
    }
    return val;
}

// --- Stat Processing ---
function processStat(statStr) {
    if (currentCapMode === "max") return statStr;

    // Pattern to match "x[number][suffix]" or "x+[number][suffix]"
    // e.g. "x320 Slime", "x4T Luck", "x+15 Rune Bulk"
    return statStr.replace(/x(\+?)\s*([\d.kMBTQn]+)/i, (match, plus, numPart) => {
        // We need to capture the full number+suffix to parse correctly
        // But regex above splits them. simpler approach: separate prefix from rest

        let prefix = "x" + (plus || "");
        let rest = statStr.substring(prefix.length).trim();
        // find where the number ends
        let numberMatch = rest.match(/^([\d.]+\s*[a-z]*)/i);

        if (numberMatch) {
            let valStr = numberMatch[1];
            let rawVal = parseSuffix(valStr);
            let newVal = rawVal / 4;
            let formattedStr = formatSuffix(newVal);
            return prefix + formattedStr;
        }
        return match;
    });
}

function getActiveVals(containerId) {
    return [...document.querySelectorAll(`#${containerId} .multiChip.active`)].map(c => c.dataset.val);
}

function getRuneClass(runeName, category) {
    const r = norm(runeName);
    return 'rune-' + r.replace(/\s+/g, '-');
}

function renderNormal(all) {
    const runePicks = getActiveVals("runeChips");
    const worldPicks = getActiveVals("worldChips");
    const statsSearch = norm($("#statsSearch").value);

    // Filter using original stats to ensure searching works on base values if desired, 
    // OR filter on processed values. Let's filter on processed values so search matches what user sees.

    const processedAll = all.map(r => ({
        ...r,
        displayStats: (r.stats || []).map(processStat)
    }));

    const filtered = processedAll.filter(r => {
        const okCat = runePicks.includes("__all") || runePicks.includes(r.world);
        const okWorld = worldPicks.includes("__all") || worldPicks.includes(String(r.worldNo || ""));
        const searchPool = norm(`${r.rune} ${r.displayStats.join(" ")}`);
        const okStats = !statsSearch || searchPool.includes(statsSearch);
        return okCat && okWorld && okStats;
    });

    $("#countRunes").textContent = String(all.length);

    const rowsEl = $("#runeRows");
    rowsEl.innerHTML = "";

    if (!filtered.length) {
        rowsEl.innerHTML = `<div class="emptyBox">No matches.</div>`;
        return;
    }

    rowsEl.innerHTML = filtered.map((r, idx) => `
    <div class="row" style="animation-delay: ${idx * 0.005}s">
        <div><span class="chip">${esc(r.world || "—")}</span></div>
        <div class="rname"><span class="rune-grad ${getRuneClass(r.rune, r.world)}">${esc(r.rune)}</span></div>
        <div class="stats">${r.displayStats.map(s => `<span class="pillStat">${esc(s)}</span>`).join("")}</div>
    </div>
    `).join("");
}

function renderEvents(all) {
    const eventPicks = getActiveVals("eventChips");
    const sq = norm($("#eventStatsSearch").value);

    const processedAll = all.map(e => ({
        ...e,
        displayStats: (e.stats || []).map(processStat)
    }));

    const filtered = processedAll.filter(e => {
        const okEvent = eventPicks.includes("__all") || eventPicks.includes(e.event);
        const searchPool = norm(`${e.rune} ${e.displayStats.join(" ")}`);
        const okStat = !sq || searchPool.includes(sq);
        return okEvent && okStat;
    });

    $("#countEvents").textContent = String(all.length);

    const rowsEl = $("#eventRows");
    if (!filtered.length) {
        rowsEl.innerHTML = `<div class="emptyBox">No matches.</div>`;
        return;
    }

    rowsEl.innerHTML = filtered.map((e, idx) => {
        const cleanEvent = esc(e.event.replace(/\s*World\s*\d+\s*/gi, "").trim());
        let worldInfo = "";
        if (e.event.toLowerCase().includes("world 2")) {
            worldInfo = `<div class="worldNote">This rune is in Snow World</div>`;
        } else if (e.event.toLowerCase().includes("world 1")) {
            worldInfo = `<div class="worldNote">This rune is in Spawn World</div>`;
        } else if (e.event.toLowerCase().includes("world 3")) {
            worldInfo = `<div class="worldNote">This rune is in Galactic World</div>`;
        }

        return `
        <div class="row rowEvents" style="animation-delay: ${idx * 0.005}s">
        <div><span class="chip">${cleanEvent}</span></div>
        <div class="rname">
            <span class="rune-grad ${getRuneClass(e.rune, e.event)}">${esc(e.rune)}</span>
            ${worldInfo}
        </div>
        <div class="stats">${e.displayStats.map(s => `<span class="pillStat">${esc(s)}</span>`).join("")}</div>
        </div>
    `;
    }).join("");
}

// ... (Suffix alias and formatDuration functions remain similar but simplified above) ...
// (I am including them in the top Suffix Handling section for completeness)

function formatDuration(s) {
    if (s === Infinity || isNaN(s)) return "—";
    if (s === 0) return "Instant";
    if (s < 1) return "< 1s";

    const years = Math.floor(s / 31536000);
    const days = Math.floor((s % 31536000) / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = Math.floor(s % 60);

    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.slice(0, 3).join(" ");
}

function renderDropCalc() {
    const rpsStr = $("#calcRPS").value;
    const rps = parseSuffix(rpsStr);
    const luckStr = $("#calcLuck").value;
    const luck = parseSuffix(luckStr) || 1;
    const targetStr = $("#calcTarget").value;
    const targetVal = parseSuffix(targetStr);
    const selectedRuneName = $("#calcRuneSearch").value;
    const area = $("#dropCalcResultArea");

    if (!selectedRuneName || rps <= 0) {
        area.innerHTML = `
        <div class="emptyBox" style="padding: 40px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 20px;">
        Select a rune and enter your RPS to see the estimated time.
        </div>`;
        return;
    }

    const all = [...OMEGA_DATA.normalRunes, ...OMEGA_DATA.eventRunes];
    const rune = all.find(r => r.rune.toLowerCase() === selectedRuneName.toLowerCase());
    if (!rune || !rune.chance) {
        area.innerHTML = `
        <div class="emptyBox" style="padding: 40px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 20px;">
        Rune not found. Please select from the dropdown.
        </div>`;
        return;
    }

    const baseChanceStr = rune.chance.split("/")[1] || "1";
    const baseChanceValue = parseSuffix(baseChanceStr);
    const secondsToGet = (baseChanceValue / luck) / rps;
    const formatted = formatDuration(secondsToGet);
    const successesPerSec = (rps * luck) / baseChanceValue;
    const earnedIn20m = successesPerSec * 1200;
    let timeToTarget = "—";
    if (targetVal > 0 && successesPerSec > 0) timeToTarget = formatDuration(targetVal / successesPerSec);

    area.innerHTML = `
    <div class="card" style="padding: 30px; margin-top: 20px; text-align: center; background: rgba(124, 77, 255, 0.1); border-color: rgba(124, 77, 255, 0.3); animation: paneIn 0.4s ease-out;">
        <div class="fieldLabel" style="margin-bottom: 10px;">Estimated Average Time</div>
        <div style="font-size: 44px; font-weight: 900; color: #fff; text-shadow: 0 0 30px rgba(124, 77, 255, 0.4); overflow-wrap: break-word;">${esc(formatted)}</div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 25px;">
        <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="fieldLabel" style="font-size: 9px; margin-bottom: 4px; opacity: 0.6;">Avg Openings to Get</div>
            <div style="font-size: 15px; font-weight: 700; color: #fff;">${esc(formatSuffix(baseChanceValue / luck))}</div>
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="fieldLabel" style="font-size: 9px; margin-bottom: 4px; opacity: 0.6;">Successes Per Sec</div>
            <div style="font-size: 15px; font-weight: 700; color: #fff;">${esc(formatSuffix(successesPerSec))}</div>
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="fieldLabel" style="font-size: 9px; margin-bottom: 4px; opacity: 0.6;">Earned in 20m (Est.)</div>
            <div style="font-size: 15px; font-weight: 700; color: #fff;">${esc(formatSuffix(earnedIn20m))}</div>
        </div>
        <div style="background: rgba(124, 77, 255, 0.05); padding: 12px; border-radius: 12px; border: 1px solid rgba(124, 77, 255, 0.2);">
            <div class="fieldLabel" style="font-size: 9px; margin-bottom: 4px; color: #7c4dff;">Time to Target</div>
            <div style="font-size: 15px; font-weight: 800; color: #fff;">${esc(timeToTarget)}</div>
        </div>
        </div>

        <p class="muted" style="margin-top: 20px; font-size: 12px;">
        For <strong class="rune-grad ${getRuneClass(rune.rune, rune.world || rune.event)}">${esc(rune.rune)}</strong> (1/${esc(baseChanceStr)})
        </p>
    </div>
    `;
}

function renderGrind(q) {
    const root = $("#grindResultArea");
    const query = q.trim();
    if (!query || isNaN(query) || Number(query) <= 0) {
        root.innerHTML = `<div class="emptyBox" style="padding: 40px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 20px;">Type your Rune Clone count above to calculate the required RPS.</div>`;
        return;
    }
    const clones = Number(query);
    const rpsValue = clones * 35.625 * 1e21; // Sx is 10^21
    const formatted = formatSuffix(rpsValue);
    root.innerHTML = `
    <div class="card" style="padding: 30px; margin-top: 20px; text-align: center; background: rgba(124, 77, 255, 0.1); border-color: rgba(124, 77, 255, 0.3); animation: paneIn 0.4s ease-out;">
        <div class="fieldLabel" style="margin-bottom: 10px;">Calculated RPS</div>
        <div style="font-size: 44px; font-weight: 900; color: #fff; text-shadow: 0 0 30px rgba(124, 77, 255, 0.4); overflow-wrap: break-word;">${esc(formatted)}</div>
        <div class="muted" style="margin-top: 15px; font-size: 14px;">Formula: ${clones} × 35.625Sx</div>
    </div>
    `;
}

function renderUtility(normal, events) {
    const target = $("#utilityArea");
    const utilityStats = ["Speed", "Bulk", "Rune Luck"];
    const results = { "Speed": {}, "Bulk": {}, "Rune Luck": {} };

    const all = [
        ...normal.map(r => ({ ...r, label: r.world })),
        ...events.map(e => ({ ...e, label: e.event.replace(/\s*World\s*\d+\s*/gi, "").trim() }))
    ];

    all.forEach(r => {
        (r.stats || []).forEach(statLine => {
            utilityStats.forEach(s => {
                if (statLine.toLowerCase().includes(s.toLowerCase())) {
                    if (!results[s][r.label]) results[s][r.label] = [];
                    // Note: Utility pane also needs to respect the cap mode ideally, 
                    // but for now we list the raw stat or processed items?
                    // Let's show processed stats in utility too.
                    results[s][r.label].push({ name: r.rune, val: processStat(statLine) });
                }
            });
        });
    });

    target.innerHTML = utilityStats.map(s => {
        const categories = Object.keys(results[s]).sort();
        const content = categories.map(cat => `
        <div style="margin-bottom: 20px;">
        <div class="fieldLabel" style="color: #448aff; margin-bottom: 8px;">${esc(cat)}</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
            ${results[s][cat].map(item => `
                <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  <span class="mono rune-grad ${getRuneClass(item.name, cat)}" style="color: #fff;">${esc(item.name)}</span>
                  <span class="pillStat" style="margin: 0; font-size: 12px; background: rgba(124, 77, 255, 0.2);">${esc(item.val)}</span>
                </div>
            `).join("")}
        </div>
        </div>
    `).join("");

        return `
        <div class="tutSection">
        <h3 class="h3">${s} Runes</h3>
        <p class="muted" style="margin-bottom: 20px;">Detailed list of runes providing ${s} (Adjusted for ${currentCapMode === 'reborn5' ? 'Reborn 5' : 'Max Cap'}):</p>
        ${content || '<div class="muted">No runes found for this stat.</div>'}
        </div>
    `;
    }).join("");
}

function renderChangelog(logs) {
    const area = $("#changelogArea");
    if (!logs || !logs.length) {
        area.innerHTML = `<div class="emptyBox">No changelog data found.</div>`;
        return;
    }

    area.innerHTML = logs.map((log, idx) => `
    <div class="changelogItem" style="animation-delay: ${idx * 0.1}s">
        <div style="display:flex; align-items:center;">
             <span class="versionTag">${esc(log.version)}</span>
             <span class="chDate">${esc(log.date)}</span>
        </div>
        <ul class="chList">
            ${(log.changes || []).map(c => `<li>${esc(c)}</li>`).join("")}
        </ul>
    </div>
    `).join("");
}

function renderFeedbackList(items) {
    const list = $("#feedbackList");
    if (!items || !items.length) {
        list.innerHTML = `<div class="emptyBox">No feedback yet. Be the first!</div>`;
        return;
    }

    list.innerHTML = items.slice().reverse().map((f, idx) => `
    <div class="fbItem" style="animation-delay: ${idx * 0.05}s">
        <div class="fbHeader">
            <span style="color: #448aff; font-weight:700;">${esc(f.user)}</span>
            <span>${esc(f.date)}</span>
        </div>
        <div class="fbText">${esc(f.text)}</div>
    </div>
    `).join("");
}

function handleFeedbackSubmit() {
    const text = $("#feedbackText").value.trim();
    if (!text) return;

    const newEntry = {
        user: "User", // We could add a name field if needed
        text: text,
        date: new Date().toISOString()
    };

    // Save to LocalStorage
    const STORAGE_KEY = 'OMEGA_FEEDBACK_V2';
    try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        existing.push(newEntry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
        console.error("Storage limit or error", e);
    }

    $("#feedbackText").value = "";
    alert("Feedback saved locally! (Moderators can view it in mod.html)");
}

function downloadFeedback() {
    const STORAGE_KEY = 'OMEGA_FEEDBACK_V2';
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const staticData = OMEGA_DATA.feedback || [];

    const allItems = [...staticData, ...localData]; // Combine both

    if (allItems.length === 0) return alert("No feedback to download.");

    const text = allItems.map(i => `[${i.date}] ${i.user}: ${i.text}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "omega_feedback.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// --- Init ---
function wireTabs() {
    // Select only button elements with navBtn class to avoid links
    const navBtns = document.querySelectorAll("button.navBtn");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.dataset.tab;
            if (!tabId) return;

            // 1. Deactivate all
            navBtns.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tabpane").forEach(p => p.classList.remove("active"));

            // 2. Activate clicked
            btn.classList.add("active");
            const targetPane = document.getElementById("tab-" + tabId);
            if (targetPane) {
                targetPane.classList.add("active");
                // Scroll to top of content
                const mainContent = document.querySelector('.main-content');
                if (mainContent) mainContent.scrollTop = 0;
            } else {
                console.warn(`Tab pane #tab-${tabId} not found`);
            }
        });
    });
}

function setupChipGroup(id, values, onChange, labelMapper = null) {
    const group = $(id);
    values.forEach(val => {
        const chip = document.createElement("div");
        chip.className = "multiChip";
        chip.dataset.val = val;
        chip.textContent = labelMapper ? labelMapper(val) : val;
        group.appendChild(chip);
    });

    group.addEventListener("click", e => {
        const chip = e.target.closest(".multiChip");
        if (!chip) return;

        const val = chip.dataset.val;
        const allBtn = group.querySelector('[data-val="__all"]');

        if (val === "__all") {
            group.querySelectorAll(".multiChip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
        } else {
            allBtn.classList.remove("active");
            chip.classList.toggle("active");
            if (!group.querySelector(".multiChip.active")) {
                allBtn.classList.add("active");
            }
        }
        onChange();
    });
}

async function init() {
    wireTabs();

    if (typeof OMEGA_DATA === 'undefined') {
        throw new Error("Missing assets/data.js or OMEGA_DATA is not defined");
    }

    const data = OMEGA_DATA;
    console.log("JS Version: 5");
    console.log("Changelog Data present:", !!data.changelog);

    const normal = Array.isArray(data.normalRunes) ? data.normalRunes : [];
    const events = Array.isArray(data.eventRunes) ? data.eventRunes : [];

    setupChipGroup("#runeChips", [...new Set(normal.map(r => r.world))], () => renderNormal(normal));
    setupChipGroup("#worldChips", [...new Set(normal.map(r => String(r.worldNo || "")).filter(Boolean))].sort(), () => renderNormal(normal));
    setupChipGroup("#eventChips", [...new Set(events.map(e => e.event))], () => renderEvents(events), (val) => val.replace(/\s*World\s*\d+\s*/gi, "").trim());

    // --- Rune Cap Toggle ---
    const toggleBtns = document.querySelectorAll(".toggleBtn");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCapMode = btn.dataset.cap;

            // Re-render everything affected by caps
            renderNormal(normal);
            renderEvents(events);
            renderUtility(normal, events);
        });
    });

    renderNormal(normal);
    renderEvents(events);
    renderGrind("");
    renderUtility(normal, events);
    renderChangelog(data.changelog);
    renderFeedbackList(data.feedback);

    // Feedback events
    $("#submitFeedback").addEventListener("click", handleFeedbackSubmit);
    $("#downloadFeedback").addEventListener("click", downloadFeedback);

    // Custom Dropdown Logic
    const runeSearchInput = $("#calcRuneSearch");
    const runeList = $("#calcRuneList");
    const allRunes = [...normal, ...events].sort((a, b) => a.rune.localeCompare(b.rune));

    function updateRuneList(filter = "") {
        const query = filter.toLowerCase();
        const filtered = allRunes.filter(r => r.rune.toLowerCase().includes(query));

        runeList.innerHTML = filtered.map(r => `
        <li class="dropItem" data-name="${esc(r.rune)}">
        <span class="rune-grad ${getRuneClass(r.rune, r.world || r.event)}">${esc(r.rune)}</span>
        <span class="itemChance">${esc(r.chance)}</span>
        </li>
    `).join("");
    }

    runeSearchInput.addEventListener("focus", () => {
        updateRuneList(runeSearchInput.value);
        runeList.classList.add("active");
    });

    runeSearchInput.addEventListener("blur", () => {
        setTimeout(() => runeList.classList.remove("active"), 200);
    });

    runeSearchInput.addEventListener("input", () => {
        updateRuneList(runeSearchInput.value);
        renderDropCalc();
    });

    runeList.addEventListener("click", e => {
        const item = e.target.closest(".dropItem");
        if (item) {
            runeSearchInput.value = item.dataset.name;
            runeList.classList.remove("active");
            renderDropCalc();
        }
    });

    $("#calcRPS").addEventListener("input", renderDropCalc);
    $("#calcLuck").addEventListener("input", renderDropCalc);
    $("#calcTarget").addEventListener("input", renderDropCalc);
    $("#clearDropCalc").addEventListener("click", () => {
        $("#calcRPS").value = "";
        $("#calcLuck").value = "";
        $("#calcTarget").value = "";
        $("#calcRuneSearch").value = "";
        renderDropCalc();
    });

    $("#statsSearch").addEventListener("input", () => renderNormal(normal));
    $("#clearRunes").addEventListener("click", () => {
        $("#runeChips").querySelectorAll(".multiChip").forEach(c => c.classList.toggle("active", c.dataset.val === "__all"));
        $("#worldChips").querySelectorAll(".multiChip").forEach(c => c.classList.toggle("active", c.dataset.val === "__all"));
        $("#statsSearch").value = "";
        renderNormal(normal);
    });

    $("#eventStatsSearch").addEventListener("input", () => renderEvents(events));
    $("#clearEvents").addEventListener("click", () => {
        $("#eventChips").querySelectorAll(".multiChip").forEach(c => c.classList.toggle("active", c.dataset.val === "__all"));
        $("#eventStatsSearch").value = "";
        renderEvents(events);
    });

    $("#grindSearch").addEventListener("input", () => renderGrind($("#grindSearch").value));
    $("#clearGrind").addEventListener("click", () => {
        $("#grindSearch").value = "";
        renderGrind("");
    });

    // Initialize Firebase features
    initFirebaseFeatures();

    // Load Roblox Avatars
    loadRobloxAvatars();
}

function loadRobloxAvatars() {
    const users = [
        { id: 1408344502, el: document.querySelector('.roprofile[href*="1408344502"] img') },
        { id: 644143396, el: document.querySelector('.roprofile[href*="644143396"] img') }
    ];

    const ids = users.map(u => u.id).join(",");
    // Use Roblox Thumbnails API
    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ids}&size=150x150&format=Png&isCircular=false`)
        .then(res => res.json())
        .then(data => {
            if (data.data && Array.isArray(data.data)) {
                data.data.forEach(item => {
                    const target = users.find(u => u.id === item.targetId);
                    if (target && target.el && item.state === "Completed") {
                        target.el.src = item.imageUrl;
                    }
                });
            }
        })
        .catch(e => console.warn("Failed to load avatars", e));
}

let db = null;

function initFirebaseFeatures() {
    // --- 1. CONFIGURATION ---
    // PASTE YOUR FIREBASE CONFIG HERE
    const firebaseConfig = {
        apiKey: atob("QUl6YVN5Q2RyUGpmVkN1dXhQbEJKWmpQalZvT0VPV0VwUWk3ZmxN"),
        authDomain: "or2-website.firebaseapp.com",
        projectId: "or2-website",
        storageBucket: "or2-website.firebasestorage.app",
        messagingSenderId: "600553286698",
        appId: "1:600553286698:web:e20be6c4f43132c2f4a753",
        appId: "1:600553286698:web:e20be6c4f43132c2f4a753",
        measurementId: "G-2NGK5BQE55",
        databaseURL: "https://or2-website-default-rtdb.europe-west1.firebasedatabase.app"
    };
    // ------------------------

    if (!firebaseConfig.databaseURL) {
        console.warn("Firebase config missing! Using simulated counters.");
        initActiveUsersSimulated(); // Fallback
        return;
    }

    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();

        // Start real features
        initRealtimeUserCount();
        initRealtimeFeedback();

    } catch (e) {
        console.error("Firebase Init Error:", e);
        // alert("Firebase Error: " + e.message); // Debugging removed
        initActiveUsersSimulated();
    }
}

// --- Realtime Active Users ---
function initRealtimeUserCount() {
    const el = $("#activeUserCount");
    const presenceRef = db.ref("status");

    // We generate a random ID for this session
    const myId = presenceRef.push().key;
    const myRef = db.ref(`status/${myId}`);
    const connectedRef = db.ref(".info/connected");

    connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
            // We're connected!
            myRef.onDisconnect().remove();
            myRef.set(true); // I am online
        } else {
            console.warn("Firebase: Not connected");
        }
    });

    // Count how many keys are in /status
    presenceRef.on("value", (snap) => {
        const count = snap.numChildren();
        if (el) el.textContent = count;
    }, (error) => {
        console.error("Presence Read Error:", error);
    });
}

// --- Realtime Feedback ---
function initRealtimeFeedback() {
    const feedbackRef = db.ref("feedback");

    // Init Dropdown Logic
    initCustomDropdown();

    // Listen for new feedback (load last 50)
    feedbackRef.limitToLast(50).on("value", (snap) => {
        const data = [];
        snap.forEach(child => {
            data.unshift(child.val()); // Add to front (newest first)
        });

        // Update global data source so download works
        OMEGA_DATA.feedback = data;

        // Only re-render if we are on the feedback tab to avoid lag
        if (document.getElementById("tab-feedback").classList.contains("active")) {
            renderFeedbackList(data);
        }
    }, (error) => {
        console.error("Feedback Error:", error);
    });
}

function initCustomDropdown() {
    const dd = document.getElementById('catDropdown');
    if (!dd) return;

    const selected = dd.querySelector('.selected-option');
    const options = dd.querySelector('.dropdown-options');
    const items = dd.querySelectorAll('.d-option');

    // Toggle
    dd.addEventListener('click', (e) => {
        // Close if clicking outside logic handled globally or just simple toggle here
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dd.contains(e.target)) {
            options.style.display = 'none';
        }
    });

    // Selection
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling causing immediate close/open issues
            const val = item.getAttribute('data-value');
            const txt = item.textContent;

            selected.setAttribute('data-value', val);
            selected.querySelector('span').textContent = txt;

            options.style.display = 'none';
        });
    });
}

// Override Submit for Firebase
function handleFeedbackSubmit() {
    const text = $("#feedbackText").value.trim();
    // Get value from custom dropdown
    const ddSelected = document.querySelector('#catDropdown .selected-option');
    const category = ddSelected ? ddSelected.getAttribute('data-value') : "General";

    if (!text) return;

    if (!db) {
        alert("Firebase not configured! Check console.");
        return;
    }

    const newEntry = {
        user: "User",
        text: text,
        category: category,
        date: new Date().toISOString()
    };

    // Push to Firebase
    db.ref("feedback").push(newEntry)
        .then(() => {
            $("#feedbackText").value = "";
            alert("Feedback (" + category + ") sent to cloud database!");
        })
        .catch(e => alert("Error sending: " + e.message));
}


// --- Fallback Simulation ---
function initActiveUsersSimulated() {
    const el = $("#activeUserCount");
    if (!el) return;

    // Simulate active users between 120 and 450
    let count = Math.floor(Math.random() * (450 - 120 + 1)) + 120;
    el.textContent = count;

    setInterval(() => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        count = Math.max(100, count + change);
        el.textContent = count;
    }, 4000);
}

init().catch(err => {
    console.error(err);
    $("#runeRows").innerHTML = `<div class="emptyBox">Error: ${err.message}</div>`;
});
