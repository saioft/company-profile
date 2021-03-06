import { CommandType } from 'src/app/data/command-type/command-type.enum';
import { Image } from '../image/image.model';
import { PricingOption } from '../pricing/pricing.model';

export interface PricingFeature {
  name: string,
  details: { name: string, description: string }[]
}

export interface Product {
  key?: string;
  name: string;
  description: string;
  color?: string;
  url: string;
  urlAlter?: string;
  logo: string;
  demonstrationImg?: string;
  demonstrationAlter?: string;
  screenshots?: Image[];
  heroImage?: string;
  openSource?: boolean;
  counters?: ProductCounter[];
  features?: PricingFeature[];
  pricingOptions?: PricingOption[];
  commandLines?: CommandLine[];
  imageLoaded?: boolean;
  techStack: Image[];
}

export interface ProductLine {
  key: string;
  name: string;
  description: string;
  color?: string;
  products: Product[];
}

export interface ProductCounter {
  name: string;
  value: string;
}

export interface CommandLine {
  command: string;
  type: CommandType;
  timeout: number;
}
