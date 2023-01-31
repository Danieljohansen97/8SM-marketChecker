// React imports
import React, { useState } from "react"
// Stylesheet
import "./Searchbar.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const Searchbar = ({ placeholder, data, handleAddItem }) => {
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [currentItem, setCurrentItem] = useState({})
  const [currentAmount, setCurrentAmount] = useState(1)

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearchInput(searchTerm)
    const filteredList = data
      .filter((item) => item.name.toLowerCase().includes(searchTerm))
      .sort((a, b) => {
        const aIndex = a.name.toLowerCase().indexOf(searchTerm)
        const bIndex = b.name.toLowerCase().indexOf(searchTerm)
        return aIndex - bIndex
      })
    setFilteredData(filteredList)
  }

  const handleAutocomplete = (item) => {
    setSearchInput(item.name)
    setCurrentItem(item)
    setFilteredData([])
  }

  const handleAmountChange = (event) => {
    setCurrentAmount(event.target.value)
  }

  function handleClickAddItem() {
    handleAddItem(currentItem, currentAmount)
    setSearchInput("")
    setCurrentAmount(1)
  }

  return (
    <Row>
      <Container fluid>
        <Row>
          <Col xs="12">
            <InputGroup>
              <Form.Control
                size="lg"
                placeholder={placeholder}
                value={searchInput}
                type="text"
                onChange={handleSearch}
              />
              <Form.Control
                size="lg"
                type="number"
                placeholder="Amount"
                value={currentAmount}
                onChange={handleAmountChange}
              />
              <Button size="lg" variant="info" onClick={handleClickAddItem}>
                Add item
              </Button>
            </InputGroup>

            {filteredData.length > 0 && searchInput !== "" && (
              <ListGroup className="dataResult">
                {filteredData.slice(0, 15).map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={() => handleAutocomplete(item)}
                    action
                  >
                    {item.name
                      .split(new RegExp(`(${searchInput})`, "gi"))
                      .map((part, i) => (
                        <span
                          key={i}
                          style={
                            part.toLowerCase() === searchInput.toLowerCase()
                              ? { fontWeight: "bold" }
                              : {}
                          }
                        >
                          {part}
                        </span>
                      ))}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </Row>
  )
}

export default Searchbar
