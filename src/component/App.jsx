import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexWrap:"wrap" , minHeight: "100vh" }}>
      <Header />
      <Container component="main" maxWidth="xl">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
