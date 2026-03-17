import type { LoaderData } from "@/loaders/invite.loader";
import localSpace from "@/services/local-space";
import { patchJoinInvite } from "@/services/patch-join-invite";
import React from "react";
import { redirect, useLoaderData } from "react-router";
import { toast } from "react-toastify";

export default function useMain() {
  const { invite, inviteCode } = useLoaderData() as LoaderData;

  /****************************************************
   * ****************** States ************************
   * *****************************************************/
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleJoinProjectClick = async () => {
    try {
      if (inviteCode) {
        setLoading(true);

        await patchJoinInvite(invite.project, inviteCode);

        toast.success("Successfully joined project");

        localSpace.removeInviteToken();

        setLoading(false);

        return redirect(`/projects/${invite.project}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error as string);
      toast.error(error as string);
      localSpace.removeInviteToken();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    invite,
    handleJoinProjectClick,
  };
}
