import { Button } from "@repo/ui/button";
import { slugify } from "@repo/utils";

export function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 font-sans">
      <h1 className="text-3xl font-bold text-brand-700">Web Vite</h1>
      <p className="text-brand-500">slug: {slugify("Hello Turborepo")}</p>
      <Button>Get started</Button>
    </main>
  );
}
