use stella_finder;

DROP PROCEDURE IF EXISTS alter_table_procedure;

DELIMITER //

CREATE PROCEDURE alter_table_procedure()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
ALTER TABLE article ADD COLUMN cover_image VARCHAR(64) AFTER body;
END //

DELIMITER ;

CALL alter_table_procedure();

DROP PROCEDURE alter_table_procedure;

