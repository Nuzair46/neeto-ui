import React, { useState, useEffect } from "react";
import {
  Header,
  SubHeader,
  Container,
  Scrollable,
} from "../../../lib/components/layouts";
import { Button, PageLoader, Pagination, Table } from "../../../lib/components";

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
        <Table data={TABLE_DATA} headers={TABLE_HEADERS} loading={isLoading} />
      </Scrollable>
      <div className="flex flex-row items-center justify-end w-full mt-6 mb-8">
        <Pagination count={300} pageNo={1} pageSize={25} navigate={() => {}} />
      </div>
    </Container>
  );
};

export default Layouts;
