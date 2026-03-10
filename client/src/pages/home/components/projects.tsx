import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import CreateProjectForm from "./create-project";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router";
import { createProject } from "@/services/create-project";
import {
  getProjects,
  updateProject,
  deleteProject,
} from "@/services/get-projects";

export default function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingProject, setDeletingProject] = useState<any>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const list = await getProjects();
      setProjects(list);
    } catch (err) {
      console.error('Failed to load projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deletingProject) return;
    await deleteProject(deletingProject._id);
    setProjects((prev) => prev.filter((p) => p._id !== deletingProject._id));
    setShowDeleteDialog(false);
    setDeletingProject(null);
    toast.success("Project deleted successfully!");
  };

  const handleSubmitEdit = async () => {
    if (!editingProject) return;
    const updated = await updateProject(editingProject._id, {
      name: editForm.name,
      description: editForm.description || null,
    });
    setProjects((prev) =>
      prev.map((p) => (p._id === editingProject._id ? updated : p)),
    );
    setShowEditForm(false);
    setEditingProject(null);
    toast.success("Project updated successfully!");
  };

  const handleCreateProject = async (project: {
    name: string;
    description: string | null;
    teamLimit: number;
  }) => {
    try {
      const created = await createProject(project);
      console.log('created project response', created);
      setShowForm(false);
      // reload list from server in case backend filters or adds fields
      await loadProjects();
      toast.success("Project created successfully!");
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error, e.g., show a toast
    }
  };

  return (
    <section className="w-full px-6 py-6">
      <div className="min-h-screen px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Projects</h2>
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
          >
            <Plus size={16} /> New Project
          </Button>
        </div>

        <div className="flex w-full flex-col gap-6">
          {loading && <span>Loading projects...</span>}
          {!loading && projects.length === 0 && <span>No projects yet.</span>}
          {!loading &&
            projects.map((proj) => (
              <ProjectCard
                key={proj._id}
                ws={proj}
                handleEdit={(id) => {
                  const project = projects.find(p => p._id === id);
                  setEditingProject(project);
                  setEditForm({ name: project.name, description: project.description || '' });
                  setShowEditForm(true);
                }}
                handleDelete={(id) => {
                  const proj = projects.find(p => p._id === id);
                  setDeletingProject(proj);
                  setShowDeleteDialog(true);
                }}
              />
            ))}
        </div>
      </div>

      {showForm && (
        <CreateProjectForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateProject}
        />
      )}

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{deletingProject?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
