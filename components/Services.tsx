'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { FaCode, FaMobile, FaBrain, FaCloud, FaDatabase, FaPalette } from 'react-icons/fa';

interface ServicesProps {
    data: {
        services: Array<{
            id: string;
            title: string;
            description: string;
            icon: string;
        }>;
    };
}

const iconMap: { [key: string]: any } = {
    FaCode,
    FaMobile,
    FaBrain,
    FaCloud,
    FaDatabase,
    FaPalette,
};

const Services = ({ data }: ServicesProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="section-padding" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Services</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {data.services.map((service) => {
                        const IconComponent = iconMap[service.icon] || FaCode;

                        return (
                            <motion.div
                                key={service.id}
                                variants={staggerItem}
                                className="card group hover:border-primary-500 border border-transparent text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                    <IconComponent className="text-3xl text-primary-500 group-hover:text-white transition-colors duration-300" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400">{service.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
