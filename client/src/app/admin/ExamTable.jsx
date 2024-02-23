"use client";
import { useReactTable, getCoreRowModel, flexRender,getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, onRowSelectionChange  } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

import columns from "./columns";
import { useState } from "react";





const ExamTable = ({ exams, update }) => {
    

  const [data, setData] = useState(exams); 
  const [rowSelection, setRowSelection] = useState({});



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
        rowSelection,
    },

  });
  

  return (
    <div>
        <div className="edit-buttons py-5">
                <Button>Add new record</Button>
                {table.getFilteredSelectedRowModel().rows.length > 0 ? <Button>Delete {table.getFilteredSelectedRowModel().rows.length} selected record(s)</Button> : <Button variant="outline" disabled={true}>Delete selected record(s)</Button>}
         </div>

        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    );
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                    {row.getVisibleCells().map((cell) => (
                        
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
                Previous
        </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
                Next
        </Button>
      </div>
    </div>
        
    
  );
};

export default ExamTable;
