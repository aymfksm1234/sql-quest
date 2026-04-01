-- ============================================
-- 第8話: 資金洗浄の証拠
-- 学習: HAVING, SUM
-- ============================================

CREATE TABLE bank_accounts (
    account_id INTEGER PRIMARY KEY,
    holder_name TEXT NOT NULL,
    bank_name TEXT NOT NULL
);

INSERT INTO bank_accounts VALUES
(1, '高橋 健一', '東都銀行'),
(2, '石井 悠太', '中央信金'),
(3, '松本 龍二', '東都銀行'),
(4, '川口 真理', '西日本銀行'),
(5, '不明口座X', '海外送金サービス');

CREATE TABLE transactions (
    tx_id INTEGER PRIMARY KEY,
    from_account INTEGER NOT NULL,
    to_account INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    tx_date TEXT NOT NULL,
    FOREIGN KEY (from_account) REFERENCES bank_accounts(account_id),
    FOREIGN KEY (to_account) REFERENCES bank_accounts(account_id)
);

INSERT INTO transactions VALUES
(1, 1, 2, 500000,  '2026-04-01'),
(2, 1, 2, 300000,  '2026-04-01'),
(3, 2, 5, 750000,  '2026-04-02'),
(4, 1, 2, 450000,  '2026-04-02'),
(5, 2, 5, 500000,  '2026-04-03'),
(6, 3, 4, 100000,  '2026-04-01'),
(7, 4, 3, 50000,   '2026-04-02'),
(8, 1, 2, 200000,  '2026-04-03'),
(9, 2, 5, 400000,  '2026-04-04'),
(10, 1, 3, 80000,  '2026-04-02');
