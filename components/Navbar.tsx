'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
const links=[['#story','הסיפור'],['#product','המוצר'],['#capabilities','יכולות'],['#timeline','תהליך'],['#contact','הדגמה']];
export default function Navbar(){
 const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>20);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 return <><header className={`navWrap ${scrolled?'scrolled':''}`}><div className="navShell"><a className="brand" href="#top"><span className="brandGlyph">A</span><span><b>AI Aether</b><small>Autonomous Cloud Defense</small></span></a><nav className="desktopNav">{links.map(([h,l])=><a key={h} href={h}>{l}</a>)}</nav><a className="navCta" href="#contact">תיאום הדגמה</a><button className="menuButton" onClick={()=>setOpen(true)} aria-label="פתיחת תפריט"><Menu/></button></div></header>{open&&<div className="mobileMenu"><button onClick={()=>setOpen(false)} aria-label="סגירת תפריט"><X/></button>{links.map(([h,l])=><a key={h} href={h} onClick={()=>setOpen(false)}>{l}</a>)}</div>}</>
}
