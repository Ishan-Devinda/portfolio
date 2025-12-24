import { NextRequest, NextResponse } from 'next/server';
import { readData, updateExperience } from '@/lib/data-handler';

export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data.experience);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const experience = await request.json();
        const data = readData();

        // Generate new ID
        const newId = (Math.max(...data.experience.map(e => parseInt(e.id)), 0) + 1).toString();
        const newExperience = { ...experience, id: newId };

        data.experience.push(newExperience);
        updateExperience(data.experience);

        return NextResponse.json(newExperience, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updatedExperience = await request.json();
        const data = readData();

        const index = data.experience.findIndex(e => e.id === updatedExperience.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
        }

        data.experience[index] = updatedExperience;
        updateExperience(data.experience);

        return NextResponse.json(updatedExperience);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
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
        const filteredExperience = data.experience.filter(e => e.id !== id);

        if (filteredExperience.length === data.experience.length) {
            return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
        }

        updateExperience(filteredExperience);

        return NextResponse.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }
}
