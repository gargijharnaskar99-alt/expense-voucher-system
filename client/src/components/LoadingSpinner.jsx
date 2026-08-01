export default function LoadingSpinner({
  text = "Loading..."
}) {
  return (
    <div className="flex flex-col justify-center items-center py-20">

      <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      <p className="mt-5 text-gray-600 text-lg">
        {text}
      </p>

    </div>
  );
}