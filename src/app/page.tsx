import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { RetrievalTable } from "@/components/RetrievalTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div className="container px-4 mx-auto pb-20">
        <Tabs defaultValue="performance" className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
              <p className="text-muted-foreground">Evaluating context retrieval across multiple LLM families.</p>
            </div>
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="retrieval">Retrieval Analysis</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="mt-0 space-y-4">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/30">
                <div>
                  <h3 className="text-xl font-semibold">Core Performance</h3>
                  <p className="text-sm text-muted-foreground">Primary metrics: Pass@1 and F1 scores at different levels.</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                    LITE BENCHMARK
                  </div>
                  <div className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full border">
                    V1.0
                  </div>
                </div>
              </div>
              <div className="p-0">
                <LeaderboardTable />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="retrieval" className="mt-0 space-y-4">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/30">
                <div>
                  <h3 className="text-xl font-semibold">Retrieval Dynamics</h3>
                  <p className="text-sm text-muted-foreground">Detailed analysis of how models navigate context retrieval.</p>
                </div>
              </div>
              <div className="p-6">
                <RetrievalTable />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-md hover:border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 font-bold group-hover:bg-blue-500/20">1</div>
            <h3 className="font-bold text-lg mb-2">Multi-level Evaluation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We assess models at file, block, and line levels to capture the full spectrum of retrieval accuracy, moving beyond simple end-to-end pass rates.
            </p>
          </div>
          <div className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-md hover:border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 font-bold group-hover:bg-purple-500/20">2</div>
            <h3 className="font-bold text-lg mb-2">Agentic Frameworks</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Benchmarks are conducted using standardized coding agent scaffolding, ensuring that results reflect real-world automated development workflows.
            </p>
          </div>
          <div className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-md hover:border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 text-amber-600 font-bold group-hover:bg-amber-500/20">3</div>
            <h3 className="font-bold text-lg mb-2">Efficiency & Dynamics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We analyze the internal dynamics of retrieval, including step efficiency and redundancy, providing deeper insights into model "thinking" patterns.
            </p>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 ContextBench Research Group. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
