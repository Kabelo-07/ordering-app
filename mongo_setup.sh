#!/bin/bash
echo "sleeping for 10 seconds"
sleep 10

echo mongo_setup.sh time now: `date +"%T" `
mongosh --host mongodb-primary:27017 <<EOF
  var cfg = {
    "_id": "rs0",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongodb-primary:27017",
        "priority": 2
      },
      {
        "_id": 1,
        "host": "mongodb-secondary:27027",
        "priority": 0
      },
      {
        "_id": 2,
        "host": "mongodb-arbiter:27037",
        "priority": 0
      }
    ]
  };
  rs.initiate(cfg);
EOF