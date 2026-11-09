import MarketplaceTabs from "./MarketplaceTabs";

export default function MarketplaceHeader() {
  return (
    <section className="marketplace-header">
      <h1>
        Buy & Sell <span>Academic Essentials.</span>
      </h1>

      <MarketplaceTabs />
    </section>
  );
}
