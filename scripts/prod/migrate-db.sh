#!/bin/bash

if (git diff HEAD~ --name-only | grep db/mysql_init); then
  SQL_ARRAY=$(git diff HEAD~ --name-only | grep db/mysql_init)
  for sql in "${SQL_ARRAY[@]}"
  do
      scripts/prod/docker-compose-wrapper.sh exec -T stella-finder-db mysql --defaults-extra-file=/etc/mysql/conf.d/dbaccess.conf -e"$(cat "$sql")"
  done
else
  echo "Skip migration"
fi
