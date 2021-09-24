import React, { useState, useEffect } from "react";
import { MenuHorizontal } from "@bigbinary/neeto-icons";

import {
  Header,
  SubHeader,
  Container,
  Scrollable,
} from "../../../lib/components/layouts";
import {
  Button,
  Dropdown,
  Checkbox,
  Pagination,
  Table,
} from "../../../lib/components";
import { TABLE_DATA, TABLE_HEADERS } from "./constants";

const Layouts = () => {
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Header title="Layouts" actionBlock={<Button label="Primary Action" />} />
      <SubHeader
        searchProps={{
          value: searchString,
          onChange: (e) => setSearchString(e.target.value),
        }}
        deleteButtonProps={{
          count: 0,
          selectedIDs: [],
          onClick: () => {},
        }}
        disableButtonProps={{
          count: 0,
          selectedIDs: [],
          onClick: () => {},
        }}
      />
      <Scrollable className="w-full">
        <Table hasActions hasCheckbox>
          <Table.Head>
            <Table.TR>
              <Table.TH />
              {TABLE_HEADERS.map((header, idx) => (
                <Table.TH key={idx}>{header}</Table.TH>
              ))}
              <Table.TH />
            </Table.TR>
          </Table.Head>
          <Table.Body
            isLoading={{
              loading: isLoading,
              rowCount: 50,
              columnCount: 6,
            }}
          >
            {TABLE_DATA.map(({ name, email, phone_number, pass_year }, idx) => (
              <Table.TR key={idx}>
                <Table.TD>
                  <Checkbox name={idx} />
                </Table.TD>
                <Table.TD center>{name}</Table.TD>
                <Table.TD center>{email}</Table.TD>
                <Table.TD center>{phone_number}</Table.TD>
                <Table.TD center>{pass_year}</Table.TD>
                <Table.TD>
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
                </Table.TD>
              </Table.TR>
            ))}
          </Table.Body>
        </Table>
      </Scrollable>
      <div className="flex flex-row items-center justify-end w-full mt-6 mb-8">
        <Pagination count={300} pageNo={1} pageSize={25} navigate={() => {}} />
      </div>
    </Container>
  );
};

export default Layouts;
