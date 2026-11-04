import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import { X, ArrowRight, ExternalLink } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

export function IndexDrawer({ isOpen, onClose, onSelectBook }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-neutral-900 border-l border-neutral-800 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-neutral-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase font-mono text-neutral-100">
                Library Directory
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                12 Notebook Entries // Surya M.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close directory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Book Index List */}
          <div className="py-4 space-y-1">
            {BOOKS_CATALOG.map((book, idx) => (
              <button
                key={book.id}
                type="button"
                onClick={() => {
                  onSelectBook(idx);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800/80 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: book.color }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-neutral-400 group-hover:text-neutral-200">
                        {book.index}
                      </span>
                      <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                        {book.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      {book.subtitle}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500 space-y-1">
          <div>LOC: {personalInfo.location}</div>
          <div>ROLE: {personalInfo.currentRole} @ {personalInfo.currentCompany}</div>
          <div className="text-neutral-600 pt-2">[PRESS ESC TO CLOSE]</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

