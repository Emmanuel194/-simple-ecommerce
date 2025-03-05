import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Cadastro
      </Typography>
      <TextField
        label="Usuário"
        name="username"
        fullWidth
        value={formData.username}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Senha"
        name="password"
        type="password"
        fullWidth
        value={formData.password}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" fullWidth onClick={handleRegister}>
        Cadastrar
      </Button>
    </Box>
  );
};

export default RegisterPage;
