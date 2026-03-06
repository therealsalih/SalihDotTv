'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/career') return null;

  return (
    <footer className="py-16 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="mailto:salih@colabgroup.com"
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          📬 salih@colabgroup.com
        </a>
        <p className="flex items-center gap-1.5 text-xs text-muted">
          Made with
          <Image
            src="/images/claude-color.png"
            alt="Claude"
            width={14}
            height={14}
            className="inline-block"
          />
          Claude Code &nbsp;❤️
        </p>
      </div>
    </footer>
  );
}
