// React imports
import { useState } from "react"
// Stylesheets
import "./App.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
// Component imports
import PageHeader from "./components/PageHeader/PageHeader"
import Searchbar from "./components/Searchbar/Searchbar"
import ShoppingList from "./components/ShoppingList"
import FetchedItems from "./components/FetchedItems"
// resources
import itemsData from "./resources/itemsArray.json"

function App() {
  const [shoppingList, setShoppingList] = useState([])
  const [fetchedItems, setFetchedItems] = useState([])
  const [tradehub, setTradehub] = useState("&usesystem=30000142")

  const changeTradehub = (station) => {
    // Simply add switch-cases with other tradehubs to add them, and remember to update the select-form input options too.
    switch (station) {
      case "Jita":
        setTradehub("&usesystem=30000142") // Jita
        break
      case "Amarr":
        setTradehub("&usesystem=30002187") // Amarr
        break
      case "Rens":
        setTradehub("&usesystem=30002510") // Rens
        break
      case "Dodixie":
        setTradehub("&usesystem=30002659") // Dodixie
        break
      default: // Jita
        setTradehub("&usesystem=30000142") // Default is Jita
        break
    }
  }

  const handleAddItem = (currentItem, amount) => {
    let currentItemWithAmount = currentItem
    currentItemWithAmount.amount = amount
    setShoppingList([currentItem, ...shoppingList])
  }

  // Not working yet is supposed to fetch marketData based on item.typeid
  // Second parameter can be Jita or Amarr as these are the main trade-hubs
  const handleFetchPrices = async () => {
    // Do a fetch per item to get prices for the entire shoppingList.
    const promises = shoppingList.map((item) => {
      return fetch(
        `https://api.evemarketer.com/ec/marketstat/json?typeid=${item.typeid}${tradehub}`
      ).then((response) => {
        return response.json().then((data) => {
          let completeItem = {
            data,
            name: item.name,
            amount: item.amount,
          }
          return completeItem
        })
      })
    })
    // When all fetches are complete, setFetchedItems is called and populated with fetched prices from evemarketer.
    Promise.all(promises).then((results) => {
      const returnedItems = results.map((result) => result)
      //console.log("Returned items: ", results)
      setFetchedItems(returnedItems)
    })
  }

  return (
    <div className="app">
      <PageHeader />
      <Container>
        <Row className="text-center">
          <Col>
            <h1 className="text-white">8SM Market Checker</h1>
          </Col>
        </Row>
        <Row className="mt-2 text-info">
          <p>1. Add the items and amount you want to check</p>
        </Row>
        <Row>
          <Searchbar
            placeholder="Enter item name"
            data={itemsData}
            handleAddItem={handleAddItem}
          />
        </Row>
        <Row className="mt-2">
          <Col>
            <Card>
              <Card.Body>
                {shoppingList.length > 0 ? (
                  shoppingList.map((item, key) => (
                    <ShoppingList item={item} key={key} />
                  ))
                ) : (
                  <div>Please select items</div>
                )}
                {shoppingList.length > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShoppingList([])}
                  >
                    Empty
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2 text-info">
          <p>2. Choose tradehub and fetch prices</p>
        </Row>
        <Row className="mt-2">
          <Col sm="3">
            <Form.Select onChange={(e) => changeTradehub(e.target.value)}>
              <option value="Jita">Jita</option>
              <option value="Amarr">Amarr</option>
              <option value="Rens">Rens</option>
              <option value="Dodixie">Dodixie</option>
            </Form.Select>
          </Col>
          <Col sm="6" className="">
            <Button
              variant="success"
              size="sm"
              onClick={handleFetchPrices}
              disabled={shoppingList.length > 0 ? false : true}
            >
              Fetch prices
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Min sell</th>
                  <th>Max buy</th>
                  <th>Price at %</th>
                  <th>Chosen %</th>
                </tr>
              </thead>
              <tbody>
                {fetchedItems &&
                  fetchedItems.map((item, key) => (
                    <FetchedItems item={item} key={key} />
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <p className="mt-2 text-info">
            (You can click the percentile under "Chosen %" to change it)
          </p>
        </Row>
        <Row>
          <Col>
            <p className="text-secondary mt-5 mx-auto">
              Made by Daniel, aka Seung 2022/2023
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
