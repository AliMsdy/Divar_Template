import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContext } from "./context/MUITheme.jsx";
import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: 0,
      retryDelay: 3000,
      gcTime: 30 * 60 * 1000, // half an hour caches the data (default : 5min)
      staleTime: 60 * 60 * 1000, // this option won't refetch teh data until the 60 mins(default: 0 second)
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeContext>
      <App />
    </ThemeContext>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
