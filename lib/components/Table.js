import React, { useState, useMemo } from "react";
import { MenuHorizontal } from "@bigbinary/neeto-icons";

import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const useSortTable = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const [isLoading, setIsLoading] = useState(false);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      setIsLoading(true);
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setIsLoading(false);
    }
    return sortableItems;
  }, [items, sortConfig]);

  const performSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, performSort, sortConfig, isLoading };
};

const Table = ({ headers, data }) => {
  const { items, performSort, sortConfig, isLoading } = useSortTable(data);
  const renderSortClassName = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table
      className={"v2-nui-table v2-nui-table--checkbox v2-nui-table--actions"}
    >
      <thead>
        <tr>
          <th></th>
          {headers.map(({ key, accessor }) => (
            <th
              key={accessor}
              onClick={() => performSort(accessor)}
              className={
                renderSortClassName(accessor) === "ascending"
                  ? "v2-sort-ascending"
                  : renderSortClassName(accessor) === "descending"
                    ? "v2-sort-descending"
                    : undefined
              }
            >
              {key}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          items.map((item) => (
            <>
              <tr key={item.id}>
                <td>
                  <Checkbox name="1" />
                </td>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
                <td>
                  <div className="flex flex-row items-center justify-end space-x-3">
                    <Dropdown
                      icon={MenuHorizontal}
                      buttonStyle="icon"
                      autoWidth
                    >
                      <li>Edit</li>
                      <li>Delete</li>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            </>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
