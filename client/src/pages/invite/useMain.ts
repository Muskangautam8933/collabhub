import { patchJoinInvite } from "@/services/patch-join-invite";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function useMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteCode = searchParams.get("code");

  /****************************************************
   * ****************** States ************************
   * *****************************************************/
  const [response, setResponse] = React.useState<null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (inviteCode) {
      console.log(jwtDecode(inviteCode));
    }
  }, [inviteCode]);

  const handleJoinProjectClick = async () => {
    try {
      if (inviteCode) {
        setLoading(true);

        const payload = jwtDecode(inviteCode);

        await patchJoinInvite(payload.project, inviteCode);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    response,
    inviteCode,
    handleJoinProjectClick,
  };
}
