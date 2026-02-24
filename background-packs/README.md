# Background Packs

This folder contains two sample background packs you can upload in Admin at `/admin/backgrounds`:

- `nebula-grid/`
- `orbit-trails/`

Each sample includes:

- `manifest.json` (required)
- `index.html` (required entry file)

## How background packs work in Opholio

1. A pack is uploaded as a `.zip` file in Admin.
2. The zip must contain `manifest.json` at the root.
3. `manifest.json` declares pack metadata and the entry file (`entry`).
4. Opholio uploads pack files to Blob storage, rewrites local asset paths in your entry HTML, and runs your entry in an iframe.
5. Controls from the manifest appear in Admin and are passed to the pack as URL query params and live `postMessage` updates.

Optional:

- `preview.png` at zip root is used as the card preview image in Admin.

## Zip structure (important)

Two zip layouts are accepted:

1. Preferred: files at zip root
2. Flexible: a single wrapper folder that contains all files

Preferred zip root:

```text
manifest.json
index.html
assets/...
preview.png (optional)
```

Also accepted:

```text
my-pack-folder/
  manifest.json
  index.html
```

## Manifest reference

`manifest.json` supports:

- `name` (string, required)
- `version` (string, required)
- `entry` (string, optional, defaults to `index.html`)
- `interactive` (boolean, optional, defaults to `false`)
- `allowExternal` (boolean, optional, defaults to `false`)
- `controls` (array, optional)

Control fields:

- `key` (string, required, URL-safe: letters/numbers/`_`/`-`)
- `label` (string, required)
- `type` (`toggle` | `number` | `select` | `text` | `color`, optional)
- `default` (optional)
- `min` / `max` / `step` (number controls)
- `options` (select controls)
- `help` (optional helper text)

## Runtime contract (inside your pack)

Your entry page receives:

- Query params:
  - `quality`: `low`, `med`, or `high`
  - `reducedMotion`: `true` or `false`
  - one query param for each control key
- `window.postMessage` events:
  - `{ type: "VIEWPORT", w, h, dpr }`
  - `{ type: "POINTER", active, x, y }` (for interactive packs)
  - `{ type: "CONFIG", ...controlValues }`

If your pack uses a canvas, listen for both so it resizes and updates live when settings change.

## Build your own pack

1. Copy one sample folder in this directory.
2. Edit `manifest.json` name/version/controls.
3. Edit `index.html` to implement your visuals.
4. Zip the folder contents (not the folder wrapper).
5. Upload via `/admin/backgrounds`.

PowerShell example from inside the sample folder:

```powershell
Compress-Archive -Path * -DestinationPath ..\my-pack.zip -Force
```

Bash example from inside the sample folder:

```bash
zip -r ../my-pack.zip .
```

## Notes

- Keep asset references relative (`./assets/file.png` or `assets/file.png`).
- Missing local references in your entry file will fail upload.
- External URLs are not rewritten.
- `interactive: false` means Opholio disables pointer events on the iframe.
