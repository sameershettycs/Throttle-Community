"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPaperPlane,
  FaLightbulb,
  FaMotorcycle,
  FaWrench,
  FaRoute,
  FaCog,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { getAllEntries } from "@/contentstack/cda";
import type { Question } from "../types/contentstack";
import { getCategories } from "../lib/contentstack-helpers";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, typeof FaMotorcycle> = {
  Maintenance: FaWrench,
  Gear: FaMotorcycle,
  Routes: FaRoute,
  Technical: FaCog,
  General: FaUsers,
};

export default function AskQuestionForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from Contentstack
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const questionsRes = await getAllEntries("question");
        const questions = (questionsRes.entries || []) as Question[];
        const cats = getCategories(questions).filter(c => c !== "All");
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback categories
        setCategories(["Maintenance", "Gear", "Routes", "Technical", "General"]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section
    gsap.fromTo(
      ".form-title",
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

    gsap.fromTo(
      ".form-container",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".form-tip",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tips-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a question title";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please provide more details";
    } else if (formData.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success animation
    setTimeout(() => {
      setFormData({ title: "", description: "", category: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const tips = [
    "Be specific about your motorcycle model and year",
    "Include what you've already tried",
    "Add relevant tags for better visibility",
    "Check if similar questions exist first",
  ];

  return (
    <section
      ref={sectionRef}
      id="ask"
      className="relative py-24 bg-gradient-to-b from-charcoal to-black overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ember/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ember/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ember/10 border border-ember/20 rounded-full mb-6 form-title">
            <FaLightbulb className="text-ember" />
            <span className="text-ember text-sm font-semibold uppercase tracking-wider">
              Get Expert Help
            </span>
          </div>
          <h2 className="form-title font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            ASK THE COMMUNITY
          </h2>
          <p className="form-title text-silver/70 text-lg max-w-2xl mx-auto">
            Got a question? Our community of experienced riders is here to help
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="form-container bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-4xl text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Question Submitted!
                  </h3>
                  <p className="text-silver/70">
                    Our community will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-white font-medium"
                    >
                      Question Title <span className="text-ember">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., What's the best chain lube for long-distance touring?"
                      className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder:text-silver/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.title
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-white/10 focus:border-ember/50 focus:ring-ember/30"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm">{errors.title}</p>
                    )}
                  </div>

                  {/* Category Select */}
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-white font-medium"
                    >
                      Category <span className="text-ember">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {categories.length > 0 ? (
                        categories.map((category) => {
                          const Icon = categoryIcons[category] || FaMotorcycle;
                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, category }))
                              }
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                                formData.category === category
                                  ? "bg-ember/20 border-ember text-white"
                                  : "bg-white/5 border-white/10 text-silver/70 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <Icon className="text-xl" />
                              <span className="text-xs font-medium">
                                {category}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="col-span-5 text-center text-silver/60">
                          Loading categories...
                        </div>
                      )}
                    </div>
                    {errors.category && (
                      <p className="text-red-400 text-sm">{errors.category}</p>
                    )}
                  </div>

                  {/* Description Textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-white font-medium"
                    >
                      Details <span className="text-ember">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Provide more context about your question. Include your bike model, what you've tried, and any relevant details..."
                      className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder:text-silver/40 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        errors.description
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-white/10 focus:border-ember/50 focus:ring-ember/30"
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm">
                        {errors.description}
                      </p>
                    )}
                    <p className="text-silver/50 text-sm text-right">
                      {formData.description.length} / 500 characters
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
                        Submit Question
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Tips Sidebar */}
          <div className="tips-container space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <FaLightbulb className="text-ember" />
                Tips for Great Questions
              </h3>
              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <li
                    key={index}
                    className="form-tip flex items-start gap-3 text-silver/70"
                  >
                    <span className="w-6 h-6 bg-ember/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-ember text-xs font-bold">
                        {index + 1}
                      </span>
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-ember/20 to-orange-600/10 border border-ember/20 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-silver/70">Avg. Response Time</span>
                  <span className="text-white font-semibold">15 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver/70">Answer Rate</span>
                  <span className="text-white font-semibold">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver/70">Active Experts</span>
                  <span className="text-white font-semibold">2,340</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
