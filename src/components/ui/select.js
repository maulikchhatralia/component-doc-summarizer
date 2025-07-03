export function Select({ value, onValueChange, children, className = "" }) {
    return (
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`w-full p-2 border rounded ${className}`}
      >
        {children}
      </select>
    );
  }
  
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  