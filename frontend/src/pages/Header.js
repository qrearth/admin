import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
   
      <AppBar position="static" sx={{ backgroundColor: 'navy', top: 0 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QEarth Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          top: '180px', 
          '.MuiDrawer-paper': {
            top: '85px', 
            width: '250px', 
          }
        }}
      >
       
        <Box
          sx={{
            width: 250,
            paddingTop: 4
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                  },
                }}
              >
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
