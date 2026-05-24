'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Memory Constellation Scene
 * Interactive starfield representing qualities
 */
const ConstellationScene: React.FC<{ onStarClick?: (quality: string) => void }> = ({
  onStarClick,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 45 }}>
      <color attach="background" args={['#000815']} />
      <fog attach="fog" args={['#000815', 20, 100]} />

      {/* Stars background */}
      <Stars radius={200} depth={100} count={5000} factor={7} saturation={0} fade />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 30]} intensity={0.5} color="#d4a574" />

      {/* Constellation */}
      <MemoryConstellation onStarClick={onStarClick} />

      <Preload all />
    </Canvas>
  );
};

/**
 * Interactive constellation based on qualities
 */
const MemoryConstellation: React.FC<{ onStarClick?: (quality: string) => void }> = ({
  onStarClick,
}) => {
  const qualities = [
    { name: 'Kindness', color: '#FFB6C1', position: [-15, 10, 0] },
    { name: 'Loyalty', color: '#87CEEB', position: [15, 10, 0] },
    { name: 'Warmth', color: '#FFD700', position: [-10, -5, 0] },
    { name: 'Patience', color: '#DDA0DD', position: [10, -5, 0] },
    { name: 'Caring', color: '#FF69B4', position: [0, -12, 0] },
    { name: 'Strength', color: '#F08080', position: [0, 15, 0] },
  ];

  return (
    <group>
      {qualities.map((quality, idx) => (
        <ConstellationStar
          key={idx}
          quality={quality}
          index={idx}
          onClick={() => onStarClick?.(quality.name)}
        />
      ))}
      {/* Connect stars with lines */}
      <ConstellationLines />
    </group>
  );
};

interface Quality {
  name: string;
  color: string;
  position: [number, number, number];
}

const ConstellationStar: React.FC<{
  quality: Quality;
  index: number;
  onClick: () => void;
}> = ({ quality, index, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current || !lightRef.current) return;

    const t = clock.getElapsedTime() + index * 0.5;

    // Pulsing effect
    const scale = 1 + Math.sin(t) * 0.3;
    meshRef.current.scale.set(scale, scale, scale);

    // Glow intensity
    lightRef.current.intensity = 0.5 + Math.sin(t * 2) * 0.5;

    // Orbital motion
    if (hovered) {
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.05;
    }
  });

  return (
    <group position={quality.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
      >
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial color={quality.color} emissive={quality.color} emissiveIntensity={0.5} />
      </mesh>
      <pointLight
        ref={lightRef}
        color={quality.color}
        intensity={0.8}
        distance={15}
      />

      {/* Label */}
      <group position={[0, -3, 0]}>
        <mesh>
          <planeGeometry args={[4, 1]} />
          <meshBasicMaterial
            color={quality.color}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Connect constellation stars with lines
 */
const ConstellationLines: React.FC = () => {
  const points = [
    new THREE.Vector3(-15, 10, 0),
    new THREE.Vector3(15, 10, 0),
    new THREE.Vector3(-10, -5, 0),
    new THREE.Vector3(10, -5, 0),
    new THREE.Vector3(0, -12, 0),
    new THREE.Vector3(0, 15, 0),
    new THREE.Vector3(-15, 10, 0), // Close the loop
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial attach="material" color="#d4a574" linewidth={2} opacity={0.3} transparent />
    </line>
  );
};

export { ConstellationScene, MemoryConstellation };
