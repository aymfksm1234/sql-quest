# SQL QUEST - データベース・デテクティブ

> ミステリー仕立てのSQL学習ゲーム。データ捜査官となり、ログを解析して犯人を追い詰めろ。

<p align="center">
  <img src="https://img.shields.io/badge/SQL-Learning_Game-06b6d4?style=for-the-badge" alt="SQL Learning Game" />
  <img src="https://img.shields.io/badge/Mobile-First-3b82f6?style=for-the-badge" alt="Mobile First" />
  <img src="https://img.shields.io/badge/Episodes-10-10b981?style=for-the-badge" alt="10 Episodes" />
</p>

<p align="center">
  <strong><a href="https://aymfksm1234.github.io/sql-quest/">https://aymfksm1234.github.io/sql-quest/</a></strong>
</p>

---

## 遊び方

1. **エピソードを選ぶ** - 初級から上級まで全10話
2. **ストーリーを読む** - 刑事からの指示を確認
3. **チップを選択** - SQL構文のチップをタップして正しい順番に並べる
4. **実行** - 組み立てたクエリを実行し、事件の手がかりを得る
5. **犯人を追い詰める** - 全ミッションをクリアして事件を解決！

> インストール不要。ブラウザだけで動きます（スマホ推奨）。

---

## 全10話ストーリー

時価3億円の宝石《蒼き涙》が深夜の美術館から消えた。
データ捜査官のあなたは、SQLクエリを武器に事件の真相を追う。

### 初級編：はじめての捜査

| # | タイトル | 学習する構文 |
|:-:|---------|:-----------|
| 1 | 深夜の展示室と消えた「蒼き涙」 | `SELECT` `FROM` `WHERE` |
| 2 | 嘘つきなアリバイ | `AND` `OR` `!=` |
| 3 | ボスの特徴を絞り込め | `LIKE` (`%`ワイルドカード) |

### 中級編：データの裏を読む

| # | タイトル | 学習する構文 |
|:-:|---------|:-----------|
| 4 | 消された証拠品リスト | `ORDER BY` `LIMIT` |
| 5 | 下見の回数を数えろ | `COUNT` `GROUP BY` |
| 6 | 共犯者の連絡網 | `JOIN ... ON` |

### 上級編：真実へのチェックメイト

| # | タイトル | 学習する構文 |
|:-:|---------|:-----------|
| 7 | 空白の1時間を埋める | `BETWEEN` `IN` |
| 8 | 資金洗浄の証拠 | `SUM` `GROUP BY` `HAVING` |
| 9 | 偽装された身分 | Subquery (副問合せ) |
| 10 | 蒼き涙の奪還 | `LEFT JOIN` `IS NULL` |

---

## 技術構成

```
sql-quest/
├── index.html          # メイン画面（エピソード選択 / ゲーム / クリア）
├── css/style.css       # ダークテーマ・スマホファーストCSS
├── js/
│   ├── app.js          # ゲームエンジン（DB初期化・チップ操作・正答判定）
│   └── episodes.js     # 全10話のミッション・チップ・ストーリー定義
└── sql/
    └── episode01〜10.sql  # 各話のCREATE TABLE / INSERT文
```

| 技術 | 用途 |
|:-----|:-----|
| [sql.js](https://github.com/sql-js/sql.js) (WASM) | ブラウザ内SQLite実行エンジン |
| Vanilla JS | フレームワーク不使用。CDN依存は sql.js のみ |
| CSS Grid / Flexbox | スマホ最適化レイアウト |
| LocalStorage | クリア進捗の永続化 |
| GitHub Pages | 静的ホスティング |

---

## ローカルで動かす

```bash
# クローン
git clone https://github.com/aymfksm1234/sql-quest.git
cd sql-quest

# 任意のHTTPサーバーで配信（sql.js の WASM 読み込みに必要）
npx serve .
# → http://localhost:3000 で開く
```

> `file://` プロトコルでは WASM の読み込みに失敗するため、HTTPサーバーが必要です。

---

## ライセンス

MIT
