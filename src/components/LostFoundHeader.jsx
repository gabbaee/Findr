import LostFoundTabs from "./LostFoundTabs";

export default function LostFoundHeader() {
  return (
    <section className="lf-header">
      <h1>
        Lost something on campus? <span>We'll help you find it.</span>
      </h1>
      <LostFoundTabs />
    </section>
  );
}
