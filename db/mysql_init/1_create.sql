CREATE DATABASE stella_finder;
use stella_finder;

CREATE TABLE IF NOT EXISTS user
(
    id           INT(11) AUTO_INCREMENT NOT NULL,
    user_name    VARCHAR(64)            NOT NULL,
    mail_address VARCHAR(128) UNIQUE    NOT NULL,
    password     VARCHAR(256)           NOT NULL,
    icon         VARCHAR(64),
    is_temporary TINYINT(1) UNSIGNED    NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user (user_name, mail_address, password, icon, is_temporary)
VALUES ('Administrator', 'admin@example.com', '$2a$10$BUnaN4172OKkExLbfpsbj./EhvryG5LvfRnjpfQ8TnbCEf59a16l.', NULL, 0);

CREATE TABLE IF NOT EXISTS tmp_register
(
    id           INT(11) AUTO_INCREMENT NOT NULL,
    register_key VARCHAR(128) UNIQUE    NOT NULL,
    mail_address VARCHAR(128) UNIQUE    NOT NULL,
    created_at   TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (mail_address) REFERENCES user (mail_address)
);

CREATE TABLE IF NOT EXISTS spot
(
    id              INT(11) AUTO_INCREMENT NOT NULL,
    name            VARCHAR(64) UNIQUE     NOT NULL,
    cover_image     VARCHAR(64),
    place           VARCHAR(128)           NOT NULL,
    postal_code     VARCHAR(8),
    prefecture      VARCHAR(32)            NOT NULL,
    address         VARCHAR(256)           NOT NULL,
    remarks         TEXT,
    last_updated_at TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_by INT(11)                NOT NULL,
    PRIMARY KEY (id)
) default character set utf8mb4;

INSERT INTO spot (name, place, postal_code, prefecture, address, remarks, last_updated_by)
VALUES (N'井原市星空公園', 'none', '714-1405', N'岡山県', N'小田郡井原市美星町宇戸１１６５−５４', N'初期データ', 1);

CREATE TABLE IF NOT EXISTS file
(
    file_key   VARCHAR(64)  NOT NULL,
    file_name  VARCHAR(256) NOT NULL,
    created_by VARCHAR(64)  NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (file_key)
);
