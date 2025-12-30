"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import QuestionCard from "./QuestionCard";
import { getAllEntries } from "@/contentstack/cda";
import type { Question, Comment } from "../types/contentstack";
import { getCategories, getCommentCount } from "../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

export default function HotQuestions() {
  const sectionRef = useRef<HTMLElement>(null);
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
        const fetchedComments = (commentsRes.entries || []) as Comment[];

        setQuestions(fetchedQuestions);
        setComments(fetchedComments);
        setCategories(getCategories(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Only show first 6 questions on home page
  const filteredQuestions =
    selectedCategory === "All"
      ? questions.slice(0, 6)
      : questions.filter((q) => q.category === selectedCategory).slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section title
    gsap.fromTo(
      ".questions-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate category filters
    gsap.fromTo(
      ".category-btn",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate question cards with stagger
    gsap.fromTo(
      ".question-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".questions-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Re-animate cards when category changes
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
  }, [selectedCategory]);

  return (
    <section
      ref={sectionRef}
      id="questions"
      className="relative py-24 bg-gradient-to-b from-black via-charcoal to-charcoal"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ember/10 border border-ember/20 rounded-full mb-6 questions-title">
            <FaFire className="text-ember" />
            <span className="text-ember text-sm font-semibold uppercase tracking-wider">
              Trending Now
            </span>
          </div>
          <h2 className="questions-title font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            HOT QUESTIONS
          </h2>
          <p className="questions-title text-silver/70 text-lg max-w-2xl mx-auto">
            Join the conversation and help fellow riders with their burning
            questions
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-ember to-orange-600 text-white shadow-lg shadow-ember/30"
                  : "bg-white/5 text-silver/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Questions Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-silver/60">Loading questions...</div>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-silver/60">No questions found</div>
          </div>
        ) : (
          <div className="questions-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.uid}
                question={question}
                commentCount={getCommentCount(question.uid, comments)}
              />
            ))}
          </div>
        )}

        {/* Load More Button - Links to Questions Page */}
        <div className="text-center mt-12">
          <Link
            href="/questions"
            className="inline-block px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            Load More Questions
          </Link>
        </div>
      </div>
    </section>
  );
}
