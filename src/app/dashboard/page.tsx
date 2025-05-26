"use client";

import { mockMarketData } from "@/data/mockData";
import MarketChart from "@/components/dashboard/MarketChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const latestData = mockMarketData[mockMarketData.length - 1];
  const previousData = mockMarketData[mockMarketData.length - 2];

  const getChangeIndicator = (current: number, previous: number) => {
    const change = current - previous;
    const changePercent = (change / previous) * 100;

    return {
      change,
      changePercent,
      isPositive: change > 0,
      isNegative: change < 0,
    };
  };

  const mortgageRateChange = getChangeIndicator(
    latestData.mortgageRates,
    previousData.mortgageRates
  );
  const foreclosureChange = getChangeIndicator(
    latestData.foreclosureRate,
    previousData.foreclosureRate
  );
  const homePriceChange = getChangeIndicator(
    latestData.averageHomePrice,
    previousData.averageHomePrice
  );
  const defaultRateChange = getChangeIndicator(
    latestData.defaultRate,
    previousData.defaultRate
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Market Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time market data and trends for mortgage investment decisions.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Mortgage Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {latestData.mortgageRates.toFixed(2)}%
            </div>
            <div
              className={`flex items-center text-sm ${
                mortgageRateChange.isPositive
                  ? "text-red-600"
                  : mortgageRateChange.isNegative
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              {mortgageRateChange.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : mortgageRateChange.isNegative ? (
                <TrendingDown className="h-3 w-3 mr-1" />
              ) : null}
              {mortgageRateChange.changePercent > 0 ? "+" : ""}
              {mortgageRateChange.changePercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Avg Home Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${latestData.averageHomePrice.toLocaleString()}
            </div>
            <div
              className={`flex items-center text-sm ${
                homePriceChange.isPositive
                  ? "text-green-600"
                  : homePriceChange.isNegative
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {homePriceChange.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : homePriceChange.isNegative ? (
                <TrendingDown className="h-3 w-3 mr-1" />
              ) : null}
              {homePriceChange.changePercent > 0 ? "+" : ""}
              {homePriceChange.changePercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Foreclosure Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {latestData.foreclosureRate.toFixed(2)}%
            </div>
            <div
              className={`flex items-center text-sm ${
                foreclosureChange.isPositive
                  ? "text-red-600"
                  : foreclosureChange.isNegative
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              {foreclosureChange.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : foreclosureChange.isNegative ? (
                <TrendingDown className="h-3 w-3 mr-1" />
              ) : null}
              {foreclosureChange.changePercent > 0 ? "+" : ""}
              {foreclosureChange.changePercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Mortgage Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${(latestData.mortgageVolume / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Daily volume</div>
          </CardContent>
        </Card>
      </div>

      {/* Market Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MarketChart
          data={mockMarketData}
          title="Mortgage Rates"
          dataKey="mortgageRates"
          color="#ef4444"
        />

        <MarketChart
          data={mockMarketData}
          title="Average Home Price"
          dataKey="averageHomePrice"
          color="#10b981"
        />

        <MarketChart
          data={mockMarketData}
          title="Foreclosure Rate"
          dataKey="foreclosureRate"
          color="#f59e0b"
        />

        <MarketChart
          data={mockMarketData}
          title="Default Rate"
          dataKey="defaultRate"
          color="#8b5cf6"
        />
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Market Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">
                  Opportunity
                </Badge>
                <span className="text-sm font-medium">Rising Home Prices</span>
              </div>
              <p className="text-sm text-gray-600">
                Home prices have increased by{" "}
                {homePriceChange.changePercent.toFixed(1)}% in the last period,
                indicating strong market demand and potential for property value
                appreciation.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">Stable</Badge>
                <span className="text-sm font-medium">Mortgage Volume</span>
              </div>
              <p className="text-sm text-gray-600">
                Daily mortgage volume remains steady at $
                {(latestData.mortgageVolume / 1000000).toFixed(1)}M, showing
                consistent market activity and liquidity.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-100 text-yellow-800">Watch</Badge>
                <span className="text-sm font-medium">
                  Interest Rate Trends
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Mortgage rates are at {latestData.mortgageRates.toFixed(2)}%.
                Monitor rate changes as they directly impact borrower
                affordability and default risk.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-100 text-red-800">Risk</Badge>
                <span className="text-sm font-medium">Default Rate</span>
              </div>
              <p className="text-sm text-gray-600">
                Current default rate is {latestData.defaultRate.toFixed(2)}%.
                Higher default rates may indicate increased borrower stress and
                investment risk.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
