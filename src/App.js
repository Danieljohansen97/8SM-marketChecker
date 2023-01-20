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

  const jita = "&usesystem=30000142"
  // const amarr = "&usesystem=30002187"

  // THIS IS WHERE I LEFT OFF, CONTINUE INPLEMENTING handleAddItem()
  const handleAddItem = (currentItem, amount) => {
    let currentItemWithAmount = currentItem
    currentItemWithAmount.amount = amount
    setShoppingList([currentItem, ...shoppingList])
  }

  // Not working yet is supposed to fetch marketData based on item.typeid
  // Second parameter can be Jita or Amarr as these aree the main trade-hubs
  const handleFetchPrices = async() => {
    // Do a fetch per item to get prices for the entire shoppingList.
    const promises = shoppingList.map(item => {
      return fetch(`https://api.evemarketer.com/ec/marketstat/json?typeid=${item.typeid}${jita}`)
        .then(response => {
          return response.json().then(data => {
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
    Promise.all(promises).then(results => {
      const returnedItems = results.map(result => result)
      //console.log("Returned items: ", results)
      setFetchedItems(returnedItems)
      setShoppingList('')
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
        <Row>
          <Searchbar
            placeholder="Enter item name"
            data={itemsData}
            handleAddItem={handleAddItem}
          />
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Header>
                <Row>
                  <Col sm="6">
                    <Card.Title>Shopping List</Card.Title>
                  </Col>
                  <Col sm="6" className="">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleFetchPrices}
                    >
                      Fetch prices
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {shoppingList.length > 0 ? (
                  shoppingList.map((item, key) => (
                    <ShoppingList item={item} key={key} />
                  ))
                ) : (
                  <div>Please select items</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {fetchedItems &&
            fetchedItems.map((item, key) => (
              <FetchedItems item={item} key={key} />
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default App
