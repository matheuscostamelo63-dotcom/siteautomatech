import { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        number: '01',
        title: 'Redes Aéreas',
        client: 'Oleoplan — Pará',
        category: 'Redes Aéreas',
        year: '2025',
        image: '/images/subestacao-138kv.jpg',
    },
    {
        number: '02',
        title: 'Caminhamento para Cabos',
        client: 'Vila Nova Agroindustrial',
        category: 'Infraestrutura',
        year: '2024',
        image: '/images/caminhamento-cabos.jpg',
    },
    {
        number: '03',
        title: 'Painéis de Controle Elétrico',
        client: 'Oleoplan — Pará',
        category: 'Elétrico',
        year: '2022',
        image: '/images/paineis-controle-qta.jpg',
    },
    {
        number: '04',
        title: 'Fabricação Industrial',
        client: '',
        category: 'Metalúrgica',
        year: '2024',
        image: '/images/fabricacao-industrial.jpg',
    },
];

const CompletedServices = () => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="portfolio" className="py-24 bg-background border-t border-border/10">
            {/* Header */}
            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Portfolio</p>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                            Alguns dos serviços<br />que já realizamos
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-base max-w-xs leading-relaxed md:text-right">
                        Uma seleção de projetos executados com rigor técnico e excelência.
                    </p>
                </motion.div>
            </div>

            {/* Panels strip */}
            <div
                className="flex border-t border-b border-border/20"
                style={{ height: '520px' }}
                onMouseLeave={() => setHovered(null)}
            >
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        onMouseEnter={() => setHovered(i)}
                        className="relative overflow-hidden cursor-pointer border-r border-border/20 last:border-r-0 flex-shrink-0"
                        style={{
                            flex: hovered === null
                                ? '1 1 25%'
                                : hovered === i
                                    ? '2.5 1 0%'
                                    : '0.6 1 0%',
                            transition: 'flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    >
                        {/* Image */}
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                            style={{
                                transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
                            }}
                        />

                        {/* Dark overlay — lighter on hover */}
                        <div
                            className="absolute inset-0 transition-colors duration-500"
                            style={{
                                background: hovered === i
                                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.1) 100%)'
                                    : 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.45) 100%)',
                            }}
                        />

                        {/* Year — top right */}
                        <span className="absolute top-5 right-5 font-mono text-xs text-white/40 tracking-wider">
                            {project.year}
                        </span>

                        {/* Number — top left */}
                        <span className="absolute top-5 left-5 font-mono text-xs text-white/30 tracking-widest">
                            {project.number}
                        </span>

                        {/* Bottom text */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            {/* Category — appears on hover */}
                            <div
                                className="overflow-hidden transition-all duration-500"
                                style={{
                                    maxHeight: hovered === i ? '32px' : '0px',
                                    opacity: hovered === i ? 1 : 0,
                                    marginBottom: hovered === i ? '8px' : '0px',
                                }}
                            >
                                <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
                                    {project.category}
                                </span>
                            </div>

                            <h3 className="font-heading font-bold text-white leading-snug mb-1"
                                style={{
                                    fontSize: hovered === i ? '1.35rem' : '0.875rem',
                                    transition: 'font-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            >
                                {project.title}
                            </h3>
                            <p className="text-white/50 text-xs font-medium">{project.client}</p>

                            {/* Thin line accent */}
                            <div
                                className="mt-4 h-px bg-primary transition-all duration-500 ease-out"
                                style={{ width: hovered === i ? '40px' : '20px', opacity: hovered === i ? 1 : 0.3 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Portfolio Link Button */}
            <div className="container mx-auto px-6 mt-16 flex justify-center pb-8">
                <motion.a
                    href="https://portifolioautomatech.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-4 px-8 py-3 rounded-full border border-border/40 bg-background/50 hover:bg-border/20 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-all duration-500"
                >
                    <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase">
                        Acessar Portfólio Completo
                    </span>
                    <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-primary group-hover:text-foreground transition-colors duration-500"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.div>
                </motion.a>
            </div>
        </section>
    );
};

export default CompletedServices;
