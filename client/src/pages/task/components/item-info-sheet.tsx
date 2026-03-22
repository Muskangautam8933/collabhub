import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { Pencil, Settings, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Response } from "@/services/get-tasks";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ItemInfoSheetProps = React.HTMLAttributes<HTMLDivElement> & {
  task?: Response;
};

export function ItemInfoSheet({ children, task }: ItemInfoSheetProps) {
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
        <SheetContent className="min-w-[80%]">
          <ScrollArea className="h-screen">
            <div>
              <SheetHeader className="p-6">
                <SheetTitle className="flex gap-4">
                  <span className="text-3xl">{task?.title}</span>

                  <Button variant={"outline"}>
                    <Pencil />
                  </Button>
                </SheetTitle>
              </SheetHeader>

              <Separator />

              <div className="flex">
                {/* Left */}
                <Card className="w-[70%] p-6 shadow-none border-none">
                  <Card className="p-0   block">
                    <CardHeader className="block p-4!">
                      <CardTitle>Sahil Verma</CardTitle>
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
                <Card className="w-[30%] block px-6 shadow-none border-none">
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
