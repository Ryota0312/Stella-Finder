CREATE DATABASE stella_finder;
use stella_finder;

CREATE TABLE IF NOT EXISTS user
(
    user_name  VARCHAR(64)  NOT NULL,
    login_name VARCHAR(64)  NOT NULL,
    password   VARCHAR(256) NOT NULL,
    PRIMARY KEY (login_name)
);

INSERT INTO user (user_name, login_name, password)
VALUES ("Administrator", "admin", "administrator");

CREATE TABLE IF NOT EXISTS spot
(
    id          INT(11) AUTO_INCREMENT NOT NULL,
    name        VARCHAR(64)            NOT NULL,
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
