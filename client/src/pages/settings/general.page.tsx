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
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGeneralPage } from "./useGeneralPage";

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
                  value={project?.name}
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
                  value={project?.description || ""}
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

        <Card className="border-red-500 bg-red-50 mb-50">
          <CardHeader>
            <CardTitle className="text-red-600 font-bold text-lg">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-black">
              Irreversible actions that affect your project
            </CardDescription>
          </CardHeader>

          <CardContent className="divide-y divide-red-500">
            {/* Close Project */}
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-semibold text-black">Close project</h3>
                <p className="text-sm text-gray-700">
                  Closing a project will disable its workflows & remove it from
                  the list of open projects.
                </p>
              </div>

              <Button
                variant="outline"
                className="border-red-500 text-black hover:bg-red-600 hover:text-white"
              >
                Close this project
              </Button>
            </div>

            {/* Delete Project */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-semibold text-black">Delete project</h3>
                <p className="text-sm text-gray-700">
                  Once you delete a project, there is no going back. Please be
                  certain.
                </p>
              </div>

              <Button
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete this project
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold">
                Are you absolutely sure?
              </AlertDialogTitle>

              <AlertDialogDescription className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-yellow-100 border border-yellow-300 rounded p-3 text-yellow-900">
                  ⚠️ Unexpected bad things will happen if you don&apos;t read
                  this!
                </div>

                <p>
                  This action cannot be undone. This will permanently delete the
                  project
                  <span className="font-semibold"> "{project?.name}"</span> and
                  remove all associated data.
                </p>

                <p>
                  Please type{" "}
                  <span className="font-semibold">{project?.name}</span> to
                  confirm.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Input
              placeholder={`Type "${project?.name}" to confirm`}
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <AlertDialogCancel
                disabled={deleting}
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                variant={"destructive"}
                disabled={confirmName !== project?.name || deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "I understand the consequences, delete this project"
                )}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ScrollArea>
  );
}
