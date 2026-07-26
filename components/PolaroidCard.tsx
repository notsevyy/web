"use client";

import { useState } from "react";

type PolaroidCardProps = {
  name: string;
  role: string;
  className?: string;
};

function getPhotoPath(name: string): string {
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  return `/images/members/${normalized}.jpg`;
}

export default function PolaroidCard({ name, role, className }: PolaroidCardProps) {
  const [errored, setErrored] = useState(false);
  const photoPath = getPhotoPath(name);

  return (
    <div
      className={`bg-gray-100 rounded-lg shadow-md p-1.5 pb-6
        hover:scale-110 hover:z-10 hover:relative hover:shadow-xl
        transition-all duration-300 ease-out ${className || ""}`}
    >
      <div className="bg-black rounded overflow-hidden flex items-center justify-center mb-1 aspect-square">
        {!errored ? (
          <img
            src={photoPath}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : null}
        {errored ? (
          <span className="text-gray-400 font-mono text-[10px] leading-none px-1 text-center">
            Insert image
          </span>
        ) : null}
      </div>
      <p className="text-center font-mono text-gray-900 leading-tight px-1 text-xs">
        {name}
      </p>
      <p className="text-center font-mono text-gray-400 leading-tight px-1 text-[10px]">
        {role}
      </p>
    </div>
  );
}
