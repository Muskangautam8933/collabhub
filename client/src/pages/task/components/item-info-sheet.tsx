import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { type CSSProperties } from "react";
import { Pencil, Settings, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Response } from "@/services/get-tasks";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { usePageContext } from "../_context";
import { Badge } from "@/components/ui/badge";
import { darkenColor } from "@/utils/darkenColor";
import { Input } from "@/components/ui/input";

export type ItemInfoSheetProps = React.HTMLAttributes<HTMLDivElement> & {
  task?: Response;
};

export function ItemInfoSheet({ children, task }: ItemInfoSheetProps) {
  const [open, setOpen] = React.useState(false);

  const [isEditName, setIsEditName] = React.useState(false);

  const ctx = usePageContext();

  React.useEffect(() => {
    if (open) {
      console.log("sheet");
    }
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="min-w-[80%]">
          <ScrollArea className="h-screen">
            <div>
              <SheetHeader className="p-6">
                <SheetTitle className="flex gap-1 items-center pr-6">
                  {isEditName ? (
                    <Input defaultValue={task?.title} />
                  ) : (
                    <span>{task?.title}</span>
                  )}

                  {isEditName ? (
                    <Button
                      variant={"outline"}
                      onClick={() => setIsEditName(false)}
                      className="text-white bg-green-500 border border-green-800 hover:bg-green-600 hover:text-white"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      onClick={() => setIsEditName(true)}
                      className="bg-gray-200"
                    >
                      <Pencil />
                    </Button>
                  )}
                </SheetTitle>
              </SheetHeader>

              <Separator />

              <div className="flex">
                {/* Left */}
                <Card className="w-[70%] p-6 shadow-none border-none">
                  <Card className="p-0   block">
                    <CardHeader className="block p-4!">
                      <CardTitle>
                        Sahil Verma{" "}
                        <span className="text-gray-500">
                          created on Aug 30, 2023
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Textarea
                        disabled
                        className="border-none shadow-none  focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-4"
                        defaultValue={
                          task?.description || "No description provided."
                        }
                      />
                    </CardContent>
                  </Card>

                  <Label>Add a Comment</Label>
                  <Textarea placeholder="Write comment here..." />
                </Card>

                {/* Right */}
                <Card className="w-[30%] block px-6 shadow-none border-none space-y-2">
                  <div>
                    <Button className="flex justify-between w-full bg-transparent border border-transparent text-gray-900 hover:bg-gray-300 hover:border-gray-900 hover:border">
                      <span>Assignee</span>
                      <Settings />
                    </Button>
                    <Card className="shadow-none border-none p-3">
                      <span className="text-gray-700 text-sm">No assignee</span>
                    </Card>
                  </div>

                  <Separator className="bg-gray-600" />

                  {ctx.filters.map((f) => {
                    const filterValue = task?.filters.find(
                      (tf) => tf.filterId === f._id,
                    );

                    const style: CSSProperties = {
                      borderColor: darkenColor(filterValue?.color, 0.2),
                      backgroundColor: `${filterValue?.color}10`,
                      color: darkenColor(filterValue?.color, 0.8),
                    };
                    return (
                      <>
                        <div>
                          <Button className="flex justify-between w-full bg-transparent  border border-transparent text-gray-900 hover:bg-gray-200 hover:border-gray-400 hover:border">
                            <span>{f.name}</span>
                            <Settings />
                          </Button>
                          <Card className="shadow-none border-none p-3 flex">
                            {filterValue ? (
                              <Badge variant="outline" style={style}>
                                {filterValue?.valueName}
                              </Badge>
                            ) : (
                              <span className="text-gray-700 text-sm">
                                No {f.name}
                              </span>
                            )}
                          </Card>
                        </div>

                        <Separator className="bg-gray-600" />
                      </>
                    );
                  })}

                  <div>
                    <Button className="flex justify-start w-full bg-transparent border border-transparent text-red-500 hover:text-white hover:bg-red-600 hover:border-red-900 hover:border">
                      <Trash />
                      <span>Delete task</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
