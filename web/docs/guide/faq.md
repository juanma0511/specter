# FAQ

## Play Integrity keeps failing

Open the WebUI and check the Keybox page. A valid keybox must have a device certificate not revoked by Google. If yours is revoked, install a working one from the catalog or your own source. After replacing, clear Play Store data and reboot.

## What root solution does Specter support?

Magisk, KernelSU, and APatch. Detection and module path resolution adapt automatically at install time.

## Can I use Specter without Zygisk?

Yes. Toggle Zygisk off in Magisk and disable the LSPosed feature in Specter's Control page. All other features (keybox, boot props, TEE, conflicts) work fine.

## How do I update Specter?

Click on the "Update" button in your manager app. Settings and keyboxes persist across updates. Check the changelog on GitHub for what changed.

## Why is my bootloader detected after installing?

Go to Control and enable Boot Hardening. If it's already on, verify that no conflicting module (TSupport, Yurikey, IntegrityBox, NoHello, SensitiveProps) is overriding the props. The Conflicts page shows active conflicts.

## Keybox was working and now it's not

Google can revoke keyboxes at any time. Open the Keybox page and check status. If revoked, install a fresh one from the catalog. You can also enable Auto-override to automatically switch to a working keybox when the current one fails.

## WebUI shows "offline"

The module checks connectivity with an 800ms timeout. If your network is slow or blocked, the WebUI shows cached status instead. Features continue working — the offline warning just means live checks are skipped.

## What's the difference between aggressive and passive conflicts?

Aggressive modules (TSupport, Yurikey, IntegrityBox) are renamed to `.bak` so they stop running entirely. Passive modules (NoHello, SensitiveProps) coexist with Specter — their toggles are deferred and Specter's features take priority in the boot pipeline.

## Can I use Tricky Store alongside Specter?

Yes. Tricky Store handles keybox sourcing; Specter handles boot props, TEE, recovery hiding, and conflict resolution. Install Tricky Store first, then Specter. No special config needed.

## How do I reset everything?

From the WebUI Settings tab, use Reset to Defaults. This clears all toggles, conflicts, and user config back to module defaults. Keyboxes are not affected. For a full wipe, uninstall the module and delete `/data/adb/specter/`.

## Does Specter send data anywhere?

No. All processing is local. TEE attestation checks run an APK locally. Security patch dates are fetched directly from source.android.com. No telemetry, no analytics, no network calls except keybox catalog and security patch lookups.
