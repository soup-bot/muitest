import React, { useState, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
const AutocompleteInput = ({
  options,
  selected,
  uniqueNumbers,
  setUniqueNumbers,
  setSelected,
  contacts,
}) => {
  const [numberInput, setNumberInput] = useState("");
  const handleKeyDown = (e) => {
    // Existing Enter key handling logic
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const enteredValue = e.target.value.trim();

      // Check if the entered value is a number
      if (!isNaN(enteredValue)) {
        if (
          !selected.some((item) => item.value === enteredValue) &&
          !uniqueNumbers.includes(enteredValue)
        ) {
          setSelected((prevSelected) => [
            ...prevSelected,
            { label: enteredValue, value: enteredValue },
          ]);
          setUniqueNumbers((prevUniqueNumbers) => [
            ...prevUniqueNumbers,
            enteredValue,
          ]);
        } else {
          // Clear the input field if the value is not unique
          e.stopPropagation();
          console.log("not a unique number");
          setNumberInput("");
        }
      } else {
        // Clear the input field if the entered value is not a number
        e.stopPropagation();
        console.log("not a number");
        setNumberInput("");
        e.target.value = "";
      }

      e.target.value = "";
    }
    // Backspace key handling
    if (e.key === "Backspace" && e.target.value === "") {
      if (selected.length > 0) {
        handleTagDelete(selected.length - 1);
      } else if (uniqueNumbers.length > 0) {
        // If no tags are selected, remove one instance of the last number in uniqueNumbers
        const lastNumber = uniqueNumbers[uniqueNumbers.length - 1];
        setUniqueNumbers((prevUniqueNumbers) => {
          const indexToRemove = prevUniqueNumbers.lastIndexOf(lastNumber);
          if (indexToRemove !== -1) {
            const updatedUniqueNumbers = [...prevUniqueNumbers];
            updatedUniqueNumbers.splice(indexToRemove, 1);
            return updatedUniqueNumbers;
          }
          return prevUniqueNumbers;
        });
      }
    }
  };

  const handleAddToSelected = (value) => {
    console.log("contact added");
    console.log(value);
    setNumberInput("");

    // Check if it's a contact from the file or added manually
    const contactToAdd =
      typeof value === "object" ? value : { label: value, value };

    setSelected((prevSelected) => {
      // Check if there is an individual contact with the same number
      const existingContactIndex = prevSelected.findIndex(
        (item) => !item.isGroup && item.value === contactToAdd.value
      );

      if (existingContactIndex !== -1) {
        // If an individual contact with the same number exists, remove it
        const updatedSelected = [...prevSelected];
        updatedSelected.splice(existingContactIndex, 1);
        return [...updatedSelected, contactToAdd];
      } else {
        // If no individual contact with the same number exists, add the contact
        return [...prevSelected, contactToAdd];
      }
    });

    setUniqueNumbers((prevUniqueNumbers) => [
      ...prevUniqueNumbers,
      contactToAdd.value,
    ]);
  };

  const handleAddGroupToSelected = (group) => {
    const groupContacts = contacts[group];
    const contactsToAdd = groupContacts.map((contact) => ({
      label: contact.name,
      value: contact.number,
    }));
    setNumberInput("");
    // Add the contacts of the selected group to the existing selected numbers
    setSelected((prevSelected) => [...prevSelected, ...contactsToAdd]);

    // Add the numbers of the selected group to the uniqueNumbers
    setUniqueNumbers((prevUniqueNumbers) => [
      ...prevUniqueNumbers,
      ...groupContacts.map((contact) => contact.number),
    ]);
  };

  const handleTagDelete = (index) => {
    console.log("Deleting tag at index:", index);

    setSelected((prevSelected) => {
      const deletedTag = prevSelected[index];
      console.log("Deleted tag:", deletedTag);

      // Remove numbers of deleted group from uniqueNumbers
      if (deletedTag.isGroup) {
        const groupContacts = contacts[deletedTag.value];
        const groupNumbers = groupContacts.map((contact) => contact.number);
        console.log("Removing group numbers from uniqueNumbers:", groupNumbers);
        setUniqueNumbers((prevUniqueNumbers) => {
          const newUniqueNumbers = [...prevUniqueNumbers];
          groupNumbers.forEach((groupNumber) => {
            const indexToRemove = newUniqueNumbers.indexOf(groupNumber);
            if (indexToRemove !== -1) {
              newUniqueNumbers.splice(indexToRemove, 1);
            }
          });
          return newUniqueNumbers;
        });
      } else {
        // Remove the individual number from uniqueNumbers
        const deletedNumber = deletedTag.value || deletedTag.label;
        console.log("Removing number from uniqueNumbers:", deletedNumber);

        // Check if the deleted number exists in other selected items
        const isNumberUsed = prevSelected.some(
          (item, i) =>
            i !== index &&
            (item.value === deletedNumber || item.label === deletedNumber)
        );

        if (!isNumberUsed || isManuallyAdded(deletedNumber)) {
          // If the number is not used in other selected items or is manually added, remove one instance
          setUniqueNumbers((prevUniqueNumbers) => {
            const indexToRemove = prevUniqueNumbers.indexOf(deletedNumber);
            if (indexToRemove !== -1) {
              const newUniqueNumbers = [...prevUniqueNumbers];
              newUniqueNumbers.splice(indexToRemove, 1);
              return newUniqueNumbers;
            }
            return prevUniqueNumbers;
          });
        }
      }

      // Filter out the deleted tag from the selected state
      const newSelected = prevSelected.filter((_, i) => i !== index);

      return newSelected;
    });
  };

  // Check if a number was manually added by the user
  const isManuallyAdded = (number) => {
    return !contacts[number];
  };

  return (
    <Autocomplete
      autoComplete
      className="dark:bg-slate-800 bg-slate-50 focus:border-none w-full"
      multiple
      filterSelectedOptions
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "gray",
            borderRadius: "5",
          },
        "& .MuiOutlinedInput-root": {
          padding: "2",
        },
      }}
      readOnly={selected.length >= 10}
      id="tags-filled"
      options={options}
      groupBy={(option) => (option.isGroup ? "Groups" : "Contacts")}
      renderGroup={(params) => (
        <div key={params.key} className="">
          <h5 className="font-medium text-lg px-3 shadow py-2 text-secondary ">
            {params.group}
          </h5>
          <div className="w-full h-1/2 "></div>
          {params.children}
        </div>
      )}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        return (
          <div {...props} className="flex justify-between">
            <button
              disabled={
                // Check if the individual contact with the same number is already selected
                selected.some((item) => item.value === option.value) ||
                // Check if the contact or group number is already in uniqueNumbers
                uniqueNumbers.includes(option.value) ||
                // Check if it's a group and any number within the group is already in uniqueNumbers
                (option.isGroup &&
                  contacts[option.value] &&
                  contacts[option.value].some((contact) =>
                    uniqueNumbers.includes(contact.number)
                  ))
              }
              type="button"
              className="flex justify-between w-full h-full  disabled:hover:bg-white/0  py-1 px-2 hover:bg-primary/30 focus:bg-primary disabled:opacity-20 "
              onClick={(event) => {
                if (option.isGroup) {
                  handleAddGroupToSelected(option.value);
                } else {
                  handleAddToSelected(option);
                }
              }}
            >
              {option.label}
            </button>
          </div>
        );
      }}
      defaultValue={[]}
      limitTags={4}
      freeSolo
      disableClearable
      onInputChange={(e) => setNumberInput(e.target.value)}
      inputValue={numberInput}
      value={selected}
      onChange={(e, value) => {
        const updatedSelected = value.map((item) => {
          if (typeof item === "object") {
            return item;
          } else if (contacts[item]) {
            return {
              label: item,
              isGroup: true,
              groupId: item,
            };
          } else {
            return {
              label: item,
              isGroup: false,
              groupId: item,
            };
          }
        });

        // Filter out null values
        setSelected(updatedSelected);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            icon={option.isGroup ? <FaUserGroup /> : <FaPhoneAlt />}
            key={index}
            label={option.label}
            size="medium"
            onDelete={() => handleTagDelete(index)}
            style={{
              marginRight: "8px",
              marginTop: "4px",
              marginBottom: "4px",
              paddingLeft: "5px",
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Add a number by pressing enter"
          sx={{ fontWeight: "bold" }}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
};

export default AutocompleteInput;
