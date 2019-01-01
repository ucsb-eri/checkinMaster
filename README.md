checkin master node server.  To be deployed in multiple locations.

The idea is to have a simple HTTP target that systems can "hit" to check in and let us know
they are alive.  Entries will be maintained in a small db that will contain only the last 
time that a give host checked in.

Info to store is pretty simple:
  hostname - provided as part of the get url for express to sort out
  ip       - from the request
  time     - this server will timestamp

cd into the main app directory - edit and then run:
  vi bin/install.sh
  bin/install.sh
  

Note that on linux systems you may need to open up the firewall to allow access to 
the node service running.  Our CentOS boxes are setup like the following

-A INPUT -m state --state NEW -m tcp -p tcp --dport 3000:3005 -s 128.111.100.0/23 -j ACCEPT

# On CentOS-7 use systemd to run
```
groupadd -g 500 nsmgmt
useradd -u 500 -c "Nsmgmt account" nsmgmt

cp svc node-checkin-master.service /etc/systemd/system/
systemctl enable node-checkin-master
systemctl start node-checkin-master
```

# Alternate systemctl install
```
cat <<EOF >/opt/lib/system/vmapi.service     # change this path to a real service path
[Unit]
Description=VMapi Server

[Service]
ExecStart=/usr/bin/nodemon /opt/vmapi/bin/www
#/usr/bin/npm start
# Required on some systems
WorkingDirectory=/opt/vmapi
Restart=always
# Restart service after 10 seconds if node service crashes
RestartSec=10
# Output to a file, but the file is overwritten at service restart
#StandardOutput=file:/var/log/nodejs/vmapi.out
#StandardError=file:/var/log/nodejs/vmapi.err
# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=vmapi
#User=<alternate user>
#Group=<alternate group>
Environment=NODE_ENV=production PORT=3004

[Install]
WantedBy=multi-user.target
EOF
```
