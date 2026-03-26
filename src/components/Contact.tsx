import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <footer id="contato" className="bg-secondary text-secondary-foreground pt-24 pb-12 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl font-heading font-bold mb-6">
                                Vamos construir o futuro da <span className="text-primary">energia</span> juntos?
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                Entre em contato com nossa equipe de especialistas. Desenvolvemos estudos de viabilidade e projetos sob medida para o seu desafio industrial.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Phone className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Telefone Central</p>
                                        <a href="tel:+5591992438491" className="text-lg font-semibold hover:text-primary transition-colors">(91) 99243-8491</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Mail className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">E-mail Comercial</p>
                                        <a href="mailto:adm@automatech.eng.br" className="text-lg font-semibold hover:text-primary transition-colors">adm@automatech.eng.br</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <MapPin className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Sede</p>
                                        <p className="text-lg font-semibold">Castanhal – PA, Brasil</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="rounded-2xl overflow-hidden border border-border h-[250px] w-full"
                        >
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.1652433068!2d-47.9942485!3d-1.2941913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a5ee1161d9a5b3%3A0x7d8a9e7f5e8a9e7f!2sCastanhal%2C%20PA!5e0!3m2!1spt-BR!2sbr!4v1711475000000!5m2!1spt-BR!2sbr" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border h-fit"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome</label>
                                    <input type="text" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="João Silva" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Empresa</label>
                                    <input type="text" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Indústria S.A." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">E-mail corporativo</label>
                                <input type="email" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="joao@empresa.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mensagem ou Projeto</label>
                                <textarea className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors h-48 resize-none" placeholder="Conte-nos brevemente sobre sua necessidade..." />
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-4 rounded-lg transition-colors">
                                Enviar Solicitação
                            </button>
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-heading font-bold" translate="no">
                            <span className="text-primary">AUTO</span>
                            <span className="text-foreground">MATECH</span>
                        </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Automatech Engenharia. Todos os direitos reservados.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Contact;
