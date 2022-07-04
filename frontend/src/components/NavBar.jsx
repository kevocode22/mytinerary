import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../assets/LogoMy.png';
import { Link as LinkRouter } from "react-router-dom";
import {useSelector} from 'react-redux'
import Avatar from '@mui/material/Avatar';

const pages = [<LinkRouter to='/'>Home</LinkRouter>, <LinkRouter to='/cities'>Cities</LinkRouter>];
const settings = [<LinkRouter to='/login'>Login</LinkRouter>, <LinkRouter to='/signup'>Sign Up</LinkRouter>,];


const NavBar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const userLoged = useSelector(store => store.userReducer.user)

  console.log(userLoged)
  
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#202020' }} key="AppBar">
      <Container key={Container.id} maxWidth="xl">
        <Toolbar key={Toolbar.id} disableGutters>
          <div className='containerLogo' ><img className='imgLogo' src={Logo} alt="Logo" sx={{ display: { xs: 'none', md: 'none' } }}></img></div>
          <Typography
          key={Typography.id}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Bayon',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'red',
              fontSize: '2.5rem',
              textDecoration: 'none',
              margin: '1rem',
            }}
          >
            MyTinerary
          </Typography>

          <Box key={Box.id} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
             key={IconButton.id}
              size="large"
              aria-label="account of current user"

              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              key={Menu.id}
              id="menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((pageID, index) => (
                <MenuItem onClick={handleCloseNavMenu} key={index}>
                  <Typography textAlign="center">{pageID}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h9"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Bayon',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'red',
              textDecoration: 'none',
              fontSize: '2.3rem'
            }}
          >
            MyTinerary
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((pageI, index) => (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                key={index}
              >{pageI}
              </Button>
            ))}
          </Box>
        
          <Box sx={{ flexGrow: 0 }}>
          
            <Tooltip title="Open settings" key={Tooltip.id}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>   
              <Typography  sx={{ my: 2, color: 'white', display: 'block' }}>{userLoged?.firstName}</Typography><Avatar referrerPolicy="no-referrer"src={userLoged?.photoUser} sx={{ my: 2, mx:2, color: 'white', display: 'block' }}/>
              </IconButton> 
              
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>   
              <Avatar src="/broken-image.jpg"/><Typography></Typography>
              </IconButton>  
            </Tooltip>
            
            <Menu
            key={Menu.id}
              sx={{ mt: '45px' }}
              id="menu-1"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <MenuItem key="Menu" onClick={handleCloseUserMenu} >
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem> 
                
                {/* {settings.map((setting, index) => (
                <MenuItem onClick={handleCloseUserMenu} key={index}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>)) } */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};



export default NavBar