#!/bin/bash
# Script to install all the npm packages
echo "Installing npm packages"

cd act-service
npm i
cd ..

cd react-ui
npm i
cd ..

cd user-service
npm i
cd ..

echo "npm installation complete"