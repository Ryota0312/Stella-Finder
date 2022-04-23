use stella_finder;

DROP PROCEDURE IF EXISTS alter_table_procedure;

DELIMITER //

CREATE PROCEDURE alter_table_procedure()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
ALTER TABLE user ADD COLUMN is_sns_login TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL AFTER is_admin;
END //

DELIMITER ;

CALL alter_table_procedure();

DROP PROCEDURE alter_table_procedure;
