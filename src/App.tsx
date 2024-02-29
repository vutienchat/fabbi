import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import PreOrderFood from "./PreOrderFood";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", alignItems: "center", height: 1 }}>
        <PreOrderFood />
      </Box>
    </>
  );
}

export default App;
