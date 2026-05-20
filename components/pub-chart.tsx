"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  count: { label: "Publications", color: "hsl(var(--foreground))" },
  cites: { label: "Citations", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig;

export function PubChart({ data }: { data: { year: string; count: number; cites: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <BarChart data={data} margin={{ left: -16, right: 12, top: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/60" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={40} />
        <ChartTooltip cursor={{ fill: "hsl(var(--muted) / 0.4)" }} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="currentColor" radius={[6, 6, 0, 0]} className="text-foreground" />
        <Bar dataKey="cites" fill="currentColor" radius={[6, 6, 0, 0]} className="text-muted-foreground/50" />
      </BarChart>
    </ChartContainer>
  );
}
