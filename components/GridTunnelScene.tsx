"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SIZE = 300;
const DIVISIONS = 150;
const HALF = 14;
const LINE = 0xcccccc;
const SPEED = 4;

export default function GridTunnelScene() {
  const { scene } = useThree();
  const groupARef = useRef<THREE.Group>(null);
  const groupBRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.background = new THREE.Color("#f5f5f5");
    scene.fog = new THREE.Fog("#f5f5f5", 30, 150);
  }, [scene]);

  const setA = useMemo(() => {
    const floor = new THREE.GridHelper(SIZE, DIVISIONS, LINE, LINE);
    floor.position.set(0, -HALF, 0);
    const ceiling = new THREE.GridHelper(SIZE, DIVISIONS, LINE, LINE);
    ceiling.position.set(0, HALF, 0);
    return [floor, ceiling];
  }, []);

  const setB = useMemo(() => {
    const floor = new THREE.GridHelper(SIZE, DIVISIONS, LINE, LINE);
    floor.position.set(0, -HALF, 0);
    const ceiling = new THREE.GridHelper(SIZE, DIVISIONS, LINE, LINE);
    ceiling.position.set(0, HALF, 0);
    return [floor, ceiling];
  }, []);

  useFrame((_, delta) => {
    const dz = delta * SPEED;

    if (groupARef.current) {
      groupARef.current.position.z += dz;
      if (groupARef.current.position.z > SIZE / 2) {
        groupARef.current.position.z -= SIZE * 2;
      }
    }

    if (groupBRef.current) {
      groupBRef.current.position.z += dz;
      if (groupBRef.current.position.z > SIZE / 2) {
        groupBRef.current.position.z -= SIZE * 2;
      }
    }
  });

  return (
    <>
      <group ref={groupARef} position={[0, 0, -SIZE / 2]}>
        {setA.map((grid, i) => (
          <primitive key={i} object={grid} />
        ))}
      </group>
      <group ref={groupBRef} position={[0, 0, -SIZE / 2 - SIZE]}>
        {setB.map((grid, j) => (
          <primitive key={j + 10} object={grid} />
        ))}
      </group>
    </>
  );
}
