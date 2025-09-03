import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { Container } from "@mui/material"

function App() {
  return (
    <>
      <Header />
      <Container component="main" sx={{my: 5}}>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default App
