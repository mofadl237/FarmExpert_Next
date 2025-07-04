'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from './ui/badge';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const newLocale = isArabic ? 'en' : 'ar';
  const newPath = pathname.replace(/^\/(en|ar)/, `/${newLocale}`);

  return (
    <Link href={newPath} className="hover:underline text-sm">
      {isArabic ? <Badge  variant="secondary" className='align-middle border-1 border-white px-[10px] py-[9px]'>En</Badge> : <Badge variant="secondary" className='align-middle h-full border-1 border-white py-[9px]  px-[10px]'>Ar</Badge>}
    </Link>
  );
}
