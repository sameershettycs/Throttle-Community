export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  website?: string;
  bikes: string[];
  stats: {
    questions: number;
    answers: number;
    upvotes: number;
    reputation: number;
  };
  badges: string[];
}

export const mockUsers: User[] = [
  {
    id: "u1",
    username: "roadwarrior",
    displayName: "RoadWarrior",
    avatar: "RW",
    bio: "Long-distance touring enthusiast with 200k+ miles under my belt. Currently riding a BMW R1250GS Adventure. Always happy to share maintenance tips and route recommendations!",
    location: "Denver, Colorado",
    joinedDate: "March 2022",
    website: "https://roadwarriorrides.com",
    bikes: ["BMW R1250GS Adventure", "Honda Africa Twin"],
    stats: { questions: 12, answers: 87, upvotes: 1245, reputation: 3420 },
    badges: ["Top Contributor", "Touring Expert", "Helpful"],
  },
  {
    id: "u2",
    username: "trackjunkie",
    displayName: "TrackJunkie",
    avatar: "TJ",
    bio: "Track day addict and amateur racer. 15+ years of riding experience. I live for the thrill of apex hunting and pushing limits safely.",
    location: "Austin, Texas",
    joinedDate: "January 2023",
    bikes: ["Ducati Panigale V4S", "Yamaha R1M"],
    stats: { questions: 8, answers: 156, upvotes: 2340, reputation: 5670 },
    badges: ["Track Expert", "Safety First", "Legend"],
  },
  {
    id: "u3",
    username: "ninjarider",
    displayName: "NinjaRider",
    avatar: "NR",
    bio: "Kawasaki enthusiast and weekend warrior. Learning something new about motorcycles every day!",
    location: "Seattle, Washington",
    joinedDate: "June 2023",
    bikes: ["Kawasaki Ninja 650", "Kawasaki Z400"],
    stats: { questions: 23, answers: 34, upvotes: 567, reputation: 890 },
    badges: ["Rising Star", "Curious Mind"],
  },
  {
    id: "u4",
    username: "ducatidreamer",
    displayName: "DucatiDreamer",
    avatar: "DD",
    bio: "Italian motorcycle fanatic. If it's red and fast, I'm interested. Scenic routes and mountain passes are my therapy.",
    location: "San Francisco, California",
    joinedDate: "September 2022",
    bikes: ["Ducati Monster 1200", "Ducati Scrambler"],
    stats: { questions: 15, answers: 78, upvotes: 1890, reputation: 2890 },
    badges: ["Route Master", "Ducatisti"],
  },
  {
    id: "u5",
    username: "newrider2024",
    displayName: "NewRider2024",
    avatar: "NR",
    bio: "Just started my motorcycle journey! Excited to learn from this amazing community and eventually do some touring.",
    location: "Chicago, Illinois",
    joinedDate: "January 2024",
    bikes: ["Considering MT-07 or SV650"],
    stats: { questions: 5, answers: 2, upvotes: 45, reputation: 120 },
    badges: ["New Member"],
  },
  {
    id: "u6",
    username: "canyoncarver",
    displayName: "CanyonCarver",
    avatar: "CC",
    bio: "Weekend canyon warrior. Nothing beats the feeling of leaning into a perfect corner. Safety gear is non-negotiable!",
    location: "Los Angeles, California",
    joinedDate: "April 2022",
    bikes: ["Aprilia RSV4", "KTM 890 Duke R"],
    stats: { questions: 9, answers: 112, upvotes: 1567, reputation: 3210 },
    badges: ["Corner King", "Safety Advocate"],
  },
  {
    id: "u7",
    username: "techrider",
    displayName: "TechRider",
    avatar: "TR",
    bio: "Motorcycle tech enthusiast. Always testing the latest gadgets, intercoms, and accessories. Let me save you from bad purchases!",
    location: "Portland, Oregon",
    joinedDate: "February 2023",
    bikes: ["Honda Gold Wing", "BMW K1600GT"],
    stats: { questions: 18, answers: 203, upvotes: 3456, reputation: 6780 },
    badges: ["Tech Guru", "Trusted Reviewer", "Top Contributor"],
  },
  {
    id: "u8",
    username: "bigbikeguy",
    displayName: "BigBikeGuy",
    avatar: "BB",
    bio: "Heavier rider sharing tips for fellow big guys. Suspension setup, ergonomics, and gear that actually fits us.",
    location: "Phoenix, Arizona",
    joinedDate: "July 2023",
    bikes: ["Harley-Davidson Road Glide", "Indian Challenger"],
    stats: { questions: 11, answers: 67, upvotes: 890, reputation: 1450 },
    badges: ["Helpful", "Size-Inclusive Advocate"],
  },
  {
    id: "u9",
    username: "chainmaster",
    displayName: "ChainMaster",
    avatar: "CM",
    bio: "Professional motorcycle mechanic with 20 years experience. Chain and drivetrain specialist. Happy to help with maintenance questions!",
    location: "Atlanta, Georgia",
    joinedDate: "November 2021",
    bikes: ["Various shop bikes"],
    stats: { questions: 3, answers: 345, upvotes: 5670, reputation: 9870 },
    badges: ["Pro Mechanic", "Chain Expert", "Legend", "Top Contributor"],
  },
  {
    id: "u10",
    username: "waxenthusiast",
    displayName: "WaxEnthusiast",
    avatar: "WE",
    bio: "Detailing and maintenance obsessive. Your bike should look as good as it rides!",
    location: "Miami, Florida",
    joinedDate: "May 2023",
    bikes: ["BMW S1000RR", "Triumph Speed Triple"],
    stats: { questions: 7, answers: 89, upvotes: 1230, reputation: 1890 },
    badges: ["Detail King", "Maintenance Pro"],
  },
];

// Helper function to get user by username slug
export function getUserByUsername(username: string): User | undefined {
  return mockUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
}

// Helper function to get user by display name
export function getUserByDisplayName(displayName: string): User | undefined {
  return mockUsers.find(
    (user) =>
      user.displayName.toLowerCase().replace(/\s+/g, "-") ===
      displayName.toLowerCase().replace(/\s+/g, "-")
  );
}
