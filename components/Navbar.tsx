'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleDownloadCV = () => {
        // Open CV in new tab
        window.open('/cv.pdf', '_blank');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
                            <Image
                                src="/profile.png"
                                alt="Ishan Devinda"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Link href="/" className="text-lg font-bold text-white hover:text-primary-500 transition-colors">
                            Ishan Devinda
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm text-gray-300 hover:text-primary-500 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Links & CV Download */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="https://github.com/Ishan-Devinda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary-500 transition-colors text-xl"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ishan-liyanaarachchige-775986380/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary-500 transition-colors text-xl"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <button
                            onClick={handleDownloadCV}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition-colors duration-300"
                        >
                            <FaDownload />
                            <span>Download CV</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-2xl text-primary-500"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4 space-y-3"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm text-gray-300 hover:text-primary-500 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-4 pt-3 border-t border-gray-700">
                            <a
                                href="https://github.com/Ishan-Devinda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-primary-500 transition-colors text-xl"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ishan-liyanaarachchige-775986380/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-primary-500 transition-colors text-xl"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <button
                                onClick={handleDownloadCV}
                                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition-colors duration-300"
                            >
                                <FaDownload />
                                <span>Download CV</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
