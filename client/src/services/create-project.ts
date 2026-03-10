import localSpace from "./local-space";

export const createProject = async (projectData: { name: string; description: string | null; teamLimit: number }) => {
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch('/api/projects', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
};