import Grid from "@mui/material/Grid";

export default function DashboardLayout({ 
    attackControls, 
    aiPanel, 
    logOverview, 
    threatChart,
    heatmap
}) {
    return (
        <Grid container spacing={4}>

            {/* TOP ROW: Attack + AI */}
            <Grid item xs={12} md={4}>
                {threatChart}
                {attackControls}
            </Grid>

            <Grid item xs={12} md={8}>
                {aiPanel}
            </Grid>

            {/* SECOND ROW – Overview */}
            <Grid item xs={12}>
                {logOverview}
            </Grid>

            {/* THIRD ROW – Threat chart full width */}
            <Grid item xs={12}>
                
            </Grid>

           

        </Grid>
    );
}
