# Troubleshooting

## Google Play Certification Fails

**"Device is not certified"** in Play Store > Settings > About.

1. In Specter WebUI, try a different keybox via **Tools > Install Keybox**
2. Try a different PIF fingerprint via **Tools > Get New Fingerprint**
3. Clear data for Google Play Services and Google Play Store, reboot, re-check
4. Verify target.txt includes `com.android.vending` and `com.google.android.gms`

## TEE Status Shows Broken

**TEE card on Home tab shows "broken".**

This means the vbmeta digest doesn't match the TEE-reported boot hash. Common causes:

- Bootloader is unlocked
- A module is modifying boot partitions
- Custom kernel or recovery installed

Specter will still work for most features. TEE-dependent features like Widevine L1 fix may not work.

## Bootloop After Installing

1. Boot to recovery (TWRP/OrangeFox)
2. Delete `/data/adb/modules/Specter/` to remove the module
3. Reboot
4. If you had conflicts with other modules, restore backups from `/data/adb/Specter/conflict_backups.txt`

## WebUI Won't Open

- Make sure Specter is installed and enabled in your root manager
- Try opening via KernelSU WebUI launcher if on KernelSU/APatch
- On Magisk, use the action button from Magisk Manager modules page
- Install the Specter Manager app if available

## target.txt Not Working

- Run **Tools > Set target.txt** to regenerate
- Check that target apps are set to the correct state in **App Targeting**
- Verify Tricky Store is installed and enabled
- Reboot after generating target.txt

## Keybox Installation Fails

- Check network connectivity (online chip in top bar)
- Try a different provider from the catalog
- Try installing via custom keybox with a direct URL
- Verify the keybox isn't revoked (check keybox_info.json)

## Updates Not Showing

Specter checks for updates via the `update.json` URL. If updates don't appear:

- Check network connectivity
- Verify `update.json` is accessible at the URL in `module.prop`
- Update manually by downloading from the GitHub releases page