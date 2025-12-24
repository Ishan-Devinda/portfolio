'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Send email using EmailJS
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section id="contact" className="section-padding" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={slideInLeft}
                        className="space-y-6"
                    >
                        <div className="card flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaEnvelope className="text-primary-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                                <a href="mailto:devindaishan98@gmail.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                                    devindaishan98@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-primary-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                                <a href="tel:+94705830147" className="text-gray-400 hover:text-primary-500 transition-colors">
                                    +94 70 583 0147
                                </a>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaMapMarkerAlt className="text-primary-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                                <p className="text-gray-400">Hakman, Matara, Sri Lanka</p>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="relative h-64 rounded-xl overflow-hidden glass">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-green-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="w-32 h-32 border-4 border-primary-500/30 rounded-full"
                                ></motion.div>
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                    className="absolute w-24 h-24 border-4 border-green-500/30 rounded-full"
                                ></motion.div>
                            </div>
                            {/* Social Links */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                                <a
                                    href="https://github.com/Ishan-Devinda"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
                                >
                                    <FaGithub className="text-white" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ishan-liyanaarachchige-775986380/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
                                >
                                    <FaLinkedin className="text-white" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={slideInRight}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    required
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        <FaPaperPlane /> Send Message
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <p className="text-primary-500 text-center">Thank you! I&apos;ll get back to you soon.</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500 text-center">Oops! Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
