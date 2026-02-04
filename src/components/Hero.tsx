import React from 'react';

export const Hero = () => {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Evaluating the Context Retrieval Capabilities of LLM Agents
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            ContextBench is a comprehensive benchmark designed to assess how well Large Language Models retrieve and utilize context in real-world software engineering tasks.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-start px-4 py-2 bg-muted/50 rounded-lg border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</span>
              <span className="text-sm font-medium">Submission Live</span>
            </div>
            <div className="flex flex-col items-start px-4 py-2 bg-muted/50 rounded-lg border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Metric</span>
              <span className="text-sm font-medium">Line-level F1 & Pass@1</span>
            </div>
            <div className="flex flex-col items-start px-4 py-2 bg-muted/50 rounded-lg border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scope</span>
              <span className="text-sm font-medium">Multi-file Context</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
    </div>
  );
};
