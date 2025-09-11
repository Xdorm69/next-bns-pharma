"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Loader2, AlertCircle } from "lucide-react";

type Column<T> = {
  column: string;
  render: (row: T) => React.ReactNode;
};

interface TableComptProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
}

function TableCompt<T>({ columns, data, loading, error }: TableComptProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No data found
      </div>
    );
  }

  return (
    <Table className="rounded-xl shadow">
      <TableHeader className="rounded-xl">
        <TableRow>
          {columns.map((col, id) => (
            <TableHead key={id} className="capitalize bg-gray-300 ">
              {col.column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-gray-100 rounded-xl">
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, id) => (
              <TableCell key={id}>{col.render(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableCompt;
