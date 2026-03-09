import { Card, CardContent } from "@/components/ui/card";
import { usePageContext } from "./_context";
import { Button } from "@/components/ui/button";

export default function Page() {
  const ctx = usePageContext();

  // Invite code not found
  if (!ctx.inviteCode) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Card className="max-w-md w-full shadow-lg border">
          <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
            <div className="p-4 size-40 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <h1 className="text-4xl font-extrabold">404</h1>
            </div>

            <h1 className="text-2xl font-semibold">Invite Code Not Found</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Button>Join the Project</Button>
    </div>
  );
}
