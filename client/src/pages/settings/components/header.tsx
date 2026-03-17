import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-lg font-semibold">
        Settings
      </h1>

      <div className="flex items-center gap-3">
        <Button variant="outline">Insights</Button>
        <Button variant="outline">Workflows</Button>
      </div>
    </div>
  );
}