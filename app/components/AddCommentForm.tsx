"use client";

import { useState } from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaInfoCircle,
  FaLightbulb,
} from "react-icons/fa";

interface AddCommentFormProps {
  questionId: string;
  onCommentAdded?: () => void;
}

export default function AddCommentForm({
  questionId,
  onCommentAdded,
}: AddCommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!content.trim()) {
      setError("Please write your answer before submitting");
      return false;
    }
    if (content.trim().length < 20) {
      setError("Your answer should be at least 20 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setContent("");
      setIsSubmitted(false);
      onCommentAdded?.();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) setError("");
  };

  const tips = [
    "Be specific and include details",
    "Share your personal experience",
    "Back up claims with sources",
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-ember/20 rounded-xl flex items-center justify-center">
          <FaPaperPlane className="text-ember" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Your Answer</h3>
          <p className="text-silver/60 text-sm">
            Share your knowledge with the community
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12 animate-fadeIn">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Answer Submitted!
          </h3>
          <p className="text-silver/70">
            Thank you for contributing to the community.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Textarea */}
          <div className="space-y-2">
            <textarea
              value={content}
              onChange={handleChange}
              rows={6}
              placeholder="Write your answer here. Be detailed and helpful to the asker..."
              className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder:text-silver/40 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-white/10 focus:border-ember/50 focus:ring-ember/30"
              }`}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex items-center justify-between text-sm">
              <p className="text-silver/50">
                {content.length} characters (minimum 20)
              </p>
              {content.length >= 20 && (
                <p className="text-green-400 flex items-center gap-1">
                  <FaCheckCircle className="text-xs" />
                  Good to go!
                </p>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-ember/5 border border-ember/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-ember mb-2">
              <FaLightbulb className="text-sm" />
              <span className="font-semibold text-sm">Tips for a great answer</span>
            </div>
            <ul className="space-y-1">
              {tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-silver/70 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-ember/60 rounded-full" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Community Guidelines Notice */}
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
            <FaInfoCircle className="text-silver/50 mt-0.5 flex-shrink-0" />
            <p className="text-silver/50 text-sm">
              By submitting, you agree to our community guidelines. Be
              respectful, stay on topic, and avoid spam or self-promotion.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-ember to-orange-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-ember/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Post Your Answer
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
