"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowUp,
  FaFire,
  FaTag,
  FaClock,
  FaUser,
  FaShare,
  FaBookmark,
  FaFlag,
} from "react-icons/fa";
import CommentsSection from "../../components/CommentsSection";
import AddCommentForm from "../../components/AddCommentForm";
import { getAllEntries, getSingleEntry } from "@/contentstack/cda";
import type { Question, Comment } from "../../types/contentstack";
import {
  getAuthor,
  getAvatarInitials,
  usernameToSlug,
  formatRelativeTime,
  isHotQuestion,
  getCommentsForQuestion,
  getFirstBike,
} from "../../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

export default function QuestionDetailPage() {
  const params = useParams();
  const questionId = params.id as string;
  const pageRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch question and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [questionRes, commentsRes, questionsRes] = await Promise.all([
          getSingleEntry("question", questionId),
          getAllEntries("comment"),
          getAllEntries("question"),
        ]);

        setQuestion(questionRes as Question);
        const allComments = (commentsRes.entries || []) as Comment[];
        setComments(getCommentsForQuestion(allComments, questionId));
        setAllQuestions((questionsRes.entries || []) as Question[]);
      } catch (error) {
        console.error("Error fetching question:", error);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId]);

  useEffect(() => {
    if (!question) return;

    const page = pageRef.current;
    if (!page) return;

    // Page entrance animations
    gsap.fromTo(
      ".question-header",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".question-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".question-sidebar",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [question]);

  // Handle loading and not found
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-silver/60 text-lg">Loading question...</div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-charcoal pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Question Not Found
          </h1>
          <p className="text-silver/70 mb-8">
            The question you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/questions"
            className="px-6 py-3 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ember/30 transition-all duration-300"
          >
            Browse All Questions
          </Link>
        </div>
      </div>
    );
  }

  const author = getAuthor(question.author);
  const usernameSlug = author ? usernameToSlug(author.title) : "";
  const avatarInitials = author ? getAvatarInitials(author.full_name, author.title.substring(0, 2)) : "??";
  const isHot = author ? isHotQuestion(author.aura_points) : false;
  const createdAt = question.created_at ? formatRelativeTime(question.created_at) : "recently";
  const auraPoints = author?.aura_points || 0;
  const relatedBike = getFirstBike(question.related_bike);

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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <div className="question-header mb-8">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-silver/70 hover:text-ember transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Questions</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Question Card */}
            <article className="question-content bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex gap-6">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-2">
                  <button className="w-12 h-12 bg-white/5 hover:bg-ember/20 rounded-xl flex items-center justify-center text-silver/60 hover:text-ember transition-all duration-300">
                    <FaArrowUp className="text-xl" />
                  </button>
                  <span className="text-white font-bold text-2xl">
                    {auraPoints}
                  </span>
                  <span className="text-silver/50 text-sm">points</span>
                  <button className="w-12 h-12 bg-white/5 hover:bg-ember/20 rounded-xl flex items-center justify-center text-silver/60 hover:text-ember transition-all duration-300 rotate-180">
                    <FaArrowUp className="text-xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {isHot && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ember/20 rounded-full">
                        <FaFire className="text-ember text-sm" />
                        <span className="text-ember text-sm font-semibold">
                          HOT
                        </span>
                      </div>
                    )}
                    <span className="px-3 py-1.5 bg-white/10 rounded-full text-silver/80 text-sm">
                      {question.category}
                    </span>
                    {relatedBike && (
                      <span className="px-3 py-1.5 bg-ember/10 border border-ember/20 rounded-full text-ember text-sm">
                        {relatedBike.brand} {relatedBike.title}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    {question.title}
                  </h1>

                  {/* Description */}
                  <div className="prose prose-invert max-w-none mb-6">
                    <p className="text-silver/80 text-lg leading-relaxed">
                      {question.body}
                    </p>
                  </div>

                  {/* Tags */}
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {question.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/questions?tag=${tag}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-silver/70 hover:text-white text-sm transition-colors"
                        >
                          <FaTag className="text-xs" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      {author && (
                        <Link
                          href={`/users/${usernameSlug}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-ember to-orange-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                            {avatarInitials}
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-ember transition-colors">
                              {author.full_name}
                            </p>
                            <div className="flex items-center gap-1.5 text-silver/50 text-sm">
                              <FaClock className="text-xs" />
                              <span>Asked {createdAt}</span>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-silver/60 hover:text-white transition-all">
                        <FaShare />
                      </button>
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-silver/60 hover:text-white transition-all">
                        <FaBookmark />
                      </button>
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-silver/60 hover:text-red-400 transition-all">
                        <FaFlag />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <CommentsSection comments={comments} questionId={questionId} />

            {/* Add Comment Form */}
            <AddCommentForm questionId={questionId} />
          </div>

          {/* Sidebar */}
          <aside className="question-sidebar space-y-6">
            {/* Question Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Question Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-silver/60">Views</span>
                  <span className="text-white font-semibold">
                    {Math.floor(auraPoints * 12.5)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver/60">Aura Points</span>
                  <span className="text-white font-semibold">
                    {auraPoints}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver/60">Answers</span>
                  <span className="text-white font-semibold">
                    {comments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver/60">Asked</span>
                  <span className="text-white font-semibold">
                    {createdAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Questions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">
                Related Questions
              </h3>
              <div className="space-y-4">
                {allQuestions
                  .filter(
                    (q) =>
                      q.uid !== questionId && q.category === question.category
                  )
                  .slice(0, 4)
                  .map((relatedQ) => {
                    const relatedAuthor = getAuthor(relatedQ.author);
                    const relatedComments = getCommentsForQuestion(comments, relatedQ.uid);
                    return (
                      <Link
                        key={relatedQ.uid}
                        href={`/questions/${relatedQ.uid}`}
                        className="block group"
                      >
                        <p className="text-silver/80 group-hover:text-ember text-sm line-clamp-2 transition-colors">
                          {relatedQ.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-silver/50">
                          <span>{relatedAuthor?.aura_points || 0} points</span>
                          <span>{relatedComments.length} answers</span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Ask Question CTA */}
            <div className="bg-gradient-to-br from-ember/20 to-orange-600/10 border border-ember/20 rounded-2xl p-6 text-center">
              <FaUser className="text-3xl text-ember mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Have a question?</h3>
              <p className="text-silver/60 text-sm mb-4">
                Get help from the community
              </p>
              <Link
                href="/#ask"
                className="block w-full py-3 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ember/30 transition-all duration-300"
              >
                Ask a Question
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
