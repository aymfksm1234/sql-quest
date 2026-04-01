-- ============================================
-- 第9話: 偽装された身分
-- 学習: Subquery (副問合せ)
-- ============================================

CREATE TABLE criminal_records (
    record_id INTEGER PRIMARY KEY,
    real_name TEXT NOT NULL,
    alias TEXT NOT NULL,
    crime_type TEXT NOT NULL,
    arrest_date TEXT NOT NULL
);

INSERT INTO criminal_records VALUES
(1, '石井 悠太', '山本 浩二', '窃盗',   '2020-06-15'),
(2, '金田 猛',   '佐々木 学', '詐欺',   '2019-11-20'),
(3, '森 隆司',   '中島 誠',   '横領',   '2021-03-10'),
(4, '西田 恵',   '岡田 由美', '偽造文書','2022-01-05');

CREATE TABLE current_employees (
    emp_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    hire_date TEXT NOT NULL
);

INSERT INTO current_employees VALUES
(1, '田中 太郎',   'システム管理部', '2023-04-01'),
(2, '佐藤 次郎',   '学芸部',         '2022-09-15'),
(3, '山本 浩二',   '清掃部',         '2025-01-10'),
(4, '鈴木 花子',   '管理部',         '2021-06-01'),
(5, '岡田 由美',   '受付',           '2025-06-20'),
(6, '高橋 健一',   '警備部',         '2024-03-01'),
(7, '中島 誠',     '倉庫管理部',     '2025-08-15');
