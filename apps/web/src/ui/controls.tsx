"use client";

import * as RSelect from "@radix-ui/react-select";
import * as RSlider from "@radix-ui/react-slider";
import { Check, ChevronDown } from "lucide-react";

export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

/** Accessible custom select: full keyboard support, typeahead, themed popover. */
export function Select<T extends string>({
  id,
  value,
  onChange,
  options,
  placeholder = "Choose…",
  size = "md",
  ariaLabel,
}: {
  id?: string;
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  placeholder?: string;
  size?: "sm" | "md";
  ariaLabel?: string;
}) {
  // Radix reserves "" for "no value"; map it to a sentinel and back.
  const EMPTY = "__empty__";
  const toR = (v: string) => (v === "" ? EMPTY : v);
  const fromR = (v: string) => (v === EMPTY ? "" : v) as T;

  return (
    <RSelect.Root value={toR(value)} onValueChange={(v) => onChange(fromR(v))}>
      <RSelect.Trigger
        id={id}
        aria-label={ariaLabel}
        className={`input group flex items-center justify-between gap-2 text-left data-[placeholder]:text-fg-3 ${
          size === "sm" ? "h-9 w-auto min-w-[11rem] text-sm" : ""
        }`}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon>
          <ChevronDown
            size={16}
            aria-hidden
            className="text-fg-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={6}
          className="z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[14px] border border-line bg-surface p-1 shadow-lg data-[state=open]:animate-[popIn_160ms_cubic-bezier(0.16,1,0.3,1)]"
        >
          <RSelect.Viewport>
            {options.map((o) => (
              <RSelect.Item
                key={o.value || EMPTY}
                value={toR(o.value)}
                className="relative flex cursor-pointer select-none items-center gap-3 rounded-[10px] py-2.5 pl-3 pr-9 text-sm outline-none transition-colors data-[highlighted]:bg-surface-2 data-[state=checked]:font-medium"
              >
                <div>
                  <RSelect.ItemText>{o.label}</RSelect.ItemText>
                  {o.hint && <p className="text-xs text-fg-3">{o.hint}</p>}
                </div>
                <RSelect.ItemIndicator className="absolute right-3 text-accent">
                  <Check size={15} aria-hidden />
                </RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}

/** Themed range slider with a large, easy-to-grab thumb. */
export function Slider({
  id,
  value,
  onChange,
  min,
  max,
  step = 1,
  ariaLabel,
  format = String,
}: {
  id?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  ariaLabel: string;
  format?: (v: number) => string;
}) {
  return (
    <RSlider.Root
      id={id}
      value={[value]}
      onValueChange={([v]) => v !== undefined && onChange(v)}
      min={min}
      max={max}
      step={step}
      className="relative flex h-6 w-full touch-none select-none items-center"
    >
      <RSlider.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-surface-2 ring-1 ring-inset ring-line">
        <RSlider.Range className="absolute h-full rounded-full bg-accent" />
      </RSlider.Track>
      <RSlider.Thumb
        aria-label={ariaLabel}
        aria-valuetext={format(value)}
        className="block size-5 cursor-grab rounded-full border-2 border-accent bg-surface shadow-md transition-transform duration-150 hover:scale-110 active:scale-95 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
      />
    </RSlider.Root>
  );
}
