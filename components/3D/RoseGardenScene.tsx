'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Rose Garden Scene
 * Interactive garden with floating petals, butterflies, and fireflies
 */
const RoseGardenScene: React.FC = () => {
  const sceneRef = useRef<THREE.Scene>(null);
  const particlesRef = useRef<THREE.Points>(null);

  return (
    <Canvas
      camera={{ position: [0, 5, 15], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0e27']} />
      <fog attach="fog" args={['#0a0e27', 10, 50]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <pointLight position={[0, 5, 5]} intensity={0.6} color="#d4a574" />

      {/* Rose Garden Elements */}
      <RoseGarden />
      <FloatingPetals ref={particlesRef} />
      <Butterflies />
      <Fireflies />

      {/* Camera Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI * 0.7}
        minDistance={10}
        maxDistance={30}
      />

      <Preload all />
    </Canvas>
  );
};

/**
 * Rose garden with multiple roses
 */
const RoseGarden: React.FC = () => {
  const rosePositions = [
    [-5, 0, -5],
    [5, 0, -5],
    [0, 0, 0],
    [-3, 0, 3],
    [3, 0, 3],
  ];

  return (
    <group>
      {rosePositions.map((pos, idx) => (
        <Rose key={idx} position={pos as [number, number, number]} />
      ))}
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
};

/**
 * Single rose model
 */
const Rose: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#2a5a3a" />
      </mesh>

      {/* Flower head (simplified) */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <icosahedronGeometry args={[0.5, 4]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Glow effect */}
      <pointLight position={[0, 2.5, 0]} intensity={0.8} color="#d4a574" distance={5} />
    </group>
  );
};

/**
 * Floating rose petals particle system
 */
const FloatingPetals = React.forwardRef<THREE.Points>((props, ref) => {
  const particlesRef = useRef<THREE.Points>(null);
  const positionAttribute = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = Math.random() * 15;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      velocities[i] = (Math.random() - 0.5) * 0.1;
      velocities[i + 1] = -Math.random() * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.1;
    }

    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesRef.current.geometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocities, 3)
    );

    positionAttribute.current = positions;
  }, []);

  useFrame(() => {
    if (!particlesRef.current || !positionAttribute.current) return;

    const positions = positionAttribute.current;
    const geometry = particlesRef.current.geometry;
    const velocityAttr = geometry.getAttribute('velocity') as THREE.BufferAttribute;
    const velocities = velocityAttr.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      if (positions[i + 1] < 0) {
        positions[i + 1] = 15;
      }
    }

    (geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={particlesRef} {...props}>
      <bufferGeometry />
      <pointsMaterial
        size={0.3}
        color="#d4a574"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
});

FloatingPetals.displayName = 'FloatingPetals';

/**
 * Animated butterflies
 */
const Butterflies: React.FC = () => {
  const positions = [
    [2, 3, 2],
    [-3, 4, 1],
    [1, 3.5, -2],
  ];

  return (
    <group>
      {positions.map((pos, idx) => (
        <Butterfly key={idx} position={pos as [number, number, number]} delay={idx} />
      ))}
    </group>
  );
};

const Butterfly: React.FC<{ position: [number, number, number]; delay: number }> = ({
  position,
  delay,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime() + delay;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.5) * 2;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.3) * 1;
    groupRef.current.rotation.z = Math.sin(t * 3) * 0.5;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};

/**
 * Fireflies with glow
 */
const Fireflies: React.FC = () => {
  const count = 5;
  const fireflies = Array.from({ length: count }, (_, i) => i);

  return (
    <group>
      {fireflies.map((idx) => (
        <Firefly key={idx} id={idx} />
      ))}
    </group>
  );
};

const Firefly: React.FC<{ id: number }> = ({ id }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = [
    Math.random() * 20 - 10,
    Math.random() * 10 + 2,
    Math.random() * 20 - 10,
  ] as [number, number, number];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + id * 0.5;

    if (meshRef.current) {
      meshRef.current.position.x = startPos[0] + Math.sin(t * 0.3) * 3;
      meshRef.current.position.y = startPos[1] + Math.cos(t * 0.2) * 2;
      meshRef.current.position.z = startPos[2] + Math.sin(t * 0.25) * 3;
    }

    if (lightRef.current) {
      const intensity = 0.5 + Math.sin(t * 2) * 0.5;
      lightRef.current.intensity = intensity;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={startPos}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#FFFF00" />
      </mesh>
      <pointLight
        ref={lightRef}
        position={startPos}
        color="#FFFF00"
        intensity={0.8}
        distance={10}
      />
    </group>
  );
};

export { RoseGardenScene, RoseGarden, Rose, FloatingPetals, Butterflies, Fireflies };
