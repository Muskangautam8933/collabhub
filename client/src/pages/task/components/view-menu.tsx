import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Settings, SquareChevronDown } from "lucide-react";
export function ViewMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Settings />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {/* Fields */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Fileds</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Visible Fields</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Check />
                  <SquareChevronDown />
                  <span>Status</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Hidden Fields</DropdownMenuLabel>
                <DropdownMenuItem className="pl-8">
                  <SquareChevronDown />
                  <span>Size</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* Column By */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Column By</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Column By</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Check />
                  <SquareChevronDown />
                  <span>Size</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="pl-8">
                  <SquareChevronDown />
                  <span>Priority</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* Sort By */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sort By</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Check />
                  <SquareChevronDown />
                  <span>Size</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="pl-8">
                  <SquareChevronDown />
                  <span>Priority</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-center">
                  {" "}
                  No Sort{" "}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
