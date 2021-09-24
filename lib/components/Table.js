import React, { useState, useMemo } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const useSortTable = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
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

  return { items: sortedItems, performSort, sortConfig };
};

export const Table = ({
  children,
  hasActions = false,
  hasCheckbox = false,
  ...rest
}) => {
  return (
    <table
      className={classnames("nui-table", {
        "nui-table--actions": hasActions,
        "nui-table--checkbox": hasCheckbox,
      })}
      {...rest}
    >
      {children}
    </table>
  );
};

Table.Head = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};

Table.Body = ({
  children,
  isLoading: { loading, rowCount = 50, columnCount = 5 },
  ...rest
}) => {
  return (
    <tbody {...rest}>
      {" "}
      {loading
        ? Array(rowCount)
            .fill()
            .map((_, index) => (
              <React.Fragment key={index}>
                <tr>
                  {Array(columnCount)
                    .fill()
                    .map((_, index) => (
                      <td className="text-center" key={index}>
                        <div
                          key={index}
                          className={classnames(["skeleton-loader"])}
                        >
                          NA
                        </div>
                      </td>
                    ))}
                </tr>
              </React.Fragment>
            ))
        : children}
    </tbody>
  );
};

Table.Foot = ({ children, ...rest }) => {
  return <tfoot {...rest}>{children}</tfoot>;
};

Table.TH = ({
  children = null,
  isAscending = false,
  isDescending = false,
  ...rest
}) => {
  return (
    <th
      className={classnames({
        "sort-ascending": isAscending,
        "sort-descending": isDescending,
      })}
      {...rest}
    >
      {children}
    </th>
  );
};

Table.TR = ({ children }) => {
  return <tr>{children}</tr>;
};

Table.TD = ({ className = null, center, children, ...rest }) => {
  return (
    <td
      className={classnames({ "text-center": center }, [className])}
      {...rest}
    >
      {children}
    </td>
  );
};

Table.Head.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Table.Body.protoTypes = {
  isLoading: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Table.TH.protoTypes = {
  isAscending: PropTypes.bool,
  isDescending: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Table.TR.protoTypes = {
  isLoading: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Table.TD.protoTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Table.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Table;
