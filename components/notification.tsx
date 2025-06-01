import React from "react"

export function MessageNotification({ message, type = 'success', show }: { message: string, type?: 'success' | 'error', show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed left-1/2 top-20 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
      <div
        className={`rounded-lg shadow-lg px-4 py-3 text-center font-medium text-base transition-all duration-300
          ${type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : ''}
          ${type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
        `}
      >
        {message}
      </div>
    </div>
  );
} 