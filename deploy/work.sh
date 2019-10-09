#!/bin/bash
set -e

### Configuration ###

APP_DIR=/var/www/spark
GIT_URL=git://github.com/sparkeduab/sparked-server
RESTART_ARGS=

# Uncomment and modify the following if you installed Passenger from tarball
#export PATH=/path-to-passenger/bin:$PATH


### Automation steps ###

set -x

# Pull latest code
if [[ -e $APP_DIR/code ]]; then
  cd $APP_DIR/code
  git pull
else
  git clone $GIT_URL $APP_DIR/code
  cd $APP_DIR/code
fi

# Install dependencies
npm uninstall -g babel
npm install --save-dev babel-cli
npm install --production
echo "production running"
npm prune --production
npm run build
echo "Just ran the build"

# Restart app
passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR/code