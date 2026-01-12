import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function productWebhookHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger");

  // Example: call your external webhook / service to refetch this product
  // Replace URL with your own endpoint
  // Replace this line in your Subscriber
  await fetch(
    `${process.env.STORE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: data.id }),
    }
  );

  logger.info(`Triggered external webhook for product ${data.id}`);
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated"],
};
