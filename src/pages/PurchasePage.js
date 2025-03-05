import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [qrCode, setQrCode] = useState(null);

  const handleBackToProducts = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch("http://localhost:5000/pix/qrcode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valor: product.price,
            descricao: product.name,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setQrCode(data.qrcode);
        } else {
          console.error("Erro ao gerar QR Code:", await response.json());
        }
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      }
    };

    if (product) {
      fetchQrCode();
    }
  }, [product]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ height: "80vh" }}
      >
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Preço: R$ {product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px dashed #ccc",
              textAlign: "center",
              padding: 2,
              height: "100%",
            }}
          >
            {qrCode ? (
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code para pagamento PIX"
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                Gerando QR Code PIX...
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToProducts}
        >
          Voltar para a Loja
        </Button>
      </Box>
    </Box>
  );
};

export default PurchasePage;
