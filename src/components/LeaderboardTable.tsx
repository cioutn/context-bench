"use client";

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import resultsData from "@/data/results.json";

export type BenchmarkResult = typeof resultsData[0];

const columns: ColumnDef<BenchmarkResult>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <span className="font-mono text-muted-foreground">#{row.index + 1}</span>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.getValue("model")}</span>
        <span className="text-xs text-muted-foreground">LLM Agent</span>
      </div>
    ),
  },
  {
    id: "performance_pass_at_1",
    accessorKey: "performance.pass_at_1",
    header: "Pass@1 ↑",
    cell: ({ row }) => {
      const val = row.original.performance.pass_at_1;
      const isMax = val === Math.max(...resultsData.map(r => r.performance.pass_at_1));
      return (
        <div className="flex items-center gap-2">
          <span className={cn("font-mono font-bold", isMax ? "text-primary" : "text-foreground")}>
            {(val * 100).toFixed(1)}%
          </span>
          {isMax && <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 px-1 py-0 h-4 text-[10px]">TOP</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "performance.line.f1",
    header: "Line F1 ↑",
    cell: ({ row }) => {
      const val = row.original.performance.line.f1;
      const isMax = val === Math.max(...resultsData.map(r => r.performance.line.f1));
      return (
        <span className={cn("font-mono", isMax && "font-bold text-primary bg-primary/5 px-1 rounded")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: "performance.block.f1",
    header: "Block F1",
    cell: ({ row }) => {
      const val = row.original.performance.block.f1;
      const isMax = val === Math.max(...resultsData.map(r => r.performance.block.f1));
      return (
        <span className={cn("font-mono text-muted-foreground", isMax && "font-bold text-foreground")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: "performance.file.f1",
    header: "File F1",
    cell: ({ row }) => {
      const val = row.original.performance.file.f1;
      const isMax = val === Math.max(...resultsData.map(r => r.performance.file.f1));
      return (
        <span className={cn("font-mono text-muted-foreground", isMax && "font-bold text-foreground")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
];

export const LeaderboardTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "performance_pass_at_1", desc: true }
  ]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const table = useReactTable({
    data: resultsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold text-foreground py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/50",
                      expandedRows[row.id] && "bg-muted/30 border-b-0"
                    )}
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
                      {expandedRows[row.id] ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </TableCell>
                  </TableRow>
                  {expandedRows[row.id] && (
                    <TableRow className="bg-muted/30 hover:bg-muted/30 border-t-0">
                      <TableCell colSpan={columns.length + 1} className="p-0">
                        <div className="px-8 pb-8 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background p-6 rounded-lg border shadow-sm">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                <Info className="h-4 w-4" /> Retrieval Patterns
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm">Avg. Steps Per Instance</span>
                                  <span className="font-mono font-medium">{row.original.patterns.avg_steps_per_instance}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm">Avg. Lines Per Step</span>
                                  <span className="font-mono font-medium">{row.original.patterns.avg_lines_per_step}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm text-primary font-medium">Avg. Cost Per Instance</span>
                                  <span className="font-mono font-bold">${row.original.patterns.avg_cost_per_instance}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                <Info className="h-4 w-4" /> Retrieval Dynamics
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm">Efficiency</span>
                                  <span className="font-mono font-medium">{row.original.dynamics.efficiency.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm">Redundancy</span>
                                  <span className="font-mono font-medium text-red-500">{row.original.dynamics.redundancy.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-muted">
                                  <span className="text-sm">Usage Drop</span>
                                  <span className="font-mono font-medium text-amber-500">{row.original.dynamics.usage_drop.toFixed(3)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
