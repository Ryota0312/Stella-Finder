#!/bin/bash

SCRIPT_DIR=$(dirname $0)

cp "$SCRIPT_DIR"/backup.service.tmp /etc/systemd/system/backup.service
sed -i -e "s|?HOME_DIR|$HOME|g" /etc/systemd/system/backup.service
cp "$SCRIPT_DIR"/backup.timer /etc/systemd/system/

systemctl start backup.timer
systemctl enable backup.timer
