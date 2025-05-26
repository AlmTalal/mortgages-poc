import { MortgageListing } from "@/types/mortgage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface MortgageCardProps {
  listing: MortgageListing;
  onViewDetails: (id: string) => void;
}

export default function MortgageCard({
  listing,
  onViewDetails,
}: MortgageCardProps) {
  const { property } = listing;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Sold":
        return "bg-gray-100 text-gray-800";
      case "Foreclosure":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              {property.address}
            </CardTitle>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {property.city}, {property.state} {property.zipCode}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getRiskColor(listing.riskLevel)}>
              {listing.riskLevel} Risk
            </Badge>
            <Badge className={getStatusColor(listing.status)}>
              {listing.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="text-sm text-gray-600">Loan Amount</div>
            <div className="font-semibold">
              ${listing.loanAmount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Monthly Payment</div>
            <div className="font-semibold">
              ${listing.monthlyPayment.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Interest Rate</div>
            <div className="font-semibold">{listing.interestRate}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">LTV Ratio</div>
            <div className="font-semibold">{listing.loanToValue}%</div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Expected Return</div>
              <div className="font-semibold text-green-600">
                {listing.expectedReturn}%
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">Min Investment</div>
              <div className="font-semibold">
                ${listing.minimumInvestment.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Warning */}
        {listing.paymentHistory !== "Current" && (
          <div className="flex items-center p-2 bg-yellow-50 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Payment Status: {listing.paymentHistory}
            </span>
          </div>
        )}

        {/* Listing Date */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            Listed: {new Date(listing.listingDate).toLocaleDateString()}
          </span>
        </div>

        <Button onClick={() => onViewDetails(listing.id)} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
