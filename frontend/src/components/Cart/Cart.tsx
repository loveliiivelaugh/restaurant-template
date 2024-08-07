import { Box, Button, Drawer, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { useAppStore } from '../../store';

const appScripts = {
    handleSendOrder: async (store: any) => {
        // // send the order
        // const response = await fetch("/api/order", store.items);
        // const data = await response.json();
        // console.log("handleSendOrder: ", data);

        store.setState({
            activeView: "tables", // Update view
            selectedTable: null, // clear the table
            activeCategory: "drinks", // Reset default category
            items: [], // clear the cart
            drawerOpen: false // close the drawer
        });
    }
}


const Cart = () => {
    const appStore = useAppStore();
    return (
        <Drawer
            anchor="right"
            open={appStore.drawerOpen}
            onClose={() => appStore.setDrawerOpen(false)}
        >
            <Box sx={(theme) => ({ p: 2, width: 300, mt: 8 })}>
                <Typography>
                    Shopping Cart
                </Typography>

                {/* Shopping Cart Items */}
                <List>
                    {appStore.items.map(item => (
                        <ListItem key={item.id}>
                            <ListItemAvatar>
                                <img src="https://picsum.photos/200" alt="Product" style={{ width: "50px" }} />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={`$${item.price}`} />
                        </ListItem>
                    ))}
                </List>
                {/* Total */}
                <Typography>
                    Total: ${appStore.getTotal(appStore.items)}
                </Typography>

                {/* Checkout Button */}
                <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                    <Button color="error">
                        Clear Cart
                    </Button>
                    <Button>
                        Checkout
                    </Button>
                    <Button onClick={() => appScripts.handleSendOrder(appStore)}>
                        Send
                    </Button>
                </Box>

            </Box>
        </Drawer>
    )
}

export default Cart