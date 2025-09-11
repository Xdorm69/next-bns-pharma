"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

type TableFilter = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  selectItems: { key: string; value: string }[];
};

type TableFilterProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  filters: TableFilter[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const TableFilters = ({
  search,
  setSearch,
  isAuthenticated,
  filters,
  setPage,
}: TableFilterProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <div>
      <div className="flex justify-between items-center my-10 flex-wrap gap-4">
        {/* SEARCH */}
        <Input
          placeholder="Search..."
          className="max-w-sm"
          type="text"
          disabled={!isAuthenticated}
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
        />

        {/* SELECT FILTERS */}
        <div className="flex gap-4 flex-wrap">
          {filters.map((filter) => (
            <Select
              key={filter.title}
              disabled={!isAuthenticated}
              value={filter.state}
              onValueChange={filter.setState}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{filter.title}</SelectLabel>
                  {filter.selectItems.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
