#!/bin/bash
mysql -uroot -p$MYSQL_ROOT_PASSWORD -h $HOSTNAME < schema.sql
