checkin master node server.  To be deployed in multiple locations.

The idea is to have a simple HTTP target that systems can "hit" to check in and let us know
they are alive.  Entries will be maintained in a small db that will contain only the last 
time that a give host checked in.

Info to store is pretty simple:
  hostname - provided as part of the get url for express to sort out
  ip       - from the request
  time     - this server will timestamp


