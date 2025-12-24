'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaBriefcase, FaCode, FaProjectDiagram, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        router.push('/admin/login');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-gray-800 p-6">
                <Link href="/" className="text-2xl font-bold gradient-text mb-8 block">
                    Portfolio Admin
                </Link>

                <nav className="space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-500/10 text-gray-300 hover:text-primary-500 transition-colors"
                    >
                        <FaHome /> Dashboard
                    </Link>
                    <Link
                        href="/admin/skills"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-500/10 text-gray-300 hover:text-primary-500 transition-colors"
                    >
                        <FaCode /> Skills
                    </Link>
                    <Link
                        href="/admin/experience"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-500/10 text-gray-300 hover:text-primary-500 transition-colors"
                    >
                        <FaBriefcase /> Experience
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-500/10 text-gray-300 hover:text-primary-500 transition-colors"
                    >
                        <FaProjectDiagram /> Projects
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-gray-300 hover:text-red-500 transition-colors mt-8 w-full"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
