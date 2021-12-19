#!/bin/bash

SCRIPT_DIR=$(dirname $0)
PROJECT_ROOT=$SCRIPT_DIR/../../../

BACKUP_ROOT_DIR=$PROJECT_ROOT/db/backup/

BACKUP_ARCHIVE_NAME=$1

unzip "$BACKUP_ROOT_DIR"/"$BACKUP_ARCHIVE_NAME".zip

"$PROJECT_ROOT"/scripts/prod/docker-compose-wrapper.sh exec stella-finder-db mysql --defaults-extra-file=/etc/mysql/conf.d/dbaccess.conf stella_finder -e"$(cat "$BACKUP_ARCHIVE_NAME"/stella_finder.bk)"
cp -r "$BACKUP_ARCHIVE_NAME"/uploadedImages/ server/

rm -r "$BACKUP_ARCHIVE_NAME"
