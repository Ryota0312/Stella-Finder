#!/bin/bash

docker-compose -f docker-compose.yml -f docker-compose.dev.yml "$1"