import { motion } from 'framer-motion';

const Partners = () => {
    const partners = [
        { name: 'Master Operações Portuárias', image: '/partners/master.png' },
        { name: 'Vila Nova Agroindustrial', image: '/partners/vila-nova.png' },
        { name: 'Denpasa', image: '/partners/denpasa.png' },
        { name: 'Oleoplan', image: '/partners/oleoplan.png' },
        { name: 'AWK', image: '/images/awk.png' },
        { name: 'JBS', image: '/images/jbs.png' },
    ];

    return (
        <section className="py-20 bg-background border-t border-border/50 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Empresas Parceiras Que Já Trabalhamos</h2>
                    <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
                </motion.div>
            </div>

            {/* Marquee effect */}
            <div className="flex w-full overflow-hidden whitespace-nowrap relative group">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
                
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                    className="flex shrink-0 items-center justify-center gap-0 w-max group-hover:[animation-play-state:paused]"
                >
                    {/* Render the list multiple times for seamless loop */}
                    {[...partners, ...partners, ...partners].map((partner, index) => {
                        return (
                            <div 
                                key={index} 
                                className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300 w-40 md:w-60 h-28 md:h-36"
                            >
                                <img src={partner.image} alt={partner.name} className="object-contain w-full h-full scale-125 md:scale-150" />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
