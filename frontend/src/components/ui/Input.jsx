/**
 * Props:
 * placeholder - input placeholder
 * value - input value
 * onChange - change handler
 */

function Input({ placeholder, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full"
    />
  );
}

export default Input;