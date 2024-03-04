import { AddPostForm, UserPosts } from "@/components";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isUserLoggedIn = !!queryClient.getQueryData(["Profile"]);
  if (!isUserLoggedIn)
    navigate("/auth", {
      replace: true,
    });
  return (
    <>
      <AddPostForm />
      <UserPosts />
    </>
  );
}

export { Dashboard };
