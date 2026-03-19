import { FolderX, InboxIcon } from "lucide-react";
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

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateProjectModel } from "./create-project-model";

export default function Projects() {
  const { loaderData , projects } = usePageContext();

  return (
    <ScrollArea className="w-[70%] mx-auto">
      <>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Projects</h2>
            <CreateProjectModel />
          </div>

          <ScrollArea className="w-full h-70 ">
            <div className="flex flex-col gap-2">
              {projects.length === 0 && (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FolderX />
                    </EmptyMedia>
                    <EmptyTitle>No Projects Yet</EmptyTitle>
                    <EmptyDescription>
                      You haven&apos;t created any projects yet. Get started by
                      creating your first project.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}

              {projects.map((project) => {
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
            </div>
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

          <React.Suspense>
            <Await resolve={loaderData.projectsRes}>
              {(projectsRes) => {
                return (
                  <ScrollArea className="flex w-full flex-col gap-6">
                    <div className="flex flex-col gap-2">
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
                    </div>
                  </ScrollArea>
                );
              }}
            </Await>
          </React.Suspense>
        </div>
      </>
    </ScrollArea>
  );
}
