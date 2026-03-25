import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <footer id="contato" className="bg-secondary text-secondary-foreground pt-24 pb-12 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl font-heading font-bold mb-6">
                            Vamos construir o futuro da <span className="text-primary">energia</span> juntos?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
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
                                <textarea className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors h-32 resize-none" placeholder="Conte-nos brevemente sobre sua necessidade..." />
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
