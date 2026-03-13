import { Card } from "./ui/card";
import { UserListItem } from "./user-list-item";

export const RightSidebar = () => {
  return (
    <div data-slot="right-sidebar">
      <Card className="w-[18rem] h-full rounded-none bg-transparent border-none shadow-none flex flex-col gap-1">
        <h2 className="my-2">Online - 1</h2>
        <UserListItem user={{}} />
        <h2 className="my-2">Offline - 1</h2>
        <UserListItem user={{}} />
        <UserListItem user={{}} />
        <UserListItem user={{}} />
        <UserListItem user={{}} />
        <UserListItem user={{}} />
      </Card>
    </div>
  );
};
