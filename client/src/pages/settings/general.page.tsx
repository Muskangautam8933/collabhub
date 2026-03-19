import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import getProject from "@/services/get-project";
import { ScrollArea } from "@/components/ui/scroll-area";
// import updateProject from "@/services/update-project";
// import deleteProject from "@/services/delete-project";

interface ProjectData {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmName, setConfirmName] = useState(""); //

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch project data on mount
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const data = (await getProject(projectId)) as ProjectData;
        setProjectData(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
        console.error("Error loading project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError(null);

      if (!projectId) throw new Error("Project ID is missing");

      const updatedData = await updateProject(projectId, {
        name: formData.name,
        description: formData.description,
      });

      setProjectData({
        ...updatedData.data,
        createdAt: projectData?.createdAt || "",
      });
      setSuccessMessage("Project updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update project";
      setError(errorMessage);
      console.error("Error updating project:", err);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete project
  const handleDeleteProject = async () => {
    try {
      setDeleting(true);
      setError(null);

      if (!projectId) throw new Error("Project ID is missing");

      await deleteProject(projectId);

      // Navigate to home page after successful deletion
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete project";
      setError(errorMessage);
      console.error("Error deleting project:", err);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  const projectName = projectData?.name ?? "";
  return (
    <ScrollArea className=" h-screen">
      <div className="space-y-8 p-6 w-full flex flex-col  ">
        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Project Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>
              Manage your project details and general information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">
                Project Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.description}
                onChange={handleInputChange}
                disabled={saving}
                rows={5}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-sm text-muted-foreground">
                Provide a clear description of your project
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSaveChanges}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
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

        <AlertDialog
          open={showDeleteDialog}
          onOpenChange={(open) => {
            setShowDeleteDialog(open);
            if (!open) setConfirmName("");
          }}
        >
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold">
                Are you absolutely sure?
              </AlertDialogTitle>

              <AlertDialogDescription className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-yellow-100 border border-yellow-300 rounded p-3 text-yellow-900">
                  ⚠️ Unexpected bad things will happen if you don’t read this!
                </div>

                <p>
                  This action cannot be undone. This will permanently delete the
                  project
                  <span className="font-semibold"> "{projectName}"</span> and
                  remove all associated data.
                </p>

                <p>
                  Please type{" "}
                  <span className="font-semibold">{projectName}</span> to
                  confirm.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Input
              placeholder={`Type "${projectName}" to confirm`}
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <AlertDialogCancel
                disabled={deleting}
                onClick={() => {
                  setShowDeleteDialog(false);
                  setConfirmName("");
                }}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDeleteProject}
                disabled={confirmName !== projectName || deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
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
