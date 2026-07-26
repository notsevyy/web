"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GridTunnelScene from "./GridTunnelScene";

export default function GridTunnel() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 bg-[#f5f5f5]">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 300 }}
        gl={{ antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <GridTunnelScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
