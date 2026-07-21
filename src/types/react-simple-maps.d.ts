declare module "react-simple-maps" {
  import React from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      rotate?: number[];
      scale?: number;
      center?: [number, number];
    };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: GeographyType[] }) => React.ReactNode;
  }

  export interface GeographyType {
    rsmKey: string;
    properties: Record<string, any>;
    geometry: any;
    type: string;
    id: string;
  }

  export interface GeographyProps {
    geography: GeographyType;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
    children?: React.ReactNode;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    className?: string;
    children?: React.ReactNode;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
}
