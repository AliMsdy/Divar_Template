import { Loader } from "@/components";
import { useQueryCall } from "@/hooks/useServer";
import { Layout } from "@/layout";
import { lazyLoad } from "@/utils/lazyLoad";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazyLoad("../pages/Dashboard", "Dashboard");
const AdminPage = lazyLoad("../pages/AdminPage", "AdminPage");
const AuthPage = lazyLoad("../pages/AuthPage", "AuthPage");
const PageNotFound = lazyLoad("../pages/PageNotFound", "PageNotFound");
const HomePage = lazyLoad("../pages/HomePage", "HomePage");
function Router() {
  const { data: userInfos, isLoading } = useQueryCall(["Profile"], {
    url: "/user/whoami",
  });
  const isUserLoggedIn = !!userInfos;
  if (isLoading) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="dashboard"
            element={
              isUserLoggedIn ? <Dashboard /> : <Navigate to="/auth" replace />
            }
          />
          <Route
            path="admin"
            element={
              userInfos?.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="/auth"
          element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
      </Routes>
    </Suspense>
  );
}

export { Router };
