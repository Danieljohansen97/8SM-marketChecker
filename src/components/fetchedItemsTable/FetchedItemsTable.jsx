import React from "react"
import { Table, Row, Col } from "react-bootstrap"

import FetchedItems from "./FetchedItems"

function FetchedItemsTable({ fetchedItems }) {
  return (
    <Row className="mt-2">
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
  )
}

export default FetchedItemsTable
