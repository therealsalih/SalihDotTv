'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-foreground' : 'text-muted hover:text-foreground'
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === '/about' ? 'text-foreground' : 'text-muted hover:text-foreground'
            }`}
          >
            About
          </Link>
        </div>

        <a
          href="https://salih.tv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground hover:text-muted transition-colors"
        >
          salih.tv
        </a>
      </nav>
    </header>
  );
}
