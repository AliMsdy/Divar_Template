import { Outlet } from "react-router-dom";
import {Header,Footer} from "@/components"
function Layout() {
  return (
    <>
      <Header />
      <main className="my-4"><Outlet /></main>
      <Footer />
    </>
  );
}

export { Layout };
