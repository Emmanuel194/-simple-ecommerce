import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        const userData = {
          username: data.username,
          isAdmin: data.isAdmin,
        };
        login(userData);

        alert("Login realizado com sucesso!");
        navigate("/");
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao realizar login");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Login
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
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
