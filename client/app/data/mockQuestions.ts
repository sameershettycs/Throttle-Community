export interface Question {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  upvotes: number;
  comments: number;
  category: string;
  tags: string[];
  createdAt: string;
  isHot: boolean;
}

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "What's the best chain lube for long-distance touring?",
    description:
      "Planning a 5000km trip across the mountains. Need recommendations for chain maintenance products that last longer between applications.",
    author: {
      name: "RoadWarrior",
      avatar: "RW",
    },
    upvotes: 247,
    comments: 89,
    category: "Maintenance",
    tags: ["chain", "touring", "maintenance"],
    createdAt: "2 hours ago",
    isHot: true,
  },
  {
    id: "2",
    title: "Helmet recommendations under $500 for track days?",
    description:
      "Looking for a Snell-rated helmet that's comfortable for extended track sessions. Weight and ventilation are priorities.",
    author: {
      name: "TrackJunkie",
      avatar: "TJ",
    },
    upvotes: 183,
    comments: 56,
    category: "Gear",
    tags: ["helmet", "track", "safety"],
    createdAt: "4 hours ago",
    isHot: true,
  },
  {
    id: "3",
    title: "Why does my bike bog down at 6000 RPM?",
    description:
      "2019 Ninja 650 suddenly loses power around 6k RPM. Already checked air filter and spark plugs. Any ideas?",
    author: {
      name: "NinjaRider",
      avatar: "NR",
    },
    upvotes: 156,
    comments: 72,
    category: "Technical",
    tags: ["kawasaki", "engine", "troubleshooting"],
    createdAt: "6 hours ago",
    isHot: true,
  },
  {
    id: "4",
    title: "Best scenic routes in the Pacific Northwest?",
    description:
      "Visiting Seattle next month with my Ducati. Looking for breathtaking mountain roads and coastal highways to explore.",
    author: {
      name: "DucatiDreamer",
      avatar: "DD",
    },
    upvotes: 134,
    comments: 45,
    category: "Routes",
    tags: ["pnw", "touring", "scenic"],
    createdAt: "8 hours ago",
    isHot: false,
  },
  {
    id: "5",
    title: "First bike for a beginner - MT-07 or SV650?",
    description:
      "Just got my license and torn between these two. I'm 5'10\" and planning mostly city commuting with occasional weekend rides.",
    author: {
      name: "NewRider2024",
      avatar: "NR",
    },
    upvotes: 298,
    comments: 124,
    category: "General",
    tags: ["beginner", "yamaha", "suzuki"],
    createdAt: "12 hours ago",
    isHot: true,
  },
  {
    id: "6",
    title: "How often should I change brake fluid?",
    description:
      "My manual says every 2 years but I've heard conflicting opinions. I ride aggressively in the canyons. What's the consensus?",
    author: {
      name: "CanyonCarver",
      avatar: "CC",
    },
    upvotes: 89,
    comments: 34,
    category: "Maintenance",
    tags: ["brakes", "safety", "maintenance"],
    createdAt: "1 day ago",
    isHot: false,
  },
  {
    id: "7",
    title: "Bluetooth intercom that works well at highway speeds?",
    description:
      "Tired of wind noise killing my music and calls above 60mph. Budget around $300 for rider-to-pillion setup.",
    author: {
      name: "TechRider",
      avatar: "TR",
    },
    upvotes: 167,
    comments: 78,
    category: "Gear",
    tags: ["bluetooth", "intercom", "communication"],
    createdAt: "1 day ago",
    isHot: true,
  },
  {
    id: "8",
    title: "Adjusting suspension for a heavier rider?",
    description:
      "I'm 240lbs and my stock suspension is bottoming out. Should I get aftermarket or can I adjust the preload myself?",
    author: {
      name: "BigBikeGuy",
      avatar: "BB",
    },
    upvotes: 112,
    comments: 41,
    category: "Technical",
    tags: ["suspension", "setup", "weight"],
    createdAt: "2 days ago",
    isHot: false,
  },
  {
    id: "9",
    title: "Best motorcycle touring roads in Europe?",
    description:
      "Planning a 3-week trip through Europe next summer. What are the must-ride roads? Thinking Alps, Dolomites, or Pyrenees.",
    author: {
      name: "EuroTourer",
      avatar: "ET",
    },
    upvotes: 321,
    comments: 156,
    category: "Routes",
    tags: ["europe", "touring", "alps"],
    createdAt: "2 days ago",
    isHot: true,
  },
  {
    id: "10",
    title: "How to properly break in new tires?",
    description:
      "Just mounted a fresh set of Pilot Road 5s. What's the recommended break-in procedure? Miles and riding style?",
    author: {
      name: "SafetyFirst",
      avatar: "SF",
    },
    upvotes: 145,
    comments: 67,
    category: "Maintenance",
    tags: ["tires", "safety", "break-in"],
    createdAt: "2 days ago",
    isHot: false,
  },
  {
    id: "11",
    title: "Best riding jacket for all seasons?",
    description:
      "Looking for a versatile jacket that works in summer heat and winter cold. Textile or leather? Budget up to $600.",
    author: {
      name: "AllWeatherRider",
      avatar: "AW",
    },
    upvotes: 198,
    comments: 89,
    category: "Gear",
    tags: ["jacket", "all-season", "protection"],
    createdAt: "3 days ago",
    isHot: true,
  },
  {
    id: "12",
    title: "Carburetor vs fuel injection for classic bikes?",
    description:
      "Restoring a 1985 Honda CB750. Should I keep the carbs or convert to EFI? Looking for reliability on long rides.",
    author: {
      name: "ClassicBikeGuy",
      avatar: "CB",
    },
    upvotes: 234,
    comments: 112,
    category: "Technical",
    tags: ["carburetor", "fuel-injection", "restoration"],
    createdAt: "3 days ago",
    isHot: true,
  },
  {
    id: "13",
    title: "Motorcycle insurance tips for new riders?",
    description:
      "Just bought my first bike and insurance quotes are insane. Any tips to lower premiums without sacrificing coverage?",
    author: {
      name: "BudgetBiker",
      avatar: "BB",
    },
    upvotes: 267,
    comments: 98,
    category: "General",
    tags: ["insurance", "beginner", "tips"],
    createdAt: "3 days ago",
    isHot: true,
  },
  {
    id: "14",
    title: "Best oil for high-mileage sportbikes?",
    description:
      "My R6 has 45,000 miles on it. Should I switch to high-mileage oil or stick with regular synthetic? Currently using Motul 7100.",
    author: {
      name: "HighMileHero",
      avatar: "HM",
    },
    upvotes: 134,
    comments: 56,
    category: "Maintenance",
    tags: ["oil", "high-mileage", "yamaha"],
    createdAt: "4 days ago",
    isHot: false,
  },
  {
    id: "15",
    title: "Tail of the Dragon - best time to visit?",
    description:
      "Planning to hit Deal's Gap next month. What day/time has the least traffic? Any tips for first-timers?",
    author: {
      name: "DragonSlayer",
      avatar: "DS",
    },
    upvotes: 189,
    comments: 73,
    category: "Routes",
    tags: ["deals-gap", "dragon", "north-carolina"],
    createdAt: "4 days ago",
    isHot: false,
  },
  {
    id: "16",
    title: "Best motorcycle boots for commuting?",
    description:
      "Need something protective but comfortable enough to walk around the office. Waterproof is a must. Under $250.",
    author: {
      name: "CommuterKing",
      avatar: "CK",
    },
    upvotes: 156,
    comments: 61,
    category: "Gear",
    tags: ["boots", "commuting", "waterproof"],
    createdAt: "5 days ago",
    isHot: false,
  },
  {
    id: "17",
    title: "How to diagnose electrical gremlins?",
    description:
      "My bike randomly loses power to the dash while riding. Battery and alternator test fine. Where do I start troubleshooting?",
    author: {
      name: "SparkyMcFix",
      avatar: "SM",
    },
    upvotes: 178,
    comments: 84,
    category: "Technical",
    tags: ["electrical", "troubleshooting", "wiring"],
    createdAt: "5 days ago",
    isHot: false,
  },
  {
    id: "18",
    title: "What's your essential tool kit for long trips?",
    description:
      "Building a compact toolkit for touring. What tools have actually saved you on the road? Don't want to carry unnecessary weight.",
    author: {
      name: "PreparedRider",
      avatar: "PR",
    },
    upvotes: 223,
    comments: 94,
    category: "General",
    tags: ["tools", "touring", "preparation"],
    createdAt: "5 days ago",
    isHot: true,
  },
  {
    id: "19",
    title: "Valve adjustment on adventure bikes - DIY or shop?",
    description:
      "My Tiger 800 is due for valve check at 16k miles. Is this something I can tackle in my garage or should I leave it to the pros?",
    author: {
      name: "ADVMechanic",
      avatar: "AM",
    },
    upvotes: 145,
    comments: 67,
    category: "Maintenance",
    tags: ["valve-adjustment", "triumph", "diy"],
    createdAt: "6 days ago",
    isHot: false,
  },
  {
    id: "20",
    title: "Best coastal highway ride in California?",
    description:
      "Visiting LA next week. Want to do an epic coastal ride - PCH the whole way or are there better alternatives?",
    author: {
      name: "CaliforniaDreamin",
      avatar: "CD",
    },
    upvotes: 267,
    comments: 103,
    category: "Routes",
    tags: ["california", "pch", "coastal"],
    createdAt: "1 week ago",
    isHot: true,
  },
];

export const categories = [
  "All",
  "Maintenance",
  "Gear",
  "Routes",
  "Technical",
  "General",
];
