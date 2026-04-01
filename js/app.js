/* ============================================
   SQLクエスト - ゲームエンジン（全10話対応）
   ============================================ */

// ───── グローバル状態 ─────
let SQL = null;         // sql.js モジュール
let db = null;          // 現在のDBインスタンス
let currentEpisode = null;  // 現在のエピソードデータ
let currentMission = 0;     // 現在のミッションインデックス
let selectedChips = [];
let progress = {};      // { episode1: true, episode2: true, ... }

// ───── DOM要素キャッシュ ─────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    loadingScreen: $('#loading-screen'),
    loadingFill: $('.loading-bar-fill'),
    loadingText: $('.loading-text'),
    episodeSelect: $('#episode-select'),
    episodeList: $('#episode-list'),
    gameScreen: $('#game-screen'),
    backBtn: $('#back-btn'),
    epBadge: $('#ep-badge'),
    epTitle: $('#ep-title'),
    missionCounter: $('#mission-counter'),
    storyPortrait: $('#story-portrait'),
    storyText: $('#story-text'),
    missionText: $('#mission-text'),
    resultArea: $('#result-area'),
    resultStatus: $('#result-status'),
    resultRows: $('#result-rows'),
    resultTable: $('#result-table'),
    resultMessage: $('#result-message'),
    queryDisplay: $('#query-display'),
    clearBtn: $('#clear-btn'),
    chipContainer: $('#chip-container'),
    runBtn: $('#run-btn'),
    hintBtn: $('#hint-btn'),
    nextBtn: $('#next-btn'),
    clearScreen: $('#clear-screen'),
    clearSubtitle: $('#clear-subtitle'),
    clearSummary: $('#clear-summary'),
    replayBtn: $('#replay-btn'),
    toSelectBtn: $('#to-select-btn'),
};

// ───── 初期化 ─────
async function initApp() {
    updateLoadingProgress(10, 'sql.js を読み込み中...');

    try {
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });

        updateLoadingProgress(80, '準備完了！');
        loadProgress();

        setTimeout(() => {
            updateLoadingProgress(100, '');
            dom.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                dom.loadingScreen.classList.add('hidden');
                showEpisodeSelect();
            }, 500);
        }, 400);

    } catch (err) {
        updateLoadingProgress(0, 'エラー: ' + err.message);
        console.error('Init error:', err);
    }
}

function updateLoadingProgress(percent, text) {
    dom.loadingFill.style.width = percent + '%';
    dom.loadingText.textContent = text;
}

// ───── 進捗管理 ─────
function loadProgress() {
    try {
        const saved = localStorage.getItem('sqlquest_progress');
        if (saved) progress = JSON.parse(saved);
    } catch (e) { /* ignore */ }
}

function saveProgress() {
    try {
        localStorage.setItem('sqlquest_progress', JSON.stringify(progress));
    } catch (e) { /* ignore */ }
}

function isEpisodeCleared(epId) {
    return !!progress['episode' + epId];
}

function isEpisodeAvailable(epId) {
    if (epId === 1) return true;
    return isEpisodeCleared(epId - 1);
}

// ───── エピソード選択画面 ─────
function showEpisodeSelect() {
    dom.episodeSelect.classList.remove('hidden');
    dom.gameScreen.classList.add('hidden');
    dom.clearScreen.classList.add('hidden');
    renderEpisodeList();
}

function renderEpisodeList() {
    const sectionLabels = {
        1: '【初級編：はじめての捜査】',
        4: '【中級編：データの裏を読む】',
        7: '【上級編：真実へのチェックメイト】',
    };

    let html = '';

    EPISODES.forEach((ep) => {
        // セクションラベル
        if (sectionLabels[ep.id]) {
            html += `<div class="select-section-label">${sectionLabels[ep.id]}</div>`;
        }

        const cleared = isEpisodeCleared(ep.id);
        const available = isEpisodeAvailable(ep.id);
        let stateClass = 'locked';
        let statusLabel = '🔒';
        let statusClass = 'locked';

        if (cleared) {
            stateClass = 'cleared';
            statusLabel = '✅ クリア';
            statusClass = 'cleared';
        } else if (available) {
            stateClass = 'available';
            statusLabel = '▶ プレイ';
            statusClass = 'available';
        }

        html += `
            <div class="episode-card ${stateClass}" data-ep-id="${ep.id}">
                <div class="ep-number">${ep.id}</div>
                <div class="ep-info">
                    <div class="ep-info-title">${ep.title}</div>
                    <div class="ep-info-subtitle">${ep.subtitle}</div>
                </div>
                <span class="ep-status ${statusClass}">${statusLabel}</span>
            </div>
        `;
    });

    dom.episodeList.innerHTML = html;

    // クリック可能なカードにイベント設定
    dom.episodeList.querySelectorAll('.episode-card:not(.locked)').forEach(card => {
        card.addEventListener('click', () => {
            const epId = parseInt(card.dataset.epId);
            startEpisode(epId);
        });
    });
}

