use stella_finder;

CREATE TABLE IF NOT EXISTS report
(
    id          INT(11) AUTO_INCREMENT NOT NULL,
    spot_id     INT(11)                NOT NULL,
    title       VARCHAR(128)           NOT NULL,
    body        LONGTEXT               NOT NULL,
    cover_image VARCHAR(64),
    created_at  TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT(11)                NOT NULL,
    like_count  INT(11)                NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) default character set utf8mb4;
