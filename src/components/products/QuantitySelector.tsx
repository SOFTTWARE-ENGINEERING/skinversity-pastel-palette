import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }: Props) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="inline-flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={dec} aria-label="Decrease quantity"><Minus /></Button>
      <span className="w-8 text-center" aria-live="polite">{value}</span>
      <Button variant="outline" size="icon" onClick={inc} aria-label="Increase quantity"><Plus /></Button>
    </div>
  );
};

export default QuantitySelector;
