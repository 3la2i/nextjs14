import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@mui/material";
import Select from "react-select";
import { useTable } from "react-table";
import "chart.js/auto";
import { DollarSign, Calendar, User, FileText, CheckCircle, XCircle, Loader } from "lucide-react";

export const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/transaction?month=${selectedMonth}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error("Error fetching transactions:", error.message || error);
      setError("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (option) => {
    setSelectedMonth(option.value);
  };

  const months = [
    { value: "all", label: "كل الأشهر" },
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "أبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  const chartData = {
    labels: transactions.map((t) =>
      new Date(t.createdAt).toLocaleDateString("ar-EG")
    ),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((t) => t.amount),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#4CAF50",
        tension: 0.4,
      },
    ],
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "رقم الفاتورة",
        accessor: "transactionId",
        Cell: ({ value }) => (
          <div className="flex items-center">
            <FileText className="mr-2 text-green-500" size={16} />
            {value}
          </div>
        ),
      },
      {
        Header: "اسم المشتري",
        accessor: "user.name",
        Cell: ({ value }) => (
          <div className="flex items-center">
            <User className="mr-2 text-green-500" size={16} />
            {value}
          </div>
        ),
      },
      {
        Header: "المبلغ",
        accessor: "amount",
        Cell: ({ value }) => (
          <div className="flex items-center">
            <DollarSign className="mr-2 text-green-500" size={16} />
            {value}
          </div>
        ),
      },
      {
        Header: "التاريخ",
        accessor: (row) => new Date(row.createdAt).toLocaleDateString("ar-EG"),
        Cell: ({ value }) => (
          <div className="flex items-center">
            <Calendar className="mr-2 text-green-500" size={16} />
            {value}
          </div>
        ),
      },
      {
        Header: "الحالة",
        accessor: "status",
        Cell: ({ value }) => (
          <div className={`flex items-center ${value === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
            {value === 'completed' ? <CheckCircle className="mr-2" size={16} /> : <XCircle className="mr-2" size={16} />}
            {value}
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => transactions, [transactions]);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-600 flex items-center">
        <DollarSign className="mr-2" /> لوحة التحكم
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-green-500" size={48} />
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Card className="mb-8 shadow-lg">
        <CardHeader className="bg-green-500 text-white">إجمالي الأرباح</CardHeader>
        <CardContent>
          <div style={{ height: 300 }}>
            <Line data={chartData} options={{ 
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }} />
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Select
          options={months}
          onChange={handleMonthChange}
          defaultValue={months[0]}
          className="w-[180px]"
          placeholder="اختر الشهر"
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: '#4CAF50',
              '&:hover': {
                borderColor: '#45a049',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#4CAF50' : 'white',
              color: state.isSelected ? 'white' : 'black',
              '&:hover': {
                backgroundColor: '#e8f5e9',
              },
            }),
          }}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-green-500 text-white">قائمة الفواتير</CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-green-100">
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="p-3 text-left font-semibold text-green-700">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b border-green-200 hover:bg-green-50 transition-colors duration-150">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="p-3">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transaction;