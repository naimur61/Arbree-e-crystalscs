import { ActionButton } from "@/components/common/button/action-button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 gap-10 items-center p-8">
      {/* Hero */}
      <div className="space-y-4 max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Dual Mode with{" "}
          <span className="text-success-primary">Figma Tokens</span>
        </h1>
        <p className="text-lg text-secondary">
          All colors switch automatically between light and dark mode using the{" "}
          <code className="py-0.5 px-1.5 text-sm rounded bg-tertiary text-secondary">
            Tailwind Alias
          </code>{" "}
          tokens from your Figma file.
        </p>
      </div>

      {/* Cards demo */}
      <ActionButton
        variant="gradient"
        tooltipContent="Click to copy"
        // icon={<Copy className="w-4 h-4" />}
        // lastIcon={<Check className="w-4 h-4" />}
        // loadingContent={<Loader2 className="w-4 h-4" />}
        buttonContent="Copy"
      />
    </div>
  );
}
