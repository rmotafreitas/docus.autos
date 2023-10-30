"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HistoryItemVideo = {
  id: string;
  videoId: string;
  video: {
    name: string;
  };
  promptText: string;
  resultText: string;
  createdAt: string;
};

export const columns: ColumnDef<HistoryItemVideo>[] = [
  {
    accessorKey: "video",
    header: "Name",
    cell: ({ row }) => {
      // @ts-expect-error
      return row.getValue("video").name;
    },
  },
  {
    accessorKey: "promptText",
    header: "Prompt",
    cell: ({ row }) => {
      const value: string = row.getValue("promptText");
      return value.length > 50 ? value.slice(0, 50) + "..." : value;
    },
  },
  {
    accessorKey: "resultText",
    header: "Result",
    cell: ({ row }) => {
      const value: string = row.getValue("resultText");
      return value.length > 50 ? value.slice(0, 50) + "..." : value;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value: string = row.getValue("createdAt");
      return new Date(value).toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const video = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
