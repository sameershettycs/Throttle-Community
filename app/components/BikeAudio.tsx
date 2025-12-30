"use client";

import { useEffect, useRef, useCallback } from "react";

// Web Audio API based Royal Enfield engine sound generator
export function useBikeAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const engineNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gains: GainNode[];
    filters: BiquadFilterNode[];
  } | null>(null);
  const isPlayingRef = useRef(false);

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();

    // Master gain
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.gain.value = 0;
    masterGainRef.current.connect(audioContextRef.current.destination);
  }, []);

  // Create engine sound components
  const createEngineSound = useCallback(() => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    const filters: BiquadFilterNode[] = [];

    // Royal Enfield Himalayan has a distinctive thumping single-cylinder sound
    // Base frequency around 25-30 Hz for the 411cc engine at idle (~1200 RPM)

    // 1. Main combustion thump (fundamental frequency)
    const mainOsc = ctx.createOscillator();
    mainOsc.type = "sawtooth";
    mainOsc.frequency.value = 20; // ~1200 RPM single cylinder

    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.4;

    const mainFilter = ctx.createBiquadFilter();
    mainFilter.type = "lowpass";
    mainFilter.frequency.value = 150;
    mainFilter.Q.value = 2;

    mainOsc.connect(mainFilter);
    mainFilter.connect(mainGain);
    mainGain.connect(masterGainRef.current);

    oscillators.push(mainOsc);
    gains.push(mainGain);
    filters.push(mainFilter);

    // 2. Second harmonic (exhaust note)
    const exhaustOsc = ctx.createOscillator();
    exhaustOsc.type = "square";
    exhaustOsc.frequency.value = 40;

    const exhaustGain = ctx.createGain();
    exhaustGain.gain.value = 0.25;

    const exhaustFilter = ctx.createBiquadFilter();
    exhaustFilter.type = "lowpass";
    exhaustFilter.frequency.value = 200;
    exhaustFilter.Q.value = 1;

    exhaustOsc.connect(exhaustFilter);
    exhaustFilter.connect(exhaustGain);
    exhaustGain.connect(masterGainRef.current);

    oscillators.push(exhaustOsc);
    gains.push(exhaustGain);
    filters.push(exhaustFilter);

    // 3. High frequency valve noise
    const valveOsc = ctx.createOscillator();
    valveOsc.type = "triangle";
    valveOsc.frequency.value = 80;

    const valveGain = ctx.createGain();
    valveGain.gain.value = 0.1;

    const valveFilter = ctx.createBiquadFilter();
    valveFilter.type = "bandpass";
    valveFilter.frequency.value = 800;
    valveFilter.Q.value = 3;

    valveOsc.connect(valveFilter);
    valveFilter.connect(valveGain);
    valveGain.connect(masterGainRef.current);

    oscillators.push(valveOsc);
    gains.push(valveGain);
    filters.push(valveFilter);

    // 4. Mechanical noise (chain, gears)
    const mechOsc = ctx.createOscillator();
    mechOsc.type = "sawtooth";
    mechOsc.frequency.value = 120;

    const mechGain = ctx.createGain();
    mechGain.gain.value = 0.05;

    const mechFilter = ctx.createBiquadFilter();
    mechFilter.type = "highpass";
    mechFilter.frequency.value = 1000;
    mechFilter.Q.value = 1;

    mechOsc.connect(mechFilter);
    mechFilter.connect(mechGain);
    mechGain.connect(masterGainRef.current);

    oscillators.push(mechOsc);
    gains.push(mechGain);
    filters.push(mechFilter);

    // 5. Low rumble (engine block vibration)
    const rumbleOsc = ctx.createOscillator();
    rumbleOsc.type = "sine";
    rumbleOsc.frequency.value = 10;

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.3;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.value = 80;
    rumbleFilter.Q.value = 5;

    rumbleOsc.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(masterGainRef.current);

    oscillators.push(rumbleOsc);
    gains.push(rumbleGain);
    filters.push(rumbleFilter);

    engineNodesRef.current = { oscillators, gains, filters };
  }, []);

  // Play startup sound sequence
  const playStartupSound = useCallback(async () => {
    initAudio();

    if (!audioContextRef.current || !masterGainRef.current) return;

    // Resume audio context if suspended
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Create starter motor sound
    const starterOsc = ctx.createOscillator();
    starterOsc.type = "sawtooth";
    starterOsc.frequency.value = 200;

    const starterGain = ctx.createGain();
    starterGain.gain.value = 0;

    const starterFilter = ctx.createBiquadFilter();
    starterFilter.type = "lowpass";
    starterFilter.frequency.value = 800;

    starterOsc.connect(starterFilter);
    starterFilter.connect(starterGain);
    starterGain.connect(ctx.destination);

    // Starter motor envelope
    starterGain.gain.setValueAtTime(0, now);
    starterGain.gain.linearRampToValueAtTime(0.15, now + 0.1);

    // Starter motor spinning up
    starterOsc.frequency.setValueAtTime(150, now);
    starterOsc.frequency.linearRampToValueAtTime(300, now + 0.5);
    starterOsc.frequency.linearRampToValueAtTime(350, now + 1);

    // First crank attempt (fail)
    starterGain.gain.linearRampToValueAtTime(0.2, now + 1);
    starterGain.gain.linearRampToValueAtTime(0.05, now + 1.2);

    // Second crank
    starterGain.gain.linearRampToValueAtTime(0.2, now + 1.5);

    // Engine catches
    starterOsc.frequency.linearRampToValueAtTime(100, now + 2);
    starterGain.gain.linearRampToValueAtTime(0, now + 2.5);

    starterOsc.start(now);
    starterOsc.stop(now + 3);

    // Create ignition "pop"
    const popNoise = ctx.createOscillator();
    popNoise.type = "square";
    popNoise.frequency.value = 50;

    const popGain = ctx.createGain();
    popGain.gain.value = 0;

    const popFilter = ctx.createBiquadFilter();
    popFilter.type = "lowpass";
    popFilter.frequency.value = 300;

    popNoise.connect(popFilter);
    popFilter.connect(popGain);
    popGain.connect(ctx.destination);

    // Ignition pop at engine catch
    popGain.gain.setValueAtTime(0, now + 2);
    popGain.gain.linearRampToValueAtTime(0.4, now + 2.05);
    popGain.gain.exponentialRampToValueAtTime(0.01, now + 2.3);

    popNoise.start(now + 2);
    popNoise.stop(now + 3);

    // Initial rev after start
    createEngineSound();

    if (engineNodesRef.current && masterGainRef.current) {
      const { oscillators, filters } = engineNodesRef.current;

      // Start all oscillators
      oscillators.forEach(osc => osc.start(now + 2.3));

      // Fade in engine sound
      masterGainRef.current.gain.setValueAtTime(0, now + 2.3);
      masterGainRef.current.gain.linearRampToValueAtTime(0.5, now + 2.8);

      // Initial rev (higher RPM)
      oscillators[0].frequency.setValueAtTime(25, now + 2.5);
      oscillators[0].frequency.linearRampToValueAtTime(50, now + 3);
      oscillators[0].frequency.linearRampToValueAtTime(35, now + 3.5);
      oscillators[0].frequency.linearRampToValueAtTime(20, now + 4.5);

      oscillators[1].frequency.setValueAtTime(50, now + 2.5);
      oscillators[1].frequency.linearRampToValueAtTime(100, now + 3);
      oscillators[1].frequency.linearRampToValueAtTime(70, now + 3.5);
      oscillators[1].frequency.linearRampToValueAtTime(40, now + 4.5);

      // Filter sweep during rev
      filters[0].frequency.setValueAtTime(150, now + 2.5);
      filters[0].frequency.linearRampToValueAtTime(400, now + 3);
      filters[0].frequency.linearRampToValueAtTime(150, now + 4.5);

      // Settle to idle volume
      masterGainRef.current.gain.linearRampToValueAtTime(0.35, now + 4.5);

      isPlayingRef.current = true;
    }
  }, [initAudio, createEngineSound]);

  // Set engine RPM (for running sound)
  const setEngineRPM = useCallback((rpm: number) => {
    if (!engineNodesRef.current || !masterGainRef.current || !audioContextRef.current) return;

    const { oscillators, filters } = engineNodesRef.current;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Convert RPM to frequency (1200 RPM idle = 20Hz for single cylinder)
    // Each combustion = 1 per 2 revolutions for 4-stroke
    const baseFreq = (rpm / 60) / 2;

    // Update frequencies with smooth transition
    oscillators[0].frequency.linearRampToValueAtTime(baseFreq, now + 0.1);
    oscillators[1].frequency.linearRampToValueAtTime(baseFreq * 2, now + 0.1);
    oscillators[2].frequency.linearRampToValueAtTime(baseFreq * 4, now + 0.1);
    oscillators[3].frequency.linearRampToValueAtTime(baseFreq * 6, now + 0.1);
    oscillators[4].frequency.linearRampToValueAtTime(baseFreq * 0.5, now + 0.1);

    // Adjust filter based on RPM
    const filterFreq = 150 + (rpm - 1200) * 0.5;
    filters[0].frequency.linearRampToValueAtTime(filterFreq, now + 0.1);

    // Volume slightly increases with RPM
    const volume = 0.3 + (rpm - 1200) * 0.0001;
    masterGainRef.current.gain.linearRampToValueAtTime(Math.min(volume, 0.5), now + 0.1);
  }, []);

  // Stop engine sound
  const stopEngine = useCallback(() => {
    if (!masterGainRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Fade out
    masterGainRef.current.gain.linearRampToValueAtTime(0, now + 0.5);

    // Stop oscillators after fade
    setTimeout(() => {
      if (engineNodesRef.current) {
        engineNodesRef.current.oscillators.forEach(osc => {
          try {
            osc.stop();
          } catch {
            // Already stopped
          }
        });
        engineNodesRef.current = null;
      }
      isPlayingRef.current = false;
    }, 600);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (engineNodesRef.current) {
        engineNodesRef.current.oscillators.forEach(osc => {
          try {
            osc.stop();
          } catch {
            // Already stopped
          }
        });
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playStartupSound,
    setEngineRPM,
    stopEngine,
    isPlaying: isPlayingRef.current,
  };
}

// Hook to create rev sound effect
export function useRevSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playRev = useCallback(() => {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Quick rev blip
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";

    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Rev envelope
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    // Frequency sweep
    osc.frequency.setValueAtTime(30, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.15);
    osc.frequency.linearRampToValueAtTime(25, now + 0.5);

    filter.frequency.setValueAtTime(200, now);
    filter.frequency.linearRampToValueAtTime(600, now + 0.15);
    filter.frequency.linearRampToValueAtTime(150, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.6);
  }, []);

  return { playRev };
}
