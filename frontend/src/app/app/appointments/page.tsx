import { DataTableAppointments } from "@/components/data_table_appointments/DataTable";


export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <DataTableAppointments />
    </div>
  );
}
