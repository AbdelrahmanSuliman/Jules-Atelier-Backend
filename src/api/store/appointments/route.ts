import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { APPOINTMENT_MODULE } from "../../../modules/appointment";
import AppointmentModuleService from "../../../modules/appointment/service";

// Define the shape of our incoming request
interface CreateAppointmentDTO {
  name: string;
  email: string;
  phone_number: string;
  location?: string; // Optional city/location from user
  appointment_type: "in-store" | "styling";
  date: string;
  time: string;
  metadata?: Record<string, any>;
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const appointmentService = req.scope.resolve(
    APPOINTMENT_MODULE
  ) as AppointmentModuleService;

  const [appointments, count] =
    await appointmentService.listAndCountAppointments(
      {},
      { order: { created_at: "DESC" } }
    );

  res.json({ appointments, count });
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const appointmentService = req.scope.resolve(
    APPOINTMENT_MODULE
  ) as AppointmentModuleService;

  const data = req.body as CreateAppointmentDTO;

  const formattedDate = new Date(data.date);

  const finalLocation =
    data.appointment_type === "in-store"
      ? "Jules Atelier Main Store - Cairo"
      : data.location || "Location to be confirmed";

  const appointment = await appointmentService.createAppointments({
    ...data,
    date: formattedDate, 
    location: finalLocation,
  });

  res.status(200).json({ appointment });
};
