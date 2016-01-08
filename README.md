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