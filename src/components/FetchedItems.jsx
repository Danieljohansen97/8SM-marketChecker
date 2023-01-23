// React imports
import React, { useState, useRef } from "react"
// Bootstrap imports
import Form from "react-bootstrap/Form"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"

const FetchedItems = ({ item }) => {
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const [percentage, setPercentage] = useState(10)

  // Function to format numbers into a more readable format for the user.
  function numberWithCommas(x) {
    // Remove decimal places
    x.toFixed(0)
    // Return toLocaleString for example: 1 million = 1 000 000
    return x.toLocaleString()
  }

  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{numberWithCommas(item.data[0].sell.min * item.amount)}</td>
        <td>{numberWithCommas(item.data[0].buy.max)}</td>
        {/* onClick to open a slider overlay */}
        <td>
          {numberWithCommas(
            item.data[0].sell.min * item.amount * (percentage / 100)
          )}
        </td>
        <td ref={target} onClick={() => setShow(!show)} className="hoverMouse">{percentage}%</td>
      </tr>
      {/* Overlay that pops up once the table field is clicked */}
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props} onMouseLeave={() => setShow(false)}>
            <Form.Group>
              <Form.Label>{percentage}%</Form.Label>
            <Form.Range
                  min={0}
                  max={100}
                  onChange={(e) => setPercentage(e.target.value)}
                  value={percentage}
                />
            </Form.Group>
          </Tooltip>
        )}
      </Overlay>
    </>

    /*<Col className="mt-3" sm={12} md={6}>
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
    </Col>*/
  )
}

export default FetchedItems
