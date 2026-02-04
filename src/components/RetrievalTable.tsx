"use client";

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import resultsData from "@/data/results.json";

export type BenchmarkResult = typeof resultsData[0];

const columns: ColumnDef<BenchmarkResult>[] = [
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <span className="font-bold">{row.getValue("model")}</span>,
  },
  {
    accessorKey: "patterns.avg_steps_per_instance",
    header: "Avg. Steps ↓",
    cell: ({ row }) => {
      const val = row.original.patterns.avg_steps_per_instance;
      const isMin = val === Math.min(...resultsData.map(r => r.patterns.avg_steps_per_instance));
      return <span className={cn("font-mono", isMin && "text-primary font-bold")}>{val}</span>;
    },
  },
  {
    accessorKey: "patterns.avg_lines_per_step",
    header: "Lines / Step",
    cell: ({ row }) => <span className="font-mono">{row.original.patterns.avg_lines_per_step}</span>,
  },
  {
    accessorKey: "dynamics.efficiency",
    header: "Efficiency ↑",
    cell: ({ row }) => {
      const val = row.original.dynamics.efficiency;
      const isMax = val === Math.max(...resultsData.map(r => r.dynamics.efficiency));
      return (
        <div className="flex items-center gap-2">
          <span className={cn("font-mono font-medium", isMax ? "text-green-600 font-bold bg-green-50 px-1 rounded" : "text-foreground")}>
            {val.toFixed(3)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dynamics.redundancy",
    header: "Redundancy ↓",
    cell: ({ row }) => {
      const val = row.original.dynamics.redundancy;
      const isMin = val === Math.min(...resultsData.map(r => r.dynamics.redundancy));
      return (
        <span className={cn("font-mono", isMin ? "text-primary font-bold bg-primary/5 px-1 rounded" : "text-red-500")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: "patterns.avg_cost_per_instance",
    header: "Avg. Cost ↓",
    cell: ({ row }) => {
      const val = row.original.patterns.avg_cost_per_instance;
      const isMin = val === Math.min(...resultsData.map(r => r.patterns.avg_cost_per_instance));
      return (
        <div className={cn("flex items-center gap-1 font-mono font-bold", isMin && "text-green-600")}>
          <DollarSign className="h-3 w-3" />
          {val.toFixed(2)}
        </div>
      );
    },
  },
];

export const RetrievalTable = () => {
  const table = useReactTable({
    data: resultsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-blue-800 flex gap-3">
        <Info className="h-5 w-5 shrink-0" />
        <p>
          <strong>Efficiency</strong> measures the ratio of useful context retrieved per step. 
          <strong> Redundancy</strong> indicates the overlap between subsequent retrieval steps.
          Higher efficiency and lower redundancy generally lead to better cost-performance trade-offs.
        </p>
      </div>
    </div>
  );
};
