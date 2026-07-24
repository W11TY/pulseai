import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HelixMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const { points, rungs } = useMemo(() => {
    const turns = 4;
    const segments = 80;
    const radius = 1;
    const height = 6;
    const a: THREE.Vector3[] = [];
    const b: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      a.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      b.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }
    const rungs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < a.length; i += 4) rungs.push([a[i], b[i]]);
    return { points: { a, b }, rungs };
  }, []);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.25;
  });

  const color = "#1F8A5C";

  return (
    <group ref={groupRef}>
      <Strand points={points.a} color={color} />
      <Strand points={points.b} color={color} />
      {rungs.map((r, i) => (
        <Rung key={i} a={r[0]} b={r[1]} color={color} />
      ))}
      {points.a.filter((_, i) => i % 4 === 0).map((p, i) => (
        <mesh key={`na-${i}`} position={p}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      {points.b.filter((_, i) => i % 4 === 0).map((p, i) => (
        <mesh key={`nb-${i}`} position={p}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function Strand({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.85} />
    </line>
  );
}

function Rung({ a, b, color }: { a: THREE.Vector3; b: THREE.Vector3; color: string }) {
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints([a, b]), [a, b]);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.35} />
    </line>
  );
}

export default function HelixCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <HelixMesh />
    </Canvas>
  );
}
