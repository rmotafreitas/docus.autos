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
import { Link } from "react-router-dom";
import { api } from "@/lib/axios";
import { deleteRow } from "../History";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HistoryItemArticle = {
  id: string;
  article: {
    name: string;
  };
  promptText: string;
  resultText: string;
  createdAt: string;
};

export const columns: ColumnDef<HistoryItemArticle>[] = [
  {
    accessorKey: "article",
    header: "Name",
    cell: ({ row }) => {
      // @ts-expect-error
      return row.getValue("article").name;
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
      const article = row.original;

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
            <DropdownMenuItem>
              <Link
                className="w-full h-full flex items-center"
                to={`/apps/articles/${article.id}`}
              >
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={async () => {
                await deleteRow(article.id, "articles");
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
