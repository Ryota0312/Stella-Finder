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
    id          INT(11) AUTO_INCREMENT NOT NULL,
    name        VARCHAR(64) UNIQUE     NOT NULL,
    place       VARCHAR(128)           NOT NULL,
    cover_image VARCHAR(64),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS file
(
    file_key   VARCHAR(64)  NOT NULL,
    file_name  VARCHAR(256) NOT NULL,
    created_by VARCHAR(64)  NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (file_key)
);
