import { useEffect, useState } from "react";
import { InboxIcon, Plus } from "lucide-react";
import CreateWorkspaceForm from "./create-workspace";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Link, useParams } from "react-router";
import { ROUTES } from "@/_routes.constants";

export default function Workspaces() {
  const { projectId } = useParams();


  return (
    <section className="w-[70%] mx-auto">
      <div className="min-h-screen px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Workspaces</h2>
          <Button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
          >
            <Plus size={16} /> New Workspace
          </Button>
        </div>

        <div className="flex w-full flex-col gap-6">
          {/* <Link to={"/me/projects/69a3276fef8dabd1e64e4330"}> */}
          <Link
            to={`${ROUTES.PRIVATE.PROJECTS.ROOT}/${projectId || "69a3276fef8dabd1e64e4330"}`}
          >
            <Item variant="outline">
              <ItemMedia variant="icon">
                <Button>
                  <InboxIcon />
                </Button>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Project P1</ItemTitle>
                <ItemDescription>
                  The standard size for most use cases.
                </ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        </div>
      </div>

      {/* {showForm && (
        <CreateWorkspaceForm
          onClose={() => setShowForm(false)}
          onSubmit={createWorkspaces} // ✅ direct backend call
        />
      )} */}
    </section>
  );
}
