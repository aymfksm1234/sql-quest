-- ============================================
-- 第10話（最終話）: 蒼き涙の奪還
-- 学習: LEFT JOIN, IS NULL
-- ============================================

CREATE TABLE exhibit_list (
    exhibit_id INTEGER PRIMARY KEY,
    exhibit_name TEXT NOT NULL,
    category TEXT NOT NULL,
    appraised_value INTEGER NOT NULL
);

INSERT INTO exhibit_list VALUES
(1, '蒼き涙',           '宝石',   300000000),
(2, '紅蓮の炎',         '宝石',   180000000),
(3, '月光のソナタ',     '絵画',   95000000),
(4, '黄金の鶴',         '彫刻',   72000000),
(5, '翡翠の龍',         '彫刻',   110000000),
(6, '星降る夜',         '絵画',   88000000),
(7, 'ダイヤモンドの涙', '宝石',   250000000);

CREATE TABLE current_inventory (
    inventory_id INTEGER PRIMARY KEY,
    exhibit_id INTEGER NOT NULL,
    storage_location TEXT NOT NULL,
    verified_date TEXT NOT NULL,
    FOREIGN KEY (exhibit_id) REFERENCES exhibit_list(exhibit_id)
);

INSERT INTO current_inventory VALUES
(1, 2, '展示室A',   '2026-04-05'),
(2, 3, '展示室B',   '2026-04-05'),
(3, 4, '展示室C',   '2026-04-05'),
(4, 6, '保管庫1号', '2026-04-05');

CREATE TABLE warehouses (
    warehouse_id INTEGER PRIMARY KEY,
    warehouse_name TEXT NOT NULL,
    address TEXT NOT NULL,
    owner TEXT NOT NULL
);

INSERT INTO warehouses VALUES
(1, '港区倉庫A', '東京都港区海岸1-2-3',   '石井 悠太'),
(2, '品川倉庫B', '東京都品川区東品川4-5-6','松本 龍二'),
(3, '大田倉庫C', '東京都大田区羽田7-8-9', '不明');

CREATE TABLE evidence_locations (
    evidence_id INTEGER PRIMARY KEY,
    exhibit_name TEXT NOT NULL,
    warehouse_id INTEGER,
    status TEXT NOT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id)
);

INSERT INTO evidence_locations VALUES
(1, '蒼き涙',           1, '保管中'),
(2, '翡翠の龍',         2, '保管中'),
(3, 'ダイヤモンドの涙', NULL, '所在不明');
