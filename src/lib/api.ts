// API utilities for fetching real market data

export interface FredApiResponse {
  observations: Array<{
    date: string;
    value: string;
  }>;
}

export interface MarketDataPoint {
  date: string;
  value: number;
}

// FRED API configuration
const FRED_API_BASE = "https://api.stlouisfed.org/fred";
const FRED_API_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "demo_key";

// Fetch 30-Year Fixed Mortgage Rate from FRED
export async function fetchMortgageRates(
  limit = 30
): Promise<MarketDataPoint[]> {
  try {
    const response = await fetch(
      `${FRED_API_BASE}/series/observations?series_id=MORTGAGE30US&api_key=${FRED_API_KEY}&file_type=json&limit=${limit}&sort_order=desc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mortgage rates");
    }

    const data: FredApiResponse = await response.json();

    return data.observations
      .filter((obs) => obs.value !== ".")
      .map((obs) => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }))
      .reverse(); // Show chronological order
  } catch (error) {
    console.error("Error fetching mortgage rates:", error);
    // Return mock data as fallback
    return generateMockMortgageRates();
  }
}

// Fetch Home Price Index from FRED
export async function fetchHomePriceIndex(
  limit = 30
): Promise<MarketDataPoint[]> {
  try {
    const response = await fetch(
      `${FRED_API_BASE}/series/observations?series_id=CSUSHPINSA&api_key=${FRED_API_KEY}&file_type=json&limit=${limit}&sort_order=desc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch home price index");
    }

    const data: FredApiResponse = await response.json();

    return data.observations
      .filter((obs) => obs.value !== ".")
      .map((obs) => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }))
      .reverse();
  } catch (error) {
    console.error("Error fetching home price index:", error);
    return generateMockHomePrices();
  }
}

// Fetch Unemployment Rate (as proxy for economic stress/foreclosure risk)
export async function fetchUnemploymentRate(
  limit = 30
): Promise<MarketDataPoint[]> {
  try {
    const response = await fetch(
      `${FRED_API_BASE}/series/observations?series_id=UNRATE&api_key=${FRED_API_KEY}&file_type=json&limit=${limit}&sort_order=desc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch unemployment rate");
    }

    const data: FredApiResponse = await response.json();

    return data.observations
      .filter((obs) => obs.value !== ".")
      .map((obs) => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }))
      .reverse();
  } catch (error) {
    console.error("Error fetching unemployment rate:", error);
    return generateMockUnemploymentRate();
  }
}

// Fetch Mortgage Delinquency Rate from FRED
export async function fetchDelinquencyRate(
  limit = 30
): Promise<MarketDataPoint[]> {
  try {
    const response = await fetch(
      `${FRED_API_BASE}/series/observations?series_id=DRSFRMACBS&api_key=${FRED_API_KEY}&file_type=json&limit=${limit}&sort_order=desc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch delinquency rate");
    }

    const data: FredApiResponse = await response.json();

    return data.observations
      .filter((obs) => obs.value !== ".")
      .map((obs) => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }))
      .reverse();
  } catch (error) {
    console.error("Error fetching delinquency rate:", error);
    return generateMockDelinquencyRate();
  }
}

// Mock data generators for fallback
function generateMockMortgageRates(): MarketDataPoint[] {
  const baseRate = 6.8;
  const data: MarketDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 7); // Weekly data

    const variation = (Math.random() - 0.5) * 0.3;
    const rate = Math.max(3.0, Math.min(8.0, baseRate + variation));

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(rate * 100) / 100,
    });
  }

  return data;
}

function generateMockHomePrices(): MarketDataPoint[] {
  const baseIndex = 310;
  const data: MarketDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i); // Monthly data

    const trend = i * 0.5; // Upward trend
    const variation = (Math.random() - 0.5) * 5;
    const index = baseIndex + trend + variation;

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(index * 100) / 100,
    });
  }

  return data;
}

function generateMockUnemploymentRate(): MarketDataPoint[] {
  const baseRate = 3.8;
  const data: MarketDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);

    const variation = (Math.random() - 0.5) * 0.5;
    const rate = Math.max(2.0, Math.min(6.0, baseRate + variation));

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(rate * 100) / 100,
    });
  }

  return data;
}

function generateMockDelinquencyRate(): MarketDataPoint[] {
  const baseRate = 2.1;
  const data: MarketDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);

    const variation = (Math.random() - 0.5) * 0.3;
    const rate = Math.max(1.0, Math.min(4.0, baseRate + variation));

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(rate * 100) / 100,
    });
  }

  return data;
}

// Utility to format data for charts
export function formatChartData(data: MarketDataPoint[], label: string) {
  return data.map((point) => ({
    date: point.date,
    [label]: point.value,
    formattedDate: new Date(point.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    }),
  }));
}

// Calculate percentage change
export function calculateChange(data: MarketDataPoint[]): {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
} {
  if (data.length < 2) {
    return { current: 0, previous: 0, change: 0, changePercent: 0 };
  }

  const current = data[data.length - 1].value;
  const previous = data[data.length - 2].value;
  const change = current - previous;
  const changePercent = previous !== 0 ? (change / previous) * 100 : 0;

  return { current, previous, change, changePercent };
}
