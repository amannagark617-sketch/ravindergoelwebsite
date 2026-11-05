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
  // Put the photo at public/images/ravinder-portrait.jpg and set this to that path.
  src: "" as string,
  alt: "Ravinder Goel, founder of Little Nap Recliners",
  heading: "A founder who started small and stayed close to the work.",
  body:
    "Ravinder Goel founded Little Nap Designs Pvt. Ltd., which makes Little Nap Recliners, on 15 July 2011. He is its Founder and CEO.",
};

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
