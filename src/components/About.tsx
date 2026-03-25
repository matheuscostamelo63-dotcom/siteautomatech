import { motion } from 'framer-motion';
import { Target, Lightbulb, ShieldCheck, Cpu } from 'lucide-react';

const About = () => {
    const cards = [
        {
            icon: Target,
            title: 'Missão',
            desc: 'Entregar excelência em projetos de automação e energia com sustentabilidade.',
        },
        {
            icon: Lightbulb,
            title: 'Visão',
            desc: 'Ser a principal referência técnica em engenharia industrial do país.',
        },
        {
            icon: ShieldCheck,
            title: 'Valores',
            desc: 'Segurança, qualidade impecável e comprometimento com o cliente.',
        },
        {
            icon: Cpu,
            title: 'Inovação',
            desc: 'Tecnologia de ponta para solucionar desafios complexos.',
        },
    ];

    return (
        <section id="sobre" className="py-24 bg-secondary/30 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Nossa Essência</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
                    <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                        <p>
                            Fundada em 2019, a Automatech é uma empresa especializada em soluções de automação industrial e eletromecânica, oferecendo serviços de alta qualidade em todo o território nacional.
                        </p>
                        <p>
                            Nossa equipe é formada por profissionais altamente qualificados e experientes, comprometidos em entregar soluções sob medida que atendam às necessidades específicas de cada cliente, sempre priorizando a segurança e a eficiência.
                        </p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
