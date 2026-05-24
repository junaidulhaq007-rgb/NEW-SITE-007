import * as THREE from 'three';

/**
 * Create particle system for petals or effects
 */
export const createParticleSystem = (
  count: number = 1000,
  color: number = 0xd4a574
) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100; // x
    positions[i + 1] = Math.random() * 100; // y
    positions[i + 2] = (Math.random() - 0.5) * 100; // z

    velocities[i] = (Math.random() - 0.5) * 0.2; // vx
    velocities[i + 1] = -Math.random() * 0.5; // vy (downward)
    velocities[i + 2] = (Math.random() - 0.5) * 0.2; // vz
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const particles = new THREE.Points(geometry, material);
  return particles;
};

/**
 * Create glowing text geometry
 */
export const createGlowingText = (
  text: string,
  color: number = 0xd4a574
) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;

  const context = canvas.getContext('2d')!;
  context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
  context.font = 'Bold 80px Cormorant Garamond';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(8, 4);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  return new THREE.Mesh(geometry, material);
};

/**
 * Create realistic rose petal
 */
export const createRosePetal = () => {
  const geometry = new THREE.BufferGeometry();
  
  // Create petal shape using Bezier curves
  const points = [];
  for (let i = 0; i < Math.PI * 2; i += 0.1) {
    const x = Math.cos(i) * (1 + Math.sin(i * 3) * 0.3);
    const y = Math.sin(i) * (1 + Math.sin(i * 3) * 0.3);
    const z = Math.sin(i * 2) * 0.1;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const petalPoints = curve.getPoints(50);

  geometry.setFromPoints(petalPoints);

  const material = new THREE.LineBasicMaterial({
    color: 0xd4a574,
    linewidth: 2,
  });

  return new THREE.Line(geometry, material);
};

/**
 * Create ambient lighting setup
 */
export const setupLighting = (scene: THREE.Scene) => {
  // Ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Directional light for main lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Point light for glow effect
  const pointLight = new THREE.PointLight(0xd4a574, 0.6);
  pointLight.position.set(0, 5, 5);
  scene.add(pointLight);

  return { ambientLight, directionalLight, pointLight };
};

/**
 * Load texture with fallback
 */
export const loadTexture = async (
  url: string,
  textureLoader: THREE.TextureLoader
): Promise<THREE.Texture> => {
  try {
    return await textureLoader.loadAsync(url);
  } catch (error) {
    console.warn(`Failed to load texture: ${url}`, error);
    // Return a default white texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }
};
