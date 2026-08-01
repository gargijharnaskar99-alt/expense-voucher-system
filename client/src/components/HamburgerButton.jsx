import { Menu } from "lucide-react";

export default function HamburgerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden bg-blue-600 text-white p-2 rounded-lg"
    >
      <Menu size={24} />
    </button>
  );
}