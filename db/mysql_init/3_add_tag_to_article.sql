use stella_finder;

CREATE TABLE IF NOT EXISTS tag
(
    id   INT(11)     NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS article_tag
(
    article_id INT(11) NOT NULL,
    tag_id     INT(11) NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES article (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);
