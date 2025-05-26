"use client";

import { useState } from "react";
import { mockPropertyAnalytics, mockMortgageListings } from "@/data/mockData";
import PropertyAnalyticsCard from "@/components/analytics/PropertyAnalyticsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

export default function Analytics() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    mockPropertyAnalytics[0]?.propertyId || ""
  );

  const selectedAnalytics = mockPropertyAnalytics.find(
    (a) => a.propertyId === selectedPropertyId
  );
  const selectedProperty = mockMortgageListings.find(
    (l) => l.property.id === selectedPropertyId
  );

  const averageCapRate =
    mockPropertyAnalytics.reduce(
      (sum, a) => sum + a.investmentMetrics.capRate,
      0
    ) / mockPropertyAnalytics.length;
  const averageAppreciation =
    mockPropertyAnalytics.reduce(
      (sum, a) => sum + a.marketTrends.appreciation,
      0
    ) / mockPropertyAnalytics.length;
  const totalProperties = mockPropertyAnalytics.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Property Analytics
        </h1>
        <p className="text-gray-600">
          Detailed property analysis with market trends, investment metrics, and
          risk assessments.
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Properties Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalProperties}
            </div>
            <div className="text-sm text-gray-600">Total portfolio</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Appreciation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {averageAppreciation.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Annual rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Avg Cap Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {averageCapRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Portfolio average</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {mockPropertyAnalytics.reduce(
                (sum, a) => sum + a.riskFactors.length,
                0
              )}
            </div>
            <div className="text-sm text-gray-600">Total risk factors</div>
          </CardContent>
        </Card>
      </div>

      {/* Property Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Property Analysis</span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-normal text-gray-600">
                Select Property:
              </span>
              <Select
                value={selectedPropertyId}
                onValueChange={setSelectedPropertyId}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent>
                  {mockPropertyAnalytics.map((analytics) => {
                    const property = mockMortgageListings.find(
                      (l) => l.property.id === analytics.propertyId
                    );
                    return (
                      <SelectItem
                        key={analytics.propertyId}
                        value={analytics.propertyId}
                      >
                        {property?.property.address ||
                          `Property ${analytics.propertyId}`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Selected Property Analytics */}
      {selectedAnalytics && (
        <div className="mb-8">
          <PropertyAnalyticsCard
            analytics={selectedAnalytics}
            propertyAddress={selectedProperty?.property.address}
          />
        </div>
      )}

      {/* Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Investment Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPropertyAnalytics.map((analytics) => {
                const property = mockMortgageListings.find(
                  (l) => l.property.id === analytics.propertyId
                );
                const isSelected = analytics.propertyId === selectedPropertyId;

                return (
                  <div
                    key={analytics.propertyId}
                    className={`p-4 rounded-lg border ${
                      isSelected
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">
                        {property?.property.address ||
                          `Property ${analytics.propertyId}`}
                      </div>
                      {isSelected && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Selected
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-gray-600">Cap Rate</div>
                        <div className="font-semibold text-green-600">
                          {analytics.investmentMetrics.capRate.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Cash on Cash</div>
                        <div className="font-semibold text-blue-600">
                          {analytics.investmentMetrics.cashOnCash.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">IRR</div>
                        <div className="font-semibold text-purple-600">
                          {analytics.investmentMetrics.irr.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Risk Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Risk Factor Distribution */}
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Common Risk Factors
                </h4>
                <div className="space-y-2">
                  {Array.from(
                    new Set(mockPropertyAnalytics.flatMap((a) => a.riskFactors))
                  ).map((factor) => {
                    const count = mockPropertyAnalytics.filter((a) =>
                      a.riskFactors.includes(factor)
                    ).length;
                    const percentage =
                      (count / mockPropertyAnalytics.length) * 100;

                    return (
                      <div
                        key={factor}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-700">{factor}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-gray-600 text-xs w-8">
                            {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Market Trends Summary */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Market Trends</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Avg Days on Market</div>
                    <div className="font-semibold">
                      {Math.round(
                        mockPropertyAnalytics.reduce(
                          (sum, a) => sum + a.marketTrends.daysOnMarket,
                          0
                        ) / mockPropertyAnalytics.length
                      )}{" "}
                      days
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg Comparables</div>
                    <div className="font-semibold">
                      {Math.round(
                        mockPropertyAnalytics.reduce(
                          (sum, a) => sum + a.marketTrends.comparableProperties,
                          0
                        ) / mockPropertyAnalytics.length
                      )}{" "}
                      properties
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Recommendations */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">
                  Investment Recommendations
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-100 text-green-800">
                        Strong
                      </Badge>
                      <span className="text-sm font-medium">
                        High Performing Properties
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {
                        mockPropertyAnalytics.filter(
                          (a) => a.investmentMetrics.irr > 10
                        ).length
                      }{" "}
                      properties with IRR above 10%
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Monitor
                      </Badge>
                      <span className="text-sm font-medium">
                        Market Sensitive
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {
                        mockPropertyAnalytics.filter((a) =>
                          a.riskFactors.includes("Market volatility")
                        ).length
                      }{" "}
                      properties exposed to market volatility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
