import dynamic from 'next/dynamic';
import FloatingCTA from '@/components/FloatingCTA';
import Hero from "@/components/hero/Hero";
import IconSprite from '@/components/IconSprite';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';

const Story = dynamic(() => import('@/components/Story'), {
  loading: () => <SectionSkeleton />,
});

const Dashboard = dynamic(() => import('@/components/dashboard/Dashboard'), {
  loading: () => <SectionSkeleton />,
});

const Capabilities = dynamic(() => import('@/components/Capabilities'), {
  loading: () => <SectionSkeleton />,
});

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <SectionSkeleton />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SectionSkeleton />,
});

const Footer = dynamic(() => import('@/components/Footer'));

function SectionSkeleton() {
  return <div className="sectionSkeleton" aria-hidden="true" />;
}

export default function Page() {
  return (
    <>
      <IconSprite />
      <SmoothScroll />
      <Navbar />

      <main>
        <Hero />
        <Story />
        <Dashboard />
        <Capabilities />
        <Timeline />
        <Contact />
      </main>

      <FloatingCTA />
      <Footer />
    </>
  );
}