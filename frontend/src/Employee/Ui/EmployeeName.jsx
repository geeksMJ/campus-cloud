/* eslint-disable react/prop-types */
import { useEmployeeById } from "../../Admin/components/employee/useEmployeeById";
import SpinnerMini from "../../Common/Ui/SpinnerMini";

export default function EmployeeName({ empId }) {
  const { isLoading, employee } = useEmployeeById(empId);

  if (isLoading) return <SpinnerMini />;
  return <p>{employee.employeeName}</p>;
}
