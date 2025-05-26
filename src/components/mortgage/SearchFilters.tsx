"use client";

import { useState } from "react";
import { SearchFilters } from "@/types/mortgage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const propertyTypes = ["Single Family", "Condo", "Townhouse", "Multi-Family"];
const states = ["TX", "CO", "AZ", "FL", "NV", "CA", "NY", "WA"];
const riskLevels = ["Low", "Medium", "High"];
const statuses = ["Active", "Pending", "Sold", "Foreclosure"];

export default function SearchFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (
    key: keyof SearchFilters,
    value: SearchFilters[keyof SearchFilters]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof SearchFilters, value: string) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray.length > 0 ? newArray : undefined);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== undefined &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter className="h-4 w-4 mr-1" />
              {isExpanded ? "Less" : "More"} Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Min Loan Amount
            </label>
            <Input
              type="number"
              placeholder="$0"
              value={filters.minLoanAmount || ""}
              onChange={(e) =>
                updateFilter(
                  "minLoanAmount",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Max Loan Amount
            </label>
            <Input
              type="number"
              placeholder="No limit"
              value={filters.maxLoanAmount || ""}
              onChange={(e) =>
                updateFilter(
                  "maxLoanAmount",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Min Return (%)
            </label>
            <Input
              type="number"
              placeholder="0%"
              value={filters.minReturn || ""}
              onChange={(e) =>
                updateFilter(
                  "minReturn",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Max Return (%)
            </label>
            <Input
              type="number"
              placeholder="No limit"
              value={filters.maxReturn || ""}
              onChange={(e) =>
                updateFilter(
                  "maxReturn",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Property Types */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Property Types
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={
                      filters.propertyType?.includes(type)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("propertyType", type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* States */}
            <div>
              <label className="text-sm font-medium mb-2 block">States</label>
              <div className="flex flex-wrap gap-2">
                {states.map((state) => (
                  <Badge
                    key={state}
                    variant={
                      filters.state?.includes(state) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("state", state)}
                  >
                    {state}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Risk Levels */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Risk Levels
              </label>
              <div className="flex flex-wrap gap-2">
                {riskLevels.map((risk) => (
                  <Badge
                    key={risk}
                    variant={
                      filters.riskLevel?.includes(risk) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("riskLevel", risk)}
                  >
                    {risk} Risk
                  </Badge>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Badge
                    key={status}
                    variant={
                      filters.status?.includes(status) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("status", status)}
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {filters.minLoanAmount && (
                <Badge variant="secondary">
                  Min: ${filters.minLoanAmount.toLocaleString()}
                </Badge>
              )}
              {filters.maxLoanAmount && (
                <Badge variant="secondary">
                  Max: ${filters.maxLoanAmount.toLocaleString()}
                </Badge>
              )}
              {filters.minReturn && (
                <Badge variant="secondary">
                  Min Return: {filters.minReturn}%
                </Badge>
              )}
              {filters.maxReturn && (
                <Badge variant="secondary">
                  Max Return: {filters.maxReturn}%
                </Badge>
              )}
              {filters.propertyType?.map((type) => (
                <Badge key={type} variant="secondary">
                  {type}
                </Badge>
              ))}
              {filters.state?.map((state) => (
                <Badge key={state} variant="secondary">
                  {state}
                </Badge>
              ))}
              {filters.riskLevel?.map((risk) => (
                <Badge key={risk} variant="secondary">
                  {risk} Risk
                </Badge>
              ))}
              {filters.status?.map((status) => (
                <Badge key={status} variant="secondary">
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
