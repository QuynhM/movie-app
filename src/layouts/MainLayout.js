import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import "../App.css";

function MainLayout() {
  return (
    // <Grid container justifyContent="center">
    //   <Grid item xs={12}>
    //     <MainHeader />
    //   </Grid>

    //   <Grid item xs={10} mt={5}>
    //     <Outlet />
    //   </Grid>

    //   <Grid item xs={12}>
    //     <MainFooter />
    //   </Grid>
    // </Grid>

    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
