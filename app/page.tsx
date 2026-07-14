'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingCTA from '@/components/FloatingCTA';
import IconSprite from '@/components/IconSprite';

const Story = dynamic(()=>import('@/components/Story'), { loading:()=> <SectionSkeleton/> });
const Dashboard = dynamic(()=>import('@/components/Dashboard'), { loading:()=> <SectionSkeleton/> });
const Capabilities = dynamic(()=>import('@/components/Capabilities'), { loading:()=> <SectionSkeleton/> });
const Timeline = dynamic(()=>import('@/components/Timeline'), { loading:()=> <SectionSkeleton/> });
const Contact = dynamic(()=>import('@/components/Contact'), { loading:()=> <SectionSkeleton/> });
const Footer = dynamic(()=>import('@/components/Footer'));

function SectionSkeleton(){return <div className="sectionSkeleton" aria-hidden="true"/>}

export default function Page(){
 return <>
  <IconSprite/><SmoothScroll/><Navbar/><main><Hero/>
   <Suspense><Story/><Dashboard/><Capabilities/><Timeline/><Contact/></Suspense>
  </main><FloatingCTA/><Footer/>
 </>;
}
