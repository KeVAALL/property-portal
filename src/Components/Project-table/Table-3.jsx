/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { allProject } from "../../Hooks/Project";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Table.css";

function Table({ columns, data, setCheckedRows, selectedRows, setTableData }) {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageLoad, setPageLoad] = React.useState(true);

  const handleEdit = (values) => {
    console.log(values);
    navigate("/dashboard/edit-project", { state: { values } });
  };

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,

    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      state: { rowSelection },
      // enableRowSelection: true,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    // Run this effect when the 'selectedFlatRows' dependency changes

    if (selectedFlatRows.length === 0) {
      // As there are no selected flat rows on the initial load, return and do nothing
      return;
    }

    // After the rows are selected, map the 'original' property of each selected flat row to a new array called 'rows'
    const rows = selectedFlatRows.map((row) => row.original);

    // Set the 'checkedRows' state variable to the 'rows' array
    setCheckedRows(rows);
  }, [selectedFlatRows]);

  // Render the UI for your table
  return (
    <Box sx={{ py: 2, px: 4, width: "100%" }}>
      <Grid
        container
        columnSpacing={4}
        sx={{ marginLeft: "0px !important", width: "100% !important" }}
      >
        <Breadcrumb PageName="Projects" padding />
        <Stack spacing={5}>
          {/* <div style={{ overflow: "auto", width: "100%", height: "300px" }}> */}
          <table className="table-all bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, k) => (
                <>
                  <tr key={k} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <>
                        <th key={k} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      </>
                    ))}
                    <th>Edit</th>
                  </tr>
                </>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <>
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <>
                            <td key={i} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          </>
                        );
                      })}
                      <td>
                        <EditIcon
                          onClick={() => {
                            handleEdit(row.original);
                            // console.log(row.original);
                          }}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {/* </div> */}
          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
          <Stack className="btn-box footer-gap">
            <Stack direction="row" gap={3}>
              <Button
                className="outlined-button pagination-button"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </Button>{" "}
              <Button
                className="outlined-button pagination-button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </Button>{" "}
              <Button
                className="outlined-button pagination-button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {">"}
              </Button>{" "}
              <Button
                className="outlined-button pagination-button"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </Button>{" "}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "#e8f8f5",
                    border: "2px solid #2cbfb9",
                    borderRadius: "5px",
                  }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                style={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: "#e8f8f5",
                  border: "2px solid #2cbfb9",
                  borderRadius: "5px",
                }}
              >
                {[3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </Stack>
            {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                "selectedFlatRows[].original": selectedFlatRows.map(
                  (d) => console.log(d)
                  // selectDataCells(d)
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}
          </Stack>
        </Stack>
      </Grid>
    </Box>
  );
}

function Table3({
  // data,
  setTableData,
  // setSelectedRows
}) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [propertyData, setPropertyData] = React.useState();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: allProject,
  });
  // const tableColumnData = useMemo(() => data[data], []);

  const setCheckedRows = (data) => {
    setSelectedRows(data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Project ID",
        accessor: "prjid",
      },

      {
        Header: "Project Name",
        accessor: "prj_name",
      },

      {
        Header: "Project Type",
        accessor: "prj_type",
      },
      {
        Header: "Project Category",
        accessor: "prj_category",
      },
      {
        Header: "Posted Date",
        accessor: "posted_dt",
        // cell: (info) =>
        //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
      },
      {
        Header: "Available",
        accessor: "availability",
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <Alert severity="info" sx={{ mt: 0 }}>
        Please wait..,
      </Alert>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Table
      columns={columns}
      data={data?.data}
      // Pass the 'setCheckedRows' function as a prop to the 'Table' component from Parent component "Datatable2" to update Selected Rows state
      setCheckedRows={setCheckedRows}
      setTableData={setTableData}
    />
  );
}

export default Table3;

// {
/* <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre>
      </Stack> */
// }
// {
//   Header: "Project Banner",
//   accessor: "prj_banner",
//   Cell: ({ row }) => {
//     // const data = row.original;

//     return (
//       <img
//         src="http://localhost:3002/Uploads/63/property-5.jpg"
//         style={{ width: "60px", height: "60px", borderRadius: 2 }}
//         alt="banner"
//       />
//     );
//   },
// },
// {
//   Header: "Project Area",
//   accessor: "prj_area",
// },
// {
//   Header: "Project RERA",
//   accessor: "prj_rera",
// },
// {
//   Header: "Price From",
//   accessor: "price_from",
//   // cell: (info) =>
//   //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
// },
// {
//   Header: "Price To",
//   accessor: "price_to",
//   // cell: (info) =>
//   //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
// },
// {
//   Header: "Project Config",
//   accessor: "prj_config",
//   // cell: (info) =>
//   //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
// },
// {
//   Header: "Project Congig",
//   accessor: "prj_description",
//   // cell: (info) =>
//   //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
// },
