-- 1. Insert roles
INSERT INTO roles (role_id, name, label) VALUES
(1, 'admin', '管理者'),
(2, 'manager', 'マネージャー'),
(3, 'member', 'メンバー');

-- 2. Insert departments
INSERT INTO departments (department_id, department_name) VALUES
('d001', 'システム開発部'),
('d002', '総務部'),
('d003', '営業部');

-- 3. Insert employees
INSERT INTO employees (
  employee_id, name, password, prefecture, address, department_id, hire_date, position, phone_number, role_id, email
) VALUES
('uid_001', 'NGUYEN MINH TRI', 'hashed_password_001', '大阪府', '大阪市北区1-1-1', 'd001', '2024-04-01', 'メンバー', '090-1111-1111', 3, 'tri@example.com'),
('uid_002', '小林 多聞', 'hashed_password_002', '大阪府', '大阪市北区2-2-2', 'd001', '2024-04-01', 'マネージャー', '090-2222-2222', 2, 'takumi@example.com'),
('uid_003', '小林 碧唯', 'hashed_password_003', '大阪府', '大阪市北区3-3-3', 'd002', '2024-04-01', '管理者', '090-3333-3333', 1, 'aoi@example.com'),
('uid_004', '山本 悠生', 'hashed_password_004', '大阪府', '大阪市北区4-4-', 'd003', '2024-04-01', 'メンバー', '090-4444-4444', 3, 'yuki@example.com'),
('uid_005', '植野 天真', 'hashed_password_005', '大阪府', '大阪市北区5-5-5', 'd001', '2024-04-01', 'メンバー', '090-5555-5555', 3, 'tenma@example.com');

-- 4. Insert safety_status
INSERT INTO safety_status (
  status_id, employee_id, safety_state, is_attendable, note, location, latitude, longitude, updated_at
) VALUES
('uuid-001', 'uid_001', '安全', TRUE, '問題なし', '大阪市 北区', 34.7055, 135.5008, FROM_UNIXTIME(1745679600)),
('uuid-002', 'uid_002', '要救助', FALSE, '足を怪我しました', '大阪市 中央区', 34.6937, 135.5023, FROM_UNIXTIME(1745679600));

COMMIT;
