// All words on the site live here. Edit this file to change the story.

export const LINKEDIN = "https://www.linkedin.com/in/ravindergoel/";

export const person = {
  name: "Ravinder Goel",
  first: "Ravinder",
  last: "Goel",
  intro:
    "Founder and CEO of Little Nap Recliners. He believes comfort is not a luxury but a fundamental human experience.",
  companySite: "https://www.littlenap.in",
};

export const nav = [
  { href: "/journey", label: "Journey" },
  { href: "/la-z-boy", label: "La-Z-Boy" },
  { href: "/values", label: "Values" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/recognition", label: "Recognition" },
  { href: "/gallery", label: "Gallery" },
  { href: "/little-nap", label: "Little Nap" },
  { href: "/connect", label: "Connect" },
];

/* ---------- Photographs ---------- */

export const gallery = [
  { src: "/images/ravinder-portrait.jpg", w: 1333, h: 2000, alt: "Ravinder Goel in a navy suit against a dark studio backdrop" },
  { src: "/images/ravinder-relaxed.jpg", w: 1800, h: 1200, alt: "Ravinder Goel in a light jacket, seated in a recliner" },
  { src: "/images/ravinder-gesture.jpg", w: 1333, h: 2000, alt: "Ravinder Goel gesturing in a home theatre" },
  { src: "/images/ravinder-cinema-wide.jpg", w: 1500, h: 1000, alt: "Ravinder Goel seated in a cinema lounge with leather recliners" },
  { src: "/images/ravinder-lounge.jpg", w: 1333, h: 2000, alt: "Ravinder Goel leaning on a cream recliner" },
  { src: "/images/ravinder-showroom-arms.jpg", w: 1333, h: 2000, alt: "Ravinder Goel with arms crossed in a showroom" },
  { src: "/images/ravinder-studio-point.jpg", w: 1800, h: 1200, alt: "Ravinder Goel pointing upward against a dark backdrop" },
  { src: "/images/ravinder-showroom-standing.jpg", w: 1333, h: 2000, alt: "Ravinder Goel standing with hands in pockets in a showroom" },
  { src: "/images/ravinder-sofa-seated.jpg", w: 1800, h: 1200, alt: "Ravinder Goel seated on a grey recliner sofa" },
  { src: "/images/ravinder-theatre-hands.jpg", w: 1333, h: 2000, alt: "Ravinder Goel standing in a home theatre with open hands" },
  { src: "/images/ravinder-cinema-seated.jpg", w: 1500, h: 1000, alt: "Ravinder Goel seated in a brown leather cinema recliner" },
  { src: "/images/ravinder-showroom-lean.jpg", w: 1333, h: 2000, alt: "Ravinder Goel standing beside a leather recliner" },
  { src: "/images/ravinder-cinema-grey.jpg", w: 1500, h: 1000, alt: "Ravinder Goel seated among grey cinema recliners" },
  { src: "/images/ravinder-showroom-smile.jpg", w: 1333, h: 2000, alt: "Ravinder Goel smiling with arms crossed in a showroom" },
  { src: "/images/ravinder-red-wall.jpg", w: 1333, h: 2000, alt: "Ravinder Goel standing in front of a red feature wall" },
];

/* ---------- Home ---------- */

export const portrait = {
  src: "/images/ravinder-portrait.jpg",
  alt: "Ravinder Goel in a navy suit against a dark studio backdrop",
  heading: "Comfort is not a luxury. It's a fundamental human experience.",
  body:
    "Ravinder Goel started Little Nap in July 2011 with a ₹5 lakh credit card loan, a 600 sq. ft. display area and a team of three. Fifteen years later it is a self-funded group of 470+ people.",
};

export const origin = [
  "It began with ",
  { n: 5, prefix: "₹", suffix: " lakh" },
  ", ",
  { n: 3 },
  " people and ",
  { n: 600 },
  " square feet. Today it is ",
  { n: 470, suffix: "+" },
  " people, ",
  { n: 2 },
  " factories and ",
  { n: 18 },
  " showrooms.",
];

export const vision = {
  label: "His vision",
  text: "To redefine comfort as an experience.",
};

export const homeIndex = [
  { href: "/journey", title: "Journey", note: "From failed entrance exams to a ₹100 crore+ brand.", img: "/images/ravinder-lounge.jpg" },
  { href: "/la-z-boy", title: "La-Z-Boy", note: "How La-Z-Boy came to India through Little Nap.", img: "/images/ravinder-gesture.jpg" },
  { href: "/values", title: "Values", note: "The DNA and five core values he built Little Nap on.", img: "/images/ravinder-sofa-seated.jpg" },
  { href: "/beliefs", title: "Beliefs", note: "What he believes about comfort, customers and teams.", img: "/images/ravinder-studio-point.jpg" },
  { href: "/recognition", title: "Recognition", note: "Awards, press and podcasts.", img: "/images/ravinder-showroom-smile.jpg" },
  { href: "/gallery", title: "Gallery", note: `${gallery.length} photographs.`, img: "/images/ravinder-cinema-seated.jpg" },
  { href: "/little-nap", title: "Little Nap", note: "The company, the group and its partners.", img: "/images/ravinder-showroom-arms.jpg" },
  { href: "/connect", title: "Connect", note: "His LinkedIn and every Little Nap handle in one place.", img: "/images/ravinder-red-wall.jpg" },
];

/* ---------- Journey ---------- */

export type Chapter = {
  img?: string;
  art?: string;
  year: string;
  title: string;
  body: string;
  facts?: string[];
  href?: string;
  hrefLabel?: string;
};

export const chapters: Chapter[] = [
  {
    year: "Khanpur",
    title: "A middle-class boy from Khanpur.",
    art: "khanpur",
    body:
      "Ravinder Goel grew up in a middle-class family in Khanpur. Everything that follows started from there.",
  },
  {
    year: "Setback",
    title: "He failed, then started over.",
    art: "setback",
    body:
      "After long hours of study, he failed several MBA entrance exams and felt lost. He swallowed his pride, bought a fifth-grade math book to rebuild the basics, and began again.",
  },
  {
    year: "2002",
    title: "A management degree in Mumbai.",
    art: "mba",
    body:
      "From 2002 to 2004 he studied for a Master of Management Studies at Welingkar Institute of Management, and was elected a member of its Managing Council.",
    facts: [
      "BBA, Apeejay School of Management, and B.Com, Delhi University: 1997 to 2000",
      "M.Com, Annamalai University: 2000 to 2002",
    ],
  },
  {
    year: "2004",
    title: "Learning to sell.",
    art: "door-to-door",
    body:
      "He learned sales from scratch, knocking on the doors of houses under construction. Over the next seven years he worked across jewellery retail, luxury interiors and furniture distribution.",
    facts: [
      "2004 to 2006: North India retail, Carbon Accessories",
      "2006 to 2008: sales and marketing, Mon Chateau, Bengaluru",
      "2008 to 2011: all-India furniture sales, R.I.P.L.",
    ],
  },
  {
    year: "2011",
    title: "He noticed people didn't want to get up.",
    img: "/images/ravinder-sofa-seated.jpg",
    body:
      "Recliners were far from mainstream in India. He noticed that the moment customers sat on one, they didn't want to get up. He saw an experience, not just furniture.",
  },
  {
    year: "Day one",
    title: "₹5 lakh, one room, three people.",
    art: "day-one",
    body:
      "In July 2011 he started Little Nap with a credit card loan of ₹5 lakh, a 600 sq. ft. display area and a team of three. He handled sales, dispatch and invoicing himself, including midnight dispatches.",
  },
  {
    year: "2015",
    title: "Recognised in Dubai.",
    img: "/images/ravinder-showroom-smile.jpg",
    body:
      "He was named The World's Greatest Leader 2015 for Asia and the GCC, selected among 120 business leaders from more than 1,100 nominations. The award was presented at the Jumeirah Tower Hotel in Dubai.",
  },
  {
    year: "2018",
    title: "A purple ticket on national television.",
    img: "/images/ravinder-gesture.jpg",
    body:
      "At the Franchise India Show on Times Now, he presented Little Nap Recliners to the jury on India's biggest business reality show. Little Nap won the purple ticket.",
  },
  {
    year: "2020",
    title: "La-Z-Boy chose Little Nap.",
    img: "/images/ravinder-lounge.jpg",
    body:
      "In April 2020, during the lockdown, Little Nap signed its first contract with La-Z-Boy and became the brand's exclusive partner in India.",
    facts: [
      "La-Z-Boy's stated reasons: business ethics, core values, the team and ten years of growth",
    ],
    href: "/la-z-boy",
    hrefLabel: "Read the La-Z-Boy story",
  },
  {
    year: "Tested",
    title: "He kept going through the hard years.",
    body:
      "Press profiles credit his resilience through the pandemic and a factory fire.",
  },
  {
    year: "2022",
    title: "From one room to twelve showrooms.",
    img: "/images/ravinder-showroom-standing.jpg",
    body:
      "By 2022 Little Nap had grown from a 600 sq. ft. showroom to 12 showrooms and 75,000 sq. ft. of production units.",
  },
  {
    year: "2023",
    title: "Leading beyond his own company.",
    img: "/images/ravinder-showroom-arms.jpg",
    body:
      "In March 2023 he became Vice President, North India Chapter, of AFMT, India's only furniture association with a nationwide presence and 350+ members. In December 2023 Welingkar gave him its Pride of Welingkar Award for entrepreneurial success.",
  },
  {
    year: "2026",
    title: "Fifteen years on.",
    img: "/images/ravinder-cinema-wide.jpg",
    body:
      "Little Nap now runs 2 factories and 18 showrooms with a team of 470+, and a monthly capacity of 5,000 recliners. Its seats are in 1,300+ cinema screens. In February 2026 the Indian Achievers Forum named him Entrepreneur of the Year.",
  },
  {
    year: "Next",
    title: "Creation, not imitation.",
    img: "/images/ravinder-studio-point.jpg",
    body:
      "His guiding belief is that India can lead in comfort innovation, not by imitation, but by creation. His vision is to redefine comfort as an experience.",
  },
];

/* ---------- La-Z-Boy ---------- */

export type Stop = {
  img?: string;
  place: string;
  label: string;
  year?: string;
  lon: number;
  lat: number;
  k: number;
  title: string;
  body: string;
};

export const laZBoy = {
  intro:
    "From Monroe, Michigan in 1927 to Thailand and across Asia, then to the exclusive partnership in India in 2020. Scroll to fly the route.",
  stops: [
    {
      place: "Monroe, Michigan",
      label: "La-Z-Boy",
      lon: -83.4,
      lat: 41.9,
      k: 1.25,
      year: "1927",
      title: "It starts in Monroe, Michigan.",
      body:
        "Cousins Edward Knabusch and Edwin Shoemaker start a furniture business in Monroe and design a reclining wood-slat porch chair. A naming contest gives the chair its name: La-Z-Boy.",
    },
    {
      place: "Thailand",
      label: "Thailand",
      lon: 100.5,
      lat: 13.75,
      k: 1.2,
      year: "1998",
      title: "Asia begins in Thailand.",
      body:
        "La-Z-Boy Thailand is set up as a joint venture between Thai and New Zealand partners and La-Z-Boy USA, to make recliners for La-Z-Boy. Its capacity at the start is 1,200 seats a year.",
    },
    {
      place: "Chon Buri, Thailand",
      label: "Chon Buri",
      lon: 101.0,
      lat: 13.36,
      k: 3.0,
      year: "2004",
      title: "A factory that serves the world.",
      body:
        "A new factory is built in Chon Buri province to meet rising demand. Annual capacity now reaches 156,000 seats, and about 90% is exported. La-Z-Boy Asia now covers over 18 countries.",
    },
    {
      place: "India",
      label: "India",
      lon: 78.9,
      lat: 22.5,
      k: 2.1,
      year: "2020",
      title: "The exclusive partnership for India.",
      body:
        "In April 2020, during the lockdown, Little Nap signed its first contract with La-Z-Boy and became its exclusive partner in India.",
    },
    {
      place: "Delhi",
      label: "Delhi",
      lon: 77.2,
      lat: 28.6,
      k: 2.8,
      year: "2022",
      title: "La-Z-Boy meets the team.",
      body:
        "Little Nap is headquartered in New Delhi. On 12 December 2022 La-Z-Boy visited for the first time to meet the team.",
    },
    {
      place: "Little Nap",
      label: "Little Nap",
      lon: 77.15,
      lat: 28.49,
      k: 3.4,
      year: "2023",
      title: "Signed in person.",
      body:
        "On 20 April 2023 a contract ceremony was held at Little Nap's office, attended by La-Z-Boy's Asia team.",
    },
  ] as Stop[],
  whyTitle: "Why they chose Little Nap",
  why:
    "According to CEO Insights, La-Z-Boy selected Little Nap as its authorised partner in India because of its business ethics and core values, its team, and its growth over ten years.",
  timeline: [
    { date: "1927", text: "Edward Knabusch and Edwin Shoemaker start La-Z-Boy in Monroe, Michigan." },
    { date: "1998", text: "La-Z-Boy Thailand begins as a joint venture with Thai and New Zealand partners." },
    { date: "2004", text: "The Chon Buri factory in Thailand is built to meet rising demand." },
    { date: "April 2020", text: "First contract signed during the lockdown. Little Nap becomes La-Z-Boy's exclusive partner in India." },
    { date: "October 2022", text: "A La-Z-Boy business meeting is held in the USA." },
    { date: "12 December 2022", text: "La-Z-Boy visits for the first time to meet the team." },
    { date: "March 2023", text: "Little Nap's team attends a La-Z-Boy conference and receives a partner recognition award." },
    { date: "20 April 2023", text: "A contract ceremony is held at Little Nap's office, attended by La-Z-Boy's Asia team." },
  ],
  sources: [
    { label: "La-Z-Boy on Wikipedia", href: "https://en.wikipedia.org/wiki/La-Z-Boy" },
    { label: "La-Z-Boy Thailand, AmCham Thailand", href: "https://connect.amchamthailand.com/list/member/la-z-boy-thailand-ltd-2271" },
    { label: "La-Z-Boy India", href: "https://la-z-boyindia.com/" },
  ],
  links: [
    { label: "Watch the founder tell the story", href: "https://x.com/LittleNap1/status/1898580754768306588" },
    { label: "Shop La-Z-Boy at Little Nap", href: "https://www.littlenap.in/lazboy" },
    { label: "About La-Z-Boy at Little Nap", href: "https://www.littlenap.in/about-lazyboy" },
    { label: "La-Z-Boy India", href: "https://www.la-z-boyindia.com/" },
  ],
};

/* ---------- Beliefs ---------- */

export const beliefs = [
  { label: "On comfort", text: "Comfort is not a luxury. It's a fundamental human experience." },
  { label: "On design", text: "Design is not just about aesthetics, it's how we shape emotion, behaviour and memory." },
  { label: "On the home, on the High Life podcast", text: "A good home without a couple of recliners is not complete." },
  { label: "On customers", text: "The customer always comes first." },
  { label: "On India", text: "India can lead in comfort innovation, not by imitation, but by creation." },
  { label: "On teams, at the Q2 review on 8 October 2026", text: "When leaders give the plan, people listen. When teams shape the plan, they own it." },
  { label: "On learning", text: "We are all students for life." },
  { label: "The values he returns to", text: "Truth. Simplicity. Humility. Peace." },
];

/* ---------- Recognition ---------- */

export type Entry = { year: string; title: string; source: string; note?: string; href?: string };

export const recognition: { awards: Entry[]; press: Entry[]; talks: Entry[] } = {
  awards: [
    {
      year: "2026",
      title: "Entrepreneur of the Year 2026",
      source: "Indian Achievers Forum",
      note: "For entrepreneurial leadership, manufacturing excellence and contribution to India's premium furniture and recliner industry, under the vision of Viksit Bharat 2047.",
      href: "https://www.iafindia.com/mr-ravinder-goel/",
    },
    { year: "2025", title: "10 Best Business Leaders in India 2025", source: "TradeFlock", href: "https://tradeflock.com/ravinder-goel-10-best-business-leaders-in-india-2025" },
    {
      year: "2023",
      title: "Pride of Welingkar Award, Entrepreneurial Success",
      source: "Welingkar Institute of Management",
      note: "A distinguished alumnus honour, awarded at the Annual Alumni Awards ceremony in Mumbai in December 2023.",
    },
    {
      year: "2023",
      title: "100 Inspiring Entrepreneurs of India 2023",
      source: "The Entrepreneurs of India",
      href: "https://www.theentrepreneursofindia.in/post/ravinder-goel-100-inspiring-entrepreneurs-of-india-2023",
    },
    {
      year: "2015",
      title: "The World's Greatest Leader 2015, Asia and GCC",
      source: "URS Group and PwC",
      note: "Selected among 120 business leaders from more than 1,100 nominations. Presented in Dubai in December 2015.",
    },
  ],
  press: [
    { year: "2026", title: "How Ravinder Goel Made Little Nap the Go-To for Ultimate Comfort", source: "Sugermint", href: "https://sugermint.com/ravinder-goel/" },
    {
      year: "2025",
      title: "Ravinder Goel: Redefining Comfort with Craft, Conviction, and a Cause",
      source: "The Business Fame",
      note: "From the issue naming The Most Influential Leaders to Follow in 2025.",
      href: "https://thebusinessfame.com/magazines/digital/the-most-influential-leaders-to-follow-in-2025-vol04/#page=1",
    },
    {
      year: "2023",
      title: "Little Nap Recliners: A Brand Committed to Elevating the Future of the Recliner Industry Worldwide",
      source: "Prime Insights",
      href: "https://primeinsights.in/little-nap-recliners/",
    },
    {
      year: "2022",
      title: "Meet Ravinder Goel, Brain Behind the Little Nap Recliner",
      source: "The Entrepreneurs of India",
      href: "https://www.theentrepreneursofindia.in/post/meet-ravinder-goel-brain-behind-the-little-nap-recliner",
    },
    {
      year: "2021",
      title: "Top 10 Luxury Brand Leaders in Sofa 2021",
      source: "CEO Insights magazine",
      note: "November 2021 cover feature.",
      href: "https://www.ceoinsightsindia.com/leader/ravinder-goel-steering-indian-furniture-industry-to-a-promising-future-cid-3371.html",
    },
    {
      year: "2019",
      title: "Rendering Comfort at the Top-Notch: Little Nap Recliners",
      source: "Theater World",
      href: "https://www.littlenap.in/sites/default/files/theater-world1.pdf",
    },
  ],
  talks: [
    { year: "2026", title: "From 5 Lacs to 100Cr+: The Inspiring Journey of Ravinder Goel", source: "High Life podcast", note: "Recorded at the Little Nap experience centre in Panipat.", href: "https://youtu.be/59Su9Sp2uDw" },
    { year: "2025", title: "How He Built a ₹100 Crore Furniture Empire", source: "Personal story episode", note: "On failed entrance exams, a fifth-grade math book and learning sales door to door.", href: "https://youtu.be/lZpzhJfoxog" },
    { year: "2025", title: "How One Simple Observation Built a ₹100 Crore Brand", source: "Podcast", note: "On the 2011 observation that customers on a recliner didn't want to get up.", href: "https://www.youtube.com/watch?v=h8XsLDtAtxQ&t=752s" },
    { year: "2019", title: "Business Ki Aawaz", source: "Janta TV, 7 September 2019", note: "A full interview on his entrepreneurial journey and business challenges.", href: "https://www.youtube.com/watch?v=pYPJTgM-lv8" },
    { year: "2018", title: "Franchise India Show 2018", source: "Times Now", note: "Little Nap won the purple ticket.", href: "http://www.youtube.com/watch?v=DclbyzaTmvE" },
  ],
};

/* ---------- Little Nap ---------- */

export const littleNap = {
  intro:
    "The company Ravinder Goel founded in July 2011 with ₹5 lakh, a 600 sq. ft. display area and a team of three.",
  today: [
    "Today it is a self-funded group of ",
    { n: 470, suffix: "+" },
    " people, ",
    { n: 2 },
    " factories and ",
    { n: 18 },
    " exclusive showrooms, with a monthly capacity of ",
    { n: 5000 },
    " recliners.",
  ],
  cinema: [
    "Its seats are in ",
    { n: 1300, suffix: "+" },
    " cinema screens, trusted by PVR INOX, Cinepolis and NY Cinemas.",
  ],
  placesTitle: "Where you find it",
  places: ["Homes", "Home theatres", "Multiplexes", "Hospitals", "Clubhouses", "Luxury buses"],
  craft:
    "German engineering, Indian craftsmanship and global design, with a 67-point quality inspection system to standardise durability and reliability.",
  groupTitle: "The Little Nap Group",
  group: [
    {
      name: "Little Nap Designs Pvt. Ltd.",
      text: "The company he founded in July 2011, which makes Little Nap Recliners. It runs 2 manufacturing units at IMT Manesar, Haryana, and 18 exclusive showrooms.",
    },
    {
      name: "La-Z-Boy India",
      text: "Little Nap is La-Z-Boy's exclusive partner in India. The recliners are made to its standards under the licence of La-Z-Boy, Incorporated, Michigan, USA.",
      href: "/la-z-boy",
      hrefLabel: "Read how it happened",
    },
    {
      name: "Seating Spectrum, Malaysia",
      text: "A global partner and joint venture. The first Seating Spectrum chairs made in India were produced at the Little Nap factory and launched at Big Cine Expo 2026 in Chennai, on 18 and 19 August 2026.",
    },
    {
      name: "AC Seating",
      text: "A joint venture that makes standard cinema and auditorium chairs using Malaysian technology.",
    },
    {
      name: "Contract manufacturing",
      text: "The factories also make furniture for other brands.",
    },
  ],
  outro: "Joy of Comfort",
};

/* ---------- Connect ---------- */

export type QuickLink = { label: string; handle: string; href: string };

export const connect: { group: string; links: QuickLink[] }[] = [
  {
    group: "Ravinder Goel",
    links: [{ label: "LinkedIn", handle: "in/ravindergoel", href: LINKEDIN }],
  },
  {
    group: "Little Nap on social media",
    links: [
      { label: "Instagram", handle: "@little_nap_recliners", href: "https://www.instagram.com/little_nap_recliners/" },
      { label: "Facebook", handle: "/littlenap", href: "https://www.facebook.com/littlenap" },
      { label: "YouTube", handle: "Little Nap channel", href: "https://www.youtube.com/channel/UCKFQ0fpFxWHKlBPHYnQErvQ" },
      { label: "LinkedIn", handle: "company/little-nap", href: "https://www.linkedin.com/company/little-nap" },
      { label: "X", handle: "@LittleNap1", href: "https://twitter.com/LittleNap1" },
      { label: "WhatsApp", handle: "Chat with Little Nap", href: "https://api.whatsapp.com/send?phone=9667725859&text=Start" },
    ],
  },
  {
    group: "La-Z-Boy India",
    links: [
      { label: "Instagram", handle: "@lazboyindia", href: "https://www.instagram.com/lazboyindia" },
      { label: "Facebook", handle: "/Lazboyindiaonline", href: "https://www.facebook.com/Lazboyindiaonline" },
      { label: "Website", handle: "la-z-boyindia.com", href: "https://www.la-z-boyindia.com/" },
      { label: "Shop La-Z-Boy", handle: "littlenap.in/lazboy", href: "https://www.littlenap.in/lazboy" },
    ],
  },
  {
    group: "The products",
    links: [
      { label: "Living room recliners", handle: "littlenap.in", href: "https://www.littlenap.in/living-room-recliners" },
      { label: "Home theatre recliners", handle: "littlenap.in", href: "https://www.littlenap.in/home-theater-recliners" },
      { label: "Multiplex recliners", handle: "littlenap.in", href: "https://www.littlenap.in/multiplex-recliners" },
      { label: "Loungers", handle: "littlenap.in", href: "https://www.littlenap.in/lounger" },
      { label: "Massage chairs", handle: "littlenap.in", href: "https://www.littlenap.in/massage-chair" },
      { label: "Hospitals", handle: "littlenap.in", href: "https://www.littlenap.in/hospitals" },
      { label: "Clubhouses", handle: "littlenap.in", href: "https://www.littlenap.in/club-houses" },
      { label: "Automobiles", handle: "littlenap.in", href: "https://www.littlenap.in/automobiles" },
      { label: "E-catalogue", handle: "Download", href: "https://www.littlenap.in/download" },
    ],
  },
  {
    group: "More from Little Nap",
    links: [
      { label: "Website", handle: "littlenap.in", href: "https://www.littlenap.in" },
      { label: "Find a showroom", handle: "littlenap.in/showroom", href: "https://www.littlenap.in/showroom" },
      { label: "Blog", handle: "littlenap.in/blog", href: "https://www.littlenap.in/blog" },
      { label: "Videos", handle: "littlenap.in/video", href: "https://www.littlenap.in/video" },
      { label: "Events", handle: "littlenap.in/event", href: "https://www.littlenap.in/event" },
      { label: "Awards", handle: "littlenap.in/awards", href: "https://www.littlenap.in/awards" },
      { label: "Franchise", handle: "littlenap.in/franchise", href: "https://www.littlenap.in/franchise" },
      { label: "Contact", handle: "littlenap.in/contact", href: "https://www.littlenap.in/contact" },
    ],
  },
];

/* ---------- Values (from Little Nap's own DNA and Core Values posters) ---------- */

export const dna = [
  { label: "Our vision", text: "To redefine the future of comfort and create an Indian legacy that reaches the world." },
  { label: "Our mission", text: "Delivering comfort with commitment: through innovation, customized seating, uncompromising quality and experiences that stay with every customer." },
  { label: "Our purpose", text: "We exist to make every moment worth sinking into." },
  { label: "Our culture", text: "Karo Toh Sabki Baat Karo. If you speak, speak for all." },
  { label: "Our brand promise", text: "Comfort You Can Feel. A Brand You Can Trust." },
];

export const coreValues = [
  { name: "Customer First", line: "Customer is God.", text: "Feel what the customer feels. Listen to everyone. Follow up. Customers include our clients, our vendors and our own people." },
  { name: "Integrity", line: "No wrong pitch, ever.", text: "Never cheat. Never promise what we don't have. Be straightforward, honest and truthful." },
  { name: "Ownership", line: "Act like it is your own company.", text: "Take ownership and accountability for the outcome, not just the task." },
  { name: "Learning", line: "The more you learn, the more you implement.", text: "Learning never stops, for any of us. We keep growing, one lesson at a time." },
  { name: "One Team, One Dream", line: "Unity in diversity.", text: "Teamwork, zero politics, transparency from top to bottom, and learning and growing together." },
];

/* ---------- Journey globe ---------- */

export const journeyStops: Stop[] = [
  {
    place: "Khanpur",
    label: "Khanpur",
    lon: 77.23,
    lat: 28.5,
    k: 3.2,
    year: "Roots",
    title: "A middle-class boy from Khanpur.",
    body: "Ravinder Goel grew up in a middle-class family in Khanpur. Everything that follows started from there.",
  },
  {
    place: "Mumbai",
    label: "Mumbai",
    lon: 72.85,
    lat: 19.03,
    k: 2.6,
    year: "2002",
    title: "A management degree in Mumbai.",
    body: "From 2002 to 2004 he studied for a Master of Management Studies at Welingkar Institute of Management, and was elected a member of its Managing Council.",
  },
  {
    place: "Bengaluru",
    label: "Bengaluru",
    lon: 77.59,
    lat: 12.97,
    k: 2.6,
    year: "2006",
    title: "Learning to sell.",
    body: "He learned sales from scratch, knocking on the doors of houses under construction. From 2006 to 2008 he worked in sales and marketing at Mon Chateau, Bengaluru, in luxury interiors.",
  },
  {
    place: "New Delhi",
    label: "New Delhi",
    lon: 77.2,
    lat: 28.6,
    k: 3,
    year: "2011",
    title: "₹5 lakh, one room, three people.",
    body: "In July 2011 he started Little Nap with a credit card loan of ₹5 lakh, a 600 sq. ft. display area and a team of three. He handled sales, dispatch and invoicing himself, including midnight dispatches.",
  },
  {
    place: "Dubai",
    label: "Dubai",
    lon: 55.27,
    lat: 25.2,
    k: 2.4,
    year: "2015",
    img: "/images/ravinder-showroom-smile.jpg",
    title: "Recognised in Dubai.",
    body: "He was named The World's Greatest Leader 2015 for Asia and the GCC, selected among 120 business leaders from more than 1,100 nominations, at the Jumeirah Tower Hotel.",
  },
  {
    place: "India",
    label: "India",
    lon: 78.9,
    lat: 22.5,
    k: 2.1,
    year: "2020",
    img: "/images/ravinder-lounge.jpg",
    title: "La-Z-Boy chose Little Nap.",
    body: "In April 2020, during the lockdown, Little Nap signed its first contract with La-Z-Boy and became its exclusive partner in India.",
  },
  {
    place: "Thailand",
    label: "Thailand",
    lon: 100.5,
    lat: 13.75,
    k: 1.6,
    year: "2023",
    img: "/images/ravinder-gesture.jpg",
    title: "A conference in Thailand.",
    body: "In March 2023 Little Nap's team attended a La-Z-Boy conference in Thailand and received a partner recognition award.",
  },
  {
    place: "Mumbai, again",
    label: "Mumbai",
    lon: 72.85,
    lat: 19.03,
    k: 2.6,
    year: "Dec 2023",
    img: "/images/ravinder-showroom-arms.jpg",
    title: "Back to Welingkar.",
    body: "Welingkar gave him its Pride of Welingkar Award for entrepreneurial success at the Annual Alumni Awards ceremony in Mumbai.",
  },
  {
    place: "Manesar",
    label: "Manesar",
    lon: 76.94,
    lat: 28.36,
    k: 3.2,
    year: "2026",
    img: "/images/ravinder-cinema-wide.jpg",
    title: "Fifteen years on.",
    body: "Little Nap now runs 2 factories and 18 showrooms with a team of 470+, and a monthly capacity of 5,000 recliners. Its seats are in 1,300+ cinema screens.",
  },
];
