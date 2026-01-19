'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaRocket, FaCheckCircle, FaCog, FaTrophy, FaUsers, FaLightbulb } from 'react-icons/fa';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    fullDescription?: string;
    image: string;
    technologies: string[];
    aiFeatures?: string[];
    coreFeatures?: string[];
    techStack?: {
        frontend?: string[];
        backend?: string[];
        aiml?: string[];
        services?: string[];
        security?: string[];
        database?: string[];
        tools?: string[];
        embeddings?: string[];
        monitoring?: string[];
        architecture?: string[];
        analytics?: string[];
        blockchain?: string[];
        mobile?: string[];
        storage?: string[];
    };
    achievements?: string[];
    userManagement?: string[];
    futureEnhancements?: string[];
    github: string;
    demo: string;
    featured: boolean;
}

interface ProjectsProps {
    data: {
        projects: Project[];
    };
}

const Projects = ({ data }: ProjectsProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [filter, setFilter] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Category filters
    const categories = ['All', 'Web', 'Mobile', 'AI/ML', 'Desktop'];

    // Filter projects by category
    const filteredProjects = filter === 'All'
        ? data.projects
        : data.projects.filter(project => project.category === filter);

    return (
        <>
            <section id="projects" className="section-padding bg-dark-900/50" ref={ref}>
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary-500 mx-auto mb-4"></div>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore my portfolio of projects across web, mobile, AI/ML, and desktop development
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeInUp}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter === category
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                                    : 'glass text-gray-300 hover:text-primary-500 hover:border-primary-500/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={staggerItem}
                                className="group relative glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-dark-800 overflow-hidden">
                                    {project.image && (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                                        {project.category}
                                    </div>

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                                            title="View on GitHub"
                                        >
                                            <FaGithub className="text-xl" />
                                        </a>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                                            title="View Demo/Details"
                                        >
                                            <FaExternalLinkAlt className="text-lg" />
                                        </a>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs border border-primary-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* More Details Button */}
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="w-full btn-outline text-sm py-2"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <p className="text-center text-gray-400 mt-8">No projects found for this category.</p>
                    )}
                </div>
            </section>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-red-500/20 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                            >
                                <FaTimes className="text-white" />
                            </button>

                            {/* Project Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                                        {selectedProject.category}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                                <p className="text-gray-300 text-lg">{selectedProject.fullDescription || selectedProject.description}</p>
                            </div>

                            {/* AI Features */}
                            {selectedProject.aiFeatures && selectedProject.aiFeatures.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FaRocket className="text-primary-500" /> AI-POWERED FEATURES
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {selectedProject.aiFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2 text-gray-300">
                                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Core Features */}
                            {selectedProject.coreFeatures && selectedProject.coreFeatures.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FaCog className="text-primary-500" /> CORE FEATURES
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {selectedProject.coreFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2 text-gray-300">
                                                <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {selectedProject.techStack && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3">🛠️ TECH STACK</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {Object.entries(selectedProject.techStack).map(([category, techs]) => (
                                            <div key={category} className="bg-dark-800/50 p-4 rounded-lg">
                                                <h4 className="text-primary-500 font-semibold mb-2 capitalize">{category}:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {techs.map((tech, index) => (
                                                        <span key={index} className="text-gray-300 text-sm">
                                                            {tech}{index < techs.length - 1 ? ',' : ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FaTrophy className="text-yellow-500" /> KEY ACHIEVEMENTS
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedProject.achievements.map((achievement, index) => (
                                            <div key={index} className="flex items-start gap-2 text-gray-300">
                                                <span className="text-yellow-500">✨</span>
                                                <span className="text-sm">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* User Management */}
                            {selectedProject.userManagement && selectedProject.userManagement.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FaUsers className="text-primary-500" /> ADVANCED USER MANAGEMENT
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {selectedProject.userManagement.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2 text-gray-300">
                                                <span className="text-primary-500">•</span>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Future Enhancements */}
                            {selectedProject.futureEnhancements && selectedProject.futureEnhancements.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FaLightbulb className="text-yellow-500" /> FUTURE ENHANCEMENTS
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedProject.futureEnhancements.map((enhancement, index) => (
                                            <div key={index} className="flex items-start gap-2 text-gray-300">
                                                <span className="text-purple-500">•</span>
                                                <span className="text-sm">{enhancement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-8">
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                                >
                                    <FaGithub /> View on GitHub
                                </a>
                                {selectedProject.demo !== '#' && (
                                    <a
                                        href={selectedProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 btn-outline flex items-center justify-center gap-2"
                                    >
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;
