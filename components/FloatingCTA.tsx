'use client';
import { useEffect, useState } from 'react';
export default function FloatingCTA(){const [show,setShow]=useState(false);useEffect(()=>{const f=()=>setShow(scrollY>innerHeight*.65);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);return <a href="#contact" className={`floatingCta ${show?'show':''}`}>תיאום הדגמה <span>↗</span></a>}
