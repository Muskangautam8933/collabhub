// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Plus } from "lucide-react";
import { Column, ColumnItem } from "./components/column";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ViewMenu } from "./components/view-menu";
import { usePageContext } from "./_context";

export default function Page() {
  const ctx = usePageContext();
  return (
    <>
      <Card className="p-2 border-0 shadow-none">
        <CardHeader className="flex gap-2 ">
          <ViewMenu />
          <Input />
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 w-max pb-2">
              <Column
                name={`No ${ctx.filterName}`}
                items={
                  ctx.tasks.filter((t) =>
                    t.filters.find((f) => f.filterId !== ctx.filterId),
                  ).length
                }
              >
                {ctx.tasks
                  .filter((t) =>
                    t.filters.every((f) => f.filterId !== ctx.filterId),
                  )
                  .map((task) => {
                    return <ColumnItem key={task._id} title={task.title} />;
                  })}
              </Column>
              {ctx.filterValues.map((filterValue) => {
                const filtered = ctx.tasks.filter((t) =>
                  t.filters.find((f) => f.valueId === filterValue._id),
                );
                return (
                  <Column
                    key={filterValue._id}
                    name={filterValue.name}
                    color={filterValue.color}
                    filterValueId={filterValue._id}
                    items={filtered.length}
                  >
                    {filtered.map((task) => {
                      return <ColumnItem key={task._id} title={task.title} />;
                    })}
                  </Column>
                );
              })}
              {/* <Button size="icon" className="w-10 h-10 p-0">
                <Plus />
              </Button> */}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
