// React
import React from "react"
// Bootstrap
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
// XLSX
import * as XLSX from "xlsx/xlsx.mjs"

const ExportToExcel = ({ fetchedItems }) => {
  function handleClick() {
    const excelReadyArray = []
    let fileName = ""
    fetchedItems.map((item) => {
      return excelReadyArray.push({
        name: item.name,
        amount: item.amount,
        minSell: item.data[0].sell.min * item.amount,
        maxBuy: item.data[0].buy.max,
        tenPercent: item.data[0].sell.min * item.amount * 0.1,
      })
    })
    fileName = prompt("Enter desired filename for the exported excel document")
    if (fileName !== "") {
      try {
        const worksheet = XLSX.utils.json_to_sheet(excelReadyArray)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Item Prices")

        // Calculate max-width for each column based on characterlength, (Solution found on Stack Overflow)
        const fitToColumn = (data) => {
          const columnWidths = []
          for (const property in data[0]) {
            columnWidths.push({
              wch: Math.max(
                property ? property.toString().length : 0,
                ...data.map((obj) =>
                  obj[property] ? obj[property].toString().length : 0
                )
              ),
            })
          }
          return columnWidths
        }
        // Apply column widths
        worksheet["!cols"] = fitToColumn(excelReadyArray)

        XLSX.writeFile(workbook, `${fileName}.xlsx`)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("You need to enter a filename")
    }
  }

  return (
    <Row>
      <div className="d-grid gap-2">
        <Button size="sm" variant="secondary" onClick={handleClick}>
          Export as Excel
        </Button>
      </div>
    </Row>
  )
}

export default ExportToExcel
