import React from "react"
import { FaSearch } from "react-icons/fa"

function SearchBar({
    searchKey,
    setSearchKey
}) {

    return (

        <div className="position-relative">

            <input
                type="text"
                className="form-control"
                placeholder="Search product..."
                value={searchKey}
                onChange={(e) =>
                    setSearchKey(e.target.value)
                }
            />

            <FaSearch
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
            />

        </div>
    )
}

export default SearchBar