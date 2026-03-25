import { useRef, useMemo, useEffect } from 'react';

// Generates a procedural blue lens flare/glow on an offscreen canvas
const createFlareCanvas = () => {
    const size = 120;
    const center = size / 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // 1. Core radial glow
    const glow = ctx.createRadialGradient(center, center, 0, center, center, center);
    glow.addColorStop(0, 'rgba(255, 255, 255, 1)'); 
    glow.addColorStop(0.1, 'rgba(224, 242, 254, 0.9)');   // Very light blue
    glow.addColorStop(0.2, 'rgba(56, 189, 248, 0.6)');    // Bright cyan/blue
    glow.addColorStop(0.5, 'rgba(2, 132, 199, 0.2)');     // Mid blue
    glow.addColorStop(1, 'rgba(2, 132, 199, 0)');         // Fade out
    
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();

    // 2. Rays (Spikes)
    const numRays = 16;
    for (let i = 0; i < numRays; i++) {
        const angle = (i * Math.PI * 2) / numRays;
        const isLong = i % 2 === 0;
        const length = center * (isLong ? 0.95 : 0.4);
        
        ctx.beginPath();
        ctx.moveTo(center, center);
        const rayGrad = ctx.createLinearGradient(center, center, center + Math.cos(angle) * length, center + Math.sin(angle) * length);
        rayGrad.addColorStop(0, 'rgba(186, 230, 253, 0.8)');
        rayGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
        
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = isLong ? 1.5 : 2;
        ctx.lineTo(center + Math.cos(angle) * length, center + Math.sin(angle) * length);
        ctx.stroke();
    }
    
    // 3. Additional diagonal thin rays for the "star" effect
    for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI / 2) + Math.PI / 4;
        const length = center * 0.7;
        ctx.beginPath();
        ctx.moveTo(center, center);
        const rayGrad = ctx.createLinearGradient(center, center, center + Math.cos(angle) * length, center + Math.sin(angle) * length);
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        rayGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 0.5;
        ctx.lineTo(center + Math.cos(angle) * length, center + Math.sin(angle) * length);
        ctx.stroke();
    }

    return canvas;
};


interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    size: number;
    phase: number;
    pulseSpeed: number;
    dirTimer: number;
}

