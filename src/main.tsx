import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {ThemeProvider} from "@/components/ui/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const helmetContext = {};

const queryClientOptions = {
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <ThemeProvider defaultTheme={"dark"}>
            <QueryClientProvider client={new QueryClient(queryClientOptions)}>
              <App />
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
