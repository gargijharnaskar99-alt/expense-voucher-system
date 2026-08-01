import { ReceiptX } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  subtitle = "There is nothing to display."
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <ReceiptX
        size={70}
        className="text-gray-400"
      />

      <h2 className="text-2xl font-bold mt-5">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}