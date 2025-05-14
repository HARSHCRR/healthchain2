'use client';

import { Waves } from "@/components/ui/wave-background"

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10">
      <Waves className="h-full w-full" />
    </div>
  );
} 