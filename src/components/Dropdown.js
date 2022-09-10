import { useState, useEffect, useRef } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";

export const Dropdown = (props) => {
  const { options } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const ref = useRef();

  useEffect(() => {
    const offClick = (event) => {
      if (!ref.current.contains(event.target)) {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    window.addEventListener("click", offClick);
    return () => {
      window.removeEventListener("click", offClick);
    };
  });

  const handleClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchValue("");
  };

  const DropdownIcon = () => {
    return (
      <>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          opacity="50%"
          className={`dropdown${isOpen ? "-open" : ""}`}
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </>
    );
  };

  const isAnyOptionSelected = selectedOption !== null;

  const getValue = () => {
    if (isAnyOptionSelected) {
      return selectedOption.label;
    } else if (!selectedOption) {
      return "Select color";
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const getOptions = () => {
    if (searchValue !== "") {
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return options;
    }
  };

  const value = getValue();
  const filteredOptions = getOptions();

  return (
    <>
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        ref={ref}
        onClick={handleClick}
      >
        {isOpen ? (
          <input
            className="dropdown-input"
            autoFocus={true}
            onChange={handleSearch}
            placeholder={value}
          />
        ) : (
          <div>{value}</div>
        )}
        <div className="icons">
          {isAnyOptionSelected ? (
            <div className="icon">
              <FaTimes />{" "}
            </div>
          ) : null}
          <div className="icon">
            <FaChevronDown />
          </div>
        </div>
      </div>
      <>
        {isOpen ? (
          <ul className="dropdown-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isOptionSelected = isAnyOptionSelected
                  ? option.value === selectedOption.value
                  : false;

                return (
                  <li
                    className={`dropdown-item ${
                      isOptionSelected ? "selected" : ""
                    }`}
                    key={option.value}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </li>
                );
              })
            ) : (
              <li className="dropdown-item non-clickable">
                Sorry, no matching options.
              </li>
            )}
          </ul>
        ) : null}
      </>
    </>
  );
};
