"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { RetrievalTable } from "@/components/RetrievalTable";
import { StatsCards } from "@/components/StatsCards";
import { CitationBlock } from "@/components/CitationBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="container px-4 mx-auto pb-20">
        <StatsCards />

        <Tabs defaultValue="performance" className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Benchmark Results</h2>
              <p className="text-muted-foreground">Comprehensive evaluation of 4 state-of-the-art LLM agents.</p>
            </div>
            <TabsList className="grid w-full md:w-auto grid-cols-2 h-11 p-1 bg-muted/50 border">
              <TabsTrigger value="performance" className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-8">Performance</TabsTrigger>
              <TabsTrigger value="retrieval" className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-8">Retrieval Analysis</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LeaderboardTable />
            </motion.div>
          </TabsContent>

          <TabsContent value="retrieval" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">Retrieval Efficiency & Dynamics</h3>
                    <p className="text-sm text-muted-foreground">Detailed trade-offs between cost, steps, and redundancy.</p>
                  </div>
                </div>
                <div className="p-6">
                  <RetrievalTable />
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Multi-level Evaluation",
              description: "Assessing models at file, block, and line levels to capture the full spectrum of retrieval accuracy.",
              color: "bg-blue-500",
            },
            {
              title: "Agentic Frameworks",
              description: "Benchmarks conducted using standardized coding agent scaffolding to reflect real-world automated development.",
              color: "bg-indigo-500",
            },
            {
              title: "Retrieval Dynamics",
              description: "Deep analysis of the internal mechanics of retrieval, including step efficiency and usage drop metrics.",
              color: "bg-emerald-500",
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-2xl border bg-card/50 transition-all hover:shadow-md hover:border-primary/20 relative overflow-hidden">
              <div className={cn("absolute top-0 left-0 w-1 h-full", item.color)} />
              <h3 className="font-bold text-xl mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <CitationBlock />

        <footer className="mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 ContextBench Research Group.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Methodology</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
