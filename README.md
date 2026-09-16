# Tagalong Hikers — Complete Website

A static HTML/CSS/JavaScript hiking website using the Tagalong Hikers black/gold/cream brand palette.

## Included
- Responsive modern dark-first design
- Bordered buttons throughout
- No arrow symbols used in buttons/links
- Hero photography
- Upcoming hikes with date, location, distance, difficulty and price
- Hike details: route, elevation, duration, meeting point, packing list, included items and safety information
- Hike categories and search/filtering
- Booking/registration form with emergency contact
- Registration reference confirmation
- Interactive OpenStreetMap/Leaflet maps
- Route/elevation visualisation
- About, guides, gallery and contact pages
- Weather forecast using Open-Meteo
- Testimonials
- Light/dark theme switch
- Responsive mobile navigation
- Subtle animations and hover effects
- Next Adventure section
- Social/video placeholders
- Actual uploaded Tagalong Hikers logo

## Important before publishing
1. Replace sample Unsplash photography with Tagalong Hikers' own photographs.
2. Replace the placeholder phone number and email.
3. Connect the booking/contact forms to your real backend or email service.
4. Connect your official payment method rather than collecting payment-card details in the form.
5. Confirm trail coordinates, dates, prices, access rules and safety information before publishing.
6. The weather widget requires an internet connection.
7. The maps use Leaflet and OpenStreetMap tiles via CDN, so they require an internet connection.

## Run locally
Open index.html in a browser, or use VS Code Live Server.


## Custom Hero Image
The animated hero has been removed. To use your own hero photo:

1. Choose a high-resolution hiking/adventure image, ideally landscape (16:9 or wider).
2. Rename it to `hero-image.jpg`.
3. Place it inside the `assets` folder, replacing the existing placeholder if present.
4. Open `index.html`. The image automatically fills the entire hero section.

The hero uses `object-fit: cover`, a dark left-side overlay for readable text, and responsive positioning so the image blends into the design on desktop and mobile.
