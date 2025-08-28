"use client";

import { Button } from "@/components/ui/button";
import { TableInfo } from "@/app/page";

interface TableListProps {
  tables: TableInfo[];
  selectedTables: TableInfo[];
  onTableSelect: (table: TableInfo) => void;
}

export function TableList({
  tables,
  selectedTables,
  onTableSelect,
}: TableListProps) {
  const isSelected = (table: TableInfo) => {
    return selectedTables.some((selected) => selected.name === table.name);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {tables.map((table) => (
        <Button
          key={table.name}
          variant={isSelected(table) ? "default" : "outline"}
          className="h-auto w-full flex-col items-start justify-start p-4 text-left overflow-hidden"
          onClick={() => onTableSelect(table)}
        >
          <p className="font-semibold">{table.name}</p>
          <p
            className={`text-sm font-normal ${isSelected(table) ? "text-neutral-300" : "text-muted-foreground"
              }`}
          >
            {table.rows} row × {table.cols} column
          </p>
        </Button>
      ))}
    </div>
  );
}
