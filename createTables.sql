SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS safety_status;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;

-- 部署テーブル
CREATE TABLE departments (
  department_id CHAR(4) NOT NULL PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
) CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 役割テーブル
CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  label VARCHAR(100)
) CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 社員テーブル
CREATE TABLE employees (
  employee_id CHAR(8) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password CHAR(60) NOT NULL,
  prefecture VARCHAR(20),
  address VARCHAR(100),
  department_id CHAR(4),
  hire_date DATE,
  position VARCHAR(30),
  phone_number VARCHAR(15),
  role_id INT(5),
  email VARCHAR(100),
  FOREIGN KEY (department_id) REFERENCES departments(department_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
) CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 安否情報テーブル
CREATE TABLE safety_status (
  status_id CHAR(36) NOT NULL PRIMARY KEY,
  employee_id CHAR(8) NOT NULL,
  safety_state VARCHAR(10) NOT NULL,
  is_attendable BOOLEAN,
  note TEXT,
  location VARCHAR(100),
  latitude DOUBLE,
  longitude DOUBLE,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
) CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;
