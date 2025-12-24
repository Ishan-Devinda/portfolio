'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import {
    FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaGithub,
    FaBitbucket, FaDatabase, FaBrain, FaRobot, FaComments, FaTasks,
    FaProjectDiagram, FaDrawPolygon, FaFileAlt, FaCube, FaShieldAlt,
    FaSitemap, FaLayerGroup, FaCodeBranch, FaJs, FaWindows, FaCode
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiRedux, SiReactquery, SiExpress,
    SiSpringboot, SiFastapi, SiCplusplus, SiKotlin,
    SiFlutter, SiDart, SiMongodb, SiPostgresql,
    SiMysql, SiIpfs, SiTensorflow, SiPytorch, SiHuggingface,
    SiPostman, SiSwagger
} from 'react-icons/si';
import { FaJira, FaFigma } from 'react-icons/fa6';

interface SkillsProps {
    data: {
        skills: Array<{
            id: string;
            name: string;
            category: string;
            icon: string;
        }>;
    };
}

// Icon mapping
const iconMap: { [key: string]: any } = {
    FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaGithub,
    FaBitbucket, FaDatabase, FaBrain, FaRobot, FaComments, FaTasks,
    FaProjectDiagram, FaDrawPolygon, FaFileAlt, FaCube, FaShieldAlt,
    FaSitemap, FaLayerGroup, FaCodeBranch, FaJs, FaJira, FaFigma, FaWindows, FaCode,
    SiNextdotjs, SiTypescript, SiRedux, SiReactquery, SiExpress,
    SiSpringboot, SiFastapi, SiCplusplus, SiKotlin,
    SiFlutter, SiDart, SiMongodb, SiPostgresql,
    SiMysql, SiIpfs, SiTensorflow, SiPytorch, SiHuggingface,
    SiPostman, SiSwagger
};

const Skills = ({ data }: SkillsProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Group skills by category
    const groupedSkills = data.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as { [key: string]: typeof data.skills });

    return (
        <section id="skills" className="section-padding bg-dark-900/50" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A comprehensive showcase of technologies and tools I work with
                    </p>
                </motion.div>

                {/* Skills by Category */}
                <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="card p-6"
                        >
                            {/* Category Header */}
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                {category}
                            </h3>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-6 gap-3">
                                {skills.map((skill, skillIndex) => {
                                    const IconComponent = iconMap[skill.icon] || FaDatabase;

                                    return (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            className="flex flex-col items-center justify-center p-3 rounded-lg bg-dark-800/50 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 group cursor-pointer"
                                        >
                                            {/* Icon */}
                                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 mb-2">
                                                <IconComponent className="text-xl" />
                                            </div>

                                            {/* Skill Name */}
                                            <p className="text-xs font-medium text-gray-300 group-hover:text-primary-500 transition-colors text-center leading-tight">
                                                {skill.name}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Total Skills Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400">
                        Total <span className="text-primary-500 font-bold">{data.skills.length}</span> skills across <span className="text-primary-500 font-bold">{Object.keys(groupedSkills).length}</span> categories
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
