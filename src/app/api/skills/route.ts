import { NextRequest, NextResponse } from 'next/server';
import { readData, updateSkills } from '@/lib/data-handler';

export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data.skills);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const skill = await request.json();
        const data = readData();

        // Generate new ID
        const newId = (Math.max(...data.skills.map(s => parseInt(s.id)), 0) + 1).toString();
        const newSkill = { ...skill, id: newId };

        data.skills.push(newSkill);
        updateSkills(data.skills);

        return NextResponse.json(newSkill, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updatedSkill = await request.json();
        const data = readData();

        const index = data.skills.findIndex(s => s.id === updatedSkill.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        data.skills[index] = updatedSkill;
        updateSkills(data.skills);

        return NextResponse.json(updatedSkill);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
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
        const filteredSkills = data.skills.filter(s => s.id !== id);

        if (filteredSkills.length === data.skills.length) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        updateSkills(filteredSkills);

        return NextResponse.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}
