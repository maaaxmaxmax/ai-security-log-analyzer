import { Card, CardContent, Typography } from "@mui/material";

function DashboardCard({ title, children }) {
    return (
        <Card 
            sx={{ 
                backgroundColor: "#1e1e1e",
                borderRadius: 3,
                border: "1px solid #333",
                boxShadow: 4,
                mb: 3
            }}
        >
            <CardContent>
                {title && (
                    <Typography 
                        variant="h6"
                        sx={{ mb: 2, color: "#fff" }}
                    >
                        {title}
                    </Typography>
                )}
                {children}
            </CardContent>
        </Card>
    );
}

export default DashboardCard;
