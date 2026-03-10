import { ResultList } from "@/components/result-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserListItem } from "@/components/user-list-item";
import { ShieldAlert } from "lucide-react";
import React from "react";
import { useAccessControlPage } from "./useAccessControlPage";
import { APP_NAME } from "@/app.constatns";
import { useLoaderData, Await } from "react-router-dom";

export const PROJECT_ROLE = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ: "read",
  OTHERS: "others",
} as const;

export default function Page() {
  const role: (typeof PROJECT_ROLE)[keyof typeof PROJECT_ROLE] =
    PROJECT_ROLE.OWNER;
  const { users, usersLoading, ...ctx } = useAccessControlPage();
  const { user } = useLoaderData();

  if (ctx.sendInviteError) {
    throw new Error(ctx.sendInviteError);
  }

  if (role !== PROJECT_ROLE.OWNER && role !== PROJECT_ROLE.ADMIN) {
    return (
      <div className="flex min-h-full items-center justify-center bg-muted/40 p-6">
        <Card className="max-w-md w-full shadow-lg border">
          <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
            <div className="p-4 rounded-full bg-red-100 text-red-600">
              <ShieldAlert className="h-10 w-10" />
            </div>

            <h1 className="text-2xl font-semibold">Access Restricted</h1>

            <p className="text-muted-foreground text-sm">
              You don't have permission to view this page.
            </p>

            <p className="text-sm font-medium text-red-500">
              Only Owner or Admin are allowed to access this resource.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4">
      <h3 className="text-2xl pt-4 font-semibold">Invite Members</h3>
      <React.Suspense fallback={<p>Loading user...</p>}>
        <Await resolve={user}>{ShowData}</Await>
      </React.Suspense>
      <React.Fragment>
        <div className="flex gap-2">
          <Input
            placeholder="Search by email"
            value={ctx.query}
            onChange={ctx.handleInputChange}
          />
          <Select onValueChange={ctx.handleRoleChange}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {Object.values(PROJECT_ROLE)
                  .filter(
                    (r) =>
                      r !== PROJECT_ROLE.OTHERS && r !== PROJECT_ROLE.OWNER,
                  )
                  .map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            className="bg-green-400 text-white border border-green-600 hover:bg-green-500 hover:text-whtie font-bold"
            onClick={ctx.handleInviteClick}
          >
            Invite
          </Button>
        </div>

        <ResultList show={ctx.query.length > 0}>
          <ResultList.Loading loading={usersLoading}>
            Loading...
          </ResultList.Loading>

          <ResultList.Empty
            show={!users.length && ctx.query.length > 0 && !usersLoading}
            className="flex flex-col items-center"
          >
            <Button
              onClick={ctx.handleNewUserInviteClick}
              variant={"link"}
              className=" text-green-400  font-bold"
            >
              Invite new "{ctx.query}@gmail.com" to {APP_NAME}
            </Button>
            <div>No users found</div>
          </ResultList.Empty>

          {users.map((user) => (
            <ResultList.Item key={user._id}>
              <UserListItem onClick={ctx.onClickUser(user)} user={user} />
            </ResultList.Item>
          ))}
        </ResultList>
      </React.Fragment>
      <h3 className="text-2xl pt-4 font-semibold">Project Members</h3>
      <Card></Card>
    </div>
  );
}

Page.displayName = "AccessControlPage";

const ShowData = (d) => {
  console.log(d);
  return <pre>{JSON.stringify(d)}</pre>;
};
