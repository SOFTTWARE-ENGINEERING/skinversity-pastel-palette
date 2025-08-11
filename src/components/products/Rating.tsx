import { Star } from "lucide-react";

type Props = { value: number };

const Rating = ({ value }: Props) => {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < rounded ? "text-primary" : "text-muted-foreground"} />
      ))}
    </div>
  );
};

export default Rating;
