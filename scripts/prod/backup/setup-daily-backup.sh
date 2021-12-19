#!/bin/bash

SCRIPT_DIR=$(dirname $0)

cp "$SCRIPT_DIR"/backup.service /etc/systemd/system/
cp "$SCRIPT_DIR"/backup.timer /etc/systemd/system/

systemctl start backup.timer
systemctl enable backup.timer