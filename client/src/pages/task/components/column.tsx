import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  color?: string;
};

export function Column({
  name = "Backlog",
  color = "red",
  children,
  className,
  ...props
}: ColumnProps) {
  const coleredBorderAndBackground = cn(`border-${color}-500 bg-${color}-300`);
  return (
    <Card className={cn("w-80 shrink-0", className)} {...props}>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Badge
              variant="outline"
              className={cn("w-4 h-4 rounded-full", coleredBorderAndBackground)}
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
        <Button className="w-full">
          <Plus />
          <span>Add Item</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ColumnItem() {
  return (
    <Card>
      <CardContent>
        <div className="space-x-2">
          <span className="font-semibold">Add Create Button</span>
          <Badge variant="outline">
            <MoreHorizontal />
          </Badge>
        </div>
        <p>Add Create Button </p>
        <Badge variant="outline">Backlog</Badge>
        <Badge variant="outline">P0</Badge>
        <Badge variant="outline">Xl</Badge>
      </CardContent>
    </Card>
  );
}
