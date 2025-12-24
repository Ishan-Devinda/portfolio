'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Skill {
    id: string;
    name: string;
    category: string;
    level: number;
}

export default function AdminSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        level: 50,
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkills(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingSkill) {
            // Update
            await fetch('/api/skills', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: editingSkill.id }),
            });
        } else {
            // Create
            await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        }

        setIsModalOpen(false);
        setEditingSkill(null);
        setFormData({ name: '', category: '', level: 50 });
        fetchSkills();
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
            fetchSkills();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold gradient-text">Manage Skills</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add Skill
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <div key={skill.id} className="card">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="w-8 h-8 bg-primary-500/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                                >
                                    <FaEdit className="text-primary-500 hover:text-white" />
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                                >
                                    <FaTrash className="text-red-500 hover:text-white" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{skill.category}</p>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-green-400 rounded-full"
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                        <p className="text-primary-500 text-sm mt-2">{skill.level}%</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="card max-w-md w-full">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Skill Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Level: {formData.level}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingSkill ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingSkill(null);
                                        setFormData({ name: '', category: '', level: 50 });
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
