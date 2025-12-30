"use client";

import React from "react";
import {
  FaFire,
  FaComment,
  FaArrowUp,
  FaClock,
  FaTag,
} from "react-icons/fa";
import { type Question } from "../types/contentstack";
import Link from "next/link";
import {
  getAuthor,
  getAvatarInitials,
  usernameToSlug,
  formatRelativeTime,
  isHotQuestion,
} from "../lib/contentstack-helpers";

interface QuestionCardProps {
  question: Question;
  commentCount?: number;
  className?: string;
}

export default function QuestionCard({
  question,
  commentCount = 0,
  className = ""
}: QuestionCardProps) {
  const author = getAuthor(question.author);
  const usernameSlug = author ? usernameToSlug(author.title) : "";
  const avatarInitials = author ? getAvatarInitials(author.full_name, author.title.substring(0, 2)) : "??";
  const isHot = author ? isHotQuestion(author.aura_points) : false;
  const createdAt = question.created_at ? formatRelativeTime(question.created_at) : "recently";

  const handleVoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add vote logic here
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Link will handle navigation
  };

  return (
    <Link href={`/questions/${question.uid}`}>
      <article
        className={`question-card group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-ember/30 transition-all duration-300 cursor-pointer ${className}`}
      >
        <div className="flex gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              onClick={handleVoteClick}
              className="w-10 h-10 bg-white/5 hover:bg-ember/20 rounded-lg flex items-center justify-center text-silver/60 hover:text-ember transition-all duration-300 z-10"
            >
              <FaArrowUp />
            </button>
            <span className="text-white font-bold text-lg">{author?.aura_points || 0}</span>
            <span className="text-silver/50 text-xs">points</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Hot Badge */}
            {isHot && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ember/20 rounded-full mb-3">
                <FaFire className="text-ember text-xs" />
                <span className="text-ember text-xs font-semibold">HOT</span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-ember transition-colors duration-300 line-clamp-2">
              {question.title}
            </h3>

          {/* Description */}
          <p className="text-silver/60 text-sm mb-4 line-clamp-2">
            {question.body}
          </p>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-silver/70 text-xs hover:bg-white/10 transition-colors"
                >
                  <FaTag className="text-[10px]" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {/* Author - Clickable */}
              {author && (
                <Link
                  href={`/users/${usernameSlug}`}
                  onClick={handleAuthorClick}
                  className="flex items-center gap-2 group/author z-10 relative"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-ember to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold group-hover/author:scale-110 transition-transform duration-300">
                    {avatarInitials}
                  </div>
                  <span className="text-silver/70 group-hover/author:text-ember transition-colors">
                    {author.full_name}
                  </span>
                </Link>
              )}

              {/* Time */}
              <div className="flex items-center gap-1.5 text-silver/50">
                <FaClock className="text-xs" />
                <span>{createdAt}</span>
              </div>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1.5 text-silver/60 group-hover:text-ember transition-colors">
              <FaComment className="text-sm" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
}
