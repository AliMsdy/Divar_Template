import { useMutateCall } from "@/hooks/useServer";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function SendOtpForm({ setStep, setMobile, mobile }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: mobile === "" ? "" : mobile,
    },
  });
  const { mutate: sendPhoneNumberToServer } = useMutateCall(["sendOTPCode"], {
    onSuccess: () => {
      setStep(2);
    },
    onError: () => {
      toast.error("ارسال کد با خطا مواجه شده... دوباره تلاش کنید");
    },
  });

  const onSubmit = (mobile) => {
    sendPhoneNumberToServer({
      url: "/auth/send-otp",
      data: mobile,
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
          ورود به حساب کاربری
        </Typography>
        <Typography color={"gray"}>
          برای استفاده از امکانات دیوار ، لطفا شماره موبایل خود را وارد کنید. کد
          تایید به این شماره پیامک خواهد شد
        </Typography>
        <Typography
          fontSize={18}
          fontWeight={300}
          textAlign={"left"}
          width={"100%"}
        >
          شماره موبایل خود را وارد کنید
        </Typography>
        <TextField
          error={errors.mobile ? true : false}
          helperText="صفحه کلید خود را انگلیسی کنید"
          label="شماره موبایل خود را وارد کنید"
          {...register("mobile", {
            required: "لطفا شماره موبایل خود را وارد کنید",
            pattern: {
              value: /^(\+98|0)?9\d{9}$/,
              message:
                "لطفا شماره موبایل خود را به صورت صحیح (به صورت انگلیسی) وارد کنید **",
            },
          })}
          onChange={async (e) => {
            setValue("mobile", e.target.value);
            setMobile(e.target.value);
          }}
          type="tel"
          fullWidth
        />
        {errors.mobile && (
          <Typography role="alert" color="red" my={2}>
            {errors.mobile.message}
          </Typography>
        )}
        <Box display={"flex"} justifyContent={"flex-start"} width={"100%"}>
          <Button variant="contained" type="submit">
            ارسال کد تایید
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
SendOtpForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  setMobile: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
};

export { SendOtpForm };
