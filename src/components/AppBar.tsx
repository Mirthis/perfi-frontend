import { useState } from 'react';
import MUIAppBar from '@mui/material/AppBar';
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
import { Link, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useAppSelector } from '../reducers/hooks';
import { LoginState } from '../types/types';

const settings = [
  { label: 'Manage Categories', link: '/manage/categories' },
  { label: 'Logout', link: '/logout' },
];

const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const isLoggedIn =
    useAppSelector((state) => state.auth.state) === LoginState.LOGGEDIN;

  const allPages = [
    { label: 'Dashboard', link: '/dashboard', show: isLoggedIn },
    { label: 'Accounts', link: '/accounts', show: isLoggedIn },
    { label: 'Transactions', link: '/transactions', show: isLoggedIn },
  ];

  const pages = allPages.filter((page) => page.show);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MUIAppBar
      // position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Only display on md or bigger screens */}
          <Link underline="none" href="/" sx={{ color: 'black' }}>
            <Box
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              alignItems="center"
              display="flex"
              gap={2}
            >
              <AccountBalanceWalletOutlinedIcon fontSize="large" />
              <Typography variant="h6" noWrap component="div">
                Perfi
              </Typography>
            </Box>
          </Link>
          {/* Only display on xs or sm screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              {pages.map((page) => (
                <Link underline="none" key={page.label} href={page.link}>
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Only display on xs and sm screens */}
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            alignItems="center"
            display="flex"
            gap={2}
          >
            <AccountBalanceWalletOutlinedIcon fontSize="large" />
            <Typography variant="h6" noWrap component="div">
              Perfi
            </Typography>
          </Box>
          {/* Only display on md or bigger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link underline="none" key={page.label} href={page.link}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn && (
              <Stack direction="row" gap={2}>
                <Link underline="none" href="/login">
                  <Button variant="outlined" sx={{ my: 2, display: 'block' }}>
                    Sign in
                  </Button>
                </Link>
                <Link underline="none" href="/signup">
                  <Button variant="contained" sx={{ my: 2, display: 'block' }}>
                    Sign up
                  </Button>
                </Link>
              </Stack>
            )}
            {isLoggedIn && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
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
                  {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                      <Link href={setting.link}>
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
export default AppBar;
