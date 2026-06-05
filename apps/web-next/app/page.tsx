import { Button } from "@repo/ui/button";
import { slugify } from "@repo/utils";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6">
      <h1 className="text-brand-700 text-3xl font-bold">Web Next</h1>
      <p className="text-brand-500">slug: {slugify("Hello Turborepo")}</p>
      <Button>Get started</Button>
    </main>
  );
}
