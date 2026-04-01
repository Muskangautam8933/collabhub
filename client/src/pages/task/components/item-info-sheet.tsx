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
import patchTask from "@/services/patch-task";

export type ItemInfoSheetProps = React.HTMLAttributes<HTMLDivElement> & {
  task?: Response;
};

export function ItemInfoSheet({ children, task }: ItemInfoSheetProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>(task?.title || "");
  const [description, setDescription] = React.useState<string>(
    task?.description || "",
  );
  const [isEditName, setIsEditName] = React.useState(false);
  const [isEditDescription, setIsEditDescription] = React.useState(false);

  const ctx = usePageContext();

  React.useEffect(() => {
    if (open && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [open, task]);

  if (!task) return null;

  const saveTitle = async (taskId: string, title: string) => {
    try {
      await patchTask(ctx.projectId as string, taskId, { title });

    } catch (error) {
      console.log(error);
    }
  };

  const saveDescription = async (taskId: string, description: string) => {
    try {
      await patchTask(ctx.projectId as string, taskId, { description });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="min-w-[80%]">
          <ScrollArea className="h-screen">
            <div>
              <SheetHeader className="p-6">
                <>
                  <SheetTitle className="flex gap-1 items-center pr-6">
                    {isEditName ? (
                      <Input
                        name="title"
                        defaultValue={task?.title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    ) : (
                      <span>{title}</span>
                    )}

                    {isEditName ? (
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setIsEditName(false);

                          if (title === task?.title) return;
                          saveTitle(task._id, title);
                        }}
                        type="submit"
                        className="text-white bg-green-500 border border-green-800 hover:bg-green-600 hover:text-white"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant={"ghost"}
                        type="button"
                        onClick={() => setIsEditName(true)}
                      >
                        <Pencil />
                      </Button>
                    )}
                  </SheetTitle>
                </>
              </SheetHeader>

              <Separator />

              <div className="flex">
                {/* Left */}
                <Card className="w-[70%] p-6 shadow-none border-none">
                  <Card className="p-2   block">
                    <CardHeader className="block p-2!">
                      <CardTitle>
                        Sahil Verma{" "}
                        <span className="text-gray-500">
                          created on{" "}
                          {new Date(task.createdAt || "").toLocaleDateString()}
                        </span>
                        <Button
                          variant={"ghost"}
                          onClick={() => setIsEditDescription(true)}
                        >
                          <Pencil />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-1">
                      {!isEditDescription ? (
                        <p className="p-4 text-gray-800 text-sm">
                          {description || "No description provided."}{" "}
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                          />

                          <div className="flex justify-end gap-1">
                            <Button
                              onClick={() => setIsEditDescription(false)}
                              type="submit"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant={"outline"}
                              onClick={() => {
                                setIsEditDescription(false);

                                if (description === task?.description) return;
                                saveDescription(task._id, description);
                              }}
                              className="text-white bg-green-500 border border-green-800 hover:bg-green-600 hover:text-white"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Label>Add a Comment</Label>
                    <Textarea placeholder="Write comment here..." />
                    <div className="flex justify-end">
                      <Button
                        variant={"outline"}
                        type="submit"
                        className="text-white bg-green-500 border border-green-800 hover:bg-green-600 hover:text-white"
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
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
