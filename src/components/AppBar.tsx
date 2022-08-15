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
import { Link, Stack, useTheme } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { LoginState } from '../types/types';
import { useAppSelector } from '../reducers/hooks';
import DarkModeSwitch from './DarkModeSwitch';

const settings = [
  { label: 'Manage Accounts', link: '/manage/accounts' },
  { label: 'Manage Categories', link: '/manage/categories' },
  { label: 'Logout', link: '/logout' },
];

const AppBar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const { user: loggedUser, state: authState } = useAppSelector(
    (state) => state.auth,
  );
  const isLoggedIn = authState === LoginState.LOGGEDIN;

  const allPages = [
    { label: 'Dashboard', link: '/dashboard', show: isLoggedIn },
    { label: 'Spending', link: '/spending', show: isLoggedIn },
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
        backgroundColor: theme.palette.background.default,
        color: '#ffffff',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Only display on md or bigger screens */}
          <Link component={RouterLink} to="/">
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
              aria-label="Site Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              sx={{ mt: '10px', display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link key={page.label} to={page.link} component={RouterLink}>
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <DarkModeSwitch
                  // sx={{ m: 1, display: { xs: 'flex', sm: 'none' } }}
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </MenuItem>
            </Menu>
          </Box>

          {/* Only display on xs and sm screens */}
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            alignItems="center"
            display="flex"
            gap={2}
          >
            <Link component={RouterLink} to="/">
              <AccountBalanceWalletOutlinedIcon fontSize="large" />
            </Link>
            <Link component={RouterLink} to="/">
              <Typography variant="h6" noWrap component="div">
                Perfi
              </Typography>
            </Link>
          </Box>
          {/* Only display on md or bigger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.label} to={page.link} component={RouterLink}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{ flexGrow: 0, flexDirection: 'row', display: 'flex' }}
            alignItems="center"
          >
            <DarkModeSwitch
              sx={{ m: 1, display: { xs: 'none', sm: 'flex' } }}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            {!isLoggedIn && (
              <Stack direction="row" gap={2}>
                <Link to="/login" component={RouterLink}>
                  <Button variant="outlined" sx={{ my: 2, display: 'block' }}>
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup" component={RouterLink}>
                  <Button
                    variant="contained"
                    sx={{ my: 2, display: { xs: 'none', sm: 'block' } }}
                  >
                    Sign up
                  </Button>
                </Link>
              </Stack>
            )}
            {loggedUser && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonOutlineIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
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
                  <MenuItem>
                    <Typography>{loggedUser.email}</Typography>
                  </MenuItem>

                  {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                      <Link component={RouterLink} to={setting.link}>
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
