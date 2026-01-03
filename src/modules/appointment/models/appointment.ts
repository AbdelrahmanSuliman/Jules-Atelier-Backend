import { model } from "@medusajs/framework/utils";

const Appointment = model.define("appointment", {
  id: model.id({ prefix: "appt" }).primaryKey(),
  name: model.text(),
  email: model.text(),
  phone_number: model.text(),
  location: model.text(),
  appointment_type: model.enum(["in-store", "styling"]).default("in-store"),
  date: model.dateTime(),
  time: model.text(),
  metadata: model.json().nullable(),
});

export default Appointment;
