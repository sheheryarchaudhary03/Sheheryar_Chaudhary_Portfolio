"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button variant="outline" size="sm" className="h-11" onClick={() => window.print()}>
      <Printer aria-hidden="true" />
      Print / Save as PDF
    </Button>
  );
}
