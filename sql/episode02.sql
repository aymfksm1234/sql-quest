-- ============================================
-- 第2話: 嘘つきなアリバイ
-- 学習: WHERE (AND, OR, NOT)
-- ============================================

CREATE TABLE suspects (
    suspect_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    testimony TEXT NOT NULL
);

INSERT INTO suspects VALUES
(1, '山田 一郎', '私はずっとA室にいた'),
(2, '中村 美咲', '私はB室かC室にいた'),
(3, '木村 誠',   '私はD室には行っていない'),
(4, '小林 裕子', '私はA室にもB室にも行っていない');

CREATE TABLE room_logs (
    log_id INTEGER PRIMARY KEY,
    suspect_id INTEGER NOT NULL,
    room TEXT NOT NULL,
    time TEXT NOT NULL,
    FOREIGN KEY (suspect_id) REFERENCES suspects(suspect_id)
);

INSERT INTO room_logs VALUES
(1, 1, 'A室', '20:00'),
(2, 1, 'D室', '20:30'),
(3, 2, 'B室', '20:00'),
(4, 2, 'A室', '20:45'),
(5, 3, 'D室', '20:15'),
(6, 3, 'C室', '20:50'),
(7, 4, 'A室', '20:10'),
(8, 4, 'C室', '20:40');
