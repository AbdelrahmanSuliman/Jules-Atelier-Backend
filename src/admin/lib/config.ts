import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: "https://zonked-beam-favour.medusajs.app",
  debug: process.env.NODE_ENV === "development",
  auth: {
    type: "session",
  },
  publishableKey:
    "pk_a8d07a8036b22614dd65da599443e1540e0e52e265bcc373105a39d64eeeb183",
});
