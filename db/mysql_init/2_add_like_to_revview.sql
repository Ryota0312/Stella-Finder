use stella_finder;

DROP PROCEDURE IF EXISTS alter_table_procedure;

DELIMITER //

CREATE PROCEDURE alter_table_procedure()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
    ALTER TABLE review ADD COLUMN like_count INT(11) NOT NULL DEFAULT 0 AFTER created_by;
END //

DELIMITER ;

CALL alter_table_procedure();

DROP PROCEDURE alter_table_procedure;
