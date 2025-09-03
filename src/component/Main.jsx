import { Divider, Typography, Box } from "@mui/material";
import List from "./List";
import Random from "./Random";

function Main() {
  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: { xs: "center", sm: "left" },
          color: "primary.main",
        }}
      >
        Cocktail Explorer
      </Typography>

      <Random />

      <Divider
        component="hr"
        sx={{
          my: 6,
          height: 2,
          borderRadius: 1,
          backgroundColor: "primary.light",
        }}
      />

      <List />
    </Box>
  );
}

export default Main;
