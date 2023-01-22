// React imports
import React, { useState } from "react"
// Bootstrap imports
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

const FetchedItems = ({ item }) => {
  const [percentage, setPercentage] = useState(10)

  // Function to format numbers into a more readable format for the user.
  function numberWithCommas(x) {
    // Remove decimal places
    x.toFixed(0)
    // Return toLocaleString for example: 1 million = 1 000 000
    return x.toLocaleString()
  }

  return (
    <Col className="mt-3" sm={12} md={6}>
      <Card>
        <Card.Header>
          <Card.Title>
            {item.name} x {item.amount}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Min sell: {numberWithCommas(item.data[0].sell.min * item.amount)}
          </p>
          <p>Max buy: {numberWithCommas(item.data[0].buy.max)}</p>
          <p>
            Percentage of Jita:{" "}
            <span className="text-primary">
              {numberWithCommas(
                item.data[0].sell.min * item.amount * (percentage / 100)
              )}
            </span>
          </p>
          <Container>
            <Row>
              <Col>
                {/* Slider to change the percentage of minimum sell price as requested by Tristan */}
                <Form.Range
                  min={0}
                  max={100}
                  onChange={(e) => setPercentage(e.target.value)}
                  value={percentage}
                />
              </Col>
              <Col>
                <Form.Label>{percentage}%</Form.Label>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FetchedItems
