"use client";

import { PropertyAnalytics } from "@/types/mortgage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";

interface PropertyAnalyticsCardProps {
  analytics: PropertyAnalytics;
  propertyAddress?: string;
}

export default function PropertyAnalyticsCard({
  analytics,
  propertyAddress,
}: PropertyAnalyticsCardProps) {
  const latestPrice =
    analytics.priceHistory[analytics.priceHistory.length - 1]?.price || 0;
  const firstPrice = analytics.priceHistory[0]?.price || 0;
  const totalAppreciation = firstPrice
    ? ((latestPrice - firstPrice) / firstPrice) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Property Analytics
          {propertyAddress && (
            <span className="text-sm font-normal text-gray-600">
              - {propertyAddress}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Valuation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Estimated Value
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              ${analytics.estimatedValue.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Total Appreciation
              </span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {totalAppreciation.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3">Price History</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                    })
                  }
                  className="text-xs"
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  className="text-xs"
                />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Price",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Trends */}
        <div>
          <h4 className="text-sm font-medium mb-3">Market Trends</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900">
                {analytics.marketTrends.appreciation.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Annual Appreciation</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900">
                {analytics.marketTrends.daysOnMarket}
              </div>
              <div className="text-xs text-gray-600">Days on Market</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900">
                {analytics.marketTrends.comparableProperties}
              </div>
              <div className="text-xs text-gray-600">Comparable Sales</div>
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div>
          <h4 className="text-sm font-medium mb-3">Investment Metrics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-900">
                {analytics.investmentMetrics.capRate.toFixed(1)}%
              </div>
              <div className="text-xs text-green-700">Cap Rate</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-900">
                {analytics.investmentMetrics.cashOnCash.toFixed(1)}%
              </div>
              <div className="text-xs text-blue-700">Cash on Cash</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-semibold text-purple-900">
                {analytics.investmentMetrics.irr.toFixed(1)}%
              </div>
              <div className="text-xs text-purple-700">IRR</div>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            Risk Factors
          </h4>
          <div className="flex flex-wrap gap-2">
            {analytics.riskFactors.map((factor, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-yellow-800 border-yellow-300"
              >
                {factor}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
