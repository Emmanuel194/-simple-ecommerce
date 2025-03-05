import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";

const SalesStatistics = () => {
  const [data, setData] = useState([]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/sales-statistics");
      const salesData = await response.json();

      const monthsMapping = {
        "01": "Jan",
        "02": "Fev",
        "03": "Mar",
        "04": "Abr",
        "05": "Mai",
        "06": "Jun",
        "07": "Jul",
        "08": "Ago",
        "09": "Set",
        10: "Out",
        11: "Nov",
        12: "Dez",
      };

      const formattedData = salesData.map((item) => ({
        name: monthsMapping[item.month] || item.month,
        vendas: item.sales,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar estatísticas de vendas:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <Layout>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Estatísticas de Vendas
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vendas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default SalesStatistics;
