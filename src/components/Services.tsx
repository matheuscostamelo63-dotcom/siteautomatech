import { motion } from 'framer-motion';
import { Zap, Settings, Activity, Shield, Cable, Factory } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: Zap,
            title: 'Instalações Elétricas',
            desc: 'Projetos e execução de baixa, média e alta tensão com rigor técnico.',
        },
        {
            icon: Settings,
            title: 'Automação Industrial',
            desc: 'Desenvolvimento de painéis, CLPs e sistemas supervisórios modernos.',
        },
        {
            icon: Cable,
            title: 'Redes Aéreas',
            desc: 'Construção de infraestrutura primária e secundária de distribuição.',
        },
        {
            icon: Factory,
            title: 'Montagem Industrial',
            desc: 'Fabricação e alinhamento de estruturas metálicas e tubulações.',
        },
        {
            icon: Activity,
            title: 'Geração Solar',
            desc: 'Usinas fotovoltaicas de alta performance para o setor corporativo.',
        },
        {
            icon: Shield,
            title: 'SPDA e Aterramento',
            desc: 'Projetos completos de proteção contra descargas atmosféricas.',
        },
    ];

    return (
        <section id="servicos" className="py-24 bg-background relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -z-10" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Áreas de Atuação</h2>
                        <div className="h-1 w-20 bg-accent mb-6 rounded-full" />
                        <p className="text-xl text-muted-foreground">
                            Cobertura completa de engenharia, da concepção do projeto até o comissionamento.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-accent hover:bg-secondary transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:border-accent/50 transition-colors">
                                        <Icon className="w-7 h-7 text-foreground group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 font-heading">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
