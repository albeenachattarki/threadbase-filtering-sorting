import PropTypes from "prop-types";

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      className="sort"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  );
}

SortDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
