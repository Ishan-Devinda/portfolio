'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';
import { FaCheckCircle } from 'react-icons/fa';

interface AboutProps {
    data: {
        about: {
            description: string;
            highlights: string[];
        };
    };
}

const About = ({ data }: AboutProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section-padding bg-dark-900/50" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={slideInLeft}
                        className="space-y-6"
                    >
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {data.about.description}
                        </p>

                        <div className="space-y-4">
                            {data.about.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <FaCheckCircle className="text-primary-500 text-xl mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">{highlight}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={slideInRight}
                        className="relative"
                    >
                        <div className="card p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Name:</span>
                                <span className="text-white font-semibold">Ishan Devinda</span>
                            </div>
                            <div className="h-px bg-gray-700"></div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Email:</span>
                                <span className="text-white font-semibold">devindai98@gmail.com</span>
                            </div>
                            <div className="h-px bg-gray-700"></div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Location:</span>
                                <span className="text-white font-semibold">Colombo, Sri Lanka</span>
                            </div>
                            <div className="h-px bg-gray-700"></div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Availability:</span>
                                <span className="text-primary-500 font-semibold">Open to Opportunities</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
