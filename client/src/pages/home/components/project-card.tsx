import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// -------------------- PROJECT CARD ---------------------
interface ProjectCardProps {
  ws: { _id: string; name: string; description: string };
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export default function ProjectCard({ ws, handleDelete, handleEdit }: ProjectCardProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/projects/${ws._id}`);
  };

  return (
    <div className="relative  text-black border  rounded-lg p-1 hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleCardClick}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-medium  mb-2">{ws.name}</h2>
          <p className="text-sm text-gray-500">{ws.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="text-gray-400 hover:text-white p-1"
        >
          ⋮
        </button>
      </div>
      {showMenu && (
        <div ref={menuRef} className="absolute top-8 right-2 bg-black border border-gray-600 rounded shadow-lg z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(ws._id);
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-700 text-white"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(ws._id);
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-700 text-red-400"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
