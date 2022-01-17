import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useState } from "react";

export const SearchBox = (props) => {
  const { callback } = props;
  const [text, setText] = useState("");
  const [showClear, setShowClear] = useState(false);

  const handleClear = () => {
    setText("");
    callback && callback("");
    setShowClear(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!String(text).trim() && showClear) {
      handleClear();
      return;
    }
    if (!String(text).trim()) {
      return;
    }
    callback && callback(text);
    setShowClear(true);
  };

  return (
    <div className="d-flex flex-row gap-2">
      <Form id="searchForm" onSubmit={handleSearch}>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </InputGroup>
      </Form>
      <Button type="submit" formTarget="searchForm" onClick={handleSearch}>
        Search
      </Button>
      {showClear && (
        <Button variant="light" onClick={handleClear}>
          Clear
        </Button>
      )}
    </div>
  );
};
