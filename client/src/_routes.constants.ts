export const ROUTES = {
  PUBLIC: {
    ROOT: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    INVITE: "/invites",
  },
  PRIVATE: {
    PROJECTS: {
      ROOT: "/projects",
      DASHBOARD: "dashboard",
      COMMUNICATIONS: "communications",
      PAGES: "pages",
      PROFILE: "profile",
      TASKS: "tasks",
      SETTINGS: {
        ROOT: "settings",
        GENERAL: "general",
        FILTERS: "filters",
        ACCESS_CONTROL: "access-control",
      },
    },
  },
} as const;
