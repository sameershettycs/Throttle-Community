export interface Comment {
  id: string;
  questionId: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  upvotes: number;
  createdAt: string;
  isAccepted: boolean;
  replies?: Comment[];
}

export const mockComments: Comment[] = [
  // Comments for Question 1 - Chain lube
  {
    id: "c1-1",
    questionId: "1",
    content:
      "I've been using Motul Chain Paste for years on my touring bike. It lasts about 500-600km between applications and doesn't fling off even in wet conditions. Highly recommend it for long trips!",
    author: { name: "ChainMaster", avatar: "CM" },
    upvotes: 45,
    createdAt: "1 hour ago",
    isAccepted: true,
  },
  {
    id: "c1-2",
    questionId: "1",
    content:
      "Maxima Chain Wax is my go-to. It's not as messy as traditional lubes and provides excellent protection. Just make sure to apply it to a warm chain for best results.",
    author: { name: "WaxEnthusiast", avatar: "WE" },
    upvotes: 32,
    createdAt: "1 hour ago",
    isAccepted: false,
  },
  {
    id: "c1-3",
    questionId: "1",
    content:
      "For 5000km trips, I'd actually recommend carrying a small bottle and reapplying every 400-500km. No lube will truly last the entire trip without reapplication.",
    author: { name: "RealistRider", avatar: "RR" },
    upvotes: 28,
    createdAt: "45 minutes ago",
    isAccepted: false,
  },
  {
    id: "c1-4",
    questionId: "1",
    content:
      "Have you considered switching to an automatic chain oiler like Scottoiler? It's a game-changer for touring. Set it and forget it!",
    author: { name: "TechAdvocate", avatar: "TA" },
    upvotes: 19,
    createdAt: "30 minutes ago",
    isAccepted: false,
  },

  // Comments for Question 2 - Helmet
  {
    id: "c2-1",
    questionId: "2",
    content:
      "Shoei RF-1400 is just under $500 and it's absolutely fantastic for track days. Great ventilation, lightweight, and the visor system is top-notch. Can't recommend it enough!",
    author: { name: "TrackVeteran", avatar: "TV" },
    upvotes: 67,
    createdAt: "3 hours ago",
    isAccepted: true,
  },
  {
    id: "c2-2",
    questionId: "2",
    content:
      "Check out the AGV K6. It's Snell-rated, incredibly light at around 1350g, and the ventilation is superb. I've done 6-hour track days without any comfort issues.",
    author: { name: "AGVFan", avatar: "AF" },
    upvotes: 41,
    createdAt: "2 hours ago",
    isAccepted: false,
  },
  {
    id: "c2-3",
    questionId: "2",
    content:
      "Don't overlook the Scorpion EXO-R1 Air. It's around $450, Snell-rated, and has emergency cheek pad release which some tracks require. Great value for money.",
    author: { name: "BudgetRacer", avatar: "BR" },
    upvotes: 23,
    createdAt: "1 hour ago",
    isAccepted: false,
  },

  // Comments for Question 3 - Ninja bogging
  {
    id: "c3-1",
    questionId: "3",
    content:
      "This sounds like a fuel delivery issue. Check your fuel pump pressure and the fuel filter. The Ninja 650 is known to have fuel pump issues around 20-30k miles.",
    author: { name: "NinjaMechanic", avatar: "NM" },
    upvotes: 52,
    createdAt: "5 hours ago",
    isAccepted: true,
  },
  {
    id: "c3-2",
    questionId: "3",
    content:
      "Could also be the throttle position sensor. Mine had similar symptoms and replacing the TPS fixed it completely. It's a relatively cheap part to try.",
    author: { name: "SensorExpert", avatar: "SE" },
    upvotes: 34,
    createdAt: "4 hours ago",
    isAccepted: false,
  },
  {
    id: "c3-3",
    questionId: "3",
    content:
      "Have you checked for any ECU error codes? Get a diagnostic tool or take it to a dealer. There might be a stored code that points to the exact issue.",
    author: { name: "DiagnosticPro", avatar: "DP" },
    upvotes: 21,
    createdAt: "3 hours ago",
    isAccepted: false,
  },
  {
    id: "c3-4",
    questionId: "3",
    content:
      "Don't forget to check the exhaust for any blockages or leaks. A partially clogged catalytic converter can cause power loss at higher RPMs.",
    author: { name: "ExhaustGuru", avatar: "EG" },
    upvotes: 15,
    createdAt: "2 hours ago",
    isAccepted: false,
  },

  // Comments for Question 4 - PNW routes
  {
    id: "c4-1",
    questionId: "4",
    content:
      "Highway 101 along the coast is absolutely stunning! Start from Astoria and work your way down. The views are breathtaking, especially around Cannon Beach.",
    author: { name: "PNWLocal", avatar: "PL" },
    upvotes: 38,
    createdAt: "7 hours ago",
    isAccepted: true,
  },
  {
    id: "c4-2",
    questionId: "4",
    content:
      "Don't miss the Cascade Loop! It's about 400 miles and takes you through some of the most beautiful mountain scenery in Washington. Plan for at least 2 days.",
    author: { name: "MountainExplorer", avatar: "ME" },
    upvotes: 29,
    createdAt: "6 hours ago",
    isAccepted: false,
  },

  // Comments for Question 5 - MT-07 vs SV650
  {
    id: "c5-1",
    questionId: "5",
    content:
      "As someone who owned both, I'd say MT-07 for city commuting. The torque delivery is smoother at low speeds and the ergonomics are more upright. The SV650 is sportier but can be tiring in traffic.",
    author: { name: "BothBikesGuy", avatar: "BB" },
    upvotes: 89,
    createdAt: "11 hours ago",
    isAccepted: true,
  },
  {
    id: "c5-2",
    questionId: "5",
    content:
      "MT-07 all the way! The CP2 engine is a joy to ride. Plus, the aftermarket support is massive. You'll find parts and accessories for everything.",
    author: { name: "YamahaFan", avatar: "YF" },
    upvotes: 56,
    createdAt: "10 hours ago",
    isAccepted: false,
  },
  {
    id: "c5-3",
    questionId: "5",
    content:
      "SV650 has been around forever which means proven reliability and cheaper parts. The V-twin character is also more engaging IMO. Plus, it looks classic.",
    author: { name: "SuzukiLoyalist", avatar: "SL" },
    upvotes: 43,
    createdAt: "9 hours ago",
    isAccepted: false,
  },
  {
    id: "c5-4",
    questionId: "5",
    content:
      "At 5'10\" you'll be comfortable on both. I'd suggest test riding them. The riding position and engine character are quite different and it comes down to personal preference.",
    author: { name: "TestRideAdvocate", avatar: "TR" },
    upvotes: 31,
    createdAt: "8 hours ago",
    isAccepted: false,
  },
  {
    id: "c5-5",
    questionId: "5",
    content:
      "Check insurance costs too! Depending on your area, one might be significantly cheaper to insure than the other. That can add up over time.",
    author: { name: "PracticalRider", avatar: "PR" },
    upvotes: 24,
    createdAt: "6 hours ago",
    isAccepted: false,
  },
];

// Helper function to get comments for a specific question
export function getCommentsForQuestion(questionId: string): Comment[] {
  return mockComments.filter((comment) => comment.questionId === questionId);
}
