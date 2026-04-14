"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import TypeFilter from "./filters/TypeFilter";
import CategoryFilter from "./filters/CategoryFilter";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — only visible on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 transition"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <span className="text-xl font-bold">Filters</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto h-full pb-20">
          <TypeFilter />
          <CategoryFilter />
          <div className="border-l-4 border-primary bg-gray-100 text-xs font-primary px-4 mt-4 py-2">
            Accessing the institutional catalouge required validated
            credentials. Some molecules may have regional complaince
            restrictions.
          </div>
        </div>
      </aside>
    </>
  );
}
