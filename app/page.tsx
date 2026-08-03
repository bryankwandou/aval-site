import { BuiltToWait } from "@/components/site/built-to-wait";
import { ExpiryDemo } from "@/components/site/expiry-demo";
import { Footer } from "@/components/site/footer";
import { Guardrails } from "@/components/site/guardrails";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { PluginStack } from "@/components/site/plugin-stack";
import { ShopFlow } from "@/components/site/shop-flow";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ShopFlow />
      <ExpiryDemo />
      <BuiltToWait />
      <PluginStack />
      <Guardrails />
      <Footer />
    </main>
  );
}
