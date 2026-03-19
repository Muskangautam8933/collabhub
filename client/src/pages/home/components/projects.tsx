import { InboxIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Await, Link } from "react-router";
import { ROUTES } from "@/_routes.constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePageContext } from "../_context";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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

export default function Projects() {
  const { loaderData } = usePageContext();

  return (
    <ScrollArea className="w-[70%] mx-auto">
      <React.Suspense>
        <Await resolve={loaderData.projectsRes}>
          {(projectsRes) => {
            return (
              <>
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Your Projects</h2>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          type="button"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
                        >
                          <Plus size={16} /> New Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <h2 className="text-lg font-semibold">
                            Create a new project
                          </h2>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <Input placeholder="Project name" />
                          <Select defaultValue={"6"}>
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
                        <Button>
                          <Plus size={16} /> Create
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <ScrollArea className="flex w-full h-70 flex-col gap-6">
                    {projectsRes?.owned.length === 0 && (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-muted-foreground">
                          You have no projects
                        </span>
                      </div>
                    )}
                    {projectsRes?.owned.map((project) => {
                      return (
                        <Link
                          key={project._id}
                          to={`${ROUTES.PRIVATE.PROJECTS.ROOT}/${project._id || "69a3276fef8dabd1e64e4330"}`}
                        >
                          <Item variant="outline">
                            <ItemMedia variant="icon">
                              <Button>
                                <InboxIcon />
                              </Button>
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{project.name}</ItemTitle>
                              <ItemDescription>
                                {project.description || "No description"}
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </Link>
                      );
                    })}
                  </ScrollArea>
                </div>
                <div className="h-70 px-6 py-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Joined Projects</h2>
                    {/* <Button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
          >
            <Plus size={16} /> New Project
          </Button> */}
                  </div>

                  <ScrollArea className="flex w-full flex-col gap-6">
                    {projectsRes?.joined.length === 0 && (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-muted-foreground">
                          You have no joined projects
                        </span>
                      </div>
                    )}
                    {projectsRes?.joined.map((project) => {
                      return (
                        <Link
                          key={project._id}
                          to={`${ROUTES.PRIVATE.PROJECTS.ROOT}/${project._id || "69a3276fef8dabd1e64e4330"}`}
                        >
                          <Item variant="outline">
                            <ItemMedia variant="icon">
                              <Button>
                                <InboxIcon />
                              </Button>
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>
                                {project.name}
                                <Badge variant={"outline"}>
                                  {project.role}
                                </Badge>
                              </ItemTitle>
                              <ItemDescription>
                                {project.description || "No description"}
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </Link>
                      );
                    })}
                  </ScrollArea>
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </ScrollArea>
  );
}
