// React imports
import React, { useState } from "react";
// Stylesheet
import "./Searchbar.css";
// Icons
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
// Bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Searchbar = ({ placeholder, data, handleAddItem }) => {
  const [filterData, setFilterData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [currentItem, setCurrentItem] = useState({})
  const [currentAmount, setCurrentAmount] = useState(1)

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const handleAutocomplete = (value) => {
    //setChosenItem(value)
    // console.log(value.name + "|" + value.typeId);
    setWordEntered(value.name);
    setCurrentItem({
      name: value.name,
      typeid: value.typeId,
    })
    setFilterData([]);
  };

  const clearInput = () => {
    setFilterData([]);
    setWordEntered("");
  };

  return (
    <Container fluid>
      <Row>
        <Col xs="12" md="7">
          <div className="search">
            <div className="searchInputs">
              <input
                placeholder={placeholder}
                value={wordEntered}
                type="text"
                onChange={handleFilter}
              />
              <div className="searchIcon">
                {filterData.length === 0 && wordEntered === "" ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon onClick={clearInput} id="clearBtn" />
                )}
              </div>
            </div>
            {filterData.length !== 0 && (
              <div className="dataResult">
                {filterData.slice(0, 15).map((value, key) => {
                  return (
                    <a
                      key={key}
                      className="dataItem"
                      href="!#"
                      name={value.name}
                      typeid={value.typeid}
                      onClick={() => handleAutocomplete(value)}
                    >
                      <p>{value.name}</p>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </Col>
        <Col xs="12" md="3">
          <div className="search">
            <div className="searchInputs">
              <input placeholder="Amount" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)}></input>
            </div>
          </div>
        </Col>
        <Col xs="12" md="2">
          <Button
            size="lg"
            variant="info"
            style={{ marginTop: "1em" }}
            onClick={() => handleAddItem(currentItem, currentAmount)}
          >
            Add Item
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Searchbar;
