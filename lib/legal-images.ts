// Stock imagery bundled with the site. All of it is CC0, so no attribution is required;
// source pages are kept here so the licence of each file can be re-checked.
export const LEGAL_IMAGES = {
  justiceStatue: {
    src: "/images/legal/justice-statue.webp",
    width: 780,
    height: 623,
    alt: "Gold statue of Lady Justice, blindfolded, holding a sword and balanced scales",
    source: "https://www.rawpixel.com/image/5912904/image-public-domain-statue-free",
  },
  lawBooks: {
    src: "/images/legal/law-books.webp",
    width: 1200,
    height: 937,
    alt: "Leather-bound law reports stacked in front of a full bookshelf",
    source: "https://commons.wikimedia.org/w/index.php?curid=58022224",
  },
  magnaCarta: {
    src: "/images/legal/magna-carta.webp",
    width: 1600,
    height: 1011,
    alt: "Handwritten Latin text of Magna Carta on parchment",
    caption: "Magna Carta, 1215. British Library, Cotton MS Augustus II.106.",
    source: "https://commons.wikimedia.org/wiki/File:Magna_Carta_(1215)_-_BL_Cotton_MS_Augustus_II_106.jpg",
  },
  oldBaileyCourt: {
    src: "/images/legal/old-bailey-court.webp",
    width: 1920,
    height: 1280,
    alt: "Wood-panelled courtroom with the dock, counsel benches and a domed ceiling",
    caption: "Court No. 1, Central Criminal Court (the Old Bailey), London.",
    source: "https://commons.wikimedia.org/w/index.php?curid=175179943",
  },
  oldBaileyHall: {
    src: "/images/legal/old-bailey-grand-hall.webp",
    width: 1400,
    height: 1120,
    alt: "Marble hall with a domed ceiling, a statue on a plinth and an inscription about the scales of justice",
    caption: "The Grand Hall, Central Criminal Court (the Old Bailey), London.",
    source: "https://commons.wikimedia.org/wiki/File:Central_Criminal_Court_of_England_and_Wales_(The_Old_Bailey)_The_Grand_Hall.jpg",
  },
  royalCourts: {
    src: "/images/legal/royal-courts-of-justice.webp",
    width: 1600,
    height: 1067,
    alt: "Gothic stone front of the Royal Courts of Justice with a tall central spire",
    caption: "Royal Courts of Justice, London.",
    source: "https://commons.wikimedia.org/wiki/File:Royal_Courts_of_Justice_2019.jpg",
  },
  blackstone: {
    src: "/images/legal/blackstone-commentaries-1765.webp",
    width: 1000,
    height: 1349,
    alt: "Printed title page reading Commentaries on the Laws of England, Book the First, by William Blackstone, Oxford, 1765",
    caption: "Blackstone's Commentaries on the Laws of England, first edition, 1765.",
    source:
      "https://commons.wikimedia.org/wiki/File:William_Blackstone,_Commentaries_on_the_Laws_of_England_(1st_ed,_1765,_vol_I,_title_page).jpg",
  },
} as const;

// Energy and infrastructure photographs, also CC0 or public domain.
export const ENERGY_IMAGES = {
  offshorePlatform: {
    src: "/images/energy/offshore-platform.webp",
    width: 1600,
    height: 1200,
    alt: "Offshore oil and gas platform lit up at dusk, with a gas flare",
    source: "https://commons.wikimedia.org/wiki/File:Holstein_at_Dusk.jpg",
  },
  refinerySkyline: {
    src: "/images/energy/refinery-skyline.webp",
    width: 1600,
    height: 1067,
    alt: "Refinery towers on the horizon across dark water under a stormy sky",
    source: "https://commons.wikimedia.org/wiki/File:Refinery_near_New_Orleans,_United_States_(Unsplash_J-LMPtk8tmg).jpg",
  },
  powerTransmission: {
    src: "/images/energy/power-transmission.webp",
    width: 1600,
    height: 1200,
    alt: "High-voltage transmission towers and power lines against a blue sky",
    source: "https://commons.wikimedia.org/wiki/File:Anchor_pylon_of_high-voltage_overhead_power_line_750_kV.jpg",
  },
  highSpeedTrain: {
    src: "/images/energy/high-speed-train.webp",
    width: 1600,
    height: 1070,
    alt: "High-speed passenger train standing at a station platform",
    source: "https://commons.wikimedia.org/wiki/File:A_platform_on_Bamberg_station_and_a_high-speed_train.jpg",
  },
  openPitMine: {
    src: "/images/energy/open-pit-mine.webp",
    width: 1600,
    height: 1080,
    alt: "Aerial view of the terraced benches of a large open-pit mine",
    source:
      "https://commons.wikimedia.org/wiki/File:KENNECOTT_MINE_IS_THE_LARGEST_OPEN-PIT_COPPER_OPERATION_IN_THE_WORLD_-_NARA_-_544789.jpg",
  },
} as const;
