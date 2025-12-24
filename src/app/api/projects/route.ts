import { NextRequest, NextResponse } from 'next/server';
import { readData, updateProjects } from '@/lib/data-handler';

export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data.projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const project = await request.json();
        const data = readData();

        // Generate new ID
        const newId = (Math.max(...data.projects.map(p => parseInt(p.id)), 0) + 1).toString();
        const newProject = { ...project, id: newId };

        data.projects.push(newProject);
        updateProjects(data.projects);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updatedProject = await request.json();
        const data = readData();

        const index = data.projects.findIndex(p => p.id === updatedProject.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        data.projects[index] = updatedProject;
        updateProjects(data.projects);

        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const data = readData();
        const filteredProjects = data.projects.filter(p => p.id !== id);

        if (filteredProjects.length === data.projects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        updateProjects(filteredProjects);

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
