#!/bin/bash

SCRIPT_DIR=$(dirname $0)
PROJECT_ROOT=$SCRIPT_DIR/../../

if (git diff HEAD~ --name-only | grep db/mysql_init); then
  docker volume rm $(docker volume ls -qf dangling=true)
else
  echo "Skip migration"
fi
