import App from "./App";
import PrivateLayout from "./private.layout";
import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { PagesPage } from "./pages/page";
import { SignupPage } from "./pages/signup";
import { ProfilePage } from "./pages/profile";
import { CommunicationPage } from "./pages/communication";
import {
  AccessControlPage,
  FilterSettingPage,
  GeneralSettingPage,
  SettingsPage,
} from "./pages/settings";
import { DashboardPage } from "./pages/dashboard";
import { ROUTES } from "./_routes.constants";
import { InvitePage } from "./pages/invite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.PUBLIC.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.PUBLIC.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.PUBLIC.INVITE,
        element: <InvitePage />,
      },
      {
        path: ROUTES.PRIVATE.PROJECTS.ROOT,
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ":projectId",
            children: [
              {
                index: true,
                element: <Navigate to={ROUTES.PRIVATE.PROJECTS.DASHBOARD} />,
              },
              {
                path: ROUTES.PRIVATE.PROJECTS.DASHBOARD,
                element: <DashboardPage />,
              },
              {
                path: ROUTES.PRIVATE.PROJECTS.PROFILE,
                element: <ProfilePage />,
              },
              {
                path: ROUTES.PRIVATE.PROJECTS.COMMUNICATIONS,
                element: <CommunicationPage />,
                children: [
                  {
                    index: true,
                    element: <Navigate to=":id" replace />,
                  },
                  {
                    path: ":id",
                    element: <CommunicationPage />,
                  },
                ],
              },
              {
                path: ROUTES.PRIVATE.PROJECTS.PAGES,
                element: <PagesPage />,
                children: [
                  {
                    index: true,
                    element: <Navigate to=":client-id" replace />,
                  },
                  {
                    path: ":client-id",
                    element: <PagesPage />,
                  },
                ],
              },
              {
                path: ROUTES.PRIVATE.PROJECTS.SETTINGS.ROOT,
                element: <SettingsPage />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="general" replace />,
                  },
                  {
                    path: "general",
                    element: <GeneralSettingPage />,
                  },
                  {
                    path: "filters",
                    element: <FilterSettingPage />,
                  },
                  {
                    path: "access-control",
                    element: <AccessControlPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
