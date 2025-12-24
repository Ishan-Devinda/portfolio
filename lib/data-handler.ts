import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export interface PortfolioData {
    personal: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        bio: string;
        socialLinks: {
            github: string;
            linkedin: string;
            twitter: string;
            email: string;
        };
        stats: {
            experience: string;
            projects: string;
            technologies: string;
            commits: string;
        };
    };
    rotatingTitles: string[];
    about: {
        description: string;
        highlights: string[];
    };
    experience: Array<{
        id: string;
        company: string;
        position: string;
        duration: string;
        description: string;
        technologies: string[];
    }>;
    skills: Array<{
        id: string;
        name: string;
        category: string;
        level: number;
    }>;
    services: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
    }>;
    projects: Array<{
        id: string;
        title: string;
        description: string;
        image: string;
        technologies: string[];
        github: string;
        demo: string;
        featured: boolean;
    }>;
}

export function readData(): PortfolioData {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading data file:', error);
        throw new Error('Failed to read portfolio data');
    }
}

export function writeData(data: PortfolioData): void {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data file:', error);
        throw new Error('Failed to write portfolio data');
    }
}

export function updateSkills(skills: PortfolioData['skills']): void {
    const data = readData();
    data.skills = skills;
    writeData(data);
}

export function updateExperience(experience: PortfolioData['experience']): void {
    const data = readData();
    data.experience = experience;
    writeData(data);
}

export function updateProjects(projects: PortfolioData['projects']): void {
    const data = readData();
    data.projects = projects;
    writeData(data);
}
