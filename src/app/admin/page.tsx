'use client';

import Link from 'next/link';
import { FaCode, FaBriefcase, FaProjectDiagram, FaEye } from 'react-icons/fa';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-bold gradient-text mb-8">Admin Dashboard</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card">
                    <h3 className="text-gray-400 mb-2">Total Skills</h3>
                    <p className="text-3xl font-bold text-white">10</p>
                </div>
                <div className="card">
                    <h3 className="text-gray-400 mb-2">Experience Entries</h3>
                    <p className="text-3xl font-bold text-white">2</p>
                </div>
                <div className="card">
                    <h3 className="text-gray-400 mb-2">Projects</h3>
                    <p className="text-3xl font-bold text-white">3</p>
                </div>
                <div className="card">
                    <h3 className="text-gray-400 mb-2">Featured Projects</h3>
                    <p className="text-3xl font-bold text-white">3</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/admin/skills" className="card group hover:border-primary-500 border border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                            <FaCode className="text-2xl text-primary-500 group-hover:text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Manage Skills</h3>
                            <p className="text-gray-400">Add, edit, or remove skills</p>
                        </div>
                    </div>
                </Link>

                <Link href="/admin/experience" className="card group hover:border-primary-500 border border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                            <FaBriefcase className="text-2xl text-primary-500 group-hover:text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Manage Experience</h3>
                            <p className="text-gray-400">Update work experience</p>
                        </div>
                    </div>
                </Link>

                <Link href="/admin/projects" className="card group hover:border-primary-500 border border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                            <FaProjectDiagram className="text-2xl text-primary-500 group-hover:text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Manage Projects</h3>
                            <p className="text-gray-400">Add or update projects</p>
                        </div>
                    </div>
                </Link>

                <Link href="/" className="card group hover:border-primary-500 border border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                            <FaEye className="text-2xl text-primary-500 group-hover:text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">View Portfolio</h3>
                            <p className="text-gray-400">See live portfolio site</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
