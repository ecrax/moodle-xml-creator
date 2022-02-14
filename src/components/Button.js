import { TrashIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { DownloadIcon } from "@heroicons/react/solid";

export function FilledButton({ children, onClick, icon, className }) {
  return (
    <div className={className}>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClick}
      >
        {icon === "download" && (
          <DownloadIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
        )}
        {children}
      </button>
    </div>
  );
}
export function OutlineButton({ children, onClick, icon, className }) {
  return (
    <div className={className}>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm max-w-min hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClick}
      >
        {icon === "trash" && (
          <TrashIcon
            className="w-5 h-5 mr-2 -ml-1 text-red-400"
            aria-hidden="true"
          />
        )}
        {icon === "add" && (
          <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
        )}

        {children}
      </button>
    </div>
  );
}
