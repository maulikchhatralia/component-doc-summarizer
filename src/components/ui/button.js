export function Button({ children, ...props }) {
    return (
      <button className="px-4 py-2 rounded bg-blue-600 text-white" {...props}>
        {children}
      </button>
    );
  }
  