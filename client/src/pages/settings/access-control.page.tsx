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
import { ShieldAlert } from "lucide-react";

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

  if ([PROJECT_ROLE.READ, PROJECT_ROLE.OTHERS].includes(role)) {
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
      <div className="flex gap-2">
        <Input placeholder="Search by email" />
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              {Object.values(PROJECT_ROLE)
                .filter(
                  (r) => r !== PROJECT_ROLE.OTHERS && r !== PROJECT_ROLE.OWNER,
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
        >
          Invite
        </Button>
      </div>
      <h3 className="text-2xl pt-4 font-semibold">Project Members</h3>
      <Card></Card>
    </div>
  );
}

Page.displayName = "AccessControlPage";
