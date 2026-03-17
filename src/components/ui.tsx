import Link from "next/link";
import { ReactNode } from "react";
import { FadeIn } from "./motion";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark px-6 py-3 shadow-soft",
    outline:
      "border border-slate-600 text-slate-50 hover:bg-slate-900/80 px-6 py-3",
    ghost: "text-slate-100 hover:bg-slate-900/60 px-4 py-2",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-200">
      {label && <span className="font-medium">{label}</span>}
      <input
        className={`h-11 rounded-xl border border-slate-700 bg-slate-900/40 px-3 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="container-max">
        <FadeIn className="mb-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              {subtitle}
            </p>
          )}
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-700/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-primary/80 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

