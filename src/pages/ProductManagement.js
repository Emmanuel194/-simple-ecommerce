import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });
    setEditProduct(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      stock: product.stock || 0,
      image: product.image || "",
    });
    setOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (editProduct) {
        const response = await fetch(
          `http://localhost:5000/products/${editProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );
        if (response.ok) {
          fetchProducts();
        }
      } else {
        const response = await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
        if (response.ok) {
          fetchProducts();
        }
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error("Erro ao excluir produto:", await response.json());
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleBuyProduct = (product) => {
    navigate(`/comprar/${product.id}`, { state: product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const isFormValid = () => {
    return (
      newProduct.name.trim() !== "" &&
      newProduct.description.trim() !== "" &&
      newProduct.price > 0 &&
      newProduct.stock > 0 &&
      newProduct.image.trim() !== ""
    );
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        {!user && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">Loja de Produtos</Typography>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/cadastro")}
              >
                Cadastro
              </Button>
            </Box>
          </Box>
        )}

        {user && (
          <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
            Adicionar Produto
          </Button>
        )}

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  {user && (
                    <>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Excluir
                      </Button>
                    </>
                  )}
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleBuyProduct(product)}
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {user && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {editProduct ? "Editar Produto" : "Adicionar Produto"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Nome"
                name="name"
                fullWidth
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Descrição"
                name="description"
                fullWidth
                value={newProduct.description}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Preço"
                name="price"
                type="number"
                fullWidth
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Estoque"
                name="stock"
                type="number"
                fullWidth
                value={newProduct.stock}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="URL da Imagem"
                name="image"
                fullWidth
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSaveProduct} disabled={!isFormValid()}>
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Layout>
  );
};

export default ProductManagement;