export default function Hero3DBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1, y: -1 });

    // 1. Extreme optimization: limit to 40 particles
    const count = 40;

    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: count }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.0006,
            vy: (Math.random() - 0.5) * 0.0006,
            ax: 0,
            ay: 0,
            size: 1.5 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.4 + Math.random() * 0.8,
            dirTimer: Math.random() * 5,
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // 2. Optimization: alpha false for faster clear
        if (!ctx) return;

        const setSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setSize();
        // Debounce resize
        let resizeTimer: any;
        window.addEventListener('resize', () => {
             clearTimeout(resizeTimer);
             resizeTimer = setTimeout(setSize, 100);
        });

        const onMouseMove = (e: MouseEvent) => {
            // Fast mouse tracking without getBoundingClientRect every frame
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener('mousemove', onMouseMove);

        // Pre-render the flare to an offscreen canvas for extreme performance
        const flareCanvas = createFlareCanvas();

        let lastTime = performance.now();
        const fpsInterval = 1000 / 30; // Max 30fps

        /**
         * 3. Optimization: Removed complex gradients and shadowBlurs.
         * Using globalAlpha with basic strokes is 10x faster for Canvas2D
         */
        const drawElectricBolt = (
            x1: number, y1: number,
            x2: number, y2: number,
            alpha: number, t: number, seed: number
        ) => {
            const segments = 4; // reduced complexity
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            ctx.beginPath();
            ctx.moveTo(x1, y1);

            for (let i = 1; i < segments; i++) {
                const tt = i / segments;
                const jitter = Math.sin(t * 3 + seed + i * 2.3) * 6; // smaller jitter
                ctx.lineTo(x1 + dx * tt + nx * jitter, y1 + dy * tt + ny * jitter);
            }
            ctx.lineTo(x2, y2);

            // Inner Core only - super fast
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#e0f2fe'; 
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Outer subtle glow
            ctx.globalAlpha = alpha * 0.4;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.globalAlpha = 1.0;
        };

        let startTime = performance.now();

        const draw = (now: number) => {
            frameRef.current = requestAnimationFrame(draw);

            const elapsed = now - lastTime;
            if (elapsed < fpsInterval) return;
            lastTime = now - (elapsed % fpsInterval);

            const t = (now - startTime) / 1000;
            const w = canvas.width;
            const h = canvas.height;

            // Paint background fast
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#020617'; // tailwind slate-950 matching typical dark background
            ctx.fillRect(0, 0, w, h);
            
            // Switch to additive blending for the flares and electric bolts
            ctx.globalCompositeOperation = 'screen';

            // Update particles
            for (const p of particles) {
                p.dirTimer -= 1 / 30;
                if (p.dirTimer <= 0) {
                    p.ax = (Math.random() - 0.5) * 0.0001;
                    p.ay = (Math.random() - 0.5) * 0.0001;
                    p.dirTimer = 2 + Math.random() * 4;
                }

                p.vx = (p.vx + p.ax) * 0.99;
                p.vy = (p.vy + p.ay) * 0.99;
                
                // Fast clamp
                const absVx = Math.abs(p.vx);
                const absVy = Math.abs(p.vy);
                if (absVx > 0.001) p.vx = p.vx > 0 ? 0.001 : -0.001;
                if (absVy > 0.001) p.vy = p.vy > 0 ? 0.001 : -0.001;
                
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
                if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

                const px = p.x * w;
                const py = p.y * h;
                const pulse = 0.7 + 0.3 * Math.sin(t * p.pulseSpeed + p.phase);

                // Draw the procedurally generated blue flare component
                const renderSize = p.size * 25 * pulse;
                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(p.phase + t * 0.2); // Slow spin for dynamic feel
                ctx.globalAlpha = 0.9;
                ctx.drawImage(flareCanvas, -renderSize / 2, -renderSize / 2, renderSize, renderSize);
                ctx.restore();
            }

            // Electric connections
             const connectionDist = 0.22;
             ctx.globalAlpha = 1.0;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const pi = particles[i];
                    const pj = particles[j];
                    // Fast distance check (avoid Math.hypot if bounding box fails)
                    const dx = Math.abs(pi.x - pj.x);
                    if (dx > connectionDist) continue;
                    const dy = Math.abs(pi.y - pj.y);
                    if (dy > connectionDist) continue;

                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < connectionDist) {
                        const proximity = 1 - (dist / connectionDist);
                        // Skip rendering very faint connections to save CPU
                        if (proximity < 0.2) continue; 
                        
                        const flicker = Math.sin(t * 2 + i * 0.9 + j * 1.1);
                        if (flicker > 0.15) {
                            const alpha = proximity * 0.8 * ((flicker - 0.15) / 0.85);
                            drawElectricBolt(
                                pi.x * w, pi.y * h,
                                pj.x * w, pj.y * h,
                                alpha, t, i * 17 + j
                            );
                        }
                    }
                }

                // Mouse connections
                const mx = mouseRef.current;
                if (mx.x >= 0) {
                    const dx = Math.abs(particles[i].x - mx.x);
                    const dy = Math.abs(particles[i].y - mx.y);
                    if (dx < 0.15 && dy < 0.15) {
                        const dMouse = Math.sqrt(dx*dx + dy*dy);
                        if (dMouse < 0.15) {
                            const alpha = (1 - dMouse / 0.15);
                            drawElectricBolt(
                                particles[i].x * w, particles[i].y * h,
                                mx.x * w, mx.y * h,
                                alpha, t, i * 31
                            );
                        }
                    }
                }
            }
            
            ctx.globalAlpha = 1.0;

        };

        frameRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [particles]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block', opacity: 0.8, mixBlendMode: 'screen' }}
            />
        </div>
    );
}
