import { cn } from "@/lib/utils";
import Board from "@/components/Board";
import CustomSidebar from "@/components/CustomSidebar";


export default async function Dashboard() {
 
  return (
    <div
      className={cn(
        "flex w-full font-mono flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <CustomSidebar />
      <Board  />
    </div>
  );
}
