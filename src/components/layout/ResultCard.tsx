"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DownloadCloud } from "lucide-react";
import { TableList } from "./TableList";
import { ScrapeResult, TableInfo } from "@/app/page";

interface ResultCardProps {
  scrapeData: ScrapeResult;
  selectedTables: TableInfo[];
  onTableSelect: (table: TableInfo) => void;
  onMultiDownload: () => void;
  downloadFormat: string;
}

export function ResultCard({
  scrapeData,
  selectedTables,
  onTableSelect,
  onMultiDownload,
  downloadFormat,
}: ResultCardProps) {
  return (
    <Card className="mt-8 w-full max-w-3xl border">
      <CardHeader>
        <CardTitle>Table found: {scrapeData.pageTitle}</CardTitle>
        <CardDescription>
          Please select one or more tables for download
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableList
          tables={scrapeData.tables}
          selectedTables={selectedTables}
          onTableSelect={onTableSelect}
        />
      </CardContent>
      {selectedTables.length > 0 && (
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full gap-2">
                <DownloadCloud className="h-4 w-4" />
                Download {selectedTables.length} selected table
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Permission to Download Multiple Files
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Your browser may ask for permission to download multiple files
                  at once. Click "Allow" on the prompt that appears after you
                  proceed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onMultiDownload}>
                  Accept
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
