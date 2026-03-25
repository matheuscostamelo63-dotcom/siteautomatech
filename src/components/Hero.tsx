import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import Hero3DBackground from './Hero3DBackground';
import ThreeLogo from './ThreeLogo';

const COMPETENCIAS = [
    "Excelência",
    "Inovação",
    "Qualidade",
    "Segurança",
    "Eficiência",
    "Performance"
];

const Hero = () => {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((current) => (current + 1) % COMPETENCIAS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <Hero3DBackground />
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGNpcmNsZSBjeD0iMU0iIGN5PSIxTSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgoJPC9zdmc+')] opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
                {/* 3D Logo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto -mb-12 md:-mb-24"
                >
                    <ThreeLogo />
                </motion.div>

                <div className="w-full max-w-4xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 backdrop-blur-sm mb-8"
                    >
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground tracking-wide">Inovação em Engenharia Elétrica</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-6 leading-[1.1]"
                    >
                        Soluções Técnicas de <br />
                        <span className="inline-flex justify-center items-center h-[1.2em] relative min-w-[280px] sm:min-w-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={wordIndex}
                                    className="absolute w-full flex justify-center text-primary font-bold"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { 
                                            opacity: 1,
                                            transition: { staggerChildren: 0.05 }
                                        },
                                        exit: {
                                            opacity: 0,
                                            transition: { staggerChildren: 0.03, staggerDirection: -1 }
                                        }
                                    }}
                                >
                                    {COMPETENCIAS[wordIndex].split('').map((char, index) => (
                                        <motion.span
                                            key={`${wordIndex}-${index}`}
                                            variants={{
                                                hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
                                                visible: { 
                                                    opacity: 1, 
                                                    y: 0, 
                                                    filter: 'blur(0px)',
                                                    transition: { duration: 0.3, ease: "easeOut" }
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -15,
                                                    filter: 'blur(4px)',
                                                    transition: { duration: 0.2, ease: "easeIn" }
                                                }
                                            }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Nossa missão é transformar desafios cruciais em resultados tangíveis através da excelência em engenharia e automação.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#servicos"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.4)]"
                        >
                            Nossos Serviços
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contato"
                            className="w-full sm:w-auto px-8 py-4 bg-secondary text-foreground border border-border rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                        >
                            Falar com Especialista
                            <Target className="w-5 h-5 opacity-70" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
