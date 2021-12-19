#!/bin/bash

SCRIPT_DIR=$(dirname $0)
PROJECT_ROOT=$SCRIPT_DIR/../../../

BACKUP_ROOT_DIR=$PROJECT_ROOT/db/backup/

BACKUP_DIR_NAME=bk$(date +"%Y%m%d%H%M")
BACKUP_DIR=$BACKUP_ROOT_DIR/$BACKUP_DIR_NAME

mkdir "$BACKUP_DIR"

"$PROJECT_ROOT"/scripts/prod/docker-compose-wrapper.sh exec stella-finder-db mysqldump --defaults-extra-file=/etc/mysql/conf.d/dbaccess.conf stella_finder > "$BACKUP_DIR"/stella_finder.bk
cp -r "$PROJECT_ROOT"/server/uploadedImages/ "$BACKUP_DIR"/

(cd "$BACKUP_ROOT_DIR" && zip -r "$BACKUP_DIR_NAME".zip "$BACKUP_DIR_NAME")
rm -r "$BACKUP_DIR"