// ───── エピソード開始 ─────
async function startEpisode(epId) {
    const episode = EPISODES.find(e => e.id === epId);
    if (!episode) return;

    currentEpisode = episode;
    currentMission = 0;
    selectedChips = [];

    // DB初期化
    if (db) db.close();
    db = new SQL.Database();

    try {
        const response = await fetch(episode.sqlFile);
        const sqlText = await response.text();
        db.run(sqlText);
    } catch (err) {
        console.error('SQL load error:', err);
        return;
    }

    // 画面切り替え
    dom.episodeSelect.classList.add('hidden');
    dom.gameScreen.classList.remove('hidden');

    // ヘッダー設定
    dom.epBadge.textContent = 'EP.' + episode.id;
    dom.epTitle.textContent = episode.title;

    loadMission(0);
}

// ───── ミッション読み込み ─────
function loadMission(index) {
    currentMission = index;
    selectedChips = [];
    const missions = currentEpisode.missions;
    const mission = missions[index];

    // ヘッダー更新
    dom.missionCounter.textContent = `Mission ${index + 1}/${missions.length}`;

    // ストーリー
    dom.storyPortrait.textContent = mission.portrait;
    typeWriter(dom.storyText, mission.story, 20);

    // ミッション指示
    dom.missionText.textContent = mission.instruction;

    // 結果エリアを隠す
    dom.resultArea.classList.add('hidden');
    dom.resultMessage.classList.add('hidden');

    // クエリプレビューをリセット
    updateQueryPreview();

    // チップ生成
    renderChips(mission.chips);

    // ボタン状態
    dom.runBtn.disabled = true;
    dom.runBtn.classList.remove('hidden');
    dom.hintBtn.classList.remove('hidden');
    dom.nextBtn.classList.add('hidden');
    dom.clearBtn.classList.add('hidden');

    // 画面トップへスクロール
    window.scrollTo(0, 0);
}

// ───── タイプライター効果 ─────
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}

// ───── チップ描画 ─────
function renderChips(chips) {
    dom.chipContainer.innerHTML = '';
    const shuffled = [...chips].sort(() => Math.random() - 0.5);

    shuffled.forEach((chip, i) => {
        const el = document.createElement('button');
        el.className = 'chip';
        el.textContent = chip.text;
        el.dataset.type = chip.type;
        el.dataset.index = i;
        el.dataset.text = chip.text;
        el.addEventListener('click', () => toggleChip(el, chip));
        dom.chipContainer.appendChild(el);
    });
}

// ───── チップ選択/解除 ─────
function toggleChip(el, chip) {
    const idx = selectedChips.findIndex(c => c.el === el);

    if (idx >= 0) {
        selectedChips.splice(idx, 1);
        el.classList.remove('selected');
    } else {
        selectedChips.push({ el, text: chip.text, type: chip.type });
        el.classList.add('selected');
    }

    updateQueryPreview();
    dom.runBtn.disabled = selectedChips.length === 0;
    dom.clearBtn.classList.toggle('hidden', selectedChips.length === 0);
}

// ───── クエリプレビュー更新 ─────
function updateQueryPreview() {
    dom.queryDisplay.innerHTML = '';

    if (selectedChips.length === 0) {
        dom.queryDisplay.innerHTML = '<span class="query-placeholder">チップを選択してクエリを組み立てよう</span>';
        return;
    }

    selectedChips.forEach(chip => {
        const span = document.createElement('span');
        span.className = 'query-token';

        const typeClass = {
            keyword: 'keyword',
            table: 'table-name',
            column: 'column-name',
            operator: 'operator',
            value: 'value',
            symbol: '',
        }[chip.type] || '';

        if (typeClass) span.classList.add(typeClass);
        span.textContent = chip.text + ' ';
        dom.queryDisplay.appendChild(span);
    });
}

// ───── クエリ実行 ─────
function executeQuery() {
    const userQuery = selectedChips.map(c => c.text).join(' ');
    const mission = currentEpisode.missions[currentMission];

    try {
        const results = db.exec(userQuery);

        if (results.length === 0) {
            showResult([], [], false, '結果が0件でした。条件を見直してみましょう。');
            return;
        }

        const columns = results[0].columns;
        const values = results[0].values;

        const normalizeSQL = (s) => s
            .replace(/\s+/g, ' ')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ', ')
            .replace(/\s*=\s*/g, ' = ')
            .trim()
            .toLowerCase();

        const isCorrect = normalizeSQL(userQuery) === normalizeSQL(mission.answer);

        if (isCorrect) {
            showResult(columns, values, true, mission.successMessage, mission.highlightRows);

            dom.runBtn.classList.add('hidden');
            dom.hintBtn.classList.add('hidden');
            dom.nextBtn.classList.remove('hidden');
        } else {
            showResult(columns, values, false, 'クエリは実行できましたが、ミッションの正解ではありません。チップの組み合わせを変えてみましょう。');
        }

    } catch (err) {
        showResult([], [], false, 'SQLエラー: ' + err.message);
    }
}

