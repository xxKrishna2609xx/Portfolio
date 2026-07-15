import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';

const HologramCanvas: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.2] }} style={{ pointerEvents: 'auto' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={1.0} color="#06B6D4" />
      <Sphere args={[1, 48, 48]} scale={1.1}>
        <MeshDistortMaterial
          color="#06B6D4"
          attach="material"
          distort={0.42}
          speed={1.6}
          roughness={0.15}
          metalness={0.85}
          wireframe
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
    </Canvas>
  );
};

export const Hologram: React.FC = () => {
  return (
    <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center relative select-none">
      {/* Background glow rings */}
      <div className="absolute w-[220px] h-[220px] rounded-full border border-brand-cyan/20 animate-pulse pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-brand-purple/10 animate-ping [animation-duration:5s] pointer-events-none" />

      {/* R3F Canvas Container */}
      <Suspense fallback={
        <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 blur-xl animate-pulse flex items-center justify-center border border-white/5">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">LOADING 3D...</span>
        </div>
      }>
        <div className="w-full h-full absolute inset-0">
          <HologramCanvas />
        </div>
      </Suspense>

      {/* Cyber scan projection overlay details */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-tech text-[9px] text-brand-cyan tracking-[0.25em] bg-slate-950/80 border border-brand-cyan/25 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.15)] animate-pulse pointer-events-none uppercase">
        [sys_mesh_projector_v0.9]
      </div>
    </div>
  );
};
