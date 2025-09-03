import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Skeleton,
  Paper,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import {
  BubbleChart as BubbleChartIcon,
  ArrowBack as ArrowBackIcon,
  LocalBar as LocalBarIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import CocktailAPI from "../provider/CocktailAPI";

const cocktail = new CocktailAPI();

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    cocktail
      .getCocktailById(id)
      .then((data) => {
        setDrink(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const ingredients = drink
    ? Object.entries(drink)
        .filter(([k, v]) => k.includes("strIngredient") && v?.trim())
        .map(([_, v]) => v.trim())
    : [];

  const measures = drink
    ? Object.entries(drink)
        .filter(([k, v]) => k.includes("strMeasure") && v?.trim())
        .map(([_, v]) => v.trim())
    : [];

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={36}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 3 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={{ mb: 3 }}
            />
            <Skeleton variant="text" width="30%" height={40} />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width="70%"
                height={30}
                sx={{ mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Sol tərəf - Şəkil */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imageLoading && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                sx={{ position: "absolute", top: 0, left: 0, borderRadius: 3 }}
              />
            )}
            <CardMedia
              component="img"
              image={drink?.strDrinkThumb}
              alt={drink?.strDrink}
              onLoad={() => setImageLoading(false)}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 2,
                display: imageLoading ? "none" : "block",
              }}
            />
          </Paper>
        </Grid>

        {/* Sağ tərəf - Məlumat */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            {drink?.strDrink}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            <Chip
              icon={<CategoryIcon />}
              label={drink?.strCategory}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<LocalBarIcon />}
              label={drink?.strAlcoholic}
              color={drink?.strAlcoholic === "Alcoholic" ? "error" : "success"}
              variant="outlined"
            />
            {drink?.strGlass && (
              <Chip label={`Served in ${drink.strGlass}`} variant="outlined" />
            )}
          </Box>

          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Instructions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: "text.primary",
              }}
            >
              {drink?.strInstructions}
            </Typography>
          </Paper>

          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 2 }}>
            Ingredients
          </Typography>
          <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <List sx={{ p: 0 }}>
              {ingredients.map((ingredient, i) => (
                <Box key={i}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <BubbleChartIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body1">
                        <strong>{ingredient}</strong>
                        {measures[i] && (
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 2, color: "text.secondary" }}
                          >
                            ({measures[i]})
                          </Typography>
                        )}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  {i < ingredients.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Detail;
