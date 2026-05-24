'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Interactive 3D Birthday Cake
 * Features: Realistic cake, candles, flame physics, confetti
 */
const CakeScene: React.FC<{ onCandleBlown?: () => void }> = ({ onCandleBlown }) => {
  return (
    <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
      <color attach="background" args={['#0a0e27']} />
      <fog attach="fog" args={['#0a0e27', 20, 80]} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1} castShadow />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#d4a574" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFD700" />

      {/* Scene */}
      <BirthdayCake onCandleBlown={onCandleBlown} />
      <Confetti />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enablePan={true}
        minDistance={8}
        maxDistance={25}
      />

      <Preload all />
    </Canvas>
  );
};

/**
 * Complete birthday cake model
 */
const BirthdayCake: React.FC<{ onCandleBlown?: () => void }> = ({ onCandleBlown }) => {
  const cakeRef = useRef<THREE.Group>(null);

  return (
    <group ref={cakeRef}>
      {/* Cake base layers */}
      <CakeLayer position={[0, 0, 0]} scale={1} color="#8B4513" />
      <CakeLayer position={[0, 1.2, 0]} scale={0.85} color="#A0522D" />
      <CakeLayer position={[0, 2.4, 0]} scale={0.7} color="#8B4513" />

      {/* Frosting decoration */}
      <FrostingDecoration />

      {/* Candles */}
      <Candles onCandleBlown={onCandleBlown} />

      {/* Glowing text on cake */}
      <CakeText />

      {/* Rose decorations */}
      <group position={[0, 3.5, 0]}>
        <RoseDecoration position={[-3, 0, 0]} />
        <RoseDecoration position={[3, 0, 0]} />
        <RoseDecoration position={[0, 0, -3]} />
        <RoseDecoration position={[0, 0, 3]} />
      </group>
    </group>
  );
};

/**
 * Single cake layer
 */
const CakeLayer: React.FC<{ position: [number, number, number]; scale: number; color: string }> = ({
  position,
  scale,
  color,
}) => {
  return (
    <group position={position}>
      {/* Main cake body */}
      <mesh scale={scale} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 1, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0} />
      </mesh>

      {/* Frosting top */}
      <mesh position={[0, 0.51, 0]} scale={[scale, 1, scale]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshStandardMaterial color="#D4A5A5" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
};

/**
 * Frosting decoration
 */
const FrostingDecoration: React.FC = () => {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Maroon and royal blue stripes */}
      <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.3, 5, 0.1]} />
        <meshStandardMaterial color="#4a0e0e" />
      </mesh>
      <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.3, 5, 0.1]} />
        <meshStandardMaterial color="#001a4d" />
      </mesh>
    </group>
  );
};

/**
 * Candles with flame
 */
const Candles: React.FC<{ onCandleBlown?: () => void }> = ({ onCandleBlown }) => {
  const candles = [
    [-1.5, 3, 0],
    [0, 3, 0],
    [1.5, 3, 0],
  ];

  return (
    <group>
      {candles.map((pos, idx) => (
        <Candle
          key={idx}
          position={pos as [number, number, number]}
          id={idx}
          onBlown={onCandleBlown}
        />
      ))}
    </group>
  );
};

const Candle: React.FC<{ position: [number, number, number]; id: number; onBlown?: () => void }> = ({
  position,
  id,
  onBlown,
}) => {
  const candleRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const [isBlown, setIsBlown] = useState(false);

  useFrame(({ clock }) => {
    if (!isBlown && flameRef.current) {
      const t = clock.getElapsedTime() * 3 + id;
      flameRef.current.position.y = 0.5 + Math.sin(t) * 0.1;
      flameRef.current.scale.y = 1 + Math.sin(t * 2) * 0.2;
    }
  });

  const handleClick = () => {
    setIsBlown(true);
    onBlown?.();
  };

  return (
    <group ref={candleRef} position={position}>
      {/* Candle body */}
      <mesh onClick={handleClick} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#FFFACD" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Flame */}
      {!isBlown && (
        <group position={[0, 0.45, 0]}>
          <mesh ref={flameRef}>
            <coneGeometry args={[0.1, 0.4, 8]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#FFA500" />
          </mesh>
          <pointLight position={[0, 0.2, 0]} color="#FFD700" intensity={1} distance={3} />
        </group>
      )}
    </group>
  );
};

/**
 * Cake text (ZAHRA FATIMA)
 */
const CakeText: React.FC = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={textRef} position={[0, 1.5, 2.8]}>
      <planeGeometry args={[3, 0.8]} />
      <meshBasicMaterial color="#d4a574" emissive="#d4a574" emissiveIntensity={0.8} />
    </mesh>
  );
};

/**
 * Rose decoration
 */
const RoseDecoration: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 3]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.2} metalness={0.1} />
      </mesh>
      <pointLight intensity={0.5} color="#d4a574" distance={3} />
    </group>
  );
};

/**
 * Confetti particle system
 */
const Confetti: React.FC = () => {
  const confettiRef = useRef<THREE.Points>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!confettiRef.current) return;

    const count = 200;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = 5;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      velocities[i] = (Math.random() - 0.5) * 0.3;
      velocities[i + 1] = -Math.random() * 0.1;
      velocities[i + 2] = (Math.random() - 0.5) * 0.3;
    }

    confettiRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    confettiRef.current.geometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocities, 3)
    );
  }, []);

  useFrame(() => {
    if (!confettiRef.current || !showConfetti) return;

    const geometry = confettiRef.current.geometry;
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const velocities = geometry.getAttribute('velocity') as THREE.BufferAttribute;

    const posArray = positions.array as Float32Array;
    const velArray = velocities.array as Float32Array;

    for (let i = 0; i < posArray.length; i += 3) {
      posArray[i] += velArray[i];
      posArray[i + 1] += velArray[i + 1];
      posArray[i + 2] += velArray[i + 2];

      if (posArray[i + 1] < 0) {
        posArray[i + 1] = 5;
      }
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={confettiRef}>
      <bufferGeometry />
      <pointsMaterial size={0.2} color="#d4a574" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

export { CakeScene, BirthdayCake, Candle, Confetti };
