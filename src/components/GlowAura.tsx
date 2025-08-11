import { useEffect } from "react";

const GlowAura = () => {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100 + "%";
      const y = (e.clientY / window.innerHeight) * 100 + "%";
      document.documentElement.style.setProperty("--cursor-x", x);
      document.documentElement.style.setProperty("--cursor-y", y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div aria-hidden className="aura" />;
};

export default GlowAura;
