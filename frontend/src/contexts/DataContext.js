import React, { useContext, useState } from 'react'
import ax from 'axios'

const DataContext = React.createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }) {

  const [uploaded, setUploaded] = useState(false)
  const [data, setData] = useState(null)

  // uploaded status
  function handleUploadedDataStatus(status) {
    setUploaded(status)
  }

  // main data
  function setUploadedData(data) {
    setData(data)
  }

  // fetch and set and extract table data
  const fetchData = async (email) => {
    try {
      let result = await ax({
        method: 'get',
        url: 'http://localhost:5000/pastOrders',
        headers: {
          currentUserEmail: `${email}`
        }
      })
      if(result.data.length === 0) return console.log('no data')
      setUploadedData(result.data)
      return extractTableData(result.data)
    } catch (err) { console.log(err) }
  }

  // table data
  function extractTableData(data) {
    let visitedOrders = []
    let tableData = []
    data.forEach((Order) => {
      if(visitedOrders.includes(Order.orderId)) return
      let row = {
        orderId: Order.orderId,
        customerName: Order.customerName,
        dealerEmail: Order.dealerEmail,
        orderDate: Order.orderDate,
        total: 0
      }
      data.forEach((order) => {
        if(order.orderId === Order.orderId) {
          row.total += order.unitPrice * order.itemQuantity
        }
      })
      visitedOrders.push(Order.orderId)
      tableData.push(row)
    })
    return tableData
  }

  // Invoice data
  function extractInvoiceData(orderId) {
    let invoiceData = []
    data.forEach((order) => {
      
      if(order.orderId === orderId) {
        let item = {
          itemName: order.itemName,
          itemQuantity: order.itemQuantity,
          rate: order.unitPrice,
          amount: order.unitPrice * order.itemQuantity
        }
        invoiceData.push(item)
      }
    })
    return invoiceData
  }

  const value = {
    handleUploadedDataStatus,
    uploaded,
    setUploadedData,
    data,
    extractTableData, 
    fetchData,
    extractInvoiceData
  }
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}