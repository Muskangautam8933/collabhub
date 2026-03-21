import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Plus, Settings, Trash } from "lucide-react";
import React from "react";
import TaskForm from "./task-form";

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  color?: string;
  filterValueId: string;
};

export function Column({
  name = "Backlog",
  color = "red",
  children,
  className,
  filterValueId,
  ...props
}: ColumnProps) {
  const coloredStyle = {
    borderColor: color,
    backgroundColor: `${color}10`,
  };
  return (
    <Card className={cn("w-80 shrink-0", className)} {...props}>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Badge
              variant="outline"
              className={cn("w-4 h-4 rounded-full")}
              style={coloredStyle}
            ></Badge>
            <span className="font-semibold text-xl">{name}</span>
            <Badge variant="outline">1</Badge>
          </div>

          <Button variant="outline">
            <MoreHorizontal />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-120">
          <div className="space-y-2">{children}</div>
        </ScrollArea>

        <TaskForm filterValueId={filterValueId}>
          <Button className="w-full">
            <Plus />
            <span>Add Item</span>
          </Button>
        </TaskForm>
      </CardContent>
    </Card>
  );
}

export function ColumnItem() {
  return (
    <Card draggable>
      <CardContent>
        <div className="space-x-2">
          <ItemInfoSheet>
            <Button
              variant={"link"}
              className="font-semibold p-0 cursor-pointer"
            >
              Feat : live chat
            </Button>
          </ItemInfoSheet>
          <Badge variant="outline">
            <MoreHorizontal />
          </Badge>
        </div>
        <p className="text-xs">Add Create Button </p>
        <Badge variant="outline">Backlog</Badge>
        <Badge variant="outline">P0</Badge>
        <Badge variant="outline">Xl</Badge>
      </CardContent>
    </Card>
  );
}

export type ItemInfoSheetProps = React.HTMLAttributes<HTMLDivElement>;

export function ItemInfoSheet({ children }: ItemInfoSheetProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      console.log("sheet");
    }
  }, [open]);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className=" min-w-[90%]">
          <ScrollArea className="h-screen">
            <div>
              <SheetHeader>
                <SheetTitle className="flex gap-4">
                  <span className="text-3xl">Task 1</span>

                  <Button variant={"outline"}>
                    <Pencil />
                  </Button>
                </SheetTitle>
              </SheetHeader>

              <Separator />

              <div className="flex">
                <Card className="w-[80%]"></Card>
                <Card className="w-[20%]">
                  <Button className="flex justify-between">
                    <span>Assignee</span>
                    <Settings />
                  </Button>
                  <Card></Card>
                  <Separator className="h-2" />

                  <Button
                    variant={"destructive"}
                    className="flex justify-start"
                  >
                    <Trash />
                    <span>Delete</span>
                  </Button>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
