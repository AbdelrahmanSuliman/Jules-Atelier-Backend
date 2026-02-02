// medusa/src/subscribers/product-updated.ts
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function productUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Revalidate subscriber fired for product", data.id);

  // send request to Next.js storefront to revalidate cache
  await fetch(`${process.env.STOREFRONT_URL}/api/revalidate?tags=products`);
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated", "product.deleted"],
};
