import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { readData } from '@/lib/data-handler';

export default async function Home() {
  const data = await Promise.resolve(readData());

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero data={data} />
      <About data={data} />
      <Experience data={data} />
      <Skills data={data} />
      <Services data={data} />
      <Projects data={data} />
      <Contact />
      <Footer />
    </main>
  );
}
