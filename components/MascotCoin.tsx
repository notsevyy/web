"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function CoinModel() {
  const { scene } = useGLTF("/models/AWSCoin.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useEffect(() => {
    (scene as unknown as THREE.Scene).background = null;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.metalness = 0.9;
        child.material.roughness = 0.15;
        child.material.envMapIntensity = 1.5;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.PI / 2 - pointer.y * 0.1;
    groupRef.current.rotation.y = Math.PI + pointer.x * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}

export default function MascotCoin() {
  return (
    <div className="w-72 h-72 rounded-full overflow-hidden pointer-events-none shadow-xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <directionalLight position={[-5, 3, 4]} intensity={2} />
        <directionalLight position={[0, -6, 4]} intensity={1.5} />
        <directionalLight position={[4, -4, -5]} intensity={1} />
        <directionalLight position={[-4, 2, -5]} intensity={0.8} />
        <Suspense fallback={null}>
          <CoinModel />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
