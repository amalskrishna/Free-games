/* ── SteaLit · script.js ───────────────────────────────────── */

let allGames   = [];   // full dataset after API filter
let activeChip = 'all'; // current platform filter

/* ── Helpers ────────────────────────────────────────────────── */
function getDaysLeft(dateString) {
    if (!dateString || dateString === 'N/A') return null;
    const end   = new Date(dateString);
    const today = new Date();
    if (isNaN(end.getTime())) return null;
    const diff  = end - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatEndDate(dateString) {
    if (!dateString || dateString === 'N/A') return 'No end date';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getBannerConfig(days) {
    if (days === null)  return { cls: 'unknown', label: 'Ongoing' };
    if (days <= 0)      return { cls: 'urgent',  label: 'Ends today' };
    if (days === 1)     return { cls: 'urgent',  label: '1 day left' };
    if (days <= 3)      return { cls: 'urgent',  label: `${days} days left` };
    if (days <= 7)      return { cls: 'warning', label: `${days} days left` };
    return               { cls: 'safe',    label: `${days} days left` };
}

function getPlatformShort(platforms) {
    const p = platforms.toLowerCase();
    const tags = [];
    if (p.includes('steam'))      tags.push('Steam');
    if (p.includes('epic games')) tags.push('Epic');
    return tags.join(' · ') || platforms;
}

/* ── Render ─────────────────────────────────────────────────── */
function buildCard(game, index) {
    const days        = getDaysLeft(game.end_date);
    const banner      = getBannerConfig(days);
    const platShort   = getPlatformShort(game.platforms);
    const endFormatted = formatEndDate(game.end_date);

    const worth = (game.worth && game.worth !== 'N/A' && game.worth !== '$0.00')
        ? `Free  <span style="text-decoration:line-through;opacity:.55;font-weight:300">${game.worth}</span>`
        : 'Free';

    const delay = Math.min(index * 40, 600); // stagger, capped at 600 ms

    return `
    <div class="card" style="animation-delay:${delay}ms" onclick="window.open('${game.open_giveaway_url}','_blank')">
        <div class="imgcont">
            <img src="${game.image}" alt="${game.title}" loading="lazy" />
            <div class="banner ${banner.cls}">${banner.label}</div>
            <div class="platform-badge">${platShort}</div>
        </div>
        <div class="card-body">
            <h2 class="card-title">${game.title}</h2>
            <div class="card-meta">
                <p class="card-worth">${worth}</p>
                <p><strong>Ends</strong> ${endFormatted}</p>
            </div>
            <div class="card-footer">
                <a class="claim-btn" href="${game.open_giveaway_url}" target="_blank"
                   onclick="event.stopPropagation()">Claim Free →</a>
            </div>
        </div>
    </div>`;
}

function renderGames(games) {
    const container  = document.getElementById('games');
    const emptyState = document.getElementById('empty-state');
    const countEl    = document.getElementById('result-count');

    if (games.length === 0) {
        container.style.display  = 'none';
        emptyState.style.display = 'block';
        countEl.textContent = '0 giveaways found';
        return;
    }

    emptyState.style.display = 'none';
    container.style.display  = 'grid';

    container.innerHTML = games.map((g, i) => buildCard(g, i)).join('');

    const noun = games.length === 1 ? 'giveaway' : 'giveaways';
    countEl.textContent = `${games.length} ${noun} available`;
}

/* ── Filter logic ───────────────────────────────────────────── */
function applyFilters() {
    const query = document.getElementById('search').value.trim().toLowerCase();

    const filtered = allGames.filter(game => {
        // Platform chip
        const plat = game.platforms.toLowerCase();
        if (activeChip === 'steam'      && !plat.includes('steam'))      return false;
        if (activeChip === 'epic'       && !plat.includes('epic games')) return false;

        // Search query
        if (query && !game.title.toLowerCase().includes(query)) return false;

        return true;
    });

    renderGames(filtered);
}

/* ── Fetch & bootstrap ──────────────────────────────────────── */
async function loadData() {
    try {
        const response = await fetch('https://www.gamerpower.com/api/giveaways');
        const data     = await response.json();

        // Keep only Steam / Epic Games actual games
        allGames = data.filter(game => {
            const plat = game.platforms.toLowerCase();
            const onTarget = plat.includes('steam') || plat.includes('epic games');
            const isGame   = game.type.toLowerCase() === 'game';
            return onTarget && isGame;
        });

        // Sort: soonest-ending first, unknowns last
        allGames.sort((a, b) => {
            const da = getDaysLeft(a.end_date);
            const db = getDaysLeft(b.end_date);
            if (da === null && db === null) return 0;
            if (da === null) return 1;
            if (db === null) return -1;
            return da - db;
        });

        // Hide skeleton, show real grid
        document.getElementById('skeleton-grid').style.display = 'none';
        document.getElementById('games').style.display = 'grid';

        applyFilters(); // initial render

    } catch (err) {
        console.error('Failed to load giveaways:', err);
        document.getElementById('skeleton-grid').style.display = 'none';
        document.getElementById('result-count').textContent = 'Could not load giveaways. Try refreshing.';
    }
}

/* ── Event listeners ────────────────────────────────────────── */
document.getElementById('search').addEventListener('input', applyFilters);

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeChip = chip.dataset.filter;
        applyFilters();
    });
});

/* ── Init ───────────────────────────────────────────────────── */
loadData();
