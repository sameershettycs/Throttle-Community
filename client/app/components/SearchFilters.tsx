"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalResults: number;
  totalQuestions: number;
  categories?: string[];
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalResults,
  totalQuestions,
  categories = ["All"],
}: SearchFiltersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange]
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const clearFilters = () => {
    setLocalSearch("");
    onSearchChange("");
    onCategoryChange("All");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Entrance animations
    gsap.fromTo(
      ".search-box",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".filter-category",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.4,
      }
    );
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Search Bar */}
      <div className="search-box relative max-w-2xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-silver/50 text-lg" />
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchInput}
            placeholder="Search questions by title..."
            className="w-full pl-14 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-silver/40 focus:outline-none focus:border-ember/50 focus:ring-2 focus:ring-ember/20 transition-all duration-300 text-lg"
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-silver/50 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`filter-category px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-ember to-orange-600 text-white shadow-lg shadow-ember/30"
                : "bg-white/5 text-silver/70 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count & Clear Filters */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <p className="text-silver/60 text-sm">
          Showing{" "}
          <span className="text-white font-semibold">{totalResults}</span> of{" "}
          <span className="text-white font-semibold">{totalQuestions}</span>{" "}
          questions
        </p>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-silver/70 hover:text-ember border border-white/10 rounded-lg hover:border-ember/30 transition-all duration-300"
          >
            <FaFilter className="text-xs" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
