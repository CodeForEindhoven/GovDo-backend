#!/bin/bash

sed -i "s^__PORT__^$PORT^g" /app/config.js
sed -i "s^__DB_STORAGE__^$DB_STORAGE^g" /app/config.js

cd /app
npm start
