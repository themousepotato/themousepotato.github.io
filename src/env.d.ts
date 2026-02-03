/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
  interface Window {
    dataLayer: any[];
  }
}
export {};
