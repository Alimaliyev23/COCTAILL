import { Grid, Skeleton, Typography, Box, Alert } from "@mui/material";
import Item from "./Item";
import CocktailAPI from "../provider/CocktailAPI";
import { useEffect, useState } from "react";
import AlphabetFilter from "./AlphabetFilter";

const cocktail = new CocktailAPI();

function List() {
  const [cocktailList, setCocktailList] = useState([]);
  const [letter, setLetter] = useState("a");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    cocktail
      .listCocktailByLetter(letter)
      .then((arr) => {
        setCocktailList(arr || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cocktails. Please try again.");
        setLoading(false);
      });
  }, [letter]);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Browse Cocktails
      </Typography>

      <AlphabetFilter onSelect={setLetter} selectedLetter={letter} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 1, alignItems: "stretch" }}>
        {(loading ? Array.from({ length: 16 }) : cocktailList).map(
          (item, i) => (
            <Grid
              item
              key={loading ? `skeleton-${i}` : item.idDrink}
              xs={12}
              sm={6}
              md={4}
              xl={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
                marginInline : "auto"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: "100%",
                    sm: 360,
                    md: 340,
                    lg: 320,
                    xl: 300,
                  },
                  minHeight: {
                    xs: 460,
                    sm: 440,
                    md: 420,
                    lg: 400,
                    xl: 400,
                  },
                  mx: "auto",
                  display: "flex",
                }}
              >
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ borderRadius: 2, flex: 1 }}
                  />
                ) : (
                  <Item item={item} />
                )}
              </Box>
            </Grid>
          )
        )}

        {!loading && cocktailList.length === 0 && !error && (
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                backgroundColor: "grey.50",
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "grey.300",
              }}
            >
              <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
                No cocktails found
              </Typography>
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                Try selecting a different letter: "{letter.toUpperCase()}"
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default List;
