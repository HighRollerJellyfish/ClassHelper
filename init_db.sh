#!/bin/bash
mysqld
mysql -uroot -p$MYSQL_ROOT_PASSWORD < schema.sql
