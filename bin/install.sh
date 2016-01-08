#!/bin/sh
dbpath=/opt/dbs/checkin.sqlite3
dname=`dirname $dbpath`
mkdir -p $dname
chmod 777 $dname

cat <<EOF > './config.json'
{
    "dbpath" : "$dbpath"
}
EOF

npm install


allowfrom="128.111.100.0/23"
echo "-A INPUT -m state --state NEW -m tcp -p tcp --dport 3000:3005 -s $allowfrom -j ACCEPT"

if [ -d /etc/systemd/system ]; then
    cp svc/node-checkin-master.service /etc/systemd/system
fi