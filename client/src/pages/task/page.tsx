import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Settings } from "lucide-react";
import { Column, ColumnItem } from "./components/column";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <>
      <Card className="p-2 border-0 shadow-none">
        <CardHeader className="flex gap-2 ">
          <Button>
            <Settings />
            <span>View</span>
          </Button>
          <Input />
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 w-max pb-2">
              <Column>
                <ColumnItem />
                <ColumnItem />
              </Column>
              <Column>
                <ColumnItem />
                <ColumnItem />
                <ColumnItem />
                <ColumnItem />
              </Column>
              <Column>
                <ColumnItem />
                <ColumnItem />
              </Column>
              <Column>
                <ColumnItem />
                <ColumnItem />
              </Column>

              <Button size="icon" className="w-10 h-10 p-0">
                <Plus />
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
