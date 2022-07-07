#!/bin/bash

SCRIPT_DIR=$(dirname $0)
PROJECT_ROOT=$SCRIPT_DIR/../../../

BACKUP_ROOT_DIR=$PROJECT_ROOT/db/backup/

KEEP_BACKUP_FILES=""
for (( i = 0; i < 5; i++ )); do
  BACKUP_ARCHIVE_NAME_DATE=bk$(date --date "$i days ago" +"%Y%m%d")
  KEEP_BACKUP_FILES+=$BACKUP_ARCHIVE_NAME_DATE
  if [ $i -lt 4 ]; then
      KEEP_BACKUP_FILES+="\|"
  fi
done

ls $BACKUP_ROOT_DIR | grep $KEEP_BACKUP_FILES |  | xargs -i rm $BACKUP_ROOT_DIR{}
