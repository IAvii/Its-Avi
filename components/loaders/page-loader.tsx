import React from 'react'
export default function PageLoader() {
  return (
    // <main
    //   className="min-h-screen flex items-center justify-center bg-background text-foreground"
    //   role="status"
    //   aria-busy="true"
    //   aria-live="polite"
    // >
    //   <div className="flex flex-col items-center gap-4">
    //     {/* Spinner */}
    //     <div
    //       className="h-10 w-10 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin"
    //       aria-hidden="true"
    //     />
    //     <p className="text-sm opacity-80">Loading…</p>
    //   </div>
    // </main>
    <div className="h-screen flex items-center justify-center">
        <div className="space-y-2 ">
          <div className="h-5 w-5 rounded-full border-t-2 border-b-2 border-foreground animate-pulse transition-opacity duration-1000 opacity-0" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-5 w-5 rounded-full border-t-2 border-b-2 border-foreground animate-pulse transition-opacity duration-1000 opacity-0" style={{ animationDelay: "0.5s" }}></div>
          <div className="h-5 w-5 rounded-full border-t-2 border-b-2 border-foreground animate-pulse transition-opacity duration-1000 opacity-0" style={{ animationDelay: "0.8s" }}></div>
        </div>
        <p className="text-foreground opacity-0 animate-fadeIn transition-opacity duration-1000" style={{ animationDelay: "1.1s" }}> Fetching...</p>
    </div>
  )
}
