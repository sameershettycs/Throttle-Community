"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUp, FaClock, FaComment } from "react-icons/fa";
import Link from "next/link";
import { type Comment } from "../types/contentstack";
import { getAuthor, getAvatarInitials, usernameToSlug, formatRelativeTime } from "../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

interface CommentsSectionProps {
  comments: Comment[];
  questionId: string;
}

export default function CommentsSection({
  comments,
}: CommentsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate comments with stagger
    gsap.fromTo(
      ".comment-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [comments]);

  // Sort comments by aura points of the author
  const sortedComments = [...comments].sort((a, b) => {
    const auraA = getAuthor(a.author)?.aura_points || 0;
    const auraB = getAuthor(b.author)?.aura_points || 0;
    return auraB - auraA;
  });

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <FaComment className="text-ember" />
          {comments.length} {comments.length === 1 ? "Answer" : "Answers"}
        </h2>
        <div className="flex items-center gap-2 text-silver/60 text-sm">
          <span>Sorted by:</span>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-ember/50">
            <option value="votes">Most Votes</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      {sortedComments.length > 0 ? (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <FaComment className="text-4xl text-silver/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No answers yet
          </h3>
          <p className="text-silver/60">
            Be the first to help with this question!
          </p>
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const author = getAuthor(comment.author);
  const usernameSlug = author ? usernameToSlug(author.title) : "";
  const avatarInitials = author ? getAvatarInitials(author.full_name, author.title.substring(0, 2)) : "??";
  const createdAt = comment.created_at ? formatRelativeTime(comment.created_at) : "recently";
  const auraPoints = author?.aura_points || 0;

  return (
    <article className="comment-item p-6 rounded-2xl border transition-all duration-300 bg-white/5 border-white/10 hover:border-white/20">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1">
          <button className="w-10 h-10 bg-white/5 hover:bg-ember/20 rounded-lg flex items-center justify-center text-silver/60 hover:text-ember transition-all duration-300">
            <FaArrowUp />
          </button>
          <span className="text-white font-bold text-lg">{auraPoints}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Comment Content */}
          <p className="text-silver/90 leading-relaxed mb-4">{comment.content}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-4">
            {/* Author - Clickable */}
            {author && (
              <Link
                href={`/users/${usernameSlug}`}
                className="flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-ember to-orange-600 group-hover:scale-110 transition-transform duration-300">
                  {avatarInitials}
                </div>
                <span className="text-silver/70 font-medium group-hover:text-ember transition-colors">
                  {author.full_name}
                </span>
              </Link>
            )}

            {/* Time */}
            <div className="flex items-center gap-1.5 text-silver/50 text-sm">
              <FaClock className="text-xs" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
