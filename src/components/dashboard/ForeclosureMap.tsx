"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Home,
  MapPin,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

interface ForeclosureData {
  state: string;
  stateCode: string;
  foreclosureCount: number;
  averagePrice: number;
  riskLevel: "Low" | "Medium" | "High";
  changePercent: number;
  totalValue: number;
}

interface PropertyType {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export default function ForeclosureMap() {
  const [foreclosureData, setForeclosureData] = useState<ForeclosureData[]>([]);
  const [selectedState, setSelectedState] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock foreclosure data - in production, this would come from HUD API or web scraping
  const generateForeclosureData = (): ForeclosureData[] => {
    const states = [
      { name: "California", code: "CA", baseCount: 1250 },
      { name: "Texas", code: "TX", baseCount: 980 },
      { name: "Florida", code: "FL", baseCount: 850 },
      { name: "New York", code: "NY", baseCount: 720 },
      { name: "Arizona", code: "AZ", baseCount: 650 },
      { name: "Nevada", code: "NV", baseCount: 580 },
      { name: "Colorado", code: "CO", baseCount: 420 },
      { name: "Georgia", code: "GA", baseCount: 380 },
      { name: "Illinois", code: "IL", baseCount: 350 },
      { name: "Michigan", code: "MI", baseCount: 320 },
    ];

    return states.map((state) => {
      const variation = (Math.random() - 0.5) * 0.3;
      const count = Math.round(state.baseCount * (1 + variation));
      const avgPrice =
        Math.round((150000 + Math.random() * 200000) / 1000) * 1000;
      const changePercent = (Math.random() - 0.5) * 20;

      let riskLevel: "Low" | "Medium" | "High" = "Low";
      if (count > 600) riskLevel = "High";
      else if (count > 400) riskLevel = "Medium";

      return {
        state: state.name,
        stateCode: state.code,
        foreclosureCount: count,
        averagePrice: avgPrice,
        riskLevel,
        changePercent: Math.round(changePercent * 100) / 100,
        totalValue: count * avgPrice,
      };
    });
  };

  const propertyTypes: PropertyType[] = [
    { type: "Single Family", count: 3420, percentage: 68, color: "#3b82f6" },
    { type: "Condo", count: 850, percentage: 17, color: "#10b981" },
    { type: "Townhouse", count: 510, percentage: 10, color: "#f59e0b" },
    { type: "Multi-Family", count: 250, percentage: 5, color: "#ef4444" },
  ];

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setForeclosureData(generateForeclosureData());
        setLastUpdated(new Date());
        setLoading(false);
      }, 1000);
    };

    loadData();

    // Refresh every 30 minutes
    const interval = setInterval(loadData, 1800000);
    return () => clearInterval(interval);
  }, []);

  const filteredData =
    selectedState === "all"
      ? foreclosureData
      : foreclosureData.filter((item) => item.stateCode === selectedState);

  const totalForeclosures = foreclosureData.reduce(
    (sum, item) => sum + item.foreclosureCount,
    0
  );
  const totalValue = foreclosureData.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );
  const averagePrice = totalValue / totalForeclosures || 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Foreclosure Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Loading foreclosure data...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Foreclosure Market Analysis
          </h2>
          <p className="text-gray-600">
            HUD foreclosure listings and market opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Updated {lastUpdated.toLocaleTimeString()}
          </Badge>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Home className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">
                Total Listings
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {totalForeclosures.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600">
                Total Value
              </span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              ${(totalValue / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">
                Avg Price
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              ${Math.round(averagePrice / 1000)}k
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">
                High Risk States
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {
                foreclosureData.filter((item) => item.riskLevel === "High")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>State Analysis</CardTitle>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {foreclosureData.map((item) => (
                  <SelectItem key={item.stateCode} value={item.stateCode}>
                    {item.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="stateCode"
                  className="text-xs"
                  tick={{ fontSize: 10 }}
                />
                <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "foreclosureCount"
                      ? `${value} properties`
                      : `$${value.toLocaleString()}`,
                    name === "foreclosureCount" ? "Foreclosures" : "Avg Price",
                  ]}
                  labelFormatter={(label) => `State: ${label}`}
                />
                <Bar
                  dataKey="foreclosureCount"
                  fill="#3b82f6"
                  name="foreclosureCount"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Property Types and Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `${value} properties`,
                      "Count",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {propertyTypes.map((type, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-xs text-gray-600">
                    {type.type}: {type.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment by State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {foreclosureData
                .sort((a, b) => b.foreclosureCount - a.foreclosureCount)
                .slice(0, 8)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{item.state}</span>
                      <Badge className={getRiskColor(item.riskLevel)}>
                        {item.riskLevel}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {item.foreclosureCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">
                        ${(item.averagePrice / 1000).toFixed(0)}k avg
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Source Attribution */}
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Data Sources:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>HUD Foreclosure Listings: https://www.hudhomestore.gov</li>
              <li>
                State-level foreclosure data aggregated from county records
              </li>
              <li>Property type distribution from MLS and public records</li>
              <li>
                Risk assessment based on foreclosure volume and market
                conditions
              </li>
            </ul>
            <p className="mt-2">
              <strong>Note:</strong> This is simulated data for demonstration.
              In production, data would be sourced from HUD APIs, web scraping,
              or data providers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
