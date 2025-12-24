'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Experience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    technologies: string[];
}

export default function AdminExperience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        duration: '',
        description: '',
        technologies: '',
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        const response = await fetch('/api/experience');
        const data = await response.json();
        setExperiences(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const techArray = formData.technologies.split(',').map(t => t.trim());
        const payload = { ...formData, technologies: techArray };

        if (editingExp) {
            await fetch('/api/experience', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payload, id: editingExp.id }),
            });
        } else {
            await fetch('/api/experience', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }

        setIsModalOpen(false);
        setEditingExp(null);
        setFormData({ company: '', position: '', duration: '', description: '', technologies: '' });
        fetchExperiences();
    };

    const handleEdit = (exp: Experience) => {
        setEditingExp(exp);
        setFormData({
            company: exp.company,
            position: exp.position,
            duration: exp.duration,
            description: exp.description,
            technologies: exp.technologies.join(', '),
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
            fetchExperiences();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold gradient-text">Manage Experience</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add Experience
                </button>
            </div>

            <div className="space-y-6">
                {experiences.map((exp) => (
                    <div key={exp.id} className="card">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                                <p className="text-primary-500 font-semibold">{exp.company}</p>
                                <p className="text-gray-400 text-sm">{exp.duration}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="w-8 h-8 bg-primary-500/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                                >
                                    <FaEdit className="text-primary-500 hover:text-white" />
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                                >
                                    <FaTrash className="text-red-500 hover:text-white" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm border border-primary-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="card max-w-2xl w-full my-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingExp ? 'Edit Experience' : 'Add New Experience'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Position</label>
                                <input
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Duration</label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="e.g., 2022 - Present"
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Technologies (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    placeholder="React, Node.js, MongoDB"
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingExp ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingExp(null);
                                        setFormData({ company: '', position: '', duration: '', description: '', technologies: '' });
                                    }}
                                    className="btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
