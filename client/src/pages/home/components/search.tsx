// -------------------- SEARCH ---------------------
import { useState } from "react";
import type { FormEvent } from "react";
import { searchProjects } from "@/services/get-projects";
import ProjectCard from "./project-card";
import { toast } from "react-toastify";

export default function SearchProjects() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await searchProjects(query);
      setResults(res);
    } catch (error) {
      console.error("Search failed", error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[70%] mx-auto py-6">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 w-fit mx-auto"
      >
        <input
          className="outline-none border-b border-gray-600 text-lg px-4 bg-transparent placeholder-gray-400"
          type="text"
          placeholder="Search your projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Searching...</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Search Results</h3>

          <div className="flex w-full flex-col gap-6">
            {results.map((proj) => (
              <ProjectCard 
                key={proj._id}
                ws={proj}
                // handleEdit={() => {}}
                // handleDelete={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <p className="text-center mt-4">No projects found</p>
      )}
    </section>
  );
}