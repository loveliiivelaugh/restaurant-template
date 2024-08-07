import { Box, Typography } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Tabs } from '@mui/material';
import { useAppStore } from '../../store';

const topics = ["Bar", "Dining 1", "Dining 2", "Patio"];

const TableLayout = () => {
    const appStore = useAppStore();
    return (
        <Box sx={{ 
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            alignItems: "center",
            height: "100vh"
        }}>
            <Typography variant="h6">
                Bar |
            </Typography>
            {new Array(8).fill("").map((item, index) => (
                <Box key={index} sx={{ 
                    height: "50px",
                    width: "50px",
                    textAlign: "center",
                    py: 1,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: "10px",
                    "&:hover": {
                        bgcolor: "#333",
                        color: "#aaa",
                        cursor: "pointer"
                    }
                }}
                onClick={() => appStore.setSelectedTable((index + 1).toString())}
                >
                    {index + 1}
                </Box>
            ))}

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
                            // onClick={() => appStore.setActiveCategory(item.toLowerCase())}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        </Box>
    )
}

export default TableLayout