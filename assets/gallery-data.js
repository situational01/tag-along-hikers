/* Starter albums. Photos here are existing paths from the original site.
   Public gallery content is read-only. Add hikes and photos to this data
   file during development. A secure admin dashboard can later manage this
   same album structure through a database/API. */
window.TAGALONG_GALLERY_DEFAULTS = [
  {
    id: "karura",
    name: "Karura Forest",
    location: "Nairobi, Kenya",
    date: "",
    description: "Discover moments from our Karura Forest walks.",
    cover: "",
    photos: [],
  },
  {
    id: "recent-hikes",
    name: "Recent Hikes",
    location: "Tagalong Hikers",
    date: "2025",
    description:
      "Photos from previous adventures. Move them to specific hikes as you organise your collection.",
    cover: "images/hero_section/kim subday 2025-49.jpg",
    photos: [
      {
        id: "existing-1",
        url: "images/hero_section/kim subday 2025-49.jpg",
        caption: "Hikers on a mountain trail",
      },
      {
        id: "existing-2",
        url: "images/hero_section/kim subday 2025-358.jpg",
        caption: "Mountain landscape",
      },
      {
        id: "existing-3",
        url: "images/hero_section/kim subday 2025-347.jpg",
        caption: "Forest trail",
      },
      {
        id: "existing-4",
        url: "images/hero_section/kim subday 2025-436.jpg",
        caption: "Waterfall",
      },
      {
        id: "existing-5",
        url: "images/hero_section/kim subday 2025-350.jpg",
        caption: "Mountain ridge",
      },
    ],
  },
];
