#!/bin/sh
dbpath=/opt/dbs/checkin.sqlite3
dname=`dirname $dbpath`
mkdir -p $dname
chmod 777 $dname
