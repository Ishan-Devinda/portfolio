'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { FaBriefcase } from 'react-icons/fa';

interface ExperienceProps {
    data: {
        experience: Array<{
            id: string;
            company: string;
            position: string;
            duration: string;
            description: string;
            technologies: string[];
        }>;
    };
}

const Experience = ({ data }: ExperienceProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="section-padding" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    {data.experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            variants={staggerItem}
                            className="relative pl-8 md:pl-12 border-l-2 border-primary-500"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full border-4 border-dark-900"></div>

                            <div className="card">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                                        <p className="text-primary-500 font-semibold flex items-center gap-2">
                                            <FaBriefcase /> {exp.company}
                                        </p>
                                    </div>
                                    <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.duration}</span>
                                </div>

                                <p className="text-gray-300 mb-4">{exp.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm border border-primary-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
