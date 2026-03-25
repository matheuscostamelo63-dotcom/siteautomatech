import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

const LogoShape = () => {
    const meshRef = useRef<THREE.Group>(null);

    // Create the stylized "A" shapes based on the reference image
    const { shape1, shape2 } = useMemo(() => {
        // Top/Left part of the "A"
        const s1 = new THREE.Shape();
        s1.moveTo(0, 3);          // Tip
        s1.lineTo(-2.2, -1);      // Left bottom
        s1.lineTo(-0.2, -1);      // inner left
        s1.lineTo(0.6, 0.4);      // inner diagonal cut
        s1.closePath();

        // Bottom/Right piece
        const s2 = new THREE.Shape();
        s2.moveTo(0.8, 0.2);       // top notch
        s2.lineTo(2.2, -1);       // right bottom
        s2.lineTo(0.2, -1);       // bottom inner
        s2.closePath();

        return { shape1: s1, shape2: s2 };
    }, []);

    const extrudeSettings = {
        steps: 2,
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 5
    };

    useFrame((state) => {
        if (!meshRef.current) return;
        // Slow constant rotation
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
        // Subtle tilt
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    });

    return (
        <group ref={meshRef}>
            <Center>
                <mesh castShadow receiveShadow>
                    <extrudeGeometry args={[shape1, extrudeSettings]} />
                    <meshStandardMaterial 
                        color="#ffffff" 
                        metalness={1} 
                        roughness={0.15} 
                        envMapIntensity={1.5}
                    />
                </mesh>
                <mesh castShadow receiveShadow>
                    <extrudeGeometry args={[shape2, extrudeSettings]} />
                    <meshStandardMaterial 
                        color="#ffffff" 
                        metalness={1} 
                        roughness={0.15} 
                        envMapIntensity={1.5}
                    />
                </mesh>
            </Center>
        </group>
    );
};

export default function ThreeLogo() {
    return (
        <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
                
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <LogoShape />
                </Float>

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
