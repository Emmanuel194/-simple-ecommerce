import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { Home, Payments, BarChart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Gestão de Produtos" />
          </ListItem>
          {user && (
            <>
              <ListItem button component={Link} to="/pagamentos">
                <ListItemIcon>
                  <Payments />
                </ListItemIcon>
                <ListItemText primary="Painel de Pagamentos" />
              </ListItem>
              <ListItem button component={Link} to="/statistics">
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Estatísticas de Vendas" />
              </ListItem>
            </>
          )}
        </List>
        <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
          {user ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button variant="outlined" color="primary"></Button>
          )}
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
