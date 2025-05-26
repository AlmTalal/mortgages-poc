"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketOverview from "@/components/dashboard/MarketOverview";
import ForeclosureMap from "@/components/dashboard/ForeclosureMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  BarChart3,
  Home,
  AlertTriangle,
  Activity,
  Database,
} from "lucide-react";

export default function MarketDataPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Real-Time Market Data Center
            </h1>
            <p className="text-gray-600">
              Comprehensive market analysis with live data from Federal Reserve,
              HUD, and other sources
            </p>
          </div>
        </div>

        {/* Data Source Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            FRED API
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Home className="h-3 w-3" />
            HUD Foreclosures
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            Case-Shiller Index
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            BLS Employment
          </Badge>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="market-overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 h-auto">
          <TabsTrigger
            value="market-overview"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden xs:inline">Market Overview</span>
            <span className="xs:hidden">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="foreclosures"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Home className="h-4 w-4" />
            <span className="hidden xs:inline">Foreclosure Analysis</span>
            <span className="xs:hidden">Foreclosures</span>
          </TabsTrigger>
          <TabsTrigger
            value="data-sources"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Database className="h-4 w-4" />
            <span className="hidden xs:inline">Data Sources</span>
            <span className="xs:hidden">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market-overview" className="mt-6">
          <MarketOverview />
        </TabsContent>

        <TabsContent value="foreclosures" className="mt-6">
          <ForeclosureMap />
        </TabsContent>

        <TabsContent value="data-sources" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Data Sources & APIs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* FRED API */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="h-6 w-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        Federal Reserve Economic Data (FRED)
                      </h3>
                      <p className="text-sm text-gray-600">
                        Primary source for economic indicators
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Available Metrics:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 30-Year Fixed Mortgage Rate (MORTGAGE30US)</li>
                        <li>• Case-Shiller Home Price Index (CSUSHPINSA)</li>
                        <li>• Unemployment Rate (UNRATE)</li>
                        <li>• Mortgage Delinquency Rate (DRSFRMACBS)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">API Details:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Base URL: api.stlouisfed.org/fred</li>
                        <li>• Rate Limit: 120 requests/60 seconds</li>
                        <li>• Update Frequency: Weekly/Monthly</li>
                        <li>• Free API key required</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Setup:</strong> Get your free API key at{" "}
                      <a
                        href="https://fred.stlouisfed.org/docs/api/api_key.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-900"
                      >
                        fred.stlouisfed.org/docs/api/api_key.html
                      </a>
                    </p>
                  </div>
                </div>

                {/* HUD Foreclosures */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="h-6 w-6 text-orange-600" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        HUD Foreclosure Listings
                      </h3>
                      <p className="text-sm text-gray-600">
                        Government foreclosed properties
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Data Available:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Property listings by state/ZIP</li>
                        <li>• Property types and conditions</li>
                        <li>• Listing prices and bid deadlines</li>
                        <li>• Property photos and details</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Access Methods:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Web scraping from hudhomestore.gov</li>
                        <li>• CSV downloads by region</li>
                        <li>• Third-party data aggregators</li>
                        <li>• Manual data collection</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> HUD doesn&apos;t provide a public
                      API. Data collection requires web scraping or manual
                      processes.
                    </p>
                  </div>
                </div>

                {/* Fannie Mae Loan Performance */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        Fannie Mae Loan Performance
                      </h3>
                      <p className="text-sm text-gray-600">
                        Detailed loan-level performance data
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Dataset Contents:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Loan origination details</li>
                        <li>• Monthly performance updates</li>
                        <li>• Delinquency status tracking</li>
                        <li>• Modification and default data</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Key Fields:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• delinquency_status</li>
                        <li>• loan_age</li>
                        <li>• zero_balance_code</li>
                        <li>• current_upb</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Access:</strong> Large CSV files available for
                      download at{" "}
                      <a
                        href="https://www.fanniemae.com/research-and-insights/dataset/loan-performance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-yellow-900"
                      >
                        fanniemae.com/research-and-insights/dataset/loan-performance
                      </a>
                    </p>
                  </div>
                </div>

                {/* Implementation Guide */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-3">
                    Implementation Guide
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        1. FRED API Integration
                      </h4>
                      <div className="bg-gray-800 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>{`// Example API call`}</div>
                        <div>const response = await fetch(</div>
                        <div className="ml-4">
                          &apos;https://api.stlouisfed.org/fred/series/observations&apos;
                        </div>
                        <div className="ml-4">
                          +
                          &apos;?series_id=MORTGAGE30US&api_key=YOUR_KEY&file_type=json&apos;
                        </div>
                        <div>);</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">2. Environment Setup</h4>
                      <div className="bg-gray-800 text-gray-100 p-3 rounded text-sm font-mono">
                        <div># .env.local</div>
                        <div>NEXT_PUBLIC_FRED_API_KEY=your_api_key_here</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">3. Rate Limiting</h4>
                      <p className="text-sm text-gray-600">
                        Implement caching and request throttling to stay within
                        API limits. Consider using React Query or SWR for data
                        fetching and caching.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
