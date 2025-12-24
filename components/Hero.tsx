'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import Image from 'next/image';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';

interface HeroProps {
    data: {
        personal: {
            name: string;
            bio: string;
            socialLinks: {
                github: string;
                linkedin: string;
                twitter: string;
                email: string;
            };
            stats: {
                experience: string;
                projects: string;
                technologies: string;
                commits: string;
            };
        };
        rotatingTitles: string[];
    };
}

const Hero = ({ data }: HeroProps) => {
    const { personal, rotatingTitles } = data;

    // Create sequence for TypeAnimation
    const titleSequence = rotatingTitles.flatMap(title => [title, 2000]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center section-padding pt-24">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold"
                        >
                            Hello I&apos;m <br />
                            <span className="gradient-text">Ishan Devinda</span>
                        </motion.h1>

                        <div className="text-2xl md:text-3xl text-gray-300 h-12">
                            <span className="text-primary-500">I am </span>
                            <TypeAnimation
                                sequence={titleSequence}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="gradient-text font-semibold"
                            />
                        </div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-400 text-lg max-w-xl"
                        >
                            {personal.bio}
                        </motion.p>

                        {/* Social Links */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center space-x-4"
                        >
                            <a
                                href="https://github.com/Ishan-Devinda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ishan-liyanaarachchige-775986380/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110"
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a
                                href={personal.socialLinks.email}
                                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110"
                            >
                                <FaEnvelope className="text-xl" />
                            </a>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="#contact" className="btn-primary">
                                Hire Me
                            </a>
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                                <FaDownload /> Download CV
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-green-400 animate-spin-slow blur-xl opacity-50"></div>

                            {/* Image Container */}
                            <div className="relative rounded-full overflow-hidden border-4 border-primary-500 glow-strong">
                                <Image
                                    src="/profile.png"
                                    alt="Ishan Devinda"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-2xl"
                            ></motion.div>
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                >
                    <div className="card text-center">
                        <h3 className="text-3xl md:text-4xl font-bold gradient-text">{personal.stats.experience}</h3>
                        <p className="text-gray-400 mt-2">Years of Experience</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl md:text-4xl font-bold gradient-text">{personal.stats.projects}</h3>
                        <p className="text-gray-400 mt-2">Projects Completed</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl md:text-4xl font-bold gradient-text">{personal.stats.technologies}</h3>
                        <p className="text-gray-400 mt-2">Technologies Mastered</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl md:text-4xl font-bold gradient-text">{personal.stats.commits}</h3>
                        <p className="text-gray-400 mt-2">Code Commits</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
