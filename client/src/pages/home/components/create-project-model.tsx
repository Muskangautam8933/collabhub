import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePageContext } from "../_context";

export function CreateProjectModel() {
  const ctx = usePageContext();
  return (
    <Dialog open={ctx.isOpenModel} onOpenChange={ctx.setIsOpenModel}>
      <DialogTrigger className="bg-black text-white rounded-lg flex items-center p-2 gap-2">
        <Plus size={16} /> New Project
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={ctx.handleFormSubmit} className="space-y-4">
          <DialogTitle>
            <span className="text-lg font-semibold">Create a new project</span>
          </DialogTitle>
          <div className="flex gap-2">
            <Input
              name="name"
              placeholder="Project name"
              minLength={3}
              maxLength={30}
              required
            />
            <Select name="teamLimit" defaultValue={"6"}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Max Members</SelectLabel>
                  {[1, 2, 3, 4, 5, 6].map((role) => (
                    <SelectItem key={role} value={String(role)}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            <Plus size={16} /> Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
