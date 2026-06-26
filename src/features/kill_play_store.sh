#!/system/bin/sh
set -e
MODDIR=${0%/*}
. "$MODDIR/../lib/common.sh"
. "$MODDIR/../lib/config_env.sh"
. "$MODDIR/../lib/package_list.sh"

log_i "PLAY_STORE" "Force-stopping Play Store"
am force-stop com.android.vending >/dev/null 2>&1 || true
pm clear com.android.vending >/dev/null 2>&1 || true
exit 0
