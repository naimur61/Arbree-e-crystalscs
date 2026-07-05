import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 gap-8 p-8">
      {/* Footnote — color alias test */}
      <div className="p-4 text-xs text-center rounded-xl border border-primary bg-secondary text-tertiary">
        All colors auto-switch between light/dark mode using Figma&nbsp;
        <code className="px-1 rounded bg-tertiary text-secondary">
          Tailwind Alias
        </code>{" "}
        tokens.
      </div>
      <Button className="bg-secondary">
        ballls
      </Button>
    </div>
  );
}
