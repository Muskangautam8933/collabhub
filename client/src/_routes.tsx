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
import { ErrorPage } from "./components/error.page";
import { loggingMiddleware } from "./middlewares/logging";
import { AuthGuard } from "./middlewares/auth.guard";
import { MemberGuard } from "./middlewares/members.guard";
import { authLoader } from "./loaders/auth.loader";
import getProjects from "./services/get-projects";
import getProject from "./services/get-project";

// Client-side timing middleware

const router = createBrowserRouter([
  {
    path: "/",
    middleware: [loggingMiddleware],
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.PUBLIC.LOGIN,
        loader: authLoader,
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
        // middleware: [AuthGuard],
        loader: async () => {
          const res = await getProjects();

          console.log("projects : ", res);
        },
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ":projectId",
            // middleware: [MemberGuard],
            loader: async ({ params }) => {
              const projectId = params.projectId;

              const res = await getProject(projectId);
              console.log("project : ", res);
            },
            children: [
              {
                index: true,
                element: <DashboardPage />,
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
                    element: <CommunicationPage />,
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
                    element: <GeneralSettingPage />,
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
                    loader: async ({ params }) => {
                      const projectId = params.projectId;

                      const res = new Promise((resolve) => {
                        setTimeout(() => {
                          resolve({ user: { name: "John Doe Testing...." } });
                        }, 5000);
                      });
                      return { user: res };
                    },
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
