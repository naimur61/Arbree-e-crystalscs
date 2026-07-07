import { Button } from "@/components/ui/button";

const AboutContainer = () => {
  return (
    <div>
      <h1>About</h1>

      <div className="flex flex-col flex-1 gap-8 items-center p-8">
        <h1>About</h1>
        <p>
          This page demonstrates the Figma Tailwind Alias system with light/dark
          dual mode.
        </p>
        <h2>Color system overview</h2>

        <Button className="bg-secondary">ballls</Button>
      </div>
    </div>
  );
};

export default AboutContainer;
