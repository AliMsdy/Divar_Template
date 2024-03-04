import { useMutateCall, useQueryCall } from "@/hooks/useServer";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
function AddPostForm() {
  const queryClient = useQueryClient();
  const { data: categories = [] } = useQueryCall(["Categories"], {
    url: "/category",
  });
  const [open, setOpen] = useState(true);
  const {
    mutate: createPost,
    data,
    error: serverError,
    isPending,
  } = useMutateCall("createPost", {
    onSuccess: async () => {
      reset();
      toast.success("آگهی با موفقیت افزوده شد");
      queryClient.invalidateQueries(["UserPosts"]);
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است...");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      amount: null,
      city: "",
      category: "",
      images: null,
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      key === "images"
        ? formData.append(key, data[key][0])
        : formData.append(key, data[key]);
    }
    setOpen(true);
    createPost({
      url: "/post/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography className="inline-block border-b-2 mt-4 border-0 border-solid border-primary p-4 font-bold">
        افزودن آگهی
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

      {data?.status === 200 && open && (
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
            آگهی با موفقیت ایجاد شد
          </Alert>
        </Collapse>
      )}
      {!!serverError && (
        <Alert severity="error">مشکلی پیش آمده است... دوباره امتحان کنید</Alert>
      )}
      <Stack className="min-w-72 w-1/3 my-4 space-y-6">
        <Stack>
          <InputLabel htmlFor="title" className="mb-2 cursor-pointer">
            عنوان
          </InputLabel>
          <TextField
            id="title"
            error={!!errors["title"]}
            {...register("title", {
              required: "لطفا عنوان آگهی را وارد کنید",
            })}
          />
        </Stack>
        <Stack>
          <InputLabel htmlFor="content" className="mb-2 cursor-pointer">
            توضیحات
          </InputLabel>
          <TextField
            error={!!errors["content"]}
            id="content"
            {...register("content", {
              required: "لطفا توضیحی درباره آگهی بنویسید",
            })}
            multiline
            rows={4}
          />
        </Stack>
        <Stack>
          <InputLabel htmlFor="amount" className="mb-2 cursor-pointer">
            مبلغ (ریال)
          </InputLabel>
          <TextField
            id="amount"
            type="number"
            helperText="فقط عدد وارد کنید"
            error={!!errors["amount"]}
            {...register("amount", {
              required: "لطفا  مبلغ را وارد کنید",
            })}
          />
        </Stack>
        <Stack>
          <InputLabel htmlFor="city" className="mb-2 cursor-pointer">
            شهر
          </InputLabel>
          <TextField
            id="city"
            error={!!errors["city"]}
            {...register("city", {
              required: "لطفا  شهر را وارد کنید",
            })}
          />
        </Stack>
        <Stack>
          <InputLabel
            id="category"
            htmlFor="category"
            className="mb-2 cursor-pointer"
          >
            دسته بندی
          </InputLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "انتخاب دسته بندی الزامی است" }}
            render={({ field }) => (
              <Select
                labelId="category"
                id="category"
                label="دسته بندی"
                error={!!errors["category"]}
                {...field}
              >
                {categories.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Stack>
        <Stack>
          <InputLabel htmlFor="images" className="mb-2 cursor-pointer">
            عکس
          </InputLabel>
          <TextField
            id="images"
            error={!!errors["images"]}
            {...register("images", {
              required: "لطفا عکسی را انتخاب کنید",
            })}
            type="file"
          />
        </Stack>
      </Stack>
      <Button
        disabled={isPending || Object.keys(errors).length !== 0}
        type="submit"
        variant="contained"
      >
        {isPending ? "در حال ایجاد آگهی" : "افزودن آگهی"}
      </Button>
    </form>
  );
}

export { AddPostForm };
