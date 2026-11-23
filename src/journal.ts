export type Source = { label: string; href: string };
export type Block = { h?: string; p: string[] };
export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  minutes: number;
  topic: string;
  body: Block[];
  sources: Source[];
  related: Source[];
};

const LI: Source = { label: "Ravinder Goel on LinkedIn", href: "https://www.linkedin.com/in/ravindergoel/" };
const PUBLISHED = "2026-11-24";

export const articles: Article[] = [
  {
    slug: "from-5-lakh-to-100-crore",
    title: "From ₹5 lakh to ₹100 crore: how Ravinder Goel started Little Nap",
    description:
      "In July 2011 Ravinder Goel started Little Nap Recliners with a ₹5 lakh credit card loan, a 600 sq. ft. display area and a team of three. This is how the first years went.",
    date: PUBLISHED,
    minutes: 4,
    topic: "Founder story",
    body: [
      {
        p: [
          "Little Nap Recliners began in July 2011. Ravinder Goel had left a job in furniture sales and had no outside investor. The money was a ₹5 lakh loan on a single credit card. The business was a 600 sq. ft. display area and a team of three.",
          "Fifteen years later the company says it has two factories, 18 showrooms, more than 470 people and a turnover above ₹100 crore, without outside funding.",
        ],
      },
      {
        h: "The first door was closed",
        p: [
          "In an interview with FounderGyaan that he shared on LinkedIn, Ravinder describes what happened when he quit his job. He went to friends expecting them to invest. Every one said no. He says that was when he understood that the world salutes the rising sun, and decided to bet on himself.",
        ],
      },
      {
        h: "Doing every job himself",
        p: [
          "In his own profile he writes that in the early years he managed sales, dispatch and invoicing himself, including midnight dispatches, and won early customers one call at a time.",
          "His sales approach, as quoted in the same interview, is simple: meet the customer, show the product, and solve the customer's problem.",
        ],
      },
      {
        h: "What came next",
        p: [
          "From that start the company reached cinema chains, an exclusive partnership with La-Z-Boy in India, and showrooms in cities across the country. Those stories are told in the other articles in this Journal.",
        ],
      },
    ],
    sources: [
      { label: "FounderGyaan interview, shared by Ravinder Goel", href: "https://www.linkedin.com/in/ravindergoel/" },
      { label: "Sugermint: How Ravinder Goel Made Little Nap the Go-To for Ultimate Relaxation (5 February 2026)", href: "https://sugermint.com/ravinder-goel/" },
      LI,
    ],
    related: [
      { label: "His journey", href: "/journey" },
      { label: "Press kit and fact sheet", href: "/press" },
    ],
  },
  {
    slug: "the-observation-behind-little-nap",
    title: "The observation behind Little Nap: customers who did not want to get up",
    description:
      "In 2011 recliners were far from mainstream in India. Ravinder Goel noticed that people who sat in one did not want to leave, and built Little Nap around that.",
    date: PUBLISHED,
    minutes: 3,
    topic: "Founder story",
    body: [
      {
        p: [
          "When Ravinder Goel started Little Nap in 2011, recliners were far from mainstream in India. In a podcast clip he shared, he explains the one thing he noticed: the moment customers sat in a recliner, they did not want to get up.",
          "That told him he was not selling another piece of furniture. He was selling an experience. He describes that observation as the foundation of Little Nap Recliners.",
        ],
      },
      {
        h: "Comfort as a human need",
        p: [
          "The same idea runs through how he describes the company. On his LinkedIn profile he writes that comfort is not a luxury but a fundamental human experience, and that design is how we shape emotion, behaviour and memory. Little Nap's stated vision is to redefine comfort as an experience.",
          "In a later conversation with the High Life team, recorded at their experience centre in Panipat, he said that a good home without a couple of recliners is not complete, and that India's demand for comfort is growing across cinemas and living rooms.",
        ],
      },
      {
        h: "Customer first",
        p: [
          "He calls the company's guiding philosophy Customer First. In his words, the biggest opportunities are often hidden in what customers already love.",
        ],
      },
    ],
    sources: [
      { label: "Podcast clip: How One Simple Observation Built a ₹100 Crore Brand (YouTube)", href: "https://www.youtube.com/watch?v=h8XsLDtAtxQ&t=752s" },
      { label: "High Life podcast: From 5 Lacs to 100Cr+ (YouTube)", href: "https://youtu.be/59Su9Sp2uDw" },
      LI,
    ],
    related: [
      { label: "Vision", href: "/vision" },
      { label: "Values", href: "/values" },
    ],
  },
  {
    slug: "failing-and-starting-over",
    title: "Failing the MBA exams and starting over: Ravinder Goel on rock bottom",
    description:
      "Ravinder Goel failed several MBA entrance exams, bought a fifth-grade maths book to rebuild his basics, and learned sales by knocking on doors. He tells the story in a YouTube interview.",
    date: PUBLISHED,
    minutes: 3,
    topic: "Founder story",
    body: [
      {
        p: [
          "In a YouTube conversation about building a ₹100 crore furniture business, Ravinder Goel spends most of the time on a period before the business existed. He describes a phase when he felt everything was over. He had failed several MBA entrance exams after studying for long hours every day.",
        ],
      },
      {
        h: "Rebuilding the basics",
        p: [
          "Instead of giving up, he says, he swallowed his pride, bought a fifth-grade maths book and started again from the fundamentals. He went on to study management at the Welingkar Institute of Management in Mumbai.",
        ],
      },
      {
        h: "Learning sales from scratch",
        p: [
          "He says he learned sales by knocking on the doors of houses under construction. Later he worked in retail and furniture sales in Delhi, Bengaluru and across South India, before starting Little Nap in 2011 with a small credit card loan.",
        ],
      },
      {
        h: "Why he tells it",
        p: [
          "He calls the conversation personal. It is, in his words, about resilience, self-belief and starting over when life feels uncertain, and he hopes it helps at least one person keep going.",
        ],
      },
    ],
    sources: [
      { label: "How He Built a ₹100 Crore Furniture Empire (YouTube)", href: "https://youtu.be/lZpzhJfoxog" },
      LI,
    ],
    related: [{ label: "His journey", href: "/journey" }],
  },
  {
    slug: "recliners-in-1300-cinema-screens",
    title: "How Little Nap recliners reached more than 1,300 cinema screens",
    description:
      "From a first order from PVR to more than 1,300 screens and a joint venture with Seating Spectrum of Malaysia: the cinema side of Little Nap, and Ravinder Goel's role in it.",
    date: PUBLISHED,
    minutes: 4,
    topic: "Cinema",
    body: [
      {
        p: [
          "Cinema seating is the part of Little Nap that most people notice without knowing it. Ravinder Goel's profile lists PVR INOX, Cinepolis and NY Cinemas among the chains that have installed Little Nap recliners, and the company counts more than 1,300 screens today.",
        ],
      },
      {
        h: "A first order, then a count that kept rising",
        p: [
          "A 2021 CEO Insights feature records that the company closed its first order with PVR cinemas and later completed a cinema export order to Europe that was manufactured in 18 days. The number of screens has grown steadily since: the company has described itself as having 840+ screens, then around 1,200, and now more than 1,300.",
        ],
      },
      {
        h: "Meeting the industry in person",
        p: [
          "Little Nap exhibits at the industry's own events. In August 2026 Ravinder announced that he would be at the Little Nap booth (211) at BIG Cine Expo, Chennai Trade Centre, on 18 and 19 August, with new designs developed for cinemas. Afterwards he thanked cinema clients for their trust and called it one of the company's best Big Cine Expo experiences.",
        ],
      },
      {
        h: "A joint venture with Seating Spectrum",
        p: [
          "At the same expo, he said, Little Nap marked a milestone with Seating Spectrum of Malaysia. The joint venture brings Malaysian cinema seating expertise together with Little Nap's manufacturing in India, and the first Seating Spectrum chairs made at the Little Nap factory were launched there. The group now includes Little Nap Seating Spectrum Private Limited, which makes standard cinema and auditorium chairs.",
        ],
      },
    ],
    sources: [
      { label: "CEO Insights India: Ravinder Goel, Steering Indian Furniture Industry to a Promising Future", href: "https://www.ceoinsightsindia.com/leader/ravinder-goel-steering-indian-furniture-industry-to-a-promising-future-cid-3371.html" },
      { label: "Sugermint feature (5 February 2026)", href: "https://sugermint.com/ravinder-goel/" },
      LI,
    ],
    related: [
      { label: "The Little Nap story and group", href: "/little-nap" },
      { label: "Showrooms", href: "/showrooms" },
    ],
  },
  {
    slug: "la-z-boy-in-india",
    title: "How La-Z-Boy came to India through Little Nap",
    description:
      "La-Z-Boy, the American brand that invented the recliner, made Little Nap its exclusive partner in India in April 2020. What the partnership is and how it started.",
    date: PUBLISHED,
    minutes: 3,
    topic: "Partnerships",
    body: [
      {
        p: [
          "La-Z-Boy began in 1927 in Monroe, Michigan, and is the American brand most people associate with the recliner. In April 2020, during the national lockdown, Little Nap signed its first contract with La-Z-Boy and became its exclusive partner in India.",
          "In an interview he shared on LinkedIn, Ravinder Goel describes it as part of how Little Nap grew from a ₹5 lakh start: from cinema chains to an exclusive partnership with the company that invented the recliner.",
        ],
      },
      {
        h: "Why it mattered",
        p: [
          "La-Z-Boy has said it chose Little Nap for its business ethics, core values, team and ten years of growth. For Little Nap the partnership put a global name beside its own and opened the way to co-creating with global furniture companies, a phrase Ravinder uses on his profile.",
        ],
      },
      {
        h: "More",
        p: [
          "The full timeline, from Michigan to Thailand and then to Delhi, is on the La-Z-Boy page of this site.",
        ],
      },
    ],
    sources: [
      { label: "FounderGyaan interview, shared by Ravinder Goel", href: "https://www.linkedin.com/in/ravindergoel/" },
      { label: "Little Nap: La-Z-Boy at Little Nap", href: "https://www.littlenap.in/about-lazyboy" },
    ],
    related: [{ label: "La-Z-Boy in India: the full story", href: "/la-z-boy" }],
  },
  {
    slug: "afmt-north-india-chapter",
    title: "AFMT North India Chapter: what the association does and Ravinder Goel's role",
    description:
      "AFMT is India's largest furniture association. Ravinder Goel has been Vice President of its North India Chapter since 2023 and began a third consecutive term in 2026.",
    date: PUBLISHED,
    minutes: 3,
    topic: "Industry",
    body: [
      {
        p: [
          "AFMT, the Association of Furniture Manufacturers & Traders (INDIA), was founded in 2008. Ravinder Goel describes it as India's largest furniture association. It is a non-profit with a nationwide presence and 350+ members, and it speaks to government and government agencies on behalf of furniture manufacturers and traders, runs seminars and knowledge sessions, and connects with furniture associations abroad.",
        ],
      },
      {
        h: "His role",
        p: [
          "The North India Chapter was launched in March 2023, and Ravinder was elected its Vice President. Members have re-elected him, and in 2026 he began a third consecutive term, running to 2028.",
          "He also chaired and presented the 3rd Annual General Meeting of the chapter in 2026. In a LinkedIn post about it he wrote that after more than 15 years in the furniture industry his firm belief is that the greatest strength lies in collaboration: when members share knowledge and support one another, the whole industry rises.",
        ],
      },
      {
        h: "What he says he is working towards",
        p: [
          "He describes the goal as a stronger, more innovative, globally competitive and proudly Made in India furniture industry.",
        ],
      },
    ],
    sources: [
      { label: "Ravinder Goel on LinkedIn: AFMT North India Chapter 3rd AGM", href: "https://www.linkedin.com/in/ravindergoel/" },
    ],
    related: [{ label: "About AFMT on the Journey page", href: "/journey" }],
  },
  {
    slug: "building-a-470-person-team",
    title: "Building a 470-person team: the quarterly strategy meeting at Little Nap",
    description:
      "Every quarter Little Nap holds a full-day strategy meeting where each department head presents. Ravinder Goel explains why he speaks for 25 minutes and then listens.",
    date: PUBLISHED,
    minutes: 4,
    topic: "Leadership",
    body: [
      {
        p: [
          "On Thursday, 8 October 2026, Little Nap held its full-day Q2 Review and Q3 Strategy Meeting. Ravinder Goel spoke for 25 minutes. Then, in his words, he sat down and listened.",
          "Every department head took the stage after him: Sales, Production, Finance, Marketing, Innovation, HR, Tech and AI, and Service.",
        ],
      },
      {
        h: "Why it is done this way",
        p: [
          "He says the company does this every quarter because strategy should not be shaped by leadership alone. It should be built by the people who bring it to life. His summary: when leaders give the plan, people listen; when teams shape the plan, they own it.",
        ],
      },
      {
        h: "People who stay and grow",
        p: [
          "At the end of the previous quarter's meeting he noted team members who had been part of the journey for six to thirteen years. What inspired him most, he wrote, was not their tenure but their transformation: people who became leaders, took ownership and mentored others. In his view businesses may be built on products and strategies, but they are sustained by trust, commitment and people who believe in a common vision.",
          "The company marked 15 years with a team day at Rangmanch Farms, with team activities, shared stories and thanks to long-standing colleagues.",
        ],
      },
      {
        h: "The numbers behind the team",
        p: [
          "In 2011 the company had three people and a 600 sq. ft. room. Today the Little Nap Group has more than 470 people, two factories and 18 showrooms.",
        ],
      },
    ],
    sources: [
      { label: "Ravinder Goel on LinkedIn: Q2 Review and Q3 Strategy Meeting (October 2026)", href: "https://www.linkedin.com/in/ravindergoel/" },
      { label: "Ravinder Goel on LinkedIn: The greatest achievement of any organization is who it builds", href: "https://www.linkedin.com/in/ravindergoel/" },
    ],
    related: [{ label: "Values and beliefs", href: "/values" }],
  },
  {
    slug: "leading-through-uncertainty",
    title: "Leading a factory through uncertain times: a manufacturer's reflection",
    description:
      "Ravinder Goel on rising costs, shifting supply chains and what a manufacturer can control: costs, discipline, systems and people.",
    date: PUBLISHED,
    minutes: 3,
    topic: "Leadership",
    body: [
      {
        p: [
          "In 2026 Ravinder Goel wrote a LinkedIn post that began with a question he said kept coming back: how long is this going to continue? He was describing the global situation as manufacturers experienced it: costs that change without warning, supply chains that shift overnight, and short-term planning that starts to feel unpredictable.",
        ],
      },
      {
        h: "What he says a manufacturer can control",
        p: [
          "His answer was practical. We may not control the environment outside, he wrote, but we can control how we respond. He listed four things: being more mindful of costs, planning with more discipline and foresight, strengthening what can be built within the company's own systems, and supporting teams so they stay focused and confident.",
        ],
      },
      {
        h: "Everyone contributes",
        p: [
          "He added that every individual contribution matters, on the shop floor, in operations, in sales and in service, because businesses are sustained by people who choose to stay steady, responsible and committed, especially when the future is unclear.",
        ],
      },
    ],
    sources: [{ label: "Ravinder Goel on LinkedIn: How long is this going to continue? (2026)", href: "https://www.linkedin.com/in/ravindergoel/" }],
    related: [{ label: "Vision", href: "/vision" }],
  },
  {
    slug: "fifteen-years-of-little-nap",
    title: "Fifteen years of Little Nap: Ravinder Goel's note of thanks",
    description:
      "On 15 July 2026 Little Nap Recliners completed 15 years. Ravinder Goel marked the day with thanks to his team, customers, dealers, suppliers, family and mentors.",
    date: PUBLISHED,
    minutes: 2,
    topic: "Milestones",
    body: [
      {
        p: [
          "Little Nap Recliners completed 15 years on 15 July 2026. Ravinder Goel called it a very emotional and proud day and wrote that the journey was one he could never have completed alone.",
        ],
      },
      {
        h: "Who he thanked",
        p: [
          "He thanked, in turn, the Little Nap family past and present; customers who let Little Nap into their homes, cinemas, hospitals and workplaces; dealers, distributors, suppliers and business associates; and his family, mentors and well-wishers.",
        ],
      },
      {
        h: "What the 15 years taught him",
        p: [
          "His summary: great journeys are built together. He looked forward to more years of innovation, growth and creating comfort together.",
        ],
      },
    ],
    sources: [{ label: "Ravinder Goel on LinkedIn: 15 Years of Little Nap. A Journey of Gratitude (15 July 2026)", href: "https://www.linkedin.com/in/ravindergoel/" }],
    related: [{ label: "His journey", href: "/journey" }],
  },
  {
    slug: "little-nap-franchise",
    title: "The Little Nap franchise: showroom size and investment, as shared in 2026",
    description:
      "In 2026 Ravinder Goel shared the basics of the Little Nap franchise model: a 1,500 to 2,500 sq. ft. showroom and an investment of ₹35 to ₹55 lakh.",
    date: PUBLISHED,
    minutes: 2,
    topic: "Franchise",
    body: [
      {
        p: [
          "In a 2026 LinkedIn post, Ravinder Goel asked why some brands expand faster across India than others. His answer: when the brand is built on trust, aspiration and products people genuinely connect with.",
        ],
      },
      {
        h: "What he shared about the model",
        p: [
          "He wrote that franchise partners enter a business backed by strong brand recall, premium lifestyle positioning, growing market demand and scalable opportunities. The showroom requirement he gave was 1,500 to 2,500 sq. ft., with an investment of ₹35 to ₹55 lakh.",
          "He named a growing presence in Delhi, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Ahmedabad and Jaipur, and said the aim is to build the country's leading recliner network.",
        ],
      },
      {
        h: "Check the current terms",
        p: [
          "These figures are from a post in 2026. For current terms and to apply, use the franchise page on Little Nap's own website.",
        ],
      },
    ],
    sources: [
      { label: "Ravinder Goel on LinkedIn: Why do some brands expand across India faster than others? (2026)", href: "https://www.linkedin.com/in/ravindergoel/" },
      { label: "Little Nap: franchise enquiries", href: "https://www.littlenap.in/franchise" },
    ],
    related: [{ label: "Showrooms", href: "/showrooms" }],
  },
];

export const bySlug = (slug: string) => articles.find((a) => a.slug === slug);
