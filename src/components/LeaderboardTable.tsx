"use client";

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
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
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ArrowUpDown, 
  Search,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import resultsData from "@/data/results.json";

export type BenchmarkResult = typeof resultsData[0];

const PerformanceBar = ({ value, max }: { value: number; max: number }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
      <div 
        className="h-full bg-primary transition-all duration-500" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const LeaderboardTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "performance_pass_at_1", desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const maxPass = Math.max(...resultsData.map(r => r.performance.pass_at_1));
  const maxLineF1 = Math.max(...resultsData.map(r => r.performance.line.f1));
  const maxBlockF1 = Math.max(...resultsData.map(r => r.performance.block.f1));
  const maxFileF1 = Math.max(...resultsData.map(r => r.performance.file.f1));

  const columns: ColumnDef<BenchmarkResult>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => <span className="font-mono text-muted-foreground font-medium">#{row.index + 1}</span>,
    },
    {
      accessorKey: "model",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-foreground tracking-tight">{row.getValue("model")}</span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest mt-0.5">LLM Agent</span>
        </div>
      ),
    },
    {
      id: "performance_pass_at_1",
      accessorKey: "performance.pass_at_1",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pass@1 ↑
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const val = row.original.performance.pass_at_1;
        const isMax = val === maxPass;
        return (
          <div className="relative flex items-center gap-2 h-full py-2">
            <PerformanceBar value={val} max={maxPass} />
            <span className={cn("font-mono font-bold text-base", isMax ? "text-primary" : "text-foreground")}>
              {(val * 100).toFixed(1)}%
            </span>
            {isMax && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
          </div>
        );
      },
    },
    {
      id: "performance_line_f1",
      accessorKey: "performance.line.f1",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Line F1 ↑
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const val = row.original.performance.line.f1;
        const isMax = val === maxLineF1;
        return (
          <div className="relative h-full flex items-center px-2">
             <PerformanceBar value={val} max={maxLineF1} />
             <span className={cn("font-mono", isMax && "font-bold text-primary")}>
               {val.toFixed(3)}
             </span>
          </div>
        );
      },
    },
    {
      id: "performance_block_f1",
      accessorKey: "performance.block.f1",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Block F1
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const val = row.original.performance.block.f1;
        const isMax = val === maxBlockF1;
        return (
          <div className="relative h-full flex items-center px-2">
            <PerformanceBar value={val} max={maxBlockF1} />
            <span className={cn("font-mono text-muted-foreground/80", isMax && "font-bold text-foreground")}>
              {val.toFixed(3)}
            </span>
          </div>
        );
      },
    },
    {
      id: "performance_file_f1",
      accessorKey: "performance.file.f1",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File F1
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const val = row.original.performance.file.f1;
        const isMax = val === maxFileF1;
        return (
          <div className="relative h-full flex items-center px-2">
            <PerformanceBar value={val} max={maxFileF1} />
            <span className={cn("font-mono text-muted-foreground/80", isMax && "font-bold text-foreground")}>
              {val.toFixed(3)}
            </span>
          </div>
        );
      },
    },
  ];

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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center relative max-w-sm">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter models..."
          value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("model")?.setFilterValue(event.target.value)
          }
          className="pl-9 h-10 bg-background border-muted shadow-none focus-visible:ring-1 focus-visible:ring-primary/30 transition-all"
        />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold text-foreground py-4 px-6 text-xs uppercase tracking-wider">
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
                      "cursor-pointer transition-all duration-200 border-b last:border-0",
                      expandedRows[row.id] ? "bg-primary/[0.02]" : "hover:bg-muted/30"
                    )}
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 px-6">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell className="px-6">
                      <motion.div
                        animate={{ rotate: expandedRows[row.id] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                  
                  <AnimatePresence>
                    {expandedRows[row.id] && (
                      <TableRow className="hover:bg-transparent border-b-0">
                        <TableCell colSpan={columns.length + 1} className="p-0 border-t-0">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-12 pb-10 pt-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background p-8 rounded-2xl border shadow-sm">
                                <div>
                                  <div className="flex items-center gap-2 mb-6 text-primary">
                                    <TrendingUp className="h-5 w-5" />
                                    <h4 className="text-sm font-bold uppercase tracking-widest">Retrieval Patterns</h4>
                                  </div>
                                  <div className="space-y-4">
                                    {[
                                      { label: "Avg. Steps Per Instance", value: row.original.patterns.avg_steps_per_instance },
                                      { label: "Avg. Lines Per Step", value: row.original.patterns.avg_lines_per_step },
                                      { label: "Avg. Cost Per Instance", value: `$${row.original.patterns.avg_cost_per_instance}`, highlight: true }
                                    ].map((item, i) => (
                                      <div key={i} className="flex justify-between items-center py-3 border-b border-muted/50 last:border-0">
                                        <span className="text-sm text-muted-foreground">{item.label}</span>
                                        <span className={cn("font-mono font-bold text-sm", item.highlight && "text-primary")}>
                                          {item.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-6 text-indigo-500">
                                    <Info className="h-5 w-5" />
                                    <h4 className="text-sm font-bold uppercase tracking-widest">Retrieval Dynamics</h4>
                                  </div>
                                  <div className="space-y-4">
                                    {[
                                      { label: "Efficiency", value: row.original.dynamics.efficiency.toFixed(3) },
                                      { label: "Redundancy", value: row.original.dynamics.redundancy.toFixed(3), color: "text-red-500" },
                                      { label: "Usage Drop", value: row.original.dynamics.usage_drop.toFixed(3), color: "text-amber-500" }
                                    ].map((item, i) => (
                                      <div key={i} className="flex justify-between items-center py-3 border-b border-muted/50 last:border-0">
                                        <span className="text-sm text-muted-foreground">{item.label}</span>
                                        <span className={cn("font-mono font-bold text-sm", item.color)}>
                                          {item.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-32 text-center text-muted-foreground">
                  No matching models found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
