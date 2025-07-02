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
      {isArabic ? <Badge variant="destructive" className='align-middle h-full'>En</Badge> : <Badge variant="default" className='align-middle h-full'>Ar</Badge>}
    </Link>
  );
}
