"use client"

import Link from "next/link"
import { cn } from "lib/utils" // Updated import path

const steps = [
  { name: "App Type", href: "/new-project/app-type" },
  { name: "Shopify Partner", href: "/new-project/shopify-partner" },
  { name: "Project Name", href: "/new-project/project-name" },
  { name: "GitHub", href: "/new-project/github-connect" },
]

export default function WizardHeader({ current }: { current: string }) {
  return (
    <nav className="w-full border-b py-4 mb-6 bg-white">
      <ul className="flex justify-center gap-6 text-sm font-medium">
        {steps.map((step) => (
          <li key={step.name}>
            <Link
              href={step.href}
              className={cn(
                "hover:underline transition-all",
                step.name === current ? "text-blue-600 font-semibold" : "text-gray-500"
              )}
            >
              {step.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}