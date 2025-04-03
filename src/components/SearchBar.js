import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
};

export default SearchBar;