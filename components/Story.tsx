'use client';
import { useEffect, useRef } from 'react';

const scenes: string[][] = [
['אות חריג', 'חזית שירות מבצעת פעולה שאינה תואמת את דפוס השימוש', 'המערכת סורקת הקשר, היסטוריה והרשאות בפועל.'],
['מסלול תקיפה', 'הסוכן מקשר את המזהה לחשש של חריגה משליטה חיצונית', 'הסוכן מקבל עדיפות לפי השפעה עסקית.'],
['תגובה מאומתת', 'הגישה מנוטרלת והאיום מבודד לפי מדיניות הארגון', 'כל פעולה מתועדת וניתנת לביקורת אנושית.']
];

export default function Story() {
const ref = useRef<HTMLElement>(null);

useEffect(() => {
let ctxanyPromise: any;

import('gsap').then((gsap) => {
import('gsap/ScrollTrigger').then((ScrollTrigger) => {
const g = gsap.default;
g.registerPlugin(ScrollTrigger.default);

ctxanyPromise = g.context((ctx) => {
const targets = g.utils.toArray('.storyScene');
targets.forEach((el) => {
const element = el as HTMLElement;
g.fromTo(
element,
{ opacity: 0.25, y: 60, scale: 0.97 },
{
opacity: 1,
y: 0,
scale: 1,
scrollTrigger: {
trigger: element,
start: 'top 78%',
end: 'bottom 55%',
scrub: 1
}
}
);
});
}, ref);
});
});

return () => {
if (ctxanyPromise && typeof ctxanyPromise.revert === 'function') {
ctxanyPromise.revert();
}
};
}, []);

return (
<section className="story" id="story" ref={ref}>
<div className="container">
<div className="sectionHead">
<span>SCROLL STORY</span>
<h2>קבלת ההחלטות</h2>
<p>כל אנליזה חושפת שכבה נוספת של תהליך</p>
</div>
<div>
{scenes.map((s, i) => (
<article className="storyScene" key={i}>
<div className="sceneIndex">0{i + 1}</div>
<div>
<small>{s[0]}</small>
<h3>{s[1]}</h3>
<p>{s[2]}</p>
</div>
<div className={`sceneVisual v${i + 1}`}>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
</article>
))}
</div>
</div>
</section>
);
}

