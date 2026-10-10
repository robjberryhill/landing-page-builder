import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold tracking-tight">Authentic Coffee</h1>
      <p>Roasted on Tuesdays. Shipped the same day.</p>
      <a href="#" className={buttonVariants({ size: "lg" })}>
        Order beans
      </a>
    </div>
  );
}
