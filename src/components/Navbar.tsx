import React from 'react';
import Link from 'next/link';
import { Github, Database, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1 rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="inline-block font-bold text-xl tracking-tight">
              Context<span className="text-primary">Bench</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Leaderboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex items-center gap-2">
            <Link href="https://github.com/anonymousUser2026/ContextBench">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden sm:flex items-center gap-2">
            <Link href="https://huggingface.co/datasets/Contextbench/ContextBench">
              <Database className="h-4 w-4 text-amber-500" />
              <span>HuggingFace</span>
            </Link>
          </Button>
          
          {/* Mobile view icons only */}
          <Button variant="outline" size="icon" asChild className="sm:hidden h-9 w-9">
            <Link href="https://github.com/anonymousUser2026/ContextBench">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="sm:hidden h-9 w-9">
            <Link href="https://huggingface.co/datasets/Contextbench/ContextBench">
              <Database className="h-4 w-4 text-amber-500" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
