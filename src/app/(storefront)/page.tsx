import { getActiveProducts } from "@/lib/catalog";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { DailyEssentials } from "@/components/home/DailyEssentials";
import { FormulaSection } from "@/components/home/FormulaSection";
import { MoreThanHuman } from "@/components/home/MoreThanHuman";
import { TransformationsSection } from "@/components/home/TransformationsSection";
import { StoryMarquee } from "@/components/home/StoryMarquee";
import { ClosingCta } from "@/components/home/ClosingCta";

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <main>
      <HeroSection />
      <ProductsSection products={products} />
      <DailyEssentials />
      <FormulaSection />
      <MoreThanHuman />
      <TransformationsSection />
      <StoryMarquee />
      <ClosingCta />
    </main>
  );
}
