import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-muted mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
