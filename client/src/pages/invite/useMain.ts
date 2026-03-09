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

  return {
    loading,
    error,
    response,
    inviteCode,
  };
}
