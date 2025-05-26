"use client";

import { useState, useMemo } from "react";
import { mockMortgageListings } from "@/data/mockData";
import { SearchFilters } from "@/types/mortgage";
import MortgageCard from "@/components/mortgage/MortgageCard";
import SearchFiltersComponent from "@/components/mortgage/SearchFilters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign, TrendingUp } from "lucide-react";

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    return mockMortgageListings.filter((listing) => {
      // Loan amount filters
      if (filters.minLoanAmount && listing.loanAmount < filters.minLoanAmount)
        return false;
      if (filters.maxLoanAmount && listing.loanAmount > filters.maxLoanAmount)
        return false;

      // Return filters
      if (filters.minReturn && listing.expectedReturn < filters.minReturn)
        return false;
      if (filters.maxReturn && listing.expectedReturn > filters.maxReturn)
        return false;

      // Property type filter
      if (filters.propertyType && filters.propertyType.length > 0) {
        if (!filters.propertyType.includes(listing.property.propertyType))
          return false;
      }

      // State filter
      if (filters.state && filters.state.length > 0) {
        if (!filters.state.includes(listing.property.state)) return false;
      }

      // Risk level filter
      if (filters.riskLevel && filters.riskLevel.length > 0) {
        if (!filters.riskLevel.includes(listing.riskLevel)) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(listing.status)) return false;
      }

      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
  };

  const handleViewDetails = (id: string) => {
    setSelectedListing(id);
  };

  const selectedListingData = selectedListing
    ? mockMortgageListings.find((l) => l.id === selectedListing)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mortgage Investment Opportunities
        </h1>
        <p className="text-gray-600">
          Discover and invest in carefully curated mortgage opportunities with
          detailed analytics and risk assessments.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              Total Listings
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredListings.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">
              Avg Loan Amount
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            $
            {Math.round(
              filteredListings.reduce((sum, l) => sum + l.loanAmount, 0) /
                filteredListings.length || 0
            ).toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">
              Avg Expected Return
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(
              filteredListings.reduce((sum, l) => sum + l.expectedReturn, 0) /
                filteredListings.length || 0
            ).toFixed(1)}
            %
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">
              States Covered
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(filteredListings.map((l) => l.property.state)).size}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <SearchFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Results */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredListings.length} Investment Opportunities
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {filteredListings.filter((l) => l.status === "Active").length}{" "}
              Active
            </Badge>
            <Badge variant="outline">
              {filteredListings.filter((l) => l.riskLevel === "Low").length} Low
              Risk
            </Badge>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <MortgageCard
            key={listing.id}
            listing={listing}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Property Details Modal */}
      <Dialog
        open={!!selectedListing}
        onOpenChange={() => setSelectedListing(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedListingData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {selectedListingData.property.address}
                </DialogTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {selectedListingData.property.city},{" "}
                    {selectedListingData.property.state}{" "}
                    {selectedListingData.property.zipCode}
                  </span>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Property Details */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="font-medium">
                        {selectedListingData.property.propertyType}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Bedrooms:</span>
                      <div className="font-medium">
                        {selectedListingData.property.bedrooms}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Bathrooms:</span>
                      <div className="font-medium">
                        {selectedListingData.property.bathrooms}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Square Feet:</span>
                      <div className="font-medium">
                        {selectedListingData.property.squareFeet.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Year Built:</span>
                      <div className="font-medium">
                        {selectedListingData.property.yearBuilt}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Lot Size:</span>
                      <div className="font-medium">
                        {selectedListingData.property.lotSize} acres
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-600">Description:</span>
                    <p className="mt-1">
                      {selectedListingData.property.description}
                    </p>
                  </div>
                </div>

                {/* Loan Details */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Loan Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">
                        Current Loan Amount:
                      </span>
                      <div className="font-medium">
                        ${selectedListingData.loanAmount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        Original Loan Amount:
                      </span>
                      <div className="font-medium">
                        $
                        {selectedListingData.originalLoanAmount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest Rate:</span>
                      <div className="font-medium">
                        {selectedListingData.interestRate}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Monthly Payment:</span>
                      <div className="font-medium">
                        ${selectedListingData.monthlyPayment.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining Balance:</span>
                      <div className="font-medium">
                        ${selectedListingData.remainingBalance.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">LTV Ratio:</span>
                      <div className="font-medium">
                        {selectedListingData.loanToValue}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Borrower Information */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Borrower Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Credit Score:</span>
                      <div className="font-medium">
                        {selectedListingData.creditScore}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Income:</span>
                      <div className="font-medium">
                        ${selectedListingData.borrowerIncome.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment History:</span>
                      <div className="font-medium">
                        <Badge
                          className={
                            selectedListingData.paymentHistory === "Current"
                              ? "bg-green-100 text-green-800"
                              : selectedListingData.paymentHistory === "Late"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {selectedListingData.paymentHistory}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Metrics */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Investment Opportunity
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Expected Return:</span>
                      <div className="font-medium text-green-600">
                        {selectedListingData.expectedReturn}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Minimum Investment:</span>
                      <div className="font-medium">
                        $
                        {selectedListingData.minimumInvestment.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <div className="font-medium">
                        <Badge
                          className={
                            selectedListingData.riskLevel === "Low"
                              ? "bg-green-100 text-green-800"
                              : selectedListingData.riskLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {selectedListingData.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
