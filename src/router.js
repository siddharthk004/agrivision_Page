import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enable the new behavior
    },
  }
);

export default router;
