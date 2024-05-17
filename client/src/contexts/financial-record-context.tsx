import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextsType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: Partial<FinancialRecord>) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextsType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/financial-records/getAllByUserID/${
        user?.id || ""
      }`
    );

    if (response.ok) {
      const records = await response.json();
      setRecords(records);
    }
  };

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/financial-records`,
      {
        method: "POST",
        body: JSON.stringify(record),
        headers: { "Content-Type": "application/json" },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecord = async (
    id: string,
    newRecord: Partial<FinancialRecord>
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: { "Content-Type": "application/json" },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else return record;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        setRecords((prev) => prev.filter((record) => record._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextsType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
