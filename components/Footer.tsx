'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-950 border-t border-gray-800">
            <div className="container-custom section-padding py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © {currentYear} Portfolio. Made with <FaHeart className="inline text-primary-500" /> by Your Name
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://twitter.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
