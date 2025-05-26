"use client";

import { MarketData } from "@/types/mortgage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketChartProps {
  data: MarketData[];
  title: string;
  dataKey: keyof MarketData;
  color: string;
  formatValue?: (value: number) => string;
}

export default function MarketChart({
  data,
  title,
  dataKey,
  color,
  formatValue,
}: MarketChartProps) {
  const currentValue = data[data.length - 1]?.[dataKey] as number;
  const previousValue = data[data.length - 2]?.[dataKey] as number;

  const change =
    currentValue && previousValue ? currentValue - previousValue : 0;
  const changePercent = previousValue ? (change / previousValue) * 100 : 0;

  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = () => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const defaultFormatter = (value: number) => {
    if (
      dataKey === "mortgageRates" ||
      dataKey === "foreclosureRate" ||
      dataKey === "defaultRate"
    ) {
      return `${value.toFixed(2)}%`;
    }
    if (dataKey === "averageHomePrice" || dataKey === "mortgageVolume") {
      return `$${value.toLocaleString()}`;
    }
    return value.toString();
  };

  const formatter = formatValue || defaultFormatter;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {change > 0 ? "+" : ""}
              {changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="text-2xl font-bold">{formatter(currentValue)}</div>
      </CardHeader>

      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
                className="text-xs"
              />
              <YAxis tickFormatter={formatter} className="text-xs" />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [formatter(value), title]}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
