"use client";

import { useState, useEffect } from "react";
import RealTimeChart from "./RealTimeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchMortgageRates,
  fetchHomePriceIndex,
  fetchUnemploymentRate,
  fetchDelinquencyRate,
  MarketDataPoint,
  calculateChange,
} from "@/lib/api";
import {
  TrendingUp,
  TrendingDown,
  Home,
  BarChart3,
  AlertTriangle,
  Users,
  RefreshCw,
  Activity,
} from "lucide-react";

export default function MarketOverview() {
  const [overviewData, setOverviewData] = useState<{
    mortgageRates: MarketDataPoint[];
    homePrices: MarketDataPoint[];
    unemployment: MarketDataPoint[];
    delinquency: MarketDataPoint[];
  }>({
    mortgageRates: [],
    homePrices: [],
    unemployment: [],
    delinquency: [],
  });

  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadOverviewData = async () => {
    try {
      const [mortgageRates, homePrices, unemployment, delinquency] =
        await Promise.all([
          fetchMortgageRates(12), // Last 12 weeks
          fetchHomePriceIndex(12), // Last 12 months
          fetchUnemploymentRate(12), // Last 12 months
          fetchDelinquencyRate(12), // Last 12 quarters
        ]);

      setOverviewData({
        mortgageRates,
        homePrices,
        unemployment,
        delinquency,
      });
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error loading overview data:", error);
    }
  };

  useEffect(() => {
    loadOverviewData();

    // Refresh every 10 minutes
    const interval = setInterval(loadOverviewData, 600000);
    return () => clearInterval(interval);
  }, []);

  const getMetricCard = (
    title: string,
    data: MarketDataPoint[],
    icon: React.ReactNode,
    formatValue: (value: number) => string,
    colorClass: string
  ) => {
    if (data.length === 0) return null;

    const { current, change, changePercent } = calculateChange(data);
    const isPositive = change > 0;
    const isNegative = change < 0;

    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm font-medium text-gray-600">{title}</span>
            </div>
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="h-3 w-3 text-green-600" />}
              {isNegative && <TrendingDown className="h-3 w-3 text-red-600" />}
              <span
                className={`text-xs font-medium ${
                  isPositive
                    ? "text-green-600"
                    : isNegative
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {change > 0 ? "+" : ""}
                {changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className={`text-2xl font-bold ${colorClass}`}>
            {formatValue(current)}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Real-Time Market Data
          </h2>
          <p className="text-gray-600">
            Live economic indicators affecting mortgage investments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
          <Button onClick={loadOverviewData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Quick Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getMetricCard(
          "Mortgage Rate",
          overviewData.mortgageRates,
          <BarChart3 className="h-4 w-4 text-red-600" />,
          (value) => `${value.toFixed(2)}%`,
          "text-red-900"
        )}

        {getMetricCard(
          "Home Price Index",
          overviewData.homePrices,
          <Home className="h-4 w-4 text-blue-600" />,
          (value) => value.toFixed(1),
          "text-blue-900"
        )}

        {getMetricCard(
          "Unemployment",
          overviewData.unemployment,
          <Users className="h-4 w-4 text-orange-600" />,
          (value) => `${value.toFixed(1)}%`,
          "text-orange-900"
        )}

        {getMetricCard(
          "Delinquency Rate",
          overviewData.delinquency,
          <AlertTriangle className="h-4 w-4 text-yellow-600" />,
          (value) => `${value.toFixed(2)}%`,
          "text-yellow-900"
        )}
      </div>

      {/* Detailed Charts */}
      <Tabs defaultValue="mortgage-rates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mortgage-rates">Mortgage Rates</TabsTrigger>
          <TabsTrigger value="home-prices">Home Prices</TabsTrigger>
          <TabsTrigger value="unemployment">Unemployment</TabsTrigger>
          <TabsTrigger value="delinquency">Delinquency</TabsTrigger>
        </TabsList>

        <TabsContent value="mortgage-rates" className="mt-6">
          <RealTimeChart
            title="30-Year Fixed Mortgage Rate"
            dataFetcher={() => fetchMortgageRates(52)} // 1 year of weekly data
            color="#ef4444"
            formatValue={(value) => `${value.toFixed(2)}%`}
            description="Weekly average 30-year fixed mortgage rate in the United States"
            updateInterval={300000} // 5 minutes
            chartType="area"
          />
        </TabsContent>

        <TabsContent value="home-prices" className="mt-6">
          <RealTimeChart
            title="Case-Shiller Home Price Index"
            dataFetcher={() => fetchHomePriceIndex(36)} // 3 years of monthly data
            color="#3b82f6"
            formatValue={(value) => value.toFixed(1)}
            description="S&P CoreLogic Case-Shiller U.S. National Home Price Index"
            updateInterval={3600000} // 1 hour (monthly data updates less frequently)
            chartType="area"
          />
        </TabsContent>

        <TabsContent value="unemployment" className="mt-6">
          <RealTimeChart
            title="Unemployment Rate"
            dataFetcher={() => fetchUnemploymentRate(36)} // 3 years of monthly data
            color="#f59e0b"
            formatValue={(value) => `${value.toFixed(1)}%`}
            description="U.S. unemployment rate as economic stress indicator"
            updateInterval={3600000} // 1 hour
            chartType="line"
          />
        </TabsContent>

        <TabsContent value="delinquency" className="mt-6">
          <RealTimeChart
            title="Mortgage Delinquency Rate"
            dataFetcher={() => fetchDelinquencyRate(20)} // 5 years of quarterly data
            color="#8b5cf6"
            formatValue={(value) => `${value.toFixed(2)}%`}
            description="Delinquency rate on single-family residential mortgages"
            updateInterval={3600000} // 1 hour
            chartType="line"
          />
        </TabsContent>
      </Tabs>

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
            {overviewData.mortgageRates.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800">
                    Rate Watch
                  </Badge>
                  <span className="text-sm font-medium">
                    Mortgage Rate Trends
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Current 30-year fixed rate:{" "}
                  {overviewData.mortgageRates[
                    overviewData.mortgageRates.length - 1
                  ]?.value.toFixed(2)}
                  %.
                  {calculateChange(overviewData.mortgageRates).change < 0
                    ? " Declining rates may increase refinancing opportunities."
                    : " Rising rates may create distressed asset opportunities."}
                </p>
              </div>
            )}

            {overviewData.homePrices.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    Price Trend
                  </Badge>
                  <span className="text-sm font-medium">
                    Home Price Movement
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Home price index:{" "}
                  {overviewData.homePrices[
                    overviewData.homePrices.length - 1
                  ]?.value.toFixed(1)}
                  .
                  {calculateChange(overviewData.homePrices).changePercent > 0
                    ? " Continued appreciation supports collateral values."
                    : " Price corrections may present buying opportunities."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Risk Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {overviewData.unemployment.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Economic
                  </Badge>
                  <span className="text-sm font-medium">Employment Stress</span>
                </div>
                <p className="text-sm text-gray-600">
                  Unemployment rate:{" "}
                  {overviewData.unemployment[
                    overviewData.unemployment.length - 1
                  ]?.value.toFixed(1)}
                  %.
                  {overviewData.unemployment[
                    overviewData.unemployment.length - 1
                  ]?.value > 5.0
                    ? " Elevated unemployment may increase default risk."
                    : " Low unemployment supports borrower stability."}
                </p>
              </div>
            )}

            {overviewData.delinquency.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800">Credit Risk</Badge>
                  <span className="text-sm font-medium">Loan Performance</span>
                </div>
                <p className="text-sm text-gray-600">
                  Delinquency rate:{" "}
                  {overviewData.delinquency[
                    overviewData.delinquency.length - 1
                  ]?.value.toFixed(2)}
                  %.
                  {overviewData.delinquency[overviewData.delinquency.length - 1]
                    ?.value > 3.0
                    ? " Elevated delinquencies signal increased credit risk."
                    : " Low delinquency rates indicate healthy loan performance."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Attribution */}
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Data Sources:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                30-Year Fixed Mortgage Rate: Federal Reserve Economic Data
                (FRED) - Series MORTGAGE30US
              </li>
              <li>
                Home Price Index: S&P CoreLogic Case-Shiller U.S. National Home
                Price Index - Series CSUSHPINSA
              </li>
              <li>
                Unemployment Rate: U.S. Bureau of Labor Statistics via FRED -
                Series UNRATE
              </li>
              <li>
                Delinquency Rate: Federal Reserve Board via FRED - Series
                DRSFRMACBS
              </li>
            </ul>
            <p className="mt-2">
              <strong>Last Updated:</strong> {lastRefresh.toLocaleString()} |
              <strong> Update Frequency:</strong> Real-time with 5-60 minute
              intervals
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
