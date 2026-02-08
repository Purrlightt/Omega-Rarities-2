const $ = (s) => document.querySelector(s);
const norm = (s) => (s ?? "").toString().toLowerCase().trim();
const esc = (s) => (s ?? "").toString().replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
}[m]));

function getActiveVals(containerId) {
    return [...document.querySelectorAll(`#${containerId} .multiChip.active`)].map(c => c.dataset.val);
}

function renderNormal(all) {
    const runePicks = getActiveVals("runeChips");
    const worldPicks = getActiveVals("worldChips");
    const statsSearch = norm($("#statsSearch").value);

    const filtered = all.filter(r => {
    const okCat = runePicks.includes("__all") || runePicks.includes(r.world);
    const okWorld = worldPicks.includes("__all") || worldPicks.includes(String(r.worldNo || ""));
    const searchPool = norm(`${r.rune} ${(r.stats || []).join(" ")}`);
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
    <div class="row" style="animation-delay: ${idx * 0.02}s">
        <div><span class="chip">${esc(r.world || "—")}</span></div>
        <div class="rname">${esc(r.rune)}</div>
        <div class="stats">${(r.stats || []).map(s => `<span class="pillStat">${esc(s)}</span>`).join("")}</div>
    </div>
    `).join("");
}

function renderEvents(all) {
    const eventPicks = getActiveVals("eventChips");
    const sq = norm($("#eventStatsSearch").value);

    const filtered = all.filter(e => {
    const okEvent = eventPicks.includes("__all") || eventPicks.includes(e.event);
    const searchPool = norm(`${e.rune} ${(e.stats || []).join(" ")}`);
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
        <div class="row rowEvents" style="animation-delay: ${idx * 0.02}s">
        <div><span class="chip">${cleanEvent}</span></div>
        <div class="rname">${esc(e.rune)}${worldInfo}</div>
        <div class="stats">${(e.stats || []).map(s => `<span class="pillStat">${esc(s)}</span>`).join("")}</div>
        </div>
    `;
    }).join("");
}

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

// No aliases needed per user request
const SUFFIX_ALIASES = {};

function formatSuffix(num) {
    if (num === 0) return "0";
    let val = Math.abs(num);
    let sIdx = 0;

    if (val < 1 && val > 0) {
    // For sub-1 numbers, avoid scientific notation but keep reasonable decimals
    // Use toPrecision if it's very small, then convert back from scientific if needed
    let str = val.toFixed(10).replace(/\.?0+$/, "");
    if (str === "0") {
        // If it's still 0 after 10 decimals, use scientific as last resort or more decimals
        return val.toExponential(2);
    }
    return (num < 0 ? "-" : "") + str;
    }

    while (val >= 1000 && sIdx < ALL_SUFFIXES.length - 1) {
    val /= 1000;
    sIdx++;
    }

    // Ensure we don't return scientific for the scaled number
    let formatted = val.toFixed(3).replace(/\.?0+$/, "");
    return (num < 0 ? "-" : "") + formatted + ALL_SUFFIXES[sIdx];
}

