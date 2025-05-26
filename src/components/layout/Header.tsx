"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, TrendingUp, BarChart3, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Mortgage Listings", href: "/", icon: Building2 },
  { name: "Market Dashboard", href: "/dashboard", icon: TrendingUp },
  { name: "Property Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Market Data", href: "/market-data", icon: Database },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                MortgageInvest
              </span>
            </Link>
          </div>

          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
