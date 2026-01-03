import { Module } from "@medusajs/framework/utils";
import AppointmentModuleService from "./service";

export const APPOINTMENT_MODULE = "appointment";

export default Module(APPOINTMENT_MODULE, {
  service: AppointmentModuleService,
});
