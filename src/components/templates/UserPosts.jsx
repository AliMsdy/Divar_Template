import { useQueryCall } from "@/hooks/useServer";
import { Box, Typography } from "@mui/material";
import { Loader, UserPostItem } from "..";

function UserPosts() {
  const { data: userPosts, isLoading } = useQueryCall(["UserPosts"], {
    url: "/post/my",
  });
  if (isLoading) return <Loader />;
  return (
    <Box>
      <Typography className="inline-block border-b-2 mt-4 border-0 border-solid border-primary p-4 font-bold">
        آگهی های شما
      </Typography>
      <Box className="space-y-4 mt-8">
        {userPosts.posts.map((post) => (
          <UserPostItem key={post._id} {...post} />
        ))}
      </Box>
    </Box>
  );
}

export { UserPosts };
