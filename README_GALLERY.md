# Tagalong Hikers — Read-only hike gallery

## What changed
- Each hike has its own clickable album, including the Karura Forest starter album.
- Buttons use clear text (no arrow icons), with hover, pressed and focus states.
- The photo viewer uses **Previous**, **Next**, and **Close** controls.
- The public gallery contains no image or hike editing controls.
- An authenticated admin dashboard will be added later; no temporary public editor is deployed.

## Install
Copy `gallery.html` to the website root and copy `assets/gallery.js`, `assets/gallery-data.js`, `assets/styles.css`, and `assets/script.js` into the existing website's `assets/` directory. Preserve the other HTML files and your existing `images/` directory. Use a local server such as VS Code Live Server for testing.

## Adding photos before the admin dashboard exists
For now, a developer can update `assets/gallery-data.js`. Add a photo entry under the correct hike using an image placed in the site's `images/` folder, e.g. `{id:'karura-1',url:'images/karura/photo-1.jpg',caption:'Forest walk'}`. Changes to that file become visible to all visitors after deployment. The future admin dashboard can manage this content through a secure API and persistent image storage.

## Notes
The supplied files did not include the original image assets; some existing references may show broken images until the matching `images/` folder is copied into the website. Karura starts as an empty album intentionally. This package is an update to the existing site, not the complete site.
