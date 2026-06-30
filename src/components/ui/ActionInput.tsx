/**
 * ActionInput — DS newsletter / login inline pattern.
 * Design System.dc.html §Form Inputs — Inline/Newsletter
 *
 * Renders a pill-shaped row: [input field] [circular arrow submit button]
 *
 * Light mode (dark=false, default):
 *   pill border: rgba(0,0,0,.15), bg white/70
 *   button: forest bg (#1c3a13), cream arrow icon
 *
 * Dark mode (dark=true, on-forest):
 *   pill border: rgba(243,240,232,.3), transparent bg
 *   input text/placeholder: cream
 *   button: lime bg (#62e104), ink arrow icon
 *
 * The [data-arrow] span inside the button gets the global translateX(5px) nudge
 * on hover from the rule in globals.css — no JS needed.
 */

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  ariaLabel?: string;
  dark?: boolean;
};

// Arrow SVG matching the DS spec (stroke-width 2.1 for lime button, 2 for forest)
function ArrowSvg({ strokeWidth = 2 }: { strokeWidth?: number }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function ActionInput({
  name,
  type = "text",
  placeholder,
  ariaLabel = "Submit",
  dark = false,
}: Props) {
  const pillBorder = dark
    ? "border border-[rgba(243,240,232,0.3)]"
    : "border border-[rgba(0,0,0,0.15)]";

  const inputClasses = dark
    ? "flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-cream placeholder:text-[rgba(252,252,247,0.5)]"
    : "flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-ink placeholder:text-soft";

  // Dark mode → lime button (ink text), light mode → forest button (cream text)
  const btnClasses = dark
    ? "flex-none w-[38px] h-[38px] rounded-full bg-lime text-ink border-0 cursor-pointer flex items-center justify-center"
    : "flex-none w-11 h-11 rounded-full bg-forest text-cream border-0 cursor-pointer flex items-center justify-center";

  return (
    <div
      className={`flex items-center gap-2.5 rounded-pill px-5 py-[5px] ${pillBorder}`}
    >
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
      />
      <button type="submit" aria-label={ariaLabel} className={btnClasses}>
        <span data-arrow className="flex">
          <ArrowSvg strokeWidth={dark ? 2.1 : 2} />
        </span>
      </button>
    </div>
  );
}
