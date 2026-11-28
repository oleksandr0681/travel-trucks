import { FaStar } from "react-icons/fa";

export default function Stars({
  value,
  max = 5,
}: {
  value: number;
  max?: number;
}) {
  return (
    <div
      aria-label={`Rating ${value} of ${max}`}
      style={{ display: "flex", gap: 4 }}
    >
      {Array.from({ length: max }, (_, i) => (
        <FaStar
          key={i}
          size={16}
          color={i < Math.round(value) ? "#FFC531" : "#DADDE1"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
