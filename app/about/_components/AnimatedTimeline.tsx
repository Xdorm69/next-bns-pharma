export default function AnimatedTimelineItem({
  year,
  event,
  index,
}: {
  year: string;
  event: string;
  index: number;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl font-bold text-primary">{year}</span>
      <p className="text-gray-600">{event}</p>
    </div>
  );
}
