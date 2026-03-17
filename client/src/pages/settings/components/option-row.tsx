import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface StatusOption {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function OptionRow({
  option
}: {
  option: StatusOption;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50">

      <div className="text-muted-foreground cursor-grab">
        ⋮⋮
      </div>

      <span
        className="px-3 py-1 text-xs rounded-full text-white"
        style={{ backgroundColor: option.color }}
      >
        {option.name}
      </span>

      <span className="flex-1 text-sm text-muted-foreground">
        {option.description}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            ⋯
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}