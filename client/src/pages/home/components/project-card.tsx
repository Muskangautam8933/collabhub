import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// -------------------- PROJECT CARD ---------------------
interface ProjectCardProps {
  ws: { _id: string; name: string; description: string };
}

export default function ProjectCard({ ws }: ProjectCardProps) {
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
    <div className="relative p-5 text-black border  rounded-lg p-1 hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleCardClick}>
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
      
    </div>
  );
}
