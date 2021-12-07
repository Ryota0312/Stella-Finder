CREATE DATABASE stella_finder;
use stella_finder;

CREATE TABLE IF NOT EXISTS user
(
    id           INT(11) AUTO_INCREMENT        NOT NULL,
    user_name    VARCHAR(64)                   NOT NULL,
    mail_address VARCHAR(128) UNIQUE           NOT NULL,
    password     VARCHAR(256)                  NOT NULL,
    icon         VARCHAR(64),
    description  TEXT,
    is_temporary TINYINT(1) UNSIGNED           NOT NULL,
    is_admin     TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user (user_name, mail_address, password, icon, description, is_temporary)
VALUES ('Administrator', 'admin@example.com', '$2a$10$BUnaN4172OKkExLbfpsbj./EhvryG5LvfRnjpfQ8TnbCEf59a16l.', NULL,
        NULL, 0);

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
    id                 INT(11) AUTO_INCREMENT NOT NULL,
    name               VARCHAR(64) UNIQUE     NOT NULL,
    cover_image        VARCHAR(64),
    postal_code        VARCHAR(8),
    prefecture         VARCHAR(32)            NOT NULL,
    address            VARCHAR(256)           NOT NULL,
    remarks            TEXT,
    last_updated_at    TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_updated_by    INT(11)                NOT NULL,
    avg_total_point    DOUBLE                 NOT NULL DEFAULT 0,
    avg_darkness_point DOUBLE                 NOT NULL DEFAULT 0,
    avg_view_point     DOUBLE                 NOT NULL DEFAULT 0,
    avg_safety_point   DOUBLE                 NOT NULL DEFAULT 0,
    review_count       int                    NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) default character set utf8mb4;

INSERT INTO spot (name, postal_code, prefecture, address, remarks, last_updated_by)
VALUES (N'井原市星空公園', '7141405', N'岡山県', N'小田郡井原市美星町宇戸１１６５−５４', N'初期データ', 1);

CREATE TABLE IF NOT EXISTS file
(
    file_key   VARCHAR(64)  NOT NULL,
    file_name  VARCHAR(256) NOT NULL,
    created_by VARCHAR(64)  NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (file_key)
);

CREATE TABLE IF NOT EXISTS spot_image
(
    spot_id INT(11)     NOT NULL,
    image   VARCHAR(64) NOT NULL,
    PRIMARY KEY (spot_id, image),
    FOREIGN KEY (spot_id) REFERENCES spot (id)
);

CREATE TABLE IF NOT EXISTS review
(
    id         int(11) AUTO_INCREMENT NOT NULL,
    spot_id    int(11)                NOT NULL,
    darkness   tinyint                NOT NULL,
    view       tinyint                NOT NULL,
    safety     tinyint                NOT NULL,
    comment    text,
    created_at timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int(11)                NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS review_image
(
    review_id int(11)     NOT NULL,
    image     VARCHAR(64) NOT NULL,
    PRIMARY KEY (review_id, image),
    FOREIGN KEY (review_id) REFERENCES review (id)
);

CREATE TABLE IF NOT EXISTS article
(
    id         INT(11) AUTO_INCREMENT              NOT NULL,
    title      VARCHAR(128)                        NOT NULL,
    body       LONGTEXT                            NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by INT(11)                             NOT NULL,
    PRIMARY KEY (id)
) default character set utf8mb4;
