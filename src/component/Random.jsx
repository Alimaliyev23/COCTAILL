import { useEffect, useState } from "react";
import {
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CocktailAPI from "../provider/CocktailAPI";

const cocktail = new CocktailAPI();

function Random() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    cocktail.randomCocktail().then((obj) => setRandom(obj));
  }, []);

  const ingr = random
    ? Object.entries(random)
        .filter((arr) => arr[0].includes("strIngredient") && arr[1])
        .map((arr) => arr[1])
    : [];

  const measure = random
    ? Object.entries(random)
        .filter((arr) => arr[0].includes("strMeasure") && arr[1])
        .map((arr) => arr[1])
    : [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        {random ? (
          <CardMedia
            image={random.strDrinkThumb}
            alt={random.strDrink}
            component="img"
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height={250} />
        )}
      </Grid>
      <Grid item xs={12} md={7}>
        <CardContent>
          <Typography variant="h5" component="h1">
            {random ? random.strDrink : <Skeleton width="60%" />}
          </Typography>
          <Typography variant="h6" component="h2">
            {random ? (
              `${random.strCategory} (${random.strAlcoholic})`
            ) : (
              <Skeleton width="40%" />
            )}
          </Typography>
          <Typography variant="body1">
            {random ? `Glass: ${random.strGlass}` : <Skeleton width="30%" />}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {random ? (
              random.strInstructions
            ) : (
              <Skeleton width="100%" height={80} />
            )}
          </Typography>
          <List>
            {random
              ? ingr.map((prod, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemIcon>
                      <BubbleChartIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {prod} ({measure[i] || ""})
                    </ListItemText>
                  </ListItem>
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <ListItem key={i} disablePadding>
                    <Skeleton width="80%" height={30} />
                  </ListItem>
                ))}
          </List>
        </CardContent>
      </Grid>
    </Grid>
  );
}

export default Random;
