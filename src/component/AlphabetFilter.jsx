import { Box, Button, Chip, useTheme, useMediaQuery } from "@mui/material";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetFilter({ onSelect, selectedLetter = "a" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 0.5, sm: 1 },
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      {letters.map((letter) => {
        const isSelected =
          letter.toLowerCase() === selectedLetter.toLowerCase();

        return isMobile ? (
          <Chip
            key={letter}
            label={letter}
            onClick={() => onSelect(letter.toLowerCase())}
            color={isSelected ? "primary" : "default"}
            variant={isSelected ? "filled" : "outlined"}
            sx={{
              minWidth: 32,
              height: 32,
              fontSize: "0.875rem",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: isSelected ? "primary.dark" : "action.hover",
              },
            }}
          />
        ) : (
          <Button
            key={letter}
            size="medium"
            variant={isSelected ? "contained" : "outlined"}
            onClick={() => onSelect(letter.toLowerCase())}
            sx={{
              minWidth: 40,
              height: 40,
              fontSize: "0.875rem",
              fontWeight: isSelected ? "bold" : "normal",
            }}
          >
            {letter}
          </Button>
        );
      })}
    </Box>
  );
}
