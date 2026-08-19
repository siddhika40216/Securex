"use client";

import { useState } from "react";

interface UploadCardProps {
  title: string;
  subtitle: string;
  accept: string;
}

export default function UploadCard({
  title,
  subtitle,
  accept,
}: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mt-2 mb-4">
        {subtitle}
      </p>

      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
          }
        }}
        className="w-full rounded-lg border border-dashed border-white/20 p-4"
      />

      {selectedFile && (
        <div className="mt-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3">
          <p className="text-green-400 text-sm">
            ✅ {selectedFile.name}
          </p>
        </div>
      )}

    </div>
  );
}