// ───── 結果表示 ─────
function showResult(columns, rows, isSuccess, message, highlightRows = null) {
    dom.resultArea.classList.remove('hidden');

    dom.resultStatus.textContent = isSuccess ? '✅ 正解！' : '⚠️ 再考せよ';
    dom.resultStatus.className = isSuccess ? 'success' : 'error';
    dom.resultRows.textContent = `${rows.length} 件`;

    let tableHTML = '';

    if (columns.length > 0) {
        tableHTML += '<thead><tr>';
        columns.forEach(col => { tableHTML += `<th>${escapeHTML(col)}</th>`; });
        tableHTML += '</tr></thead>';
    }

    tableHTML += '<tbody>';
    rows.forEach((row, ri) => {
        const hl = highlightRows && highlightRows.includes(ri) ? ' class="highlight"' : '';
        tableHTML += `<tr${hl}>`;
        row.forEach(cell => {
            const display = cell === null ? '<span style="color:var(--accent-red);font-style:italic">NULL</span>' : escapeHTML(String(cell));
            tableHTML += `<td>${display}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';

    dom.resultTable.innerHTML = tableHTML;

    if (message) {
        dom.resultMessage.classList.remove('hidden', 'success', 'error');
        dom.resultMessage.classList.add(isSuccess ? 'success' : 'error');
        dom.resultMessage.textContent = message;
    }
}

// ───── ヒント表示 ─────
function showHint() {
    const mission = currentEpisode.missions[currentMission];

    const overlay = document.createElement('div');
    overlay.className = 'hint-overlay';
    overlay.innerHTML = `
        <div class="hint-sheet">
            <h3>💡 ヒント</h3>
            <p>${mission.hint}</p>
            <button class="hint-close-btn">閉じる</button>
        </div>
    `;

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('hint-close-btn')) {
            overlay.remove();
        }
    });

    document.body.appendChild(overlay);
}

// ───── 次のミッションへ ─────
function goNextMission() {
    const missions = currentEpisode.missions;
    if (currentMission < missions.length - 1) {
        loadMission(currentMission + 1);
    } else {
        showClearScreen();
    }
}

// ───── クリア画面 ─────
function showClearScreen() {
    // 進捗保存
    progress['episode' + currentEpisode.id] = true;
    saveProgress();

    dom.gameScreen.classList.add('hidden');
    dom.clearScreen.classList.remove('hidden');

    const isLast = currentEpisode.id === 10;
    dom.clearSubtitle.textContent = isLast
        ? '全10話 コンプリート！ おめでとうございます！'
        : `第${currentEpisode.id}話 クリア!`;

    dom.clearSummary.innerHTML = currentEpisode.clearSummary;

    // 最終話でなければ「次のエピソード」ボタンのテキストを変更
    dom.toSelectBtn.textContent = isLast ? 'エピソード選択へ' : '次のエピソードへ';
}

// ───── チップ全クリア ─────
function clearAllChips() {
    selectedChips = [];
    $$('.chip').forEach(c => c.classList.remove('selected'));
    updateQueryPreview();
    dom.runBtn.disabled = true;
    dom.clearBtn.classList.add('hidden');
    dom.resultArea.classList.add('hidden');
}

// ───── ユーティリティ ─────
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ───── イベントリスナー ─────
dom.runBtn.addEventListener('click', executeQuery);
dom.hintBtn.addEventListener('click', showHint);
dom.nextBtn.addEventListener('click', goNextMission);
dom.clearBtn.addEventListener('click', clearAllChips);

dom.backBtn.addEventListener('click', () => {
    if (db) db.close();
    db = null;
    showEpisodeSelect();
});

dom.replayBtn.addEventListener('click', () => {
    dom.clearScreen.classList.add('hidden');
    dom.gameScreen.classList.remove('hidden');
    loadMission(0);
});

dom.toSelectBtn.addEventListener('click', () => {
    // 次のエピソードがあればそれを開始、なければ選択画面
    const nextId = currentEpisode.id + 1;
    const nextEp = EPISODES.find(e => e.id === nextId);

    if (nextEp && currentEpisode.id < 10) {
        dom.clearScreen.classList.add('hidden');
        startEpisode(nextId);
    } else {
        dom.clearScreen.classList.add('hidden');
        showEpisodeSelect();
    }
});

// ───── ゲーム開始 ─────
document.addEventListener('DOMContentLoaded', initApp);
