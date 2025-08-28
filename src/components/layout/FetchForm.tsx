"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface FetchFormProps {
  url: string;
  setUrl: (url: string) => void;
  downloadFormat: string;
  setDownloadFormat: (format: string) => void;
  handleScrape: () => void;
  isLoading: boolean;
  className?: string;
}

export function FetchForm({
  url,
  setUrl,
  downloadFormat,
  setDownloadFormat,
  handleScrape,
  isLoading,
  className,
}: FetchFormProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIfDesktop();
    const handleResize = () => checkIfDesktop();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "group flex items-center gap-1 rounded-lg border-2 border-ring bg-card p-1 transition-all",
        "focus-within:ring focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background/50",
        className
      )}
    >
      <Select
        value={downloadFormat}
        onValueChange={setDownloadFormat}
        disabled={isLoading}
      >
        <SelectTrigger className="border-0 top-4 bg-card shadow-none focus:ring-none">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="xlsx">XLSX</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="url"
        placeholder="https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area"
        className="flex-1 border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleScrape()}
        disabled={isLoading}
      />
      <Button
        onClick={handleScrape}
        disabled={isLoading}
        className={cn(
          "transition-all duration-800 ease-in-out",
          isDesktop ? "px-4" : "px-3"
        )}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary transition-all duration-300 ease-in-out" />
        ) : isDesktop ? (
          <span className="flex items-center gap-2 transition-all duration-300 ease-in-out">
            Fetch
            <Search className="h-4 w-4 transition-all duration-300 ease-in-out" />
          </span>
        ) : (
          <Search className="h-4 w-4 transition-all duration-300 ease-in-out" />
        )}
      </Button>
    </div>
  );
}
