'use client';
import { useEffect } from 'react';
export default function SmoothScroll(){
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const memory=(navigator as Navigator & {deviceMemory?:number}).deviceMemory ?? 8;
  if(memory<=4 && innerWidth<720) return;
  let cancelled=false; let lenis:any;
  import('lenis').then(({default:Lenis})=>{
    if(cancelled) return; lenis=new Lenis({duration:1.05,smoothWheel:true});
    const raf=(t:number)=>{lenis.raf(t); if(!cancelled) requestAnimationFrame(raf)}; requestAnimationFrame(raf);
  });
  return()=>{cancelled=true;lenis?.destroy()};
 },[]); return null;
}
