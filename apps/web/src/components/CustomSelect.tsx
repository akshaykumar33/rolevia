"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
  ariaLabel?: string;
  align?: "left" | "right" | "auto";
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  ariaLabel = "Select option",
  align = "auto",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedOption = options[selectedIndex >= 0 ? selectedIndex : 0];

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        soundEngine.playClick();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        soundEngine.playClick();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        soundEngine.playClick();
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length,
        );
        break;
      case "Home":
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          const chosen = options[highlightedIndex];
          soundEngine.playSelect();
          onChange(chosen.value);
          setIsOpen(false);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  const getAlignmentClass = () => {
    if (align === "right") return "right-0";
    if (align === "left") return "left-0";
    // Auto: default to right-aligned on small screens to prevent clipping, left on large if not specified
    return "right-0 sm:right-0";
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <span className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-1">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-primary flex items-center justify-between gap-2.5 hover:border-accent hover:shadow-md transition-all min-w-[170px] max-w-full group"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption.icon}
          <span className="truncate">{selectedOption.label}</span>
          {selectedOption.badge && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-accent/15 text-accent font-bold">
              {selectedOption.badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted transition-transform duration-200 shrink-0 group-hover:text-accent ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`opt-${highlightedIndex}`}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className={`absolute ${getAlignmentClass()} mt-2 w-72 max-w-[90vw] rounded-2xl bg-surface glass-panel p-1.5 shadow-2xl z-50 border border-border-strong`}
          >
            <div className="space-y-1 max-h-64 overflow-y-auto overscroll-contain">
              {options.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <button
                    key={opt.value}
                    id={`opt-${idx}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      soundEngine.playSelect();
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between group ${
                      isSelected
                        ? "bg-accent/15 text-primary font-bold border border-accent/40"
                        : isHighlighted
                          ? "bg-surface-raised text-primary"
                          : "text-muted hover:text-primary hover:bg-surface-raised border border-transparent"
                    }`}
                  >
                    <div className="space-y-0.5 pr-2 truncate">
                      <div className="flex items-center gap-2">
                        {opt.icon}
                        <span className="truncate">{opt.label}</span>
                        {opt.badge && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-surface border border-border-subtle text-accent font-bold">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      {opt.sublabel && (
                        <p className="text-[10px] font-mono text-muted truncate">
                          {opt.sublabel}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
