import type { User } from "@/services/auth";
import { getQueryUsers } from "@/services/get-queryUsers";
import React from "react";
import debounce from "lodash.debounce";

export const useAccessControlPage = () => {
  /**********************************************************************
   ************************* STATES *************************************
   **********************************************************************/
  const [users, setUsers] = React.useState<User[]>([]);
  const [usersLoading, setUsersLoading] = React.useState(true);
  const [usersError, setUsersError] = React.useState<string | null>(null);

  const [query, setQuery] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");

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

  const handleInviteClick = () => {
    setQuery("");
    console.log(role)
  };

  const handleRoleChange = (d: string) => {
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
    handleInputChange,
    handleInviteClick,
    handleRoleChange,
    onClickUser,
    handleNewUserInviteClick,
  };
};
