-- ============================================
-- SQLクエスト 第1話: 深夜の展示室と消えた「蒼き涙」
-- データベース初期化スクリプト
-- ============================================

-- 美術館スタッフ名簿
CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL
);

INSERT INTO employees (employee_id, name, role) VALUES
(101, '田中 太郎', 'システム管理'),
(102, '佐藤 次郎', '学芸員'),
(103, '鈴木 花子', '館長'),
(104, '高橋 健一', '夜間警備員');

-- 入退館ログ
CREATE TABLE access_logs (
    log_id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO access_logs (log_id, employee_id, action, timestamp) VALUES
(7001, 101, 'enter', '2026-03-31 19:30'),
(7002, 102, 'enter', '2026-03-31 19:45'),
(7003, 101, 'exit',  '2026-03-31 20:15'),
(7004, 104, 'enter', '2026-03-31 20:30'),
(7005, 102, 'exit',  '2026-03-31 21:00'),
(7006, 103, 'enter', '2026-03-31 18:00'),
(7007, 103, 'exit',  '2026-03-31 19:00'),
(7008, 104, 'exit',  '2026-03-31 23:30');
