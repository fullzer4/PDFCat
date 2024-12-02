import { main as originalMain } from "./1/script.ts";
import { mainOptimized } from "./1/optimized_script.ts";

Deno.bench("Versao Original", async () => {
  await originalMain()
})

Deno.bench("Versao Otimizada", async () => {
  await mainOptimized()
})