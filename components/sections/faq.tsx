import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { hasText } from "@/lib/text";
import { cn } from "@/lib/utils";

// The generated panel takes no class of its own, so its open and close animation is
// switched off for reduced motion from the wrapper.
const reducedMotion = "motion-reduce:**:data-[slot=accordion-content]:animate-none!";

const faqs = [
  {
    value: "roast",
    question: "When do you roast?",
    answer:
      "Tuesdays. Orders placed by Monday at noon go into that week's roast. Anything after that waits a week, which is still faster than the grocery store.",
  },
  {
    value: "grind",
    question: "Whole bean or ground?",
    answer:
      "Both. Whole bean stays fresh longer. If you do not own a grinder, choose ground and tell us how you brew. We will match it.",
  },
  {
    value: "fresh",
    question: "How long does coffee stay fresh?",
    answer:
      "Peak is days 4 to 21 after roast. The date is on the bag. After a month it is still coffee, just quieter.",
  },
  {
    value: "decaf",
    question: "Do you have decaf?",
    answer:
      "Yes, and it is not a punishment. Swiss Water process, same farms, roasted with the same care and slightly less sleep.",
  },
  {
    value: "cancel",
    question: "Can I pause or cancel?",
    answer: "Any time, from your account page. No phone call, no retention specialist, no guilt.",
  },
  {
    value: "ship",
    question: "Where do you ship?",
    answer:
      "Anywhere in the US for a flat four dollars, free on subscriptions. International is on the list, right after we fix the roof.",
  },
];

/**
 * The "FAQ" section: a centred heading and six questions in an accordion, one
 * open at a time, the first open on load. Rendered fifth in `app/page.tsx`,
 * after the pricing section. Its `id` is the target of the "FAQ" nav link
 * (`#faq` in `content/site.ts`), of the three pricing tier links and of "Read
 * the FAQ" in the closing band. The accordion is the generated one from
 * `components/ui/`, composed here with its text raised to the page's body
 * size through `className`; each question is a button inside an `h3`. Closed
 * answers stay in the page, hidden, so the browser's find-in-page reaches
 * them and opens the one it finds, and the open and close animation is off
 * for visitors who ask for reduced motion. An item with a blank question or
 * answer is left out. To add, remove or reword a question, edit the `faqs`
 * array at the top of this file and give a new item its own `value`.
 */
export default function Faq() {
  const answered = faqs.filter((faq) => hasText(faq.question) && hasText(faq.answer));

  return (
    <Section id="faq" tone="white">
      <SectionHeading
        align="center"
        title="Questions people actually ask."
        description="If yours is missing, email us. We answer in the order received, after coffee."
      />
      <div className={cn("mx-auto mt-12 max-w-3xl", reducedMotion)}>
        <Accordion defaultValue={["roast"]} hiddenUntilFound>
          {answered.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-base">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
