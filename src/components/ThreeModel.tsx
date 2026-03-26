import { useRef, Suspense, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, Center, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                // Apply a vivid metallic material to all meshes
                obj.material = new THREE.MeshPhysicalMaterial({
                    color: obj.material.color || "#ffffff",
                    metalness: 1,
                    roughness: 0.1,        // Sharp reflections
                    clearcoat: 1,          // Extra glossy layer
                    clearcoatRoughness: 0.05,
                    envMapIntensity: 3,     // Boost reflection brightness
                });
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame((state) => {
        if (!modelRef.current) return;
        // Slow constant rotation
        modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        // Subtle floating movement
        modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    });

    return (
        <primitive 
            ref={modelRef} 
            object={scene} 
            scale={1.8} 
            position={[0, 0, 0]}
        />
    );
};

export default function ThreeModel() {
    return (
        <div className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
                
                <Suspense fallback={null}>
                    <PresentationControls
                        global
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                    >
                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                            <Center>
                                <Model url="/models/base_basic_pbr.glb" />
                            </Center>
                        </Float>
                    </PresentationControls>

                    <ContactShadows 
                        position={[0, -2.5, 0]} 
                        opacity={0.4} 
                        scale={10} 
                        blur={2} 
                        far={4.5} 
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload the model
useGLTF.preload('/models/base_basic_pbr.glb');
