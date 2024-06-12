import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery } from '@mui/material'
import './Navbar.scss'

const Navbar = () => {
  const { pathname } = useLocation()
  const isLogin = localStorage.getItem("x-auth-token")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1200px)')

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  if (pathname.includes("register") || pathname.includes("admin")) {
    return null
  }

  const menuItems = [
    { text: 'СЛАДКИЕ ДНИ', path: '/' },
    { text: 'ПОДАРОЧНЫЕ НАБОРЫ', path: '/gift-sets' },
    { text: 'СОБРАТЬ НАБОР', path: '/create-set' },
    { text: 'СОЗДАТЬ ДИЗАЙН', path: '/design' },
    { text: 'КОМПАНИЯМ', path: '/companies' },
    { text: 'ВЕСЬ КАТАЛОГ', path: '/catalog' },
    { text:'Login', path:  '/' },
  ]

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Box display={{ xs: 'flex', lg: 'none' }} flexGrow={1}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className={`navbar-left ${isMobile ? 'hide-on-mobile' : ''}`} display={{ xs: 'none', lg: 'flex' }} flexGrow={1}>
            {menuItems.slice(0, 3).map((item, index) => (
              <Button key={index} color="inherit" component={NavLink} to={item.path}>
                {item.text}
              </Button>
            ))}
          </Box>
          <Box className="navbar-center" flexGrow={100000000}>
            <Typography variant="h6" component={NavLink} to="/" className="logo">
              Macaron Shop
            </Typography>
          </Box>
          <Box className={`navbar-right ${isMobile ? 'hide-on-mobile' : ''}`} display={{ xs: 'none', lg: 'flex' }} flexGrow={1} justifyContent="flex-end">
            {menuItems.slice(3).map((item, index) => (
              <Button key={index} color="inherit" component={NavLink} to={item.path}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={NavLink} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
