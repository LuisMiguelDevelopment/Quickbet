import { useState } from "react";

interface SearchIconProps {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width = size,
  height = size,
  ...props
}: SearchIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height}
      role="presentation"
      viewBox="0 0 24 24"
      width={width}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar text-center m-5">
      <div className="relative">
        <input
          aria-label="Buscar películas"
          placeholder="Keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="max-w-full sm:max-w-[15rem] h-12 border-b-2 border-white rounded-t-lg pl-4 pr-10 text-small"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <SearchIcon size={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
