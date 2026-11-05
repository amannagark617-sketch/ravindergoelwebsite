// All words on the site live here. Edit this file to change the story.

export const person = {
  name: "Ravinder Goel",
  first: "Ravinder",
  last: "Goel",
  role: "Founder and CEO, Little Nap Recliners",
  intro: "Founder of Little Nap Recliners. Making the Joy of Comfort since 2011.",
  companySite: "https://www.littlenap.in",
};

export const portrait = {
  src: "/images/ravinder-portrait.jpg",
  alt: "Ravinder Goel, founder of Little Nap Recliners",
  heading: "Founder and CEO of Little Nap Recliners.",
  body:
    "Ravinder Goel founded Little Nap Designs Pvt. Ltd., which makes Little Nap Recliners, on 15 July 2011. He is its Founder and CEO.",
};

export const gallery = [
  { src: "/images/ravinder-relaxed.jpg", w: 1800, h: 1200, alt: "Ravinder Goel relaxing in a recliner" },
  { src: "/images/ravinder-gesture.jpg", w: 1333, h: 2000, alt: "Ravinder Goel speaking in a home theatre" },
  { src: "/images/ravinder-cinema-wide.jpg", w: 1500, h: 1000, alt: "Ravinder Goel seated in a cinema lounge" },
  { src: "/images/ravinder-lounge.jpg", w: 1333, h: 2000, alt: "Ravinder Goel leaning on a recliner" },
  { src: "/images/ravinder-showroom-arms.jpg", w: 1333, h: 2000, alt: "Ravinder Goel in a showroom with arms crossed" },
  { src: "/images/ravinder-showroom-standing.jpg", w: 1333, h: 2000, alt: "Ravinder Goel standing in a showroom" },
];

export const chapters = [
  {
    year: "2011",
    title: "It began with three people.",
    body:
      "On 15 July 2011 Little Nap started with ₹5 lakh, a team of three and a 600 square foot space.",
  },
  {
    year: "Why",
    title: "One idea, printed on the logo.",
    body:
      "Everything the company makes serves one line: Joy of Comfort. Recliners, recliner sofas and home theatre seating all begin there.",
  },
  {
    year: "Today",
    title: "A group of more than 470 people.",
    body:
      "The Little Nap Group now employs over 470 people and sells across India.",
  },
  {
    year: "Next",
    title: "Comfort that travels.",
    body:
      "The goal is to bring the Joy of Comfort wherever India sits, and to take Made-in-India comfort to the world.",
  },
];

export const beginning = {
  before: "It began with ₹",
  startLakh: 5,
  mid1: " lakh, ",
  team: 3,
  mid2: " people and ",
  sqft: 600,
  mid3: " square feet. Today it is a group of ",
  people: 470,
  after: " people.",
};

export const vision = {
  label: "The vision",
  text:
    "To bring the Joy of Comfort wherever India sits and take Made-in-India comfort to the world.",
};

export const writing = {
  heading: "Writing",
  empty: "Essays and interviews will be published here.",
  posts: [] as { slug: string; title: string; date: string; summary: string }[],
};
