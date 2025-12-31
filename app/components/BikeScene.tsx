"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBikeAudio } from "./BikeAudio";

gsap.registerPlugin(ScrollTrigger);

// Royal Enfield Himalayan inspired motorcycle wheel
function HimalayanWheel({
  position,
  isRunning,
  wheelSpeed
}: {
  position: [number, number, number];
  isRunning: boolean;
  wheelSpeed: number;
}) {
  const wheelRef = useRef<THREE.Group>(null);
  const spokeCount = 36;

  useFrame(() => {
    if (wheelRef.current && isRunning) {
      // Rotate around Z axis for proper 2D rolling animation (like a wheel rolling forward)
      wheelRef.current.rotation.z -= wheelSpeed;
    }
  });

  return (
    <group position={position}>
      {/* Rotating wheel group */}
      <group ref={wheelRef}>
        {/* Outer Tire - knobby off-road style */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.35, 24, 48]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
        {/* Tire treads */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          return (
            <mesh
              key={`tread-${i}`}
              position={[
                Math.cos(angle) * 1.2,
                Math.sin(angle) * 1.2,
                0
              ]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.15, 0.08, 0.25]} />
              <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>
          );
        })}
        {/* Inner rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.12, 16, 48]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Spoke ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.03, 8, 48]} />
          <meshStandardMaterial color="#888" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.4, 24]} />
          <meshStandardMaterial color="#333" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Hub cap - front */}
        <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
          <meshStandardMaterial color="#ff4500" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Hub cap - back */}
        <mesh position={[0, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
          <meshStandardMaterial color="#ff4500" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Spokes - wire style radiating from center */}
        {Array.from({ length: spokeCount }).map((_, i) => {
          const angle = (i * Math.PI * 2) / spokeCount;
          const zOffset = i % 2 === 0 ? 0.08 : -0.08;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.35,
                Math.sin(angle) * 0.35,
                zOffset
              ]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.008, 0.55, 0.015]} />
              <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
            </mesh>
          );
        })}
        {/* Brake disc */}
        <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          <meshStandardMaterial color="#444" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Royal Enfield Himalayan Body
