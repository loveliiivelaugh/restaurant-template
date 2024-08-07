import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Button, Card, CardActionArea, CardContent } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Tabs } from '@mui/material';

import { useAppStore } from "../../store";
import cms from '../../store/cms';


const topics = ["Drinks", "Apps", "Pizza", "Desserts"];

const [drinks, apps, pizza, desserts] = Object
    .keys(cms)
    .map((key: string) => cms[key as keyof typeof cms]
        .map((item: any) => ({
            ...item,
            price: Math.round(Math.random() * 100),
            description: `Description ${item.id}; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam`,
        }))
    );

const items = { drinks, apps, pizza, desserts };

const lastOrderedText = `Last Ordered:\n\nDrinks:\n\nApps:\n\nPizza:\n\nDesserts:`;

const OrderView = () => {
    const appStore = useAppStore();
    return (
        <Grid container mt={10}>

            {/* Order View Header */}
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h4" px={2}>
                        Table {appStore.selectedTable}
                    </Typography>
                    <Typography variant="h5" px={2} gutterBottom>
                        {appStore.activeCategory.slice(0, 1).toUpperCase() + appStore.activeCategory.slice(1)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" px={2}>
                        Time table opened: 12:34 PM
                    </Typography>
                    <Typography variant="body1" px={2}>
                        Time table sat: 00:47
                    </Typography>
                    <Tooltip title={<Typography>{lastOrderedText}</Typography>}>
                        <Typography variant="body1" px={2} sx={{ "&:hover": { cursor: "pointer" } }}>
                            Last Ordered
                        </Typography>
                    </Tooltip>
                </Box>
            </Grid>

            {/* Products */}
            <Grid item sm={12}>
                <Grid container spacing={2} sx={{ justifyContent: "center", px: 2, mb: 10 }}>
                    {items[appStore.activeCategory as keyof typeof items]
                        .map(item => (
                            <Grid item sm={3} key={item.id}>
                                <Card elevation={4} sx={{ bgcolor: "inherit", color: "inherit", borderRadius: "10px" }}>
                                    <img src="https://picsum.photos/200" alt="Product" style={{ width: "100%" }} />
                                    <CardContent>
                                        <Typography variant="h6" component="h6">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body1" component="p">
                                            {`$${item.price}` || "$0.00"}
                                        </Typography>
                                        <Typography variant="subtitle1" component="p">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActionArea sx={{ p: 2, textAlign: "right" }}>
                                        <Button color="inherit" variant="outlined" onClick={() => appStore.addItem(item)}>
                                            Add To Cart
                                        </Button>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Grid>

            {/* Bottom Navigation */}
            <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "100vw", overflow: "auto" }}>
                <BottomNavigation
                    component={Tabs}
                    showLabels
                    variant="scrollable"
                    scrollButtons="auto"
                    value={0}
                    sx={{ zIndex: 1000, pt: 2 }}
                >
                    {topics.map((item: string, index: number) => (
                        <BottomNavigationAction
                            key={index}
                            label={item}
                            icon={(topics as any)[item]}
                            onClick={() => appStore.setActiveCategory(item.toLowerCase())}
                        />
                    ))}
                </BottomNavigation>
            </Box>


        </Grid>
    )
}

export default OrderView