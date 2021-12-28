use stella_finder;

CREATE TABLE IF NOT EXISTS new_article_tag
(
    article_id INT(11) NOT NULL,
    tag_id     INT(11) NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE
);

INSERT INTO new_article_tag SELECT * FROM article_tag;
DROP TABLE article_tag;
RENAME TABLE new_article_tag TO article_tag;
