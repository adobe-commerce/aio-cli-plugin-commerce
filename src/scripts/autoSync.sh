#!/bin/bash

# Function to get UTC time from progress.json and display it in CST
get_restart_time() {
  local RESTART_AFTER=$(jq -r '.restartAfter' progress.json)
  local RESTART_AFTER_SEC=$((RESTART_AFTER / 1000))
  echo "Restart after: $(TZ='America/Chicago' date -r $RESTART_AFTER_SEC "+%Y-%m-%d %H:%M:%S") (CST)"
}

# Function to check if condition is met
exit_if_all_checked() {
  local LAST_CHECKED=$(jq -r '.lastChecked' progress.json)
  if [ "$LAST_CHECKED" -gt "100" ]; then
    echo "100 repos synced, quitting..."
    exit 0
  fi
}

# Function to format seconds into H:M:S
format_time() {
  local SECONDS=$1
  printf "%02d:%02d:%02d" $((SECONDS/3600)) $((SECONDS%3600/60)) $((SECONDS%60))
}

# Main loop
while true; do
  # Check condition to see if we should quit
  exit_if_all_checked

  # Get the current restart time and display it
  get_restart_time

  # Wait until restartAfter time has passed
  RESTART_AFTER=$(jq -r '.restartAfter' progress.json)
  RESTART_AFTER_SEC=$((RESTART_AFTER / 1000))
  CURRENT_TIME=$(date +%s)
  SLEEP_TIME=$((RESTART_AFTER_SEC - CURRENT_TIME))
  if [ $SLEEP_TIME -gt 0 ]; then
    echo "Sleeping for $(format_time $SLEEP_TIME)"
    sleep $SLEEP_TIME
  fi

  # Run the script synchronously. When the script ends, it will write to progress.json with new restartAfter time
  node src/scripts/checkSync.js
done
