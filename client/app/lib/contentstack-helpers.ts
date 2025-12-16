import type { UserProfile, Comment, Question } from "../types/contentstack";

/**
 * Format Contentstack ISO date to relative time string
 * @param dateString - ISO date string from Contentstack
 * @returns Relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

/**
 * Extract first author from Contentstack reference array
 * @param authorArray - Array of UserProfile from Contentstack
 * @returns First author or null
 */
export function getAuthor(authorArray?: UserProfile[]): UserProfile | null {
  return authorArray?.[0] || null;
}

/**
 * Extract first bike from Contentstack reference array
 * @param bikeArray - Array of Bike from Contentstack
 * @returns First bike or null
 */
export function getFirstBike(bikeArray?: any[]): any | null {
  return bikeArray?.[0] || null;
}

/**
 * Calculate comment count for a specific question
 * @param questionUid - Question UID to filter by
 * @param comments - Array of all comments
 * @returns Number of comments for the question
 */
export function getCommentCount(
  questionUid: string,
  comments: Comment[]
): number {
  return comments.filter((c) => c.question?.[0]?.uid === questionUid).length;
}

/**
 * Get avatar initials from user name
 * @param fullName - User's full name
 * @param fallback - Fallback text if no name
 * @returns Two-letter initials
 */
export function getAvatarInitials(
  fullName?: string,
  fallback: string = "U"
): string {
  if (!fullName) return fallback;

  const names = fullName.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
}

/**
 * Convert username to slug format
 * @param username - Username string
 * @returns Slugified username
 */
export function usernameToSlug(username: string): string {
  return username.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Determine if a question is "hot" based on aura points
 * @param auraPoints - Author's aura points
 * @returns True if question should be marked as hot
 */
export function isHotQuestion(auraPoints: number = 0): boolean {
  return auraPoints >= 5;
}

/**
 * Get categories from questions
 * @param questions - Array of questions
 * @returns Unique array of categories with "All" prepended
 */
export function getCategories(questions: Question[]): string[] {
  const uniqueCategories = new Set(
    questions.map((q) => q.category).filter(Boolean)
  );
  return ["All", ...Array.from(uniqueCategories)];
}

/**
 * Filter comments by question UID
 * @param comments - Array of all comments
 * @param questionUid - Question UID to filter by
 * @returns Filtered comments
 */
export function getCommentsForQuestion(
  comments: Comment[],
  questionUid: string
): Comment[] {
  return comments.filter((comment) =>
    comment.question?.[0]?.uid === questionUid
  );
}

/**
 * Filter questions by author UID
 * @param questions - Array of all questions
 * @param authorUid - Author UID to filter by
 * @returns Filtered questions
 */
export function getQuestionsByAuthor(
  questions: Question[],
  authorUid: string
): Question[] {
  return questions.filter((question) =>
    question.author?.[0]?.uid === authorUid
  );
}

/**
 * Filter comments by author UID
 * @param comments - Array of all comments
 * @param authorUid - Author UID to filter by
 * @returns Filtered comments
 */
export function getCommentsByAuthor(
  comments: Comment[],
  authorUid: string
): Comment[] {
  return comments.filter((comment) =>
    comment.author?.[0]?.uid === authorUid
  );
}
