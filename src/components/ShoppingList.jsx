import React from 'react'

const ShoppingList = ({item}) => {
  return (
    <p>{`${item.name} x ${item.amount}`}</p>
  )
}

export default ShoppingList