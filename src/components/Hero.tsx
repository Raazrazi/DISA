import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import '../styles/Hero.css';

interface PillarShapeProps {
  position: [number, number, number];
  color: string;
  type: 'cube' | 'sphere' | 'torus' | 'cone';
  isHoveredFromList: boolean;
}

function PillarShape({ position, color, type, isHoveredFromList }: PillarShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHoveredFromList || internalHover;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (type === 'cube' ? 0.4 : 0.2);
      meshRef.current.rotation.y += delta * 0.3;
      
      // 1. Calculate the floating offset as a standalone number
const floatOffset = Math.sin(state.clock.getElapsedTime() + position[1]) * 0.15;

// 2. Extract the target Y coordinate from your position array and add the offset
const targetY = position[1] + floatOffset;

// 3. Linearly interpolate only the Y coordinate smoothly
meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);


      const targetScale = activeHover ? 1.4 : 1.0;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    }

    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, activeHover ? 0.5 : 0.2, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setInternalHover(true)}
      onPointerOut={() => setInternalHover(false)}
    >
      {type === 'cube' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
      {type === 'sphere' && <sphereGeometry args={[0.8, 64, 64]} />}
      {type === 'torus' && <torusGeometry args={[0.6, 0.25, 16, 100]} />}
      {type === 'cone' && <coneGeometry args={[0.7, 1.3, 32]} />}

      <MeshDistortMaterial
        ref={materialRef}
        color={activeHover ? "#ebb135" : color}
        distort={0.2}
        speed={3}
        roughness={0.15}
        metalness={0.2}
      />
    </mesh>
  );
}

const Hero = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="hero">
        
        {/* Background 3D Workspace Layer */}
        <div className="hero-canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            {/* Shapes colored with the Teal from your logo branding */}
            <PillarShape position={[-2.5, 1.5, 0]} color="#67a18c" type="cube" isHoveredFromList={activePillar === 'education'} />
            <PillarShape position={[2.5, 1.5, 0]} color="#67a18c" type="sphere" isHoveredFromList={activePillar === 'skills'} />
            <PillarShape position={[-2.5, -1.5, 0]} color="#67a18c" type="torus" isHoveredFromList={activePillar === 'sports'} />
            <PillarShape position={[2.5, -1.5, 0]} color="#67a18c" type="cone" isHoveredFromList={activePillar === 'arts'} />

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        {/* Foreground Information Content Layout */}
        <div className="hero-content">
          <h1 className="hero-title">
            DARUL IRSHAD <br />
            <span className="hero-highlight">STUDENTS' ASSOCIATION</span>
          </h1>
          
          <p className="hero-subtitle">
            Malabar Islahiggowai. Nurturing exceptional capabilities across four foundational structural pillars.
          </p>

          <div className="pillars-grid">
            <div 
              className={`pillar-card ${activePillar === 'education' ? 'focused' : ''}`}
              onMouseEnter={() => setActivePillar('education')}
              onMouseLeave={() => setActivePillar(null)}
            >
              <h3>📚 Education</h3>
              <p>Academic excellence & core logic mastery</p>
            </div>

            <div 
              className={`pillar-card ${activePillar === 'skills' ? 'focused' : ''}`}
              onMouseEnter={() => setActivePillar('skills')}
              onMouseLeave={() => setActivePillar(null)}
            >
              <h3>💡 Skill Improvement</h3>
              <p>Creative technological & professional growth</p>
            </div>

            <div 
              className={`pillar-card ${activePillar === 'sports' ? 'focused' : ''}`}
              onMouseEnter={() => setActivePillar('sports')}
              onMouseLeave={() => setActivePillar(null)}
            >
              <h3>⚽ Sports</h3>
              <p>Physical fitness teamwork & endurance training</p>
            </div>

            <div 
              className={`pillar-card ${activePillar === 'arts' ? 'focused' : ''}`}
              onMouseEnter={() => setActivePillar('arts')}
              onMouseLeave={() => setActivePillar(null)}
            >
              <h3>🎨 Arts</h3>
              <p>Cultural heritage expression & artistic talent</p>
            </div>
          </div>

          <div style={{ pointerEvents: "auto", marginTop: "30px" }}>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
