import { useQueryCall } from "@/hooks/useServer";
import { Loader, Main, Sidebar } from "@/components";
import { Grid } from "@mui/material";

function HomePage() {
  const { data: postList, isLoading: postsLoading } = useQueryCall(
    ["PostList"],
    {
      url: "/",
    }
  );
  const { data: categories, isLoading: categoryLoading } = useQueryCall(
    ["Categories"],
    {
      url: "/category",
    }
  );
  if (postsLoading || categoryLoading) return <Loader />;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2}>
        <Sidebar categories={categories} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Main postList={postList} />
      </Grid>
    </Grid>
  );
}

export { HomePage };
