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
import React, { type CSSProperties } from "react";
import TaskForm from "./task-form";
import type { Response } from "@/services/get-tasks";
import { darkenColor } from "@/utils/darkenColor";

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  color?: string;
  filterValueId?: string;
  items?: string | number;
};

export function Column({
  name = "Backlog",
  color,
  children,
  className,
  filterValueId,
  items = "0",
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
            {color && (
              <Badge
                variant="outline"
                className={cn("w-4 h-4 rounded-full")}
                style={coloredStyle}
              ></Badge>
            )}
            <span className="font-semibold text-xl">{name}</span>
            <Badge variant="outline">{items}</Badge>
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
        {filterValueId && (
          <TaskForm filterValueId={filterValueId}>
            <Button className="w-full">
              <Plus />
              <span>Add Item</span>
            </Button>
          </TaskForm>
        )}
      </CardContent>
    </Card>
  );
}

export type ConlumnItemProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  task?: Response;
};

export function ColumnItem({ title, task }: ConlumnItemProps) {
  return (
    <Card draggable>
      <CardContent>
        <div className="space-x-2">
          <ItemInfoSheet>
            <Button
              variant={"link"}
              className="font-semibold p-0 cursor-pointer"
            >
              {title || "Untitled"}
            </Button>
          </ItemInfoSheet>
          <Badge variant="outline">
            <MoreHorizontal />
          </Badge>
        </div>
        <p className="text-xs">Add Create Button </p>
        <div className="space-x-2">
          {task?.filters.map((f) => {
            const style: CSSProperties = {
              borderColor: darkenColor(f.color, 0.2),
              backgroundColor: `${f.color}10`,
              color: darkenColor(f.color, 0.8),
            };
            return (
              <Badge style={style} variant="outline">
                {f.valueName}
              </Badge>
            );
          })}
        </div>
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