function parseSuffix(valStr) {
    if (!valStr || valStr.toString().trim() === "") return 0;
    const match = valStr.toString().trim().match(/^([\d.e+-]+)\s*([a-z]+)?$/i);
    if (!match) return 0;
    let val = parseFloat(match[1]);
    let suf = match[2] ? match[2].toLowerCase() : '';
    if (suf) {
    // Check aliases first
    if (SUFFIX_ALIASES[suf]) suf = SUFFIX_ALIASES[suf].toLowerCase();

    const foundIdx = ALL_SUFFIXES.findIndex(s => s.toLowerCase() === suf);
    if (foundIdx > 0) val *= Math.pow(1000, foundIdx);
    }
    return val;
}

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

    // Formula: Time = (Base Chance / Luck) / RPS
    const secondsToGet = (baseChanceValue / luck) / rps;
    const formatted = formatDuration(secondsToGet);

    // Successes per second: (RPS * Luck) / BaseChance
    const successesPerSec = (rps * luck) / baseChanceValue;
    const earnedIn20m = successesPerSec * 1200;

    let timeToTarget = "—";
    if (targetVal > 0 && successesPerSec > 0) {
    timeToTarget = formatDuration(targetVal / successesPerSec);
    }

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
        For <strong>${esc(rune.rune)}</strong> (1/${esc(baseChanceStr)})
        </p>
    </div>
    `;
}

function renderGrind(q) {
    const root = $("#grindResultArea");
    const query = q.trim();

    if (!query || isNaN(query) || Number(query) <= 0) {
    root.innerHTML = `
        <div class="emptyBox" style="padding: 40px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 20px;">
        Type your Rune Clone count above to calculate the required RPS.
        </div>`;
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
            results[s][r.label].push({ name: r.rune, val: statLine });
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
                <span class="mono" style="color: #fff;">${esc(item.name)}</span>
                <span class="pillStat" style="margin: 0; font-size: 12px; background: rgba(124, 77, 255, 0.2);">${esc(item.val)}</span>
            </div>
            `).join("")}
        </div>
        </div>
    `).join("");

    return `
        <div class="tutSection">
        <h3 class="h3">${s} Runes</h3>
        <p class="muted" style="margin-bottom: 20px;">Detailed list of runes providing ${s}:</p>
        ${content || '<div class="muted">No runes found for this stat.</div>'}
        </div>
    `;
    }).join("");
}

function moveIndicator(btn, isLongJump = false) {
    const ind = $("#tabIndicator");
    if (!ind || !btn) return;

    // "Train Stop" physics: Extreme Quintic-Out for long travel
    if (isLongJump) {
    ind.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
    ind.style.transitionDuration = "0.9s";
    } else {
    ind.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
    ind.style.transitionDuration = "0.35s";
    }

    // High-precision positioning
    requestAnimationFrame(() => {
    ind.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
    ind.style.width = `${btn.offsetWidth}px`;
    });
}

function wireTabs() {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    let currentIndex = tabs.findIndex(t => t.classList.contains("active"));

    tabs.forEach((btn, targetIndex) => {
    btn.addEventListener("click", () => {
        const distance = Math.abs(targetIndex - currentIndex);
        const isLongJump = distance > 1;

        tabs.forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tabpane").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");

        moveIndicator(btn, isLongJump);
        currentIndex = targetIndex;
    });
    });

    // Handle window resizing to keep indicator aligned
    window.addEventListener('resize', () => {
    const active = $(".tab.active");
    if (active) {
        const ind = $("#tabIndicator");
        ind.style.transition = 'none'; // Instant move on resize
        moveIndicator(active);
        setTimeout(() => ind.style.transition = '', 50);
    }
    });

    // Handle font-loading shifts
    document.fonts?.ready?.then(() => {
    const active = $(".tab.active");
    if (active) moveIndicator(active);
    });

    setTimeout(() => {
    const active = $(".tab.active");
    if (active) moveIndicator(active);
    }, 100);
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
    const normal = Array.isArray(data.normalRunes) ? data.normalRunes : [];
    const events = Array.isArray(data.eventRunes) ? data.eventRunes : [];

    // Setup Normal Runes Chips
    const worlds = [...new Set(normal.map(r => r.world))];
    setupChipGroup("#runeChips", worlds, () => renderNormal(normal));

    const worldNos = [...new Set(normal.map(r => String(r.worldNo || "")).filter(Boolean))].sort();
    setupChipGroup("#worldChips", worldNos, () => renderNormal(normal));

    // Setup Event Chips
    const uniqueEvents = [...new Set(events.map(e => e.event))];
    setupChipGroup("#eventChips", uniqueEvents, () => renderEvents(events), (val) => val.replace(/\s*World\s*\d+\s*/gi, "").trim());

    renderNormal(normal);
    renderEvents(events);
    renderGrind("");
    renderUtility(normal, events);

    // Custom Dropdown Logic
    const runeSearchInput = $("#calcRuneSearch");
    const runeList = $("#calcRuneList");
    const allRunes = [...normal, ...events].sort((a, b) => a.rune.localeCompare(b.rune));

    function updateRuneList(filter = "") {
    const query = filter.toLowerCase();
    const filtered = allRunes.filter(r => r.rune.toLowerCase().includes(query));

    runeList.innerHTML = filtered.map(r => `
        <li class="dropItem" data-name="${esc(r.rune)}">
        <span>${esc(r.rune)}</span>
        <span class="itemChance">${esc(r.chance)}</span>
        </li>
    `).join("");
    }

    runeSearchInput.addEventListener("focus", () => {
    updateRuneList(runeSearchInput.value);
    runeList.classList.add("active");
    });

    runeSearchInput.addEventListener("blur", () => {
    // Delay to allow clicks to register on list items
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

    $("#countRunes").textContent = String(normal.length);
    $("#countEvents").textContent = String(events.length);
}

init().catch(err => {
    console.error(err);
    $("#runeRows").innerHTML = `<div class="emptyBox">Missing <span class="mono">assets/data.js</span> (OMEGA_DATA undefined).</div>`;
    $("#eventRows").innerHTML = `<div class="emptyBox">Missing <span class="mono">assets/data.js</span>.</div>`;
    $("#grindResultArea").innerHTML = `<div class="emptyBox">Missing <span class="mono">assets/data.js</span>.</div>`;
});