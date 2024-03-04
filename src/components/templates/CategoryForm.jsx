import { useMutateCall } from "@/hooks/useServer";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(true);
  const {
    mutate: submitNewCategory,
    data,
    error: serverError,
    isPending,
  } = useMutateCall("submitNewCategory", {
    onSuccess: async () => {
      reset();
      queryClient.invalidateQueries(["Categories"]);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
    },
  });
  const onSubmit = (data) => {
    setOpen(true);
    submitNewCategory({
      method: "POST",
      url: "/category",
      data,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography className="inline-block border-b-2 mt-4 border-0 border-solid border-primary p-4 font-bold">
        دسته بندی جدید
      </Typography>
      {errors && (
        <Box className="mt-4">
          {Object.values(errors).map((error, i) => (
            <Alert key={i} severity="error">
              {error.message}
            </Alert>
          ))}
        </Box>
      )}

      {data?.status === 201 && open && (
        <Collapse in={open}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            دسته بندی با موفقیت ایجاد شد
          </Alert>
        </Collapse>
      )}
      {!!serverError && (
        <Alert severity="error">مشکلی پیش آمده است... دوباره امتحان کنید</Alert>
      )}
      <Stack className="min-w-72 w-1/3 my-4 space-y-6">
        <Stack>
          <InputLabel htmlFor="name" className="mb-2">
            اسم دسته بندی
          </InputLabel>
          <TextField
            error={!!errors["name"]}
            {...register("name", {
              required: "لطفا نام دسته بندی را وارد کنید",
            })}
          />
        </Stack>
        <Stack>
          <InputLabel htmlFor="slug" className="mb-2">
            اسلاگ
          </InputLabel>
          <TextField {...register("slug")} />
        </Stack>
        <Stack>
          <InputLabel htmlFor="icon" className="mb-2">
            آیکون
          </InputLabel>
          <TextField
            error={!!errors["icon"]}
            {...register("icon", {
              required: "لطفا آیکنی را انتخاب کنید",
            })}
          />
        </Stack>
      </Stack>
      <Button
        disabled={isPending || Object.keys(errors).length !== 0}
        type="submit"
        variant="contained"
      >
        {isPending ? "در حال ایجاد دسته بندی" : "ایجاد"}
      </Button>
    </form>
  );
}

export { CategoryForm };
