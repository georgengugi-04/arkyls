CREATE DATABASE IF NOT EXISTS arkyls CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE arkyls;

CREATE TABLE IF NOT EXISTS messages (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(150) NOT NULL,
  service    VARCHAR(100) NULL,
  message    TEXT NOT NULL,
  ip         VARCHAR(45)  NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ip_created (ip, created_at)
) ENGINE=InnoDB;

-- If you already have the old table from the legacy site:
-- ALTER TABLE messages ADD COLUMN ip VARCHAR(45) NULL, ADD INDEX idx_ip_created (ip, created_at);
