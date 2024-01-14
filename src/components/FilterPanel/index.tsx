import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import toast from "react-hot-toast";

const FilterPanel: React.FC<FilterPanelProps> = ({
  brands,
  models,
  onFilterChange,
}) => {
  const [sortBy, setSortBy] = useState<string>("oldToNew");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    const newFilters = {
      sortBy: newSortBy,
      brands: selectedBrands,
      models: selectedModels,
    };
    onFilterChange(newFilters);
    let toastMessage = "";
    switch (newSortBy) {
      case "oldToNew":
        toastMessage = "Sorted from oldest to newest!";
        break;
      case "newToOld":
        toastMessage = "Sorted from newest to oldest!";
        break;
      case "priceHighToLow":
        toastMessage = "Sorted by price, high to low!";
        break;
      case "priceLowToHigh":
        toastMessage = "Sorted by price, low to high!";
        break;
      default:
        toastMessage = "Sorting updated!";
    }
  
    toast.success(toastMessage);
  };

  const handleBrandSelection = (
    event: React.ChangeEvent<{}>,
    value: string[]
  ) => {
    setSelectedBrands(value);
    onFilterChange({
      brands: value,
      models: selectedModels,
      sortBy: "",
    });
    if (value.length > 0) {
      toast.success(`Filtered by brands: ${value.join(", ")}`);
    } else {
      toast.success("Brand filter cleared!");
    }
  };

  const handleModelSelection = (
    event: React.ChangeEvent<{}>,
    value: string[]
  ) => {
    setSelectedModels(value);
    onFilterChange({
      brands: selectedBrands,
      models: value,
      sortBy: "",
    });
    if (value.length > 0) {
      toast.success(`Filtered by models: ${value.join(", ")}`);
    } else {
      toast.success("Model filter cleared!");
    }
  };
  return (
    <div className="p-4">
      <div className="mb-4">
        <Card variant="outlined">
          <CardContent className="rounded-lg">
            <FormControl component="fieldset">
              <FormLabel component="legend" className="text-primary">
                Sort By
              </FormLabel>
              <RadioGroup
                name="sort-by"
                value={sortBy}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="oldToNew"
                  control={<Radio />}
                  label="Old to new"
                />
                <FormControlLabel
                  value="newToOld"
                  control={<Radio />}
                  label="New to old"
                />
                <FormControlLabel
                  value="priceHighToLow"
                  control={<Radio />}
                  label="Price high to low"
                />
                <FormControlLabel
                  value="priceLowToHigh"
                  control={<Radio />}
                  label="Price low to high"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 w-full rounded-xl">
        <Card variant="outlined">
          <CardContent>
            <FormControl component="fieldset" fullWidth>
              <Autocomplete
                className="w-full"
                multiple
                options={brands}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Filter Brands"
                    placeholder="Brands"
                  />
                )}
                onChange={handleBrandSelection}
              />
            </FormControl>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <Card variant="outlined">
          <CardContent>
            <FormControl component="fieldset" fullWidth>
              <Divider className="mt-1" />
              <Autocomplete
                multiple
                options={models}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Filter Models"
                    placeholder="Models"
                  />
                )}
                onChange={handleModelSelection}
              />
            </FormControl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilterPanel;
