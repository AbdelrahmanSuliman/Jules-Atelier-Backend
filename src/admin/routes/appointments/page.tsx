import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Calendar } from "@medusajs/icons";
import {
  Container,
  Heading,
  Table,
  StatusBadge,
  Badge,
  Text,
} from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/config";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  appointment_type: "in-store" | "styling";
  date: string;
  time: string;
  metadata?: {
    selected_products?: string[];
  };
}

const AppointmentPage = () => {
  const { data: apptResponse, isLoading: loadingAppts } = useQuery({
    queryFn: () => sdk.client.fetch<any>(`/store/appointments`),
    queryKey: ["appointments"],
  });

  const { data: prodResponse, isLoading: loadingProds } = useQuery({
    queryFn: () => sdk.client.fetch<any>(`/admin/products?limit=100`),
    queryKey: ["products"],
  });

  console.log("--- JULES ATELIER DEBUG ---");
  console.log("APPOINTMENTS:", apptResponse?.appointments);
  console.log("PRODUCTS STORED IN SYSTEM:", prodResponse?.products);

  if (apptResponse?.appointments?.[0]?.metadata) {
    console.log(
      "METADATA FORMAT CHECK:",
      apptResponse.appointments[0].metadata
    );
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getProductTitle = (id: string) => {
    if (loadingProds) return "Loading...";

    const productList = prodResponse?.products || [];
    const product = productList.find((p: any) => p.id === id);

    if (product) return product.title;

    if (productList.length > 0) {
      return `Not Found (${id.substring(0, 8)})`;
    }

    return "Syncing...";
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Appointments</Heading>
          <Text size="xsmall" className="text-ui-fg-muted">
            Manage your in-store visits and styling sessions
          </Text>
        </div>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Type & Requests</Table.HeaderCell>
            <Table.HeaderCell>Contact Info</Table.HeaderCell>
            <Table.HeaderCell>Date & Time</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loadingAppts && (
            <Table.Row>
              <td colSpan={5} className="text-center p-12 text-ui-fg-muted">
                <div className="flex flex-col items-center gap-2">
                  <span className="animate-pulse">Loading appointments...</span>
                </div>
              </td>
            </Table.Row>
          )}

          {apptResponse?.appointments?.map((appt: Appointment) => (
            <Table.Row key={appt.id}>
              <Table.Cell className="font-medium text-ui-fg-base">
                {appt.name}
              </Table.Cell>

              <Table.Cell>
                <div className="flex flex-col gap-y-1 items-start">
                  <StatusBadge
                    color={
                      appt.appointment_type === "styling" ? "purple" : "blue"
                    }
                  >
                    {appt.appointment_type}
                  </StatusBadge>

                  {appt.appointment_type === "styling" &&
                    appt.metadata?.selected_products && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {appt.metadata.selected_products.map((productId) => (
                          <Badge
                            key={productId}
                            size="small"
                            color="grey"
                            className="max-w-[180px] truncate"
                          >
                            {getProductTitle(productId)}
                          </Badge>
                        ))}
                      </div>
                    )}
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className="flex flex-col">
                  <Text size="small" className="font-medium">
                    {appt.email}
                  </Text>
                  <Text size="small" className="text-ui-fg-subtle">
                    {appt.phone_number}
                  </Text>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className="flex flex-col">
                  <Text size="small" className="font-medium">
                    {formatDate(appt.date)}
                  </Text>
                  <Text size="xsmall" className="text-ui-fg-muted uppercase">
                    at {appt.time}
                  </Text>
                </div>
              </Table.Cell>

              <Table.Cell className="text-ui-fg-subtle">
                <Text size="small">{appt.location}</Text>
              </Table.Cell>
            </Table.Row>
          ))}

          {!loadingAppts && apptResponse?.appointments?.length === 0 && (
            <Table.Row>
              <td colSpan={5} className="text-center p-12 text-ui-fg-muted">
                No appointments found.
              </td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Appointments",
  icon: Calendar,
});

export default AppointmentPage;
