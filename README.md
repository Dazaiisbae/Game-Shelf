# Game Shelf (standalone)

Your Game Shelf app as its own website. It saves on your device, works offline, and opens from its own home screen icon.

## Put it online with GitHub Pages (free)

1. Sign in at github.com and create a new **public** repository, for example `game-shelf`.
2. Click **Add file > Upload files** and upload everything in this folder:
   `index.html`, `manifest.webmanifest`, `sw.js`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
   Click **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   pick the **main** branch and the **/(root)** folder, then **Save**.
4. Wait a minute or two. The page shows your address, like `https://YOUR-NAME.github.io/game-shelf/`.

## Add it to your iPhone home screen

1. Open that address in **Safari**.
2. Tap **Share > Add to Home Screen > Add**.
3. Open Game Shelf **from the new icon**. The home screen app has its own storage, separate from Safari tabs,
   so do everything from the icon from now on.

## Bring your collection over

1. In the old Claude version, open **Settings > Copy backup** (or **Save backup file**).
2. In the new app (opened from the icon), open **Settings > Restore**, paste the backup or choose the file,
   then tap **Restore backup** twice.

## Keep it safe

Your games live only on that device. Deleting the home screen app or clearing Safari website data erases them,
so tap **Settings > Save backup file** every so often and keep the file in iCloud Drive.

## Updating the app later

Upload a new `index.html` to the repository. If you change other files too, bump `CACHE` in `sw.js`
(for example `game-shelf-v2`) so phones pick up the new version. Close and reopen the app to load it.
