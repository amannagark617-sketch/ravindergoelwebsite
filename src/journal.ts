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

export const articles: Article[] = [
  {
    slug: "from-5-lakh-to-100-crore",
    title: "From ₹5 lakh to ₹100 crore: how Ravinder Goel started Little Nap",
    description:
      "In July 2011 Ravinder Goel started Little Nap Recliners with a ₹5 lakh credit card loan, a 600 sq. ft. display area and a team of three. This is how the first years went.",
    date: "2026-11-24",
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
    date: "2026-11-25",
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
    date: "2026-11-26",
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
    date: "2026-11-27",
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
    date: "2026-11-28",
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
    date: "2026-11-29",
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
    date: "2026-11-30",
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
    date: "2026-12-01",
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
    date: "2026-12-02",
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
    date: "2026-12-03",
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
  {
    slug: "manual-vs-motorised-recliners",
    title: "Manual vs motorised recliners: which one should you buy?",
    description:
      "A plain comparison of manual and motorised recliners: how they work, weight, power needs, warranty and who each one suits, with figures from Little Nap.",
    date: "2026-12-04",
    minutes: 4,
    topic: "Guides",
    body: [
      {  p: ["A manual recliner is moved by hand. A motorised recliner has an electric motor and moves at the press of a button. Both can be as comfortable. The difference is the effort to operate them, the cost, and what you need around the chair."] },
      { h: "Positions and weight", p: ["According to Little Nap's FAQ, a manual recliner has 3 positions, while a motorised recliner can stop at any position. A motorised recliner is heavier at about 75 kg, against about 65 kg for a manual one."] },
      { h: "Power", p: ["A motorised recliner needs a 5-amp socket close by, and it stops working when there is no power. Little Nap uses an Okin motor rated at 58 W and 29 V. Options include a headrest motor, dual motor and triple motor, and the dual motor control is priced separately."] },
      { h: "Warranty and life", p: ["Little Nap gives 5 years on the mechanism and 2 years on the motor, both on site. Damage from power spikes is not covered. The company says motorised units last 10 to 15 years. The mechanism is rated for 160 kg, and motorised units for up to 165 kg."] },
      { h: "Who each one suits", p: ["Manual recliners suit a tighter budget and users with no trouble moving. Motorised recliners suit elderly users and anyone who wants easy, one-touch control, and they allow extras such as a massage function. Motorised recliners generally cost more. For a compact room, a manual model needs less electrical planning."] },
      { h: "A note on certification", p: ["In 2026 Little Nap Recliners achieved BIS certification under IS 302 (Part 1):2024 for motorised recliners."] },
      { h: "Before you decide", p: ["Both types are for indoor use only. Specifications vary by model, so check the model you like with a Little Nap showroom."] },
    ],
    sources: [
      { label: "Little Nap FAQ", href: "https://www.littlenap.in/faqs" },
      { label: "Manual Recliners Vs. Motorised Recliners, Little Nap", href: "https://www.littlenap.in/blog/manual-recliners-vs-motorised-recliners" },
      { label: "Little Nap Recliners achieves BIS certification, ArticleBiz", href: "https://articlebiz.com/article/1052835058-little-nap-recliners-achieves-bis-certification-under-is-302-part-12024-for-motorized-recliners" },
    ],
    related: [
      { label: "Little Nap recliners", href: "/recliners" },
      { label: "Showrooms", href: "/showrooms" },
    ],
  },
  {
    slug: "how-to-choose-a-recliner",
    title: "How to choose a recliner: size, fit, frame and fabric",
    description:
      "A buying guide for recliner chairs in India: how to measure the room, check the fit, look under the seat, and choose a fabric, with sizes Little Nap offers.",
    date: "2026-12-05",
    minutes: 5,
    topic: "Guides",
    body: [
      {  p: ["A recliner is a chair you will sit in for years, so the choice is worth a little care. These are the checks Little Nap suggests, in the order they usually matter."] },
      { h: "Measure the room, and the wall behind it", p: ["Measure the space for the chair upright and fully reclined. A standard recliner needs about 6 inches behind it, a motorised lounger about 9 inches, and a slider about 5 inches. In a small apartment, leave 10 to 15 cm behind the chair and put it beside a window or in a corner, not the middle of the room. A chair needs a door at least 24 inches wide to come in."] },
      { h: "Check that it fits you", p: ["Sit in it. Your feet should reach the floor and your head should rest on the headrest. The gap between the leg rest and the seat should be 5 inches or less, and the footrest should support your heels. Lumbar support should be firm without being hard. A poor fit is a common cause of back pain."] },
      { h: "Look under the seat", p: ["A four-sided frame lasts longer than a two- or three-sided one, which can warp when people push on the arms to stand up. Look for a mesh layer between springs and cushions, and a hardwood base instead of plastic. Little Nap's frames are hardwood, with no-sag springs."] },
      { h: "Choose the fabric", p: ["Leatherette is easy to clean but can feel warm. Fabric is more comfortable but needs more care. Full leather costs extra. Little Nap offers fabric, leatherette, full leather and touch leather, in more than 150 colours. In a small room, light neutrals make it feel more open."] },
      { h: "Sizes you can ask for", p: ["Little Nap offers seat widths of 22, 23 or 24 inches and arm heights from 4 to 7 inches. A cup holder needs an arm at least 5.5 inches high, and a chiller glass holder at least 6 inches. Changing the arm size carries no extra charge. You can also choose how hard or soft the seat is, and add USB ports."] },
      { h: "Pick the type for the room", p: ["Living room recliners, home theatre recliners, loungers and recliner sofas are built differently, so choose for where it will sit."] },
    ],
    sources: [
      { label: "Little Nap FAQ", href: "https://www.littlenap.in/faqs" },
      { label: "A Buying Guide For Comfortable Recliners, Little Nap", href: "https://www.littlenap.in/blog/a-buying-guide-for-comfortable-recliners" },
      { label: "Best Single-Seater Recliners for Small Indian Apartments, Little Nap", href: "https://www.littlenap.in/blog/best-single-seater-recliners-for-small-indian-apartments" },
    ],
    related: [
      { label: "Little Nap recliners", href: "/recliners" },
      { label: "Showrooms", href: "/showrooms" },
      { label: "Manual vs motorised recliners", href: "/journal/manual-vs-motorised-recliners" },
    ],
  },
  {
    slug: "how-a-little-nap-recliner-is-made",
    title: "How a Little Nap recliner is made: frame, foam, motor and leather",
    description:
      "What goes into a Little Nap recliner: teak and hardwood frame, no-sag springs, foam, Okin motor, leather, a 67-point inspection and the factories in Manesar and Dewas.",
    date: "2026-12-06",
    minutes: 5,
    topic: "Guides",
    body: [
      {  p: ["Little Nap recliners are hand-crafted in the company's two factories, in IMT Manesar in Haryana and Dewas in Madhya Pradesh. Together they can build about 5,000 recliners a month. The company describes its method as German engineering, Indian craftsmanship and global design."] },
      { h: "The frame", p: ["According to Little Nap, the frame is teak wood with no-sag springs, and it uses kiln-dried hardwood. The plywood is 18 mm and 12 mm, and Kitply is used for resistance to moisture and borers."] },
      { h: "The mechanism and the motor", p: ["The mechanisms are lead-free mild steel. Motorised recliners use an electric Okin motor rated at 58 W and 29 V."] },
      { h: "Foam, thread and cover", p: ["The foam density is 28 throughout. Stitching uses Gutermann thread. The leather is bovine leather from Gruppo Mastrotto, and one recliner uses about 150 sq ft of leather or about 7 metres of fabric or leatherette."] },
      { h: "Inspection and lead time", p: ["Every seat goes through a 67-point quality inspection, from material selection to final assembly. Most models take at least 15 days to make. Grande and Versatil take 21 days, and Adorne, Verve, Aderia, Niveo and Fusion take 45 days."] },
      { h: "How it reaches you", p: ["A recliner ships in two parts, the backrest and the seat. On site, the backrest bracket fits into the seat's KD fitting, and a locking sound tells you it is in place. Little Nap says on-site service is provided within 7 working days."] },
      { h: "From one chair to cinemas", p: ["The same factories make the recliners in more than 1,300 cinema screens, and the recliners sold through Little Nap's 18 showrooms across India."] },
    ],
    sources: [
      { label: "Little Nap FAQ", href: "https://www.littlenap.in/faqs" },
      { label: "What to Look for in a High-Quality Leather Recliner Couch, Little Nap", href: "https://www.littlenap.in/blog/what-to-look-for-in-a-high-quality-leather-recliner-couch" },
      { label: "Little Nap Recliners", href: "https://www.littlenap.in" },
    ],
    related: [
      { label: "Little Nap recliners", href: "/recliners" },
      { label: "The Little Nap story", href: "/little-nap" },
      { label: "Cinema recliners", href: "/journal/recliners-in-1300-cinema-screens" },
    ],
  },
  {
    slug: "home-theatre-recliners-how-to-plan",
    title: "Home theatre recliners: how to plan your room",
    description:
      "Planning a home theatre with recliners: arms, cup holders, power, space behind each seat and what Little Nap's cinema work has taught it about layout.",
    date: "2026-12-07",
    minutes: 4,
    topic: "Guides",
    body: [
      {  p: ["A home theatre recliner looks like cinema seating but is made for a private room. Little Nap makes recliners for both, and its multiplex work gives it a clear view of what makes a seating layout work."] },
      { h: "What is different about a home theatre recliner", p: ["On a home theatre recliner the arms sit on the floor, not in the air as on a living room model, which gives it a commercial look. Accessories can be added freely, and many models include built-in cup holders. A swivel glider is not available on these models. Little Nap offers them in various sizes for different room dimensions, with power reclining and adjustable headrests."] },
      { h: "Power and space", p: ["Each motorised recliner needs a 5-amp socket, so plan the sockets before the seats go in. Leave about 6 inches behind a standard recliner and more for a lounger. Little Nap's FAQ gives 39 inches as the depth upright and 69 inches as the length fully reclined, so check the room for the reclined size. The door has to be at least 24 inches wide."] },
      { h: "What cinemas do", p: ["For multiplexes, Little Nap offers 3D layout help, detailed drawings and consultation before installation. Its cinema seats include swivel tables that turn 90 degrees to stay clear of the next seat, and motorised seats for tight spaces. Its recliners are in more than 1,300 cinema screens, with clients including PVR INOX, Cinepolis, Miraj Cinemas and NY Cinemas."] },
      { h: "Warranty", p: ["Little Nap gives 5 years on the mechanism and 2 years on the motor, both on site."] },
    ],
    sources: [
      { label: "Little Nap: home theatre recliners", href: "https://www.littlenap.in/home-theater-recliners" },
      { label: "Little Nap: multiplex recliners", href: "https://www.littlenap.in/multiplex-recliners" },
      { label: "Little Nap FAQ", href: "https://www.littlenap.in/faqs" },
    ],
    related: [
      { label: "Little Nap recliners", href: "/recliners" },
      { label: "Recliners in 1,300 cinema screens", href: "/journal/recliners-in-1300-cinema-screens" },
      { label: "Showrooms", href: "/showrooms" },
    ],
  },
  {
    slug: "how-long-do-recliners-last-and-how-to-care-for-them",
    title: "How long do recliners last, and how to care for one",
    description:
      "A recliner should last 10 to 15 years with care. Cleaning, sunlight, hardware checks and servicing for manual and motorised recliners, with Little Nap's warranty terms.",
    date: "2026-12-08",
    minutes: 4,
    topic: "Guides",
    body: [
      {  p: ["Little Nap says a well-made recliner lasts about 10 to 15 years, and sometimes longer. How long yours lasts depends on the materials, the type of mechanism and how often it is used."] },
      { h: "What decides the life of a recliner", p: ["Hardwood, good foam and a strong fabric last longer than cheaper parts. A chair used every day wears sooner than one used now and then. Motorised recliners may need servicing from time to time, while manual ones generally need less."] },
      { h: "Looking after it", p: ["Vacuum or wipe the chair every week. Keep it out of long direct sunlight, which can fade or crack fabric and leather. Do not stand or jump on it, and teach children to use the footrest gently. Every few months, check the mechanism for loose screws and bolts. Little Nap recommends a professional service once a year, especially for motorised models."] },
      { h: "Fabric or leatherette", p: ["Leatherette is easy to clean but can feel warm. Fabric is more comfortable but costs more to maintain. Napper leatherette is fire resistant and looks closer to real leather than standard leatherette."] },
      { h: "Massage chairs", p: ["Clean a massage chair with a soft cloth, avoid spills and keep it away from direct sunlight."] },
      { h: "Warranty and service", p: ["Little Nap gives 5 years on the mechanism and 2 years on the motor, both on site, and service within 7 working days. Damage from power spikes is not covered. Recliners are for indoor use only."] },
    ],
    sources: [
      { label: "Do Recliners Last Long?, Little Nap", href: "https://www.littlenap.in/blog/do-recliners-last-long-what-to-expect-and-how-to-extend-lifespan" },
      { label: "Little Nap FAQ", href: "https://www.littlenap.in/faqs" },
    ],
    related: [
      { label: "Little Nap recliners", href: "/recliners" },
      { label: "Manual vs motorised recliners", href: "/journal/manual-vs-motorised-recliners" },
      { label: "Showrooms", href: "/showrooms" },
    ],
  },
];

export const bySlug = (slug: string) => articles.find((a) => a.slug === slug);

// Articles go live one per day. Dates are compared in Indian time.
export const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
export const isPublished = (a: Article, today: string = todayIST()) => a.date <= today;

type Pic = { src: string; pos?: string };
const CAP = "Ravinder Goel, Founder and CEO, Little Nap Recliners";
export const media: Record<string, { hero: Pic }> = {
  "from-5-lakh-to-100-crore": { hero: { src: "ravinder-portrait.jpg", pos: "50% 20%" } },
  "the-observation-behind-little-nap": { hero: { src: "ravinder-showroom-standing.jpg", pos: "50% 20%" } },
  "failing-and-starting-over": { hero: { src: "ravinder-red-wall.jpg", pos: "50% 22%" } },
  "recliners-in-1300-cinema-screens": { hero: { src: "ravinder-theatre-hands.jpg", pos: "50% 20%" } },
  "la-z-boy-in-india": { hero: { src: "ravinder-showroom-arms.jpg", pos: "50% 22%" } },
  "afmt-north-india-chapter": { hero: { src: "ravinder-gesture.jpg", pos: "50% 20%" } },
  "building-a-470-person-team": { hero: { src: "ravinder-showroom-smile.jpg", pos: "50% 22%" } },
  "leading-through-uncertainty": { hero: { src: "ravinder-studio-point.jpg", pos: "50% 30%" } },
  "fifteen-years-of-little-nap": { hero: { src: "ravinder-office.jpg", pos: "50% 22%" } },
  "little-nap-franchise": { hero: { src: "ravinder-lounge.jpg", pos: "50% 22%" } },
  "manual-vs-motorised-recliners": { hero: { src: "ravinder-lounge.jpg", pos: "50% 22%" } },
  "how-to-choose-a-recliner": { hero: { src: "ravinder-showroom-lean.jpg", pos: "50% 22%" } },
  "how-a-little-nap-recliner-is-made": { hero: { src: "ravinder-studio-point.jpg", pos: "50% 30%" } },
  "home-theatre-recliners-how-to-plan": { hero: { src: "ravinder-theatre-hands.jpg", pos: "50% 20%" } },
  "how-long-do-recliners-last-and-how-to-care-for-them": { hero: { src: "ravinder-showroom-smile.jpg", pos: "50% 22%" } },
};
export const caption = CAP;
