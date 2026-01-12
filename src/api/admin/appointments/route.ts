import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { APPOINTMENT_MODULE } from "../../../modules/appointment";
import AppointmentModuleService from "../../../modules/appointment/service";

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
