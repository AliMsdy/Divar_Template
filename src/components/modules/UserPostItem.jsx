import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
function UserPostItem({ images, options, createdAt, amount }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [imgSrc, setImgSrc] = useState(`${baseURL}/${images[0]}`);
  const handleError = (e) => {
    e.stopPropagation();
    setImgSrc("/image.jpg");
  };
  return (
    <Stack
      direction="row"
      className="items-center justify-between border-solid rounded-md border-2 border-gray-500 p-3 py-4 gap-x-4"
    >
      <Stack direction="row" className="items-center gap-6 grow">
        <Box className="max-w-32">
          <img
            onError={handleError}
            className="w-full rounded-md"
            src={imgSrc}
            alt="post-photo"
          />
        </Box>
        <Box className="space-y-2">
          <Typography variant="body1">{options?.title}</Typography>
          <Typography variant="body2">{options?.content}</Typography>
        </Box>
      </Stack>
      <Stack>
        <Typography className="text-center">
          {new Date(createdAt).toLocaleDateString("fa-IR")}
        </Typography>
        <Typography className="text-gray-600">
          {new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
          }).format(amount)}{" "}
        </Typography>
      </Stack>
    </Stack>
  );
}

UserPostItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    city: PropTypes.string,
  }),
  createdAt: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export { UserPostItem };
