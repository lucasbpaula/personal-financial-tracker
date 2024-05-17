import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

export const Dashboard = () => {
  const { user } = useUser();

  const { records } = useFinancialRecords();

  const totalAmount = useMemo(() => {
    let total = 0;

    records.forEach((record) => (total += record.amount));

    return total;
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your finances:</h1>

      <FinancialRecordForm />

      <div>Total Amount: ${totalAmount}</div>
      <FinancialRecordList />
    </div>
  );
};
