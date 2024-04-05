import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
import Login from "./pages/Login";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs/Jobs";
import Inicio from "./pages/Inicio";
import JobPage from "./pages/UserPage/UserPage";
import { Profile } from "./pages/Profile/Profile";
import RequireAuth from "./views/RequireAuth";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "",
        element: <RequireAuth />,
        children: [
          {
            path: "/inicio",
            element: <Inicio />,
            children: [
              {
                index: true,
                element: <Jobs />,
              },
              {
                path: "page/:id",
                element: <JobPage />,
              },
            ],
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
