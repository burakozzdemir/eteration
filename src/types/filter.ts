interface FilterValues {
  brands: string[];
  models: string[];
  sortBy: string;
}

interface FilterPanelProps {
  brands: string[];
  models: string[];
  onFilterChange: (filters: FilterValues) => void;
}
