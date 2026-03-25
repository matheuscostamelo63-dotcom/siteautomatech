import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import CompletedServices from './components/CompletedServices'
import Partners from './components/Partners'
import Contact from './components/Contact'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time for initial animation
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {loading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                    >
                        <div className="flex flex-col items-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
                            />
                            <h2 className="text-2xl font-heading font-bold tracking-wider">
                                <span className="text-primary">AUTO</span>
                                <span className="text-foreground">MATECH</span>
                            </h2>
                            <p className="text-muted-foreground text-sm mt-2">Carregando experiência...</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen bg-background text-foreground selection:bg-primary/30"
                    >
                        <Header />
                        <main>
                            <Hero />
                            <About />
                            <Partners />
                            <CompletedServices />
                            <Services />
                        </main>
                        <Contact />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default App
