// React imports
import { useState } from "react"
// Stylesheets
import "./App.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
// Component imports
import PageHeader from "./components/PageHeader/PageHeader"
import Searchbar from "./components/Searchbar/Searchbar"
import FetchedItemsTable from "./components/fetchedItemsTable/FetchedItemsTable"
import PageFooter from "./components/PageFooter/PageFooter"
// Hooks
import useFetchPrices from "./customHooks/useFetchPrices"
// resources
import itemsData from "./resources/itemsArray.json"

function App() {
  const [shoppingList, setShoppingList] = useState([])
  const [tradehub, setTradehub] = useState("&usesystem=30000142")
  const [fetchedItems] = useFetchPrices(shoppingList, tradehub)

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
        // Default is Jita
        setTradehub("&usesystem=30000142")
        break
    }
  }

  // Add item and amount to shoppinglist
  const handleAddItem = (currentItem, amount) => {
    let currentItemWithAmount = currentItem
    currentItemWithAmount.amount = amount
    // If item already exists in shoppingList, replace it
    const updatedList = shoppingList.filter(
      (item) => item.name !== currentItemWithAmount.name
    )
    setShoppingList([...updatedList, currentItemWithAmount])
  }

  function clearData() {
    setShoppingList([])
  }

  return (
    <div className="app">
      <PageHeader />
      <Container>
        <Searchbar
          placeholder="Enter item name"
          data={itemsData.sort()}
          handleAddItem={handleAddItem}
        />
        <Row className="mt-2">
          <Col sm="3">
            <Form.Select onChange={(e) => changeTradehub(e.target.value)}>
              <option value="Jita">Jita</option>
              <option value="Amarr">Amarr</option>
              <option value="Rens">Rens</option>
              <option value="Dodixie">Dodixie</option>
            </Form.Select>
          </Col>
        </Row>
        <FetchedItemsTable fetchedItems={fetchedItems} />
        {shoppingList.length > 0 && (
          <Row>
            <Col xs={12}>
              <div className="d-grid gap-2">
                <Button size="sm" variant="danger" onClick={clearData}>
                  Clear
                </Button>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <p className="mt-2 text-info">
            (You can click the percentile under "Chosen %" to change it)
          </p>
        </Row>
        <PageFooter />
      </Container>
    </div>
  )
}

export default App
