import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function productWebhookHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger");

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
  event: ["product.created", "product.updated", "product.deleted"],
};
