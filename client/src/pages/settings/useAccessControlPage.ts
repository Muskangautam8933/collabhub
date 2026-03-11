import type { User } from "@/services/auth";
import { getQueryUsers } from "@/services/get-queryUsers";
import React from "react";
import debounce from "lodash.debounce";
import { postInvite } from "@/services/post-invite";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import type { LoaderData } from "@/loaders/access-controler.loader";

export const PROJECT_ROLE_MAP = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ: "read",
  OTHERS: "others",
} as const;

export type PROJECT_ROLE =
  (typeof PROJECT_ROLE_MAP)[keyof typeof PROJECT_ROLE_MAP];

const shouldEndWith = (str: string, suffix: string) => {
  if (!str) return undefined;
  if (str.endsWith(suffix)) return str;
  return str + suffix;
};

export const useAccessControlPage = () => {
  const loaderData = useLoaderData<LoaderData>();

  /**********************************************************************
   ************************* STATES *************************************
   **********************************************************************/
  const [users, setUsers] = React.useState<User[]>([]);
  const [usersLoading, setUsersLoading] = React.useState(true);
  const [usersError, setUsersError] = React.useState<string | null>(null);

  const [query, setQuery] = React.useState<string>("");
  const [role, setRole] = React.useState<PROJECT_ROLE>(PROJECT_ROLE_MAP.READ);

  const [sendInviteLoading, setSendInviteLoading] = React.useState(true);
  const [sendInviteError, setSendInviteError] = React.useState<string | null>(
    null,
  );

  const { projectId } = useParams();

  /**********************************************************************
   ************************* SEARCH FUNCTION ****************************
   **********************************************************************/
  const fetchUsers = React.useCallback(async (search: string) => {
    try {
      setUsersLoading(true);
      setUsersError(null);

      const data = await getQueryUsers({ email: search });
      setUsers(data);
    } catch (error) {
      setUsersError(
        error instanceof Error ? error.message : "Failed to fetch users",
      );
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const debouncedSearch = React.useMemo(
    () => debounce(fetchUsers, 500),
    [fetchUsers],
  );

  /**********************************************************************
   ************************* EFFECT *************************************
   **********************************************************************/
  React.useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    debouncedSearch(query);

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  /**********************************************************************
   ************************* HANDLERS ***********************************
   **********************************************************************/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInviteClick = async () => {
    try {
      setSendInviteLoading(true);
      const email = shouldEndWith(query, "@gmail.com");

      if (!email || !projectId) return;

      setQuery(email ?? "");

      await postInvite(projectId, email, role);

      toast.success("User invited successfully");

      setSendInviteLoading(false);
    } catch (error) {
      setSendInviteLoading(false);
      setSendInviteError(
        error instanceof Error ? error.message : "Failed to invite user",
      );
      toast.error(
        error instanceof Error ? error.message : "Failed to invite user",
      );
    } finally {
      setSendInviteLoading(false);
    }
  };

  const handleRoleChange = (d: PROJECT_ROLE) => {
    setRole(d);
  };

  const onClickUser = (user: User) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery(user.email);
  };

  const handleNewUserInviteClick = () => {
    setQuery("");
  };

  return {
    users,
    usersLoading,
    usersError,
    query,
    role,
    loaderData,
    handleInputChange,
    handleInviteClick,
    handleRoleChange,
    onClickUser,
    handleNewUserInviteClick,
  };
};
