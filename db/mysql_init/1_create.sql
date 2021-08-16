CREATE DATABASE sample;
use sample;

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
    id   INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(64)            NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS file
(
    fileKey   VARCHAR(64)  NOT NULL,
    filename  VARCHAR(256) NOT NULL,
    createdBy VARCHAR(64)  NOT NULL,
    createdAt TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fileKey)
);
