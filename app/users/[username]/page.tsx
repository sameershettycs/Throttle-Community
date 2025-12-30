"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendar,
  FaGlobe,
  FaMotorcycle,
  FaQuestion,
  FaComment,
  FaArrowUp,
  FaTrophy,
  FaStar,
  FaClock,
  FaTag,
} from "react-icons/fa";
import { getAllEntries } from "@/contentstack/cda";
import type { UserProfile, Question, Comment } from "../../types/contentstack";
import {
  getQuestionsByAuthor,
  getCommentsByAuthor,
  usernameToSlug,
  getAvatarInitials,
  formatRelativeTime,
  getFirstBike,
  getCommentCount,
} from "../../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"questions" | "answers">("questions");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, questionsRes, commentsRes] = await Promise.all([
          getAllEntries("user_profile"),
          getAllEntries("question"),
          getAllEntries("comment"),
        ]);

        const users = (usersRes.entries || []) as UserProfile[];
        const questions = (questionsRes.entries || []) as Question[];
        const comments = (commentsRes.entries || []) as Comment[];

        // Find user by matching username slug
        const foundUser = users.find(
          (u) => usernameToSlug(u.title) === username.toLowerCase()
        );

        if (foundUser) {
          setUser(foundUser);
          setUserQuestions(getQuestionsByAuthor(questions, foundUser.uid));
          setUserComments(getCommentsByAuthor(comments, foundUser.uid));
        }

        setAllComments(comments);
        setAllQuestions(questions);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (!user) return;

    const page = pageRef.current;
    if (!page) return;

    // Page entrance animations
    gsap.fromTo(
      ".profile-header",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".profile-stats",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".profile-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [user]);

  // Animate items when tab changes
  useEffect(() => {
    gsap.fromTo(
      ".activity-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeTab]);

  // Handle loading and not found
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-silver/60 text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-charcoal pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">User Not Found</h1>
          <p className="text-silver/70 mb-8">
            The user you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ember/30 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const avatarInitials = getAvatarInitials(user.full_name, user.title.substring(0, 2));
  const userBike = getFirstBike(user.bike);

  return (
    <div ref={pageRef} className="min-h-screen bg-charcoal pt-28 pb-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-silver/70 hover:text-ember transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Questions</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="profile-header bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-ember to-orange-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-ember/20">
                {avatarInitials}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user.full_name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-silver/60 text-sm">
                    <span className="flex items-center gap-1.5">
                      <FaStar className="text-ember" />
                      @{user.title}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCalendar className="text-ember" />
                      Level {user.experience_level} Rider
                    </span>
                  </div>
                </div>

                {/* Aura Points */}
                <div className="text-center px-6 py-3 bg-ember/10 border border-ember/20 rounded-xl">
                  <p className="text-2xl font-bold text-ember">
                    {user.aura_points.toLocaleString()}
                  </p>
                  <p className="text-silver/60 text-sm">Aura Points</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-silver/80 leading-relaxed mb-4">{user.bio}</p>

              {/* Bikes */}
              {userBike && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <FaMotorcycle className="text-ember" />
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-silver/70 text-sm">
                    {userBike.brand} {userBike.title}
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {user.experience_level >= 3 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm">
                    <FaTrophy className="text-xs" />
                    Experienced Rider
                  </span>
                )}
                {user.aura_points >= 10 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm">
                    <FaTrophy className="text-xs" />
                    High Aura
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FaQuestion}
            value={userQuestions.length}
            label="Questions"
          />
          <StatCard
            icon={FaComment}
            value={userComments.length}
            label="Answers"
          />
          <StatCard
            icon={FaArrowUp}
            value={user.aura_points}
            label="Aura Points"
          />
          <StatCard icon={FaStar} value={user.experience_level} label="Level" />
        </div>

        {/* Activity Tabs */}
        <div className="profile-content bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("questions")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 ${
                activeTab === "questions"
                  ? "text-ember border-b-2 border-ember bg-ember/5"
                  : "text-silver/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <FaQuestion className="inline mr-2" />
              Questions ({userQuestions.length})
            </button>
            <button
              onClick={() => setActiveTab("answers")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 ${
                activeTab === "answers"
                  ? "text-ember border-b-2 border-ember bg-ember/5"
                  : "text-silver/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <FaComment className="inline mr-2" />
              Answers ({userComments.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "questions" ? (
              <QuestionsTab questions={userQuestions} allComments={allComments} />
            ) : (
              <AnswersTab comments={userComments} allQuestions={allQuestions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof FaQuestion;
  value: number;
  label: string;
}) {
  return (
    <div className="profile-stats bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:border-ember/30 transition-all duration-300">
      <Icon className="text-2xl text-ember mx-auto mb-2" />
      <p className="text-2xl font-bold text-white">
        {value.toLocaleString()}
      </p>
      <p className="text-silver/60 text-sm">{label}</p>
    </div>
  );
}

function QuestionsTab({
  questions,
  allComments
}: {
  questions: Question[];
  allComments: Comment[];
}) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <FaQuestion className="text-4xl text-silver/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          No questions yet
        </h3>
        <p className="text-silver/60">
          This user hasn&apos;t asked any questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const commentCount = getCommentCount(question.uid, allComments);
        const author = question.author?.[0];
        const createdAt = question.created_at ? formatRelativeTime(question.created_at) : "recently";

        return (
          <Link
            key={question.uid}
            href={`/questions/${question.uid}`}
            className="activity-item block p-5 bg-white/5 rounded-xl border border-white/5 hover:border-ember/30 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                <span className="text-lg font-bold text-white">
                  {author?.aura_points || 0}
                </span>
                <span className="text-silver/50 text-xs">points</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-2 group-hover:text-ember transition-colors line-clamp-1">
                  {question.title}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-silver/50 flex items-center gap-1">
                    <FaComment className="text-xs" />
                    {commentCount} answers
                  </span>
                  <span className="text-silver/50 flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {createdAt}
                  </span>
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex gap-2">
                      {question.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-silver/60 text-xs"
                        >
                          <FaTag className="text-[8px]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function AnswersTab({
  comments,
  allQuestions
}: {
  comments: Comment[];
  allQuestions: Question[];
}) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <FaComment className="text-4xl text-silver/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          No answers yet
        </h3>
        <p className="text-silver/60">
          This user hasn&apos;t answered any questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        // Find the question this comment belongs to
        const questionUid = comment.question?.[0]?.uid;
        const question = allQuestions.find((q) => q.uid === questionUid);
        const author = comment.author?.[0];
        const createdAt = comment.created_at ? formatRelativeTime(comment.created_at) : "recently";

        return (
          <Link
            key={comment.uid}
            href={`/questions/${questionUid}`}
            className="activity-item block p-5 bg-white/5 rounded-xl border border-white/5 hover:border-ember/30 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                <span className="text-lg font-bold text-white">
                  {author?.aura_points || 0}
                </span>
                <span className="text-silver/50 text-xs">points</span>
              </div>
              <div className="flex-1 min-w-0">
                {question && (
                  <p className="text-ember text-sm mb-1 line-clamp-1">
                    Re: {question.title}
                  </p>
                )}
                <p className="text-silver/80 text-sm mb-2 line-clamp-2">
                  {comment.content}
                </p>
                <span className="text-silver/50 text-xs flex items-center gap-1">
                  <FaClock className="text-[10px]" />
                  {createdAt}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
