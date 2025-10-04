import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-center py-4 px-6 border-b shrink-0">
      <div className="flex items-center gap-2">
        <Sparkles className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold tracking-tighter text-foreground font-headline">
          EmotiCreate
        </h1>
      </div>
    </header>
  );
}
