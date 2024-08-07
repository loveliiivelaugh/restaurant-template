import { AppBar, Badge, Box, Icon, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SignOutIcon from '@mui/icons-material/Logout';
import { useAppStore } from '../../store';

import stoneTowerLogo from '../../assets/stone-tower.svg';

const Navbar = () => {
    const appStore = useAppStore();

    const handleSignout = () => {
        appStore.setState({
            activeView: "signin", // Update view
            selectedTable: null, // clear the table
            activeCategory: "drinks", // Reset default category
            items: [], // clear the cart
            drawerOpen: false // close the drawer
        });
    };

    return (
        <AppBar sx={theme => ({ zIndex: theme.zIndex.drawer + 1, bgcolor: theme.palette.primary.main })}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Icon>
                        <img src={stoneTowerLogo} className="stone tower logo" alt="Stone Tower logo" />
                    </Icon>
                    <Typography variant="body1" component="p">
                        Stone Tower Pizza
                    </Typography>
                </Box>
                <Box>
                    <Tooltip title="Shopping Cart">
                        <Badge badgeContent={appStore.items.length}>
                        <IconButton color="inherit" onClick={() => appStore.setDrawerOpen(true)}>
                            <ShoppingCartIcon />
                        </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title="Sign Out">
                        <IconButton color="inherit" onClick={handleSignout}>
                            <SignOutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar