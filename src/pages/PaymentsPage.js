import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let url = "http://localhost:5000/payments";
        if (filter) {
          url += `?status=${filter}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      }
    };

    fetchPayments();
  }, [filter]);

  return (
    <Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
          Painel de Pagamentos
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ ml: 2 }}
        >
          Voltar para a Loja
        </Button>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant={!filter ? "contained" : "outlined"}
          onClick={() => setFilter("")}
          sx={{ mx: 1 }}
        >
          Todos
        </Button>
        <Button
          variant={filter === "Pendente" ? "contained" : "outlined"}
          onClick={() => setFilter("Pendente")}
          sx={{ mx: 1 }}
        >
          Pendentes
        </Button>
        <Button
          variant={filter === "Confirmado" ? "contained" : "outlined"}
          onClick={() => setFilter("Confirmado")}
          sx={{ mx: 1 }}
        >
          Confirmados
        </Button>
        <Button
          variant={filter === "Cancelado" ? "contained" : "outlined"}
          onClick={() => setFilter("Cancelado")}
          sx={{ mx: 1 }}
        >
          Finalizados
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Chave PIX</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.pix_key}</TableCell>
                <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={
                      payment.status === "Confirmado"
                        ? "success"
                        : payment.status === "Pendente"
                        ? "warning"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell>{payment.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentsPage;
