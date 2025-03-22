import { Skeleton } from "@/components/ui/skeleton"

export function KanbanSkeleton() {
  // Array of columns with their titles and counts
  const columns = [
    { title: "Backlog", count: 0 },
    { title: "TODO", count: 2 },
    { title: "In progress", count: 3 },
    { title: "Complete", count: 0 },
  ]

  return (
    <div className="flex w-full gap-4 p-4 overflow-x-auto">
      {columns.map((column, index) => (
        <div key={index} className="flex-shrink-0 w-60 flex flex-col gap-4">
                   
          {/* Task cards - each column has two skeleton cards */}
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-10 rounded-md bg-zinc-500/50" />
            <Skeleton className="w-full h-10 rounded-md bg-zinc-500/50" />
          </div>

          {/* Add card button */}
          <div className="flex items-center gap-1 text-zinc-400 mt-2">
            <Skeleton className="w-20 h-2 rounded bg-zinc-500/50" />
          </div>
        </div>
      ))}
    </div>
  )
}

