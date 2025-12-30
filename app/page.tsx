"use client";
import AskQuestionForm from "./components/AskQuestionForm";
import Hero from "./components/Hero";
import HotQuestions from "./components/HotQuestions";
import {
  BikeDivider,
  ParallaxSection,
  RevealOnScroll,
} from "./components/ScrollTransitions";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Bike Divider Animation */}
      <BikeDivider />

      {/* Hot Questions Section with Reveal Animation */}
      <RevealOnScroll direction="up" delay={0.1}>
        <ParallaxSection speed={0.3}>
          <HotQuestions />
        </ParallaxSection>
      </RevealOnScroll>

      {/* Another Bike Divider */}
      <BikeDivider />

      {/* Ask Question Form with Reveal Animation */}
      <RevealOnScroll direction="up" delay={0.2}>
        <AskQuestionForm />
      </RevealOnScroll>
    </>
  );
}
