import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-full items-center justify-center bg-muted/40 p-6">
      <Card className="max-w-md w-full shadow-lg border">
        <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
          <div className="p-4 rounded-full bg-red-100 text-red-600">
            <ShieldAlert className="h-10 w-10" />
          </div>

          <h1 className="text-2xl font-semibold">Access Restricted</h1>

          <p className="text-muted-foreground text-sm">
            You don't have permission to view this page.
          </p>

          <p className="text-sm font-medium text-red-500">
            Only Owner or Admin are allowed to access this resource.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

Page.displayName = "AccessControlPage";
