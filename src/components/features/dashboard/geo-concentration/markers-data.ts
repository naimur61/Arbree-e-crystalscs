export interface MarkerData {
  name: string;
  coordinates: [number, number];
  suppliers: number;
  breakdown: string[];
}

// Demo supplier location data
export const markers: MarkerData[] = [
  {
    name: "United Kingdom",
    coordinates: [-2, 54],
    suppliers: 6,
    breakdown: ["100% in England", "33% in London"],
  },
  {
    name: "United States",
    coordinates: [-95, 37],
    suppliers: 12,
    breakdown: ["50% in California"],
  },
  {
    name: "Brazil",
    coordinates: [-55, -10],
    suppliers: 3,
    breakdown: ["100% in São Paulo"],
  },
  {
    name: "South Africa",
    coordinates: [25, -29],
    suppliers: 2,
    breakdown: ["100% in Cape Town"],
  },
  {
    name: "India",
    coordinates: [78, 20],
    suppliers: 8,
    breakdown: ["60% in Bangalore"],
  },
  {
    name: "Australia",
    coordinates: [133, -25],
    suppliers: 4,
    breakdown: ["75% in Sydney"],
  },
];
