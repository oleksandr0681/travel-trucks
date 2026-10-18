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
        <svg key={i} width="16" height="16" viewBox="0 0 24 24">
          <path
            d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
            fill={i < Math.round(value) ? "#FFC531" : "#DADDE1"}
          />
        </svg>
      ))}
    </div>
  );
}