function HimalayanBody({
  isRunning,
  engineVibration
}: {
  isRunning: boolean;
  engineVibration: number;
}) {
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bodyRef.current && isRunning) {
      // Engine vibration effect - characteristic thumper shake
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 50) * engineVibration;
      bodyRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 40) * 0.003;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Main Frame - tubular steel frame */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI * 0.08]}>
        <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Down tube */}
      <mesh position={[-0.8, -0.1, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Fuel Tank - Himalayan characteristic teardrop shape */}
      <group position={[-0.2, 1, 0]}>
        {/* Main tank body */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 24]} />
          <meshStandardMaterial
            color="#1e3a5f"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        {/* Tank extension */}
        <mesh position={[0.3, -0.1, 0]} scale={[1.3, 0.8, 0.9]}>
          <sphereGeometry args={[0.4, 24, 16]} />
          <meshStandardMaterial
            color="#1e3a5f"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        {/* Tank stripe */}
        <mesh position={[0, 0.05, 0.56]}>
          <boxGeometry args={[0.8, 0.1, 0.02]} />
          <meshStandardMaterial color="#ff4500" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Royal Enfield badge position */}
        <mesh position={[0, 0.2, 0.56]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#c0a000" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Fuel cap */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Seat - adventure style long seat */}
      <group position={[0.7, 0.7, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.2, 0.55]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
        </mesh>
        {/* Seat stitching lines */}
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[1.3, 0.01, 0.02]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Rear carrier/luggage rack */}
      <group position={[1.5, 0.9, 0]}>
        <mesh rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.5, 0.05, 0.4]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Rack supports */}
        <mesh position={[-0.2, -0.15, 0.18]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
        <mesh position={[-0.2, -0.15, -0.18]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
      </group>

      {/* Engine - 411cc single cylinder */}
      <group position={[0, 0, 0]}>
        {/* Engine block */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.7, 0.65, 0.5]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Cylinder */}
        <mesh position={[-0.1, 0.25, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.18, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Cylinder head */}
        <mesh position={[-0.15, 0.55, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.35, 0.15, 0.35]} />
          <meshStandardMaterial color="#333" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Cooling fins */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.1, 0.1 + i * 0.05, 0]} rotation={[0, 0, 0.15]}>
            <boxGeometry args={[0.45, 0.01, 0.55]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Crankcase */}
        <mesh position={[0.1, -0.4, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* Exhaust system */}
      <group position={[0.2, -0.35, 0.35]}>
        {/* Header pipe */}
        <mesh rotation={[Math.PI / 2, 0, 0.3]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
          <meshStandardMaterial color="#444" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Main exhaust */}
        <mesh position={[0.8, -0.1, 0.1]} rotation={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 16]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Exhaust tip */}
        <mesh position={[1.4, -0.15, 0.1]}>
          <cylinderGeometry args={[0.11, 0.09, 0.15, 16]} />
          <meshStandardMaterial color="#222" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Heat shield */}
        <mesh position={[0.8, -0.1, 0.2]} rotation={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16, 1, true]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Front forks - upside down style */}
      <group position={[-1.4, 0.2, 0]}>
        {/* Fork tubes */}
        <mesh position={[0, 0, 0.15]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.06, 0.06, 2, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.15]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.06, 0.06, 2, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Fork bridge */}
        <mesh position={[0.3, 0.6, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.5]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Front fender */}
        <mesh position={[-0.3, -0.5, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[1.4, 1.4, 0.5, 32, 1, true, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Handlebars - wide adventure style */}
      <group position={[-1.1, 1.2, 0]}>
        {/* Main bar */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
          <meshStandardMaterial color="#222" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Bar risers */}
        <mesh position={[0, -0.1, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#222" metalness={0.85} />
        </mesh>
        <mesh position={[0, -0.1, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#222" metalness={0.85} />
        </mesh>
        {/* Left grip */}
        <mesh position={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.035, 0.035, 0.15, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Right grip (throttle) */}
        <mesh position={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.035, 0.035, 0.15, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Mirrors */}
        <mesh position={[0.1, 0.15, 0.55]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0.1, 0.15, -0.55]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>

      {/* Headlight - round classic style */}
      <group position={[-1.6, 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.22, 0.15, 24]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.18, 32]} />
          <meshStandardMaterial
            color="#ffffee"
            emissive="#ffffcc"
            emissiveIntensity={isRunning ? 2 : 0.3}
          />
        </mesh>
        {/* Headlight guard/grill */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.19, 0.015, 8, 24]} />
          <meshStandardMaterial color="#333" metalness={0.9} />
        </mesh>
      </group>

      {/* Rear swing arm */}
      <mesh position={[1.1, -0.2, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[1.3, 0.12, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Rear fender */}
      <mesh position={[1.3, 0.1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[1.4, 1.4, 0.4, 32, 1, true, Math.PI * 0.2, Math.PI * 0.6]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Tail light */}
      <mesh position={[1.8, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.15]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={isRunning ? 1 : 0.2}
        />
      </mesh>

      {/* Side panels */}
      <mesh position={[0.5, 0.2, 0.35]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.2, -0.35]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Kick stand */}
      <mesh position={[0.3, -0.7, 0.3]} rotation={[0.3, 0, 0.7]}>
        <cylinderGeometry args={[0.025, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
    </group>
  );
}

// Exhaust smoke particles
function ExhaustSmoke({ isRunning }: { isRunning: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 1.5 + Math.random() * 0.5;
      pos[i * 3 + 1] = -0.5 + Math.random() * 0.3;
      pos[i * 3 + 2] = 0.4 + Math.random() * 0.2;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (particlesRef.current && isRunning) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += 0.02 + Math.random() * 0.01;
        positions[i * 3 + 1] += 0.005 + Math.random() * 0.005;

        if (positions[i * 3] > 3) {
          positions[i * 3] = 1.5;
          positions[i * 3 + 1] = -0.5 + Math.random() * 0.3;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!isRunning) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#666"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Full Himalayan Motorcycle
function HimalayanMotorcycle({
  scrollProgress,
  isRunning,
  wheelSpeed,
  engineVibration
}: {
  scrollProgress: { current: number };
  isRunning: boolean;
  wheelSpeed: number;
  engineVibration: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle hover when running
      if (isRunning) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02 - 0.3;
      }

      // Slight rotation based on scroll
      groupRef.current.rotation.y = -0.3 + scrollProgress.current * 0.3;

      // Scale based on viewport
      const scale = Math.min(viewport.width / 12, 0.85);
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <HimalayanBody isRunning={isRunning} engineVibration={engineVibration} />
      <HimalayanWheel position={[-1.7, -0.85, 0]} isRunning={isRunning} wheelSpeed={wheelSpeed} />
      <HimalayanWheel position={[1.7, -0.85, 0]} isRunning={isRunning} wheelSpeed={wheelSpeed} />
      <ExhaustSmoke isRunning={isRunning} />
    </group>
  );
}

// Ground with road texture effect
function Ground({ isRunning }: { isRunning: boolean }) {
  const textureOffset = useRef(0);
  const stripesRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (stripesRef.current && isRunning) {
      textureOffset.current += 0.15;
      stripesRef.current.position.x = -(textureOffset.current % 4);
    }
  });

  return (
    <group position={[0, -2.3, 0]}>
      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
        />
      </mesh>
      {/* Moving road markings */}
      <group ref={stripesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-10 + i * 2, 0.01, 0]}
          >
            <planeGeometry args={[0.8, 0.15]} />
            <meshStandardMaterial color="#ffcc00" />
          </mesh>
        ))}
      </group>
      {/* Dust particles when running */}
      {isRunning && (
        <Sparkles
          count={30}
          scale={[10, 0.5, 10]}
          size={0.5}
          speed={2}
          color="#8b7355"
          position={[0, 0.2, 0]}
        />
      )}
    </group>
  );
}

// Scene lighting
function SceneLighting({ isRunning }: { isRunning: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        color="#fff5e6"
      />
      <pointLight
        position={[-3, 3, 3]}
        intensity={0.8}
        color="#ff6b35"
      />
      <pointLight
        position={[3, 2, -3]}
        intensity={0.5}
        color="#4a90d9"
      />
      {/* Headlight glow */}
      {isRunning && (
        <spotLight
          position={[-2, 0.5, 0]}
          angle={0.4}
          penumbra={0.5}
          intensity={3}
          color="#ffffcc"
        />
      )}
    </>
  );
}

// Scene Content
function SceneContent({
  scrollProgress,
  isRunning,
  wheelSpeed,
  engineVibration
}: {
  scrollProgress: { current: number };
  isRunning: boolean;
  wheelSpeed: number;
  engineVibration: number;
}) {
  return (
    <>
      <SceneLighting isRunning={isRunning} />
      <HimalayanMotorcycle
        scrollProgress={scrollProgress}
        isRunning={isRunning}
        wheelSpeed={wheelSpeed}
        engineVibration={engineVibration}
      />
      <Ground isRunning={isRunning} />
      <Environment preset="sunset" />

      {/* Background sparkles */}
      <Sparkles
        count={50}
        scale={20}
        size={1}
        speed={0.3}
        color="#ff4500"
        opacity={0.3}
      />
    </>
  );
}

// Main Component with Audio
export default function BikeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const [isRunning, setIsRunning] = useState(false);
  const [wheelSpeed, setWheelSpeed] = useState(0);
  const [engineVibration, setEngineVibration] = useState(0);
  const [showStartPrompt, setShowStartPrompt] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [currentRPM, setCurrentRPM] = useState(1200);

  // Use the bike audio hook
  const { playStartupSound, setEngineRPM } = useBikeAudio();

  // Handle bike startup sequence
  const startBike = useCallback(async () => {
    if (isRunning || isStarting) return;

    setIsStarting(true);
    setShowStartPrompt(false);

    // Play the synthetic engine startup sound
    await playStartupSound();

    // Startup sequence animation
    // Initial crank
    setTimeout(() => {
      setEngineVibration(0.003);
    }, 500);

    // Engine catches
    setTimeout(() => {
      setEngineVibration(0.008);
      setWheelSpeed(0.02);
    }, 1500);

    // Rev up
    setTimeout(() => {
      setIsRunning(true);
      setEngineVibration(0.006);
      setWheelSpeed(0.06);
      setCurrentRPM(2500);
    }, 2500);

    // Settle to running idle with wheels spinning
    setTimeout(() => {
      setEngineVibration(0.003);
      setWheelSpeed(0.1);
      setCurrentRPM(1800);
      setIsStarting(false);
    }, 4000);
  }, [isRunning, isStarting, playStartupSound]);

  // Update audio RPM when currentRPM changes
  useEffect(() => {
    if (isRunning) {
      setEngineRPM(currentRPM);
    }
  }, [currentRPM, isRunning, setEngineRPM]);

  // Auto-start on user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (showStartPrompt) {
        startBike();
      }
    };

    // Listen for any click to start
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [showStartPrompt, startBike]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      scrollProgress.current = Math.min(scrollY / windowHeight, 1);

      // Increase wheel speed and RPM based on scroll
      if (isRunning) {
        const scrollBoost = scrollProgress.current * 0.2;
        setWheelSpeed(0.1 + scrollBoost);

        // Increase RPM with scroll
        const newRPM = 1800 + scrollProgress.current * 2000;
        setCurrentRPM(newRPM);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRunning]);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0 }}
    >
      {/* Start prompt overlay */}
      {showStartPrompt && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
          onClick={startBike}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated ignition key */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-ember/50 flex items-center justify-center bg-charcoal/70 backdrop-blur-md animate-pulse">
                <div className="w-24 h-24 rounded-full border-2 border-ember flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-ember"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-ember animate-ping opacity-50" />
            </div>

            <div className="text-center">
              <h3 className="text-white text-2xl font-heading tracking-wider mb-2">
                ROYAL ENFIELD HIMALAYAN
              </h3>
              <p className="text-ember text-lg font-semibold tracking-widest uppercase animate-pulse">
                Click to Start Engine
              </p>
              <p className="text-silver/50 text-sm mt-2">
                🔊 Sound On for Best Experience
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Starting indicator */}
      {isStarting && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 px-8 py-4 bg-charcoal/90 backdrop-blur-md rounded-2xl border border-ember/40">
            <div className="relative">
              <div className="w-4 h-4 bg-ember rounded-full animate-ping" />
              <div className="absolute inset-0 w-4 h-4 bg-ember rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-ember font-bold tracking-wider text-lg uppercase">
                Starting Engine...
              </span>
              <span className="text-silver/60 text-xs">
                411cc Single Cylinder Thumper
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Running indicator */}
      {isRunning && !isStarting && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-4 px-6 py-3 bg-charcoal/70 backdrop-blur-sm rounded-xl border border-ember/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">ENGINE RUNNING</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-silver/60 text-xs">RPM</span>
              <span className="text-ember font-bold font-mono">{Math.round(currentRPM)}</span>
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <SceneContent
          scrollProgress={scrollProgress}
          isRunning={isRunning}
          wheelSpeed={wheelSpeed}
          engineVibration={engineVibration}
        />
      </Canvas>
    </div>
  );
}
