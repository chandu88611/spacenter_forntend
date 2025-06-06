import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaMountainCity } from "react-icons/fa6";

export default function CitiesDialog({
  open,
  setOpen,
  categories,
  setCityLocation,
  handleSearch
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCityClick = (cityName) => {
    console.log("Selected City:", cityName);
    setCityLocation(cityName);
    handleSearch()
    handleClose();
  };

  const defaultCategories = [
    { name: "Bengaluru" },
    { name: "Mumbai" },
    { name: "Delhi" },
    { name: "Chennai" },
    { name: "Kolkata" },
    { name: "Hyderabad" },
    { name: "Ahmedabad" },
    { name: "Pune" },
    { name: "Jaipur" },
    { name: "Lucknow" },
    { name: "Surat" },
    { name: "Kanpur" },
    { name: "Nagpur" },
    { name: "Visakhapatnam" },
    { name: "Indore" },
    { name: "Thane" },
  ];

  const citiesToDisplay =
    categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="cities-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="cities-dialog-title" sx={{ textAlign: "center" }}>
        🌆 Choose Your City
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {citiesToDisplay.map((city, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                onClick={() => handleCityClick(city.name)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                    backgroundColor: theme.palette.action.hover,
                  },
                  height: "100%",
                }}
              >
                <FaMountainCity size={36} color={theme.palette.primary.main} />
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, fontWeight: 500, textAlign: "center" }}
                >
                  {city.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", py: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
