#!/system/bin/sh
set -e
MODDIR=${0%/*}

. "$MODDIR/lib/common.sh"
export ROOT_SOL

# Skip tee.sh's boot-time sleep — the system is already running.
SPECTER_HOT_INSTALL=1
export SPECTER_HOT_INSTALL

HOT_LOG="$SPECTER_DIR/log/hotinstall.log"
ensure_dir "$SPECTER_DIR/log" 2>/dev/null || true
log_rotate "$HOT_LOG" 2>/dev/null || true

# Parent (specter_hot_install, running in customize.sh) reads this back to
# decide whether to print the apply-failed warning — exit status across a
# streaming pipe isn't reliable in POSIX sh.
rm -f "$SPECTER_DIR/.hotinstall_failed"

{
  log_i "HOT" "Hot-install live-apply starting"

  # customize.sh clears tee_status/tee_tier on every install; service.sh would
  # re-run tee.sh at boot to repopulate them, but we skip service.sh. Run it
  # here, before action.sh — device-info.sh reads the cached files to build
  # info.json for the WebUI.
  log_i "HOT" "Refreshing TEE status"
  sh "$MODDIR/features/tee.sh" || log_w "HOT" "tee.sh failed (TEE indicator may be stale until reboot)"

  # Kill the boot-time scheduler + its inotifyd children — it's still running
  # pre-update code sourced before the dir move.
  _old_pid="$(cat "$SPECTER_DIR/scheduler.pid" 2>/dev/null || true)"
  if [ -n "$_old_pid" ]; then
    for _child in $(pgrep -P "$_old_pid" 2>/dev/null || true); do
      kill "$_child" 2>/dev/null || true
    done
    unset _child
    kill "$_old_pid" 2>/dev/null || true
    rm -f "$SPECTER_DIR/scheduler.pid"
  fi
  unset _old_pid

  if [ "$(cfg_get toggle_scheduler 1)" != "0" ]; then
    sh "$MODDIR/lib/scheduler.sh" >"$SPECTER_DIR/log/scheduler.log" 2>&1 &
    log_i "HOT" "Scheduler relaunched (PID $!)"
  fi

  log_i "HOT" "Running action.sh"
  if sh "$MODDIR/action.sh"; then
    log_i "HOT" "action.sh completed"
  else
    _rc=$?
    log_e "HOT" "action.sh failed (exit $_rc)"
    : > "$SPECTER_DIR/.hotinstall_failed"
  fi

  log_i "HOT" "Hot-install live-apply done"
} 2>&1 | tee -a "$HOT_LOG"

exit 0