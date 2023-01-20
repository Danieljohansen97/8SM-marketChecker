import React from "react"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"

const FetchedItems = ({ item }) => {

  // Function to format numbers into a more readable format for the user.
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Col className="mt-3">
      <Card>
        <Card.Header>
          <Card.Title>
            {item.name} x {item.amount}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Min sell: {numberWithCommas(item.data[0].sell.min * item.amount)}</p>
          <p>Max buy: {numberWithCommas(item.data[0].buy.max)}</p>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FetchedItems
