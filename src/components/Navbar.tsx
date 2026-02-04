import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight">
              Context<span className="text-primary">Bench</span>
            </span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Leaderboard
            </Link>
            <Link href="https://github.com/anonymousUser2026/ContextBench" className="transition-colors hover:text-foreground/80 text-foreground/60">
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="https://huggingface.co/datasets/Contextbench/ContextBench"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Dataset
          </Link>
        </div>
      </div>
    </nav>
  );
};
