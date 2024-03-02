import { useMutateCall } from "@/hooks/useServer";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { ModalComponent } from "..";

function CategoryItem({ name, _id, slug, icon }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate: deleteCategory } = useMutateCall("deleteCategory", {
    onSuccess: async () => {
      queryClient.invalidateQueries(["Categories"]);
    },
  });

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        className="p-4 border-solid border-2 border-gray-500 rounded-md"
      >
        <Stack direction="row" gap={4} className="grow items-center">
          <img src={`${icon}.svg`} alt="category_icon" />
          <Typography>{name}</Typography>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography className="text-primary font-bold">
            Slug: {slug}
          </Typography>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => setOpen(true)}>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        clickHandler={() =>
          deleteCategory({
            method: "DELETE",
            url: `/category/${_id}`,
          })
        }
      />
    </>
  );
}
CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export { CategoryItem };
