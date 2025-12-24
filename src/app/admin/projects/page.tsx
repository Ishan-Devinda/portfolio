'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    featured: boolean;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        github: '',
        demo: '',
        featured: false,
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const techArray = formData.technologies.split(',').map(t => t.trim());
        const payload = { ...formData, technologies: techArray };

        if (editingProject) {
            await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payload, id: editingProject.id }),
            });
        } else {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }

        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({ title: '', description: '', image: '', technologies: '', github: '', demo: '', featured: false });
        fetchProjects();
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.join(', '),
            github: project.github,
            demo: project.demo,
            featured: project.featured,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            fetchProjects();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold gradient-text">Manage Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add Project
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="card">
                        {project.featured && (
                            <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs rounded-full mb-3">
                                Featured
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded text-xs border border-primary-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-2"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors"
                            >
                                <FaTrash className="text-red-500 hover:text-white" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="card max-w-2xl w-full my-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                    rows={3}
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="/projects/project1.jpg"
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
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
                            <div>
                                <label className="block text-gray-400 mb-2">GitHub URL</label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Demo URL</label>
                                <input
                                    type="url"
                                    value={formData.demo}
                                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="featured" className="text-gray-400">Mark as Featured</label>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingProject ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProject(null);
                                        setFormData({ title: '', description: '', image: '', technologies: '', github: '', demo: '', featured: false });
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
