"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Quote } from "lucide-react";

export const CitationBlock = () => {
  const [copied, setCopied] = useState(false);

  const bibtex = `@article{contextbench2026,
  title={Evaluating the Context Retrieval Capabilities of LLM Agents},
  author={ContextBench Research Group},
  journal={arXiv preprint arXiv:XXXX.XXXXX},
  year={2026}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 py-12 border-t">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 bg-primary/5 rounded-full mb-4">
          <Quote className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Cite ContextBench</h2>
        <p className="text-muted-foreground mt-2 max-w-xl">
          If you find our benchmark or data useful in your research, please consider citing our work.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto bg-muted/30 border-none shadow-none relative overflow-hidden group">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2 bg-background/80 backdrop-blur"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy BibTeX"}
          </Button>
        </div>
        <CardContent className="p-8">
          <pre className="font-mono text-sm leading-relaxed text-muted-foreground overflow-x-auto">
            {bibtex}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};
