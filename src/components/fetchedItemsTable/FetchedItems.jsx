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
      {item && (
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
            <td
              ref={target}
              onClick={() => setShow(!show)}
              className="hoverMouse"
            >
              {percentage}%
            </td>
          </tr>
          {/* Overlay that pops up once the table field is clicked */}
          <Overlay target={target.current} show={show} placement="top">
            {(props) => (
              <Tooltip
                id="overlay-example"
                {...props}
                onMouseLeave={() => setShow(false)}
              >
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
      )}
    </>
  )
}

export default FetchedItems
