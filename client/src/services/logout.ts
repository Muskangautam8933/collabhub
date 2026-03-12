import localSpace from "./local-space";

import * as auth from "./auth";

export default async function logout() {
  await auth.logout();

  localSpace.removeAccessToken();
  localSpace.removeExpiresAt();
  localSpace.removeUser();
}
