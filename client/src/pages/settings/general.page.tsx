import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGeneralPage } from "./useGeneralPage";
import { DangerZone } from "./components/danger-zone";

export default function Page() {
  const {
    project,
    saving,
    deleting,
    confirmName,
    showDeleteDialog,
    setConfirmName,
    setShowDeleteDialog,
    handleSaving,
  } = useGeneralPage();

  return (
    <ScrollArea className=" h-screen">
      <div className="space-y-8 p-6 w-full flex flex-col  ">
        {/* Project Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>
              Manage your project details and general information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaving} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">
                  Project Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter project name"
                  defaultValue={project?.name}
                  disabled={saving}
                  className="text-base"
                />
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  defaultValue={project?.description || ""}
                  disabled={saving}
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-sm text-muted-foreground">
                  Provide a clear description of your project
                </p>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}

        <DangerZone
          setShowDeleteDialog={setShowDeleteDialog}
          deleting={deleting}
          showDeleteDialog={showDeleteDialog}
          projectName={project?.name || ""}
          setConfirmName={setConfirmName}
          confirmName={confirmName}
          role={project?.role || "owner"}
        />
      </div>
    </ScrollArea>
  );
}
