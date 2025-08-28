"use client";

import { FetchForm } from "@/components/layout/FetchForm";
import { ResultCard } from "@/components/layout/ResultCard";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  downloadAsCSV,
  downloadAsJSON,
  downloadAsXLSX,
} from "@/lib/downloaders";
import { useState } from "react";
import { toast } from "sonner";

export interface TableInfo {
  name: string;
  rows: number;
  cols: number;
  data: any[];
}
export interface ScrapeResult {
  pageTitle: string;
  tables: TableInfo[];
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<string>("csv");

  const [scrapeData, setScrapeData] = useState<ScrapeResult | null>(null);
  const [selectedTables, setSelectedTables] = useState<TableInfo[]>([]);

  const handleScrape = async () => {
    setIsLoading(true);
    setScrapeData(null);
    setSelectedTables([]);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "An error occurred");
      toast.success(`Successfully found ${result.tables.length} table(s)!`);
      setScrapeData(result as ScrapeResult);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTable = (table: TableInfo) => {
    setSelectedTables((prev) => {
      const isAlreadySelected = prev.some(
        (selected) => selected.name === table.name
      );
      if (isAlreadySelected) {
        return prev.filter((t) => t.name !== table.name);
      } else {
        return [...prev, table];
      }
    });
  };

  const handleMultiDownload = () => {
    if (!scrapeData) return;
    selectedTables.forEach((table) => {
      const filename = `${scrapeData.pageTitle} - ${table.name}`;
      switch (downloadFormat) {
        case "csv":
          downloadAsCSV(filename, table.data);
          break;
        case "xlsx":
          downloadAsXLSX(filename, table.data);
          break;
        case "json":
          downloadAsJSON(filename, table.data);
          break;
      }
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center p-4 transition-all duration-500">
        <div
          className={`flex w-full flex-col items-center transition-all duration-300 ${
            !scrapeData
              ? "min-h-[80vh] justify-center"
              : "justify-start pt-8 sm:pt-16"
          }`}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Wiki Table
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Quickly extract and download tables from any Wikipedia article.
            </p>
          </div>

          <FetchForm
            className="mt-8 w-full max-w-2xl shadow-lg"
            url={url}
            setUrl={setUrl}
            downloadFormat={downloadFormat}
            setDownloadFormat={setDownloadFormat}
            handleScrape={handleScrape}
            isLoading={isLoading}
          />
        </div>

        {scrapeData && (
          <div className="w-full max-w-2xl py-8">
            <ResultCard
              scrapeData={scrapeData}
              selectedTables={selectedTables}
              onTableSelect={handleSelectTable}
              onMultiDownload={handleMultiDownload}
              downloadFormat={downloadFormat}
            />
          </div>
        )}
      </div>
    </main>
  );
}
