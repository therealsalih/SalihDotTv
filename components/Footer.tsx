import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-6xl mx-auto px-6 flex justify-center">
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
