import { Divider, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Divider />
      <Typography textAlign={"center"} p={2} fontWeight={400}>
        &hearts; Developed with love by{" "}
        <span className="font-bold text-lg font-mono">Ali</span>{" "}
      </Typography>
    </footer>
  );
}

export { Footer };
