import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260101144637 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "appointment" add column if not exists "metadata" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "appointment" drop column if exists "metadata";`);
  }

}
