"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  cursorText: string;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const trailDotsRef = useRef<HTMLDivElement[]>([]);
  const requestRef = useRef<number | undefined>(undefined);

  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    cursorText: "",
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorDot) return;

    // Mouse position tracking
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const trailPositions: { x: number; y: number }[] = Array(8).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
      gsap.to(cursor, {
        scale: cursorState.isHovering ? 1.5 : 1,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    // Animation loop
    const animate = () => {
      // Smooth cursor movement
      cursorPos.x += (mousePos.x - cursorPos.x) * 0.15;
      cursorPos.y += (mousePos.y - cursorPos.y) * 0.15;

      // Smoother dot movement
      dotPos.x += (mousePos.x - dotPos.x) * 0.3;
      dotPos.y += (mousePos.y - dotPos.y) * 0.3;

      // Update trail positions
      trailPositions.unshift({ x: dotPos.x, y: dotPos.y });
      trailPositions.pop();

      // Apply positions
      if (cursor) {
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      }
      if (cursorText) {
        cursorText.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`;
      }

      // Update trail dots
      trailDotsRef.current.forEach((dot, i) => {
        if (dot && trailPositions[i]) {
          const opacity = 1 - i * 0.12;
          const scale = 1 - i * 0.1;
          dot.style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px) translate(-50%, -50%) scale(${scale})`;
          dot.style.opacity = String(opacity * 0.3);
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursorHover;

      const cursorText = target.dataset.cursorText || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";

      if (isInteractive) {
        setCursorState((prev) => ({
          ...prev,
          isHovering: true,
          cursorText,
        }));
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: "rgba(255, 69, 0, 0.1)",
          borderColor: "#ff4500",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          backgroundColor: "#ff4500",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        setCursorState((prev) => ({
          ...prev,
          isHovering: false,
          cursorText: "",
        }));
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "#ff4500",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: "#ff4500",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [cursorState.isHovering]);

  // Check if on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor Trail */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailDotsRef.current[i] = el;
          }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ember pointer-events-none z-[9998]"
          style={{
            opacity: 0,
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-ember pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: "transform",
        }}
      >
        {/* Bike Wheel Spokes Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full animate-[spin_3s_linear_infinite]"
            viewBox="0 0 48 48"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1="24"
                y1="24"
                x2="24"
                y2="8"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ember/30"
                transform={`rotate(${i * 60} 24 24)`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-ember pointer-events-none z-[10000]"
        style={{
          willChange: "transform",
          boxShadow: "0 0 10px #ff4500, 0 0 20px #ff4500",
        }}
      />

      {/* Cursor Text */}
      {cursorState.cursorText && (
        <div
          ref={cursorTextRef}
          className="fixed top-0 left-0 pointer-events-none z-[10001] px-3 py-1 bg-ember text-white text-xs font-bold rounded-full whitespace-nowrap"
          style={{
            transform: `translate(${cursorState.x + 30}px, ${cursorState.y + 30}px)`,
          }}
        >
          {cursorState.cursorText}
        </div>
      )}
    </>
  );
}
