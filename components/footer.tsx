import { cn } from "@/lib/utils"
import { Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className={cn(
      "w-full border-t",
      "py-6 md:py-0",
      "bg-background flex justify-center"
    )}>
      <div className="w-[1200px] flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VQSN. All rights reserved.
          </p>
          <Link 
            href="/imprint"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Imprint
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a 
            href="mailto:lukas.nadenau@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            lukas.nadenau@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
} 