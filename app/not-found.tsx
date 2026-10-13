import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] text-display">
        Lost the
        <br />
        <span className="text-muted-foreground">brief?</span>
      </h1>
      <p className="mt-8 max-w-md text-[17px] leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the work.
      </p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
