import { useMutateCall } from "@/hooks/useServer";
import { setCookie } from "@/utils/cookie";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckOtpFrom({ mobile, setStep }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });
  const { mutate: sendOTPCode } = useMutateCall(["sendOTPCode"], {
    onError: () => {
      toast.error("ارسال کد با خطا مواجه شده... دوباره تلاش کنید");
    },
  });
  const { mutate: sendCodeToServer } = useMutateCall(["CheckOTP"], {
    onSuccess: async ({ data }) => {
      setCookie(data);
      navigate("/dashboard");
      await queryClient.refetchQueries(["Profile"]);
    },
    onError: () => {
      toast.error("کد وارد شده اشتباه است.... دوباره تلاش کنید");
    },
  });

  const onSubmit = (code) => {
    sendCodeToServer({
      method: "POST",
      url: "/auth/check-otp",
      data: { ...code, mobile },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        p={2}
        alignItems="center"
        border={"1px solid gray"}
        borderRadius={2}
        maxWidth={500}
        margin="auto"
        mt={10}
      >
        <Typography variant="h5" fontWeight={400}>
          تایید کد SMS شده
        </Typography>
        <Typography variant="body2">
          کد تایید برای شماره موبایل{" "}
          {`<< ${mobile
            .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728))
            .replace(/,/g, "")} >>`}{" "}
          وارد کنید
        </Typography>
        <Typography
          fontSize={18}
          fontWeight={300}
          textAlign={"left"}
          width={"100%"}
        >
          کد تایید را وارد کنید
        </Typography>
        <TextField
          error={errors.code ? true : false}
          helperText="صفحه کلید خود را انگلیسی کنید"
          label="کد پیامک شده را وارد کنید"
          {...register("code", {
            required: "لطفا کد تایید را وارد کنید",
            minLength: { value: 5, message: "کد باید 5 عدد باشد" },
            maxLength: { value: 5, message: "کد باید 5 عدد باشد" },
          })}
          fullWidth
        />
        {errors.code && (
          <Typography role="alert" color="red" my={2}>
            {errors.code.message}
          </Typography>
        )}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          width={"100%"}
          gap={2}
        >
          <Button variant="contained" type="submit">
            ورود
          </Button>
          <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={() => setStep(1)}>
              تغییر شماره موبایل
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                sendOTPCode({
                  url: "/auth/send-otp",
                  data: { mobile },
                });
              }}
            >
              ارسال دوباره کد
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
}

CheckOtpFrom.propTypes = {
  mobile: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
};

export { CheckOtpFrom };
