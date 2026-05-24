# Keybox Management

Specter installs and manages keyboxes for Tricky Store.

## Keybox Catalog

Fetched from `https://rawbin.netlify.app/key/catalog`. Each entry shows provider, version, Google revocation status (revoked/softbanned), and serial number.

To install: **Tools tab** > select a provider > tap **Install Keybox**.

## Custom Keybox

Import from three sources:

- **File**: browse device storage (filters `.xml` and `.bak`)
- **URL**: direct download link
- **Path**: local file path

Mark as **private** to disable catalog matching.

## Google Revocation

Serial is checked against `https://android.googleapis.com/attestation/status` at install time. Results cached in `keybox_info.json`:

- `revoked`: publicly revoked
- `softbanned`: soft-banned by Google
- Neither: active

Revoked/softbanned keyboxes show a warning but can still be installed.

## How It Works

1. Keybox is fetched (catalog, file, or URL)
2. Shuffled-base64 payload decoded via `tr` + `base64 -d`
3. Keys and serial validated
4. Serial checked against Google's revocation list
5. Installed to Tricky Store as `keybox.xml`
6. Previous keybox backed up to `keybox.xml.bak`

For TEESimulator, installed as `locked.xml`.

## Paths

| Path | Purpose |
|---|---|
| `/data/adb/tricky_store/keybox.xml` | Active keybox |
| `/data/adb/tricky_store/keybox.xml.bak` | Keybox backup |
| `/data/adb/tricky_store/locked.xml` | TEESimulator locked keybox |
| `/data/adb/Specter/webroot/json/keybox_info.json` | Status cache |