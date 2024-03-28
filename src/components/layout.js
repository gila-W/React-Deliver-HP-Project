import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";

export default function Layout() {
    const [openMenu, setOpenMenu] = useState(false);
    const history = useHistory();

    const openPackages =() =>{ 
        setOpenMenu(false);
        history.replace("/package");
      }
      const openCustomers =() =>{ 
        setOpenMenu(false);
        history.replace("/customer");
      }
      const openInvoices =() =>{ 
        setOpenMenu(false);   
        history.replace("/invoice");
      }

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon onClick={() => setOpenMenu(true)}/>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mail Delivery Service
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer anchor={"left"} open={openMenu} onClose={() => {}}>
          <List style={{ width: "300px" }}>
            <ListItem button>
              <ListItemText primary={"Packages"} onClick={() => openPackages()}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary={"Customers"} onClick={() => openCustomers()}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary={"Invoices"} onClick={() => openInvoices()}/>
            </ListItem>
          </List>
        </Drawer>
    </div>
  )
}
