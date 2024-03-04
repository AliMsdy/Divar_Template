import { clearAllCookies } from "@/utils/clearCookies";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ModalComponent } from "..";
function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const userInfos = queryClient.getQueryData(["Profile"]);
  const isUserLoggedIn = !!userInfos;
  const logout = async () => {
    navigate("/", {
      replace: true,
    });
    toast.success("با موفقیت از حساب کاربری خود خارج شدید.");
    clearAllCookies();
    queryClient.removeQueries({ queryKey: ["Categories"] });
    queryClient.removeQueries({ queryKey: ["UserPosts"] });
    queryClient.resetQueries({ queryKey: ["Profile"] });
  };
  return (
    <>
      <header>
        <Box className="flex items-center gap-x-8 justify-between p-2 py-0 ">
          <Stack direction="row" className="gap-x-4">
            <Link to="/">
              <img
                style={{ minWidth: "60px" }}
                src="divar.svg"
                alt="divar_logo"
              />
            </Link>
            <Stack direction="row" gap={0.4} alignItems="center">
              <img src="location.svg" alt="" />
              <Typography color="grey">تهران</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" className="sm:gap-x-6">
            <Box className="relative flex">
              <Box className=" flex items-center gap-3 peer grow">
                <img src="profile.svg" alt="user_profile" />
                <Typography color="grey">دیوار من</Typography>
              </Box>
              <ul
                className="absolute top-full list-none opacity-0  peer-hover:opacity-100 transition-all duration-500 mt-2 min-w-44 left-1/2 -translate-x-1/2 hover:translate-y-1 hover:opacity-100
 translate-y-0 peer-hover:translate-y-2 bg-gray-400 rounded-lg border border-solid border-gray-600 p-3 space-y-2 invisible
peer-hover:visible hover:visible"
              >
                <Link to="/dashboard">
                  <li className=" hover:bg-slate-300 transition-all duration-200 p-2 rounded-md">
                    دیوار من
                  </li>
                </Link>
                {userInfos?.role === "ADMIN" && (
                  <Link to="/admin">
                    <li className=" hover:bg-slate-300 transition-all duration-200 p-2 rounded-md">
                      پنل ادمین
                    </li>
                  </Link>
                )}
                {isUserLoggedIn && (
                  <>
                    <Button
                      onClick={() => setOpen(true)}
                      className="text-black p-2 hover:bg-slate-300 transition-all duration-200 w-full flex justify-start  rounded-md"
                    >
                      <li>خروج از حساب کاربری</li>
                    </Button>
                    <ModalComponent
                      open={open}
                      setOpen={setOpen}
                      message="آیا مطمئن هستید که از حساب خود خارج شوید؟"
                      clickHandler={logout}
                    />
                  </>
                )}
              </ul>
            </Box>
            <Link to="/dashboard">
              <Button variant="contained">ثبت آگهی</Button>
            </Link>
          </Stack>
        </Box>
      </header>
      <Divider />
    </>
  );
}

export { Header };
