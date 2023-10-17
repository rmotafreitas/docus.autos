import { useEffect, useMemo } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { hankoInstance } from "@/lib/hanko";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/navbar";

export function HistoryPage() {
  const hanko = useMemo(() => hankoInstance, []);
  const router = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await hanko.user.getCurrent();
        console.log(user);
      } catch (e) {
        router("/auth?expired=1");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex flex-col justify-center">
        <Accordion type="single" collapsible className="border-white border-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
