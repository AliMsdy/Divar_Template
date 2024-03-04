import { Box, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";

function Main({ postList: { posts } }) {
  return (
    <Grid container rowSpacing={5} columnSpacing={7}>
      {posts.map((post) => (
        <PostItem key={post._id} {...post} />
      ))}
    </Grid>
  );
}

function PostItem({ images, options, amount }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const imgRef = useRef();
  const handleError = (e) => {
    e.stopPropagation();
    imgRef.current.src = "/image.jpg";
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack
        direction="row"
        className="justify-between items-center gap-2 rounded-md border-solid border-2 p-4 py-0 min-h-44"
      >
        <Box className="flex flex-col min-h-32 w-1/2">
          <Typography>{options?.title}</Typography>
          <Box className="mt-auto">
            <Typography className="text-sm">
              {new Intl.NumberFormat("fa-IR", {
                style: "currency",
                currency: "IRR",
              }).format(amount)}
            </Typography>
            <Typography className="mt-0.5 text-sm">{options?.city}</Typography>
          </Box>
        </Box>
        <Box className="w-1/2">
          <img
            ref={imgRef}
            onError={handleError}
            className="w-full rounded-md"
            src={`${baseURL}/${images?.[0]}`}
            alt="post-cover"
          />
        </Box>
      </Stack>
    </Grid>
  );
}
Main.propTypes = {
  postList: PropTypes.shape({
    posts: PropTypes.arrayOf(PostItem),
  }),
};
PostItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    city: PropTypes.string,
  }),
  amount: PropTypes.number.isRequired,
};
export { Main };
