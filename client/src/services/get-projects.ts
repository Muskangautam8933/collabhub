export interface Project {
  _id: string;
  name: string;
  description: string | null;
  owner: string;
  teamLimit: number;
  createdAt: string;
  updatedAt: string;
}

import localSpace from "./local-space";

export const getProjects = async (ownerId?: string): Promise<Project[]> => {
  const query = ownerId ? `?owner=${ownerId}` : '';
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api/projects${query}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('getProjects error body', text);
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (err) {
    const text = await response.text();
    console.error('getProjects parse failure, body:', text);
    throw err;
  }
};

export const searchProjects = async (query: string): Promise<Project[]> => {
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api/projects/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('searchProjects error body', text);
    throw new Error(`Failed to search projects: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (err) {
    const text = await response.text();
    console.error('searchProjects parse failure, body:', text);
    throw err;
  }
};

export const getProjectById = async (id: string): Promise<Project> => {
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api/projects/${id}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};

export const updateProject = async (
  id: string,
  data: Partial<{ name: string; description: string | null; teamLimit: number }>,
) => {
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
};

export const deleteProject = async (id: string) => {
  const token = localSpace.getAccessToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};
