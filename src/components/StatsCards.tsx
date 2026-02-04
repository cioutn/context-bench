import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, TrendingUp } from "lucide-react";
import resultsData from "@/data/results.json";

export const StatsCards = () => {
  const totalModels = resultsData.length;
  const bestPassAt1 = Math.max(...resultsData.map(r => r.performance.pass_at_1));
  const avgEfficiency = resultsData.reduce((acc, r) => acc + r.dynamics.efficiency, 0) / totalModels;
  const avgLineF1 = resultsData.reduce((acc, r) => acc + r.performance.line.f1, 0) / totalModels;

  const stats = [
    {
      label: "Total Models",
      value: totalModels,
      icon: Users,
      description: "Validated LLM Agents",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Best Pass@1",
      value: `${(bestPassAt1 * 100).toFixed(1)}%`,
      icon: Target,
      description: "Highest Success Rate",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Avg. Efficiency",
      value: avgEfficiency.toFixed(3),
      icon: Zap,
      description: "Retrieval Precision",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      label: "Avg. Line F1",
      value: avgLineF1.toFixed(3),
      icon: TrendingUp,
      description: "Context Accuracy",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-sm bg-muted/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
