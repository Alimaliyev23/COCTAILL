import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Fade,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function Item({ item }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <CardActionArea
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          onClick={() => navigate(`/cocktail/${item.idDrink}`)}
        >
          <Box sx={{ position: "relative", width: "100%", height: 180 }}>
            {!imageLoaded && !imageError && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={180}
                sx={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
            <CardMedia
              component="img"
              image={item.strDrinkThumb}
              alt={item.strDrink}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                aspectRatio: "16/9",
                minWidth: "100%",
                maxWidth: "100%",
                display: imageError ? "none" : "block",
              }}
            />
            {imageError && (
              <Box
                sx={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "grey.100",
                  color: "grey.500",
                }}
              >
                <Typography variant="body2">Image not available</Typography>
              </Box>
            )}
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "2.4em",
                }}
              >
                {item.strDrink}
              </Typography>

              {item.strInstructions && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.5,
                    mb: 2,
                  }}
                >
                  {item.strInstructions}
                </Typography>
              )}
            </Box>

            {(item.strAlcoholic || item.strCategory) && (
              <Box
                sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: "auto" }}
              >
                {item.strAlcoholic && (
                  <Chip
                    label={item.strAlcoholic}
                    size="small"
                    color={
                      item.strAlcoholic === "Alcoholic" ? "error" : "success"
                    }
                    variant="outlined"
                  />
                )}
                {item.strCategory && (
                  <Chip
                    label={item.strCategory}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
}

export default Item;
