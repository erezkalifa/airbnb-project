import { FaSearch } from 'react-icons/fa'; // Assuming you're using react-icons for the search icon

export function MobileFilter() {
  return (
    <div className="MobileFilter">
      <div className="MobileFilter__content">
        <FaSearch className="MobileFilter__icon" />
        <span className="MobileFilter__text">Start your search</span>
      </div>
    </div>
  );
}
