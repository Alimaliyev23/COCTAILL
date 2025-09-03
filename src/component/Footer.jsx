import { Box, Typography } from "@mui/material"
import { red } from '@mui/material/colors'

const qirmizi = red[900]

function Footer() {
    return (
        <Box sx={{background: qirmizi, py: 1}} component="footer">
            <Typography color="white" align="center">
                Copyright &copy; {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}

export default Footer