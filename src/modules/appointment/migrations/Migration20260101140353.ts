import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260101140353 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "appointment" ("id" text not null, "name" text not null, "email" text not null, "phone_number" text not null, "location" text not null, "appointment_type" text check ("appointment_type" in ('in-store', 'styling')) not null default 'in-store', "date" timestamptz not null, "time" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "appointment_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_appointment_deleted_at" ON "appointment" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "appointment" cascade;`);
  }

}
