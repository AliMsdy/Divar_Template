import { CategoryItem, Loader } from "@/components";
import { useQueryCall } from "@/hooks/useServer";
import { Box } from "@mui/material";

function CategoryList() {
  const { data: categories, isLoading } = useQueryCall(["Categories"], {
    url: "/category",
  });
  if (isLoading) return <Loader />;
  return (
    <Box className="space-y-4">
      {categories.map((category) => (
        <CategoryItem key={category._id} {...category} />
      ))}
    </Box>
  );
}

export { CategoryList };
