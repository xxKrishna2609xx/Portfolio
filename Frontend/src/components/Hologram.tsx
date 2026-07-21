import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Inner glowing core sphere
const CoreSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.62, 64, 64]} />
      <MeshDistortMaterial
        color="#0ea5e9"
        distort={0.55}
        speed={2.2}
        roughness={0.0}
        metalness={1.0}
        transparent
        opacity={0.18}
      />
    </mesh>
  );
};

// Outer wireframe distort shell
const WireframeSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.05, 48, 48]} />
      <MeshDistortMaterial
        color="#06B6D4"
        distort={0.38}
        speed={1.4}
        roughness={0.0}
        metalness={0.95}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

// Secondary outer wireframe shell (slower, purple tint)
const OuterShell: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.z = -clock.getElapsedTime() * 0.06;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.22, 24, 24]} />
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.18}
        speed={0.8}
        roughness={0.0}
        metalness={0.9}
        wireframe
        transparent
        opacity={0.22}
      />
    </mesh>
  );
};



const HologramCanvas: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }} style={{ pointerEvents: 'auto' }}>
      {/* Ambient and dramatic colored lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, 2, -3]} intensity={8} color="#06B6D4" distance={10} />
      <pointLight position={[4, -3, 2]} intensity={6} color="#7c3aed" distance={10} />
      <pointLight position={[0, 4, -4]} intensity={4} color="#0ea5e9" distance={8} />

      {/* Layered sphere geometry */}
      <CoreSphere />
      <WireframeSphere />
      <OuterShell />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} enablePan={false} />
    </Canvas>
  );
};

export const Hologram: React.FC = () => {
  return (
    <div className="w-full h-[300px] sm:h-[380px] md:h-[440px] flex items-center justify-center relative select-none">

      {/* Layered ambient background glow rings */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-brand-cyan/5 blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-cyan/15 animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
      <div className="absolute w-[380px] h-[380px] rounded-full border border-brand-purple/10 pointer-events-none animate-ping" style={{ animationDuration: '6s' }} />
      <div className="absolute w-[440px] h-[440px] rounded-full border border-brand-cyan/5 pointer-events-none animate-ping" style={{ animationDuration: '9s' }} />

      {/* R3F Canvas */}
      <Suspense fallback={
        <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 blur-xl animate-pulse flex items-center justify-center border border-white/5">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">LOADING 3D...</span>
        </div>
      }>
        <div className="w-full h-full absolute inset-0">
          <HologramCanvas />
        </div>
      </Suspense>

      {/* Bottom projection label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono-tech text-[9px] text-brand-cyan tracking-[0.25em] bg-slate-950/80 border border-brand-cyan/25 px-4 py-1.5 rounded-full shadow-[0_0_18px_rgba(6,182,212,0.2)] pointer-events-none uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
        [sys_mesh_projector_v1.2]
        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};
