"use client"

import React, { useState } from "react"
import { ListMusic } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu"

export function SiteHeader() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  )
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null)
  return (
    <div
      className={cn("fixed top-20 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <w3m-button />
      </Menu>
    </div>
  )
}
