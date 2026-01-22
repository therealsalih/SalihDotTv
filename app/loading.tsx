export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-muted rounded-full animate-spin border-t-foreground" />
      </div>
    </div>
  );
}
