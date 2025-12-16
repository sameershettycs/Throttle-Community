"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowLeft, FaQuestionCircle, FaSearch } from "react-icons/fa";
import Link from "next/link";
import QuestionCard from "../components/QuestionCard";
import SearchFilters from "../components/SearchFilters";
import { getAllEntries } from "@/contentstack/cda";
import type { Question, Comment } from "../types/contentstack";
import { getCommentCount, getCategories } from "../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

export default function QuestionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Contentstack
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [questionsRes, commentsRes] = await Promise.all([
          getAllEntries("question"),
          getAllEntries("comment"),
        ]);

        const fetchedQuestions = (questionsRes.entries || []) as Question[];
        setQuestions(fetchedQuestions);
        setComments((commentsRes.entries || []) as Comment[]);
        setCategories(getCategories(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter questions based on search and category
  const filteredQuestions = useMemo(() => {
    let results = questions;

    // Apply category filter
    if (selectedCategory !== "All") {
      results = results.filter((q) => q.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.body.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return results;
  }, [searchQuery, selectedCategory, questions]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Page entrance animation
    gsap.fromTo(
      ".page-header",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    gsap.fromTo(
      ".question-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, [searchQuery, selectedCategory]);

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
        {/* Page Header */}
        <div className="page-header mb-12">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-silver/70 hover:text-ember mb-8 transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </Link>

          {/* Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ember/10 border border-ember/20 rounded-full mb-6">
              <FaQuestionCircle className="text-ember" />
              <span className="text-ember text-sm font-semibold uppercase tracking-wider">
                Community Knowledge
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              ALL QUESTIONS
            </h1>
            <p className="text-silver/70 text-lg max-w-2xl mx-auto">
              Browse through our community&apos;s questions and find the answers
              you&apos;re looking for
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalResults={filteredQuestions.length}
            totalQuestions={questions.length}
            categories={categories}
          />
        </div>

        {/* Questions Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-silver/60 text-lg">Loading questions...</div>
          </div>
        ) : filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.uid}
                question={question}
                commentCount={getCommentCount(question.uid, comments)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-4xl text-silver/30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No questions found
            </h3>
            <p className="text-silver/60 max-w-md mx-auto mb-8">
              We couldn&apos;t find any questions matching your search criteria.
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ember/30 transform hover:scale-105 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Ask Question CTA */}
        {filteredQuestions.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-ember/10 to-orange-600/5 border border-ember/20 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-3">
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="text-silver/70 mb-6 max-w-md mx-auto">
                Our community of expert riders is ready to help you with any
                motorcycle-related question.
              </p>
              <Link
                href="/#ask"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ember to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-ember/40 transform hover:scale-105 transition-all duration-300"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
