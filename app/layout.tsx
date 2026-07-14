import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Aether — אבטחת ענן אוטונומית',
  description: 'חוויית מוצר אינטראקטיבית לפלטפורמת אבטחת ענן אוטונומית.',
  openGraph: { title: 'AI Aether', description: 'מזהים. מנתחים. פועלים.', images: ['/og.svg'] },
};

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
