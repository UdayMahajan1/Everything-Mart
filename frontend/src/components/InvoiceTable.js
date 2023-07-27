import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import downloadInvoice from '../invoice'

export default function InvoiceTable() {

  const { data, fetchData, extractTableData, uploaded, extractInvoiceData } = useData()
  const { currentUser: { email }, name } = useAuth()
  const [tableData, setTableData] = useState(null)
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null)

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setShowModal(false);
      setModalData(null);
    }, 1000)
  }

  const handleShow = (order) => {
    setShow(true);
    setShowModal(true);
    let modalData = extractInvoiceData(order.orderId)
    let total = 0
    modalData.forEach((item) => total += item.amount)
    let dealerName = name;
    setModalData({
      orderId: order.orderId,
      customerName: order.customerName,
      dealerName: dealerName,
      orderDate: (order.orderDate).slice(0, 10),
      modalData: modalData,
      total: (total).toFixed(2)
    })
  }

  const handleDownload = () => downloadInvoice(modalData)

  useEffect(() => {
    async function handleInvoiceTable() {
      let res
      if (!uploaded) {
        try {
          res = await fetchData(email)
        } catch (err) { console.log(err) }
      } else {
        res = extractTableData(data)
      }
      setTableData(res)
    }
    handleInvoiceTable()
  }, [uploaded])

  return (
    <div> 
      {
        tableData ?
          <div>
            {uploaded ? 
              <h2 className='text-center mb-5'>Uploaded list of invoices</h2>
             :<h2 className='text-center mb-5'>Previous list of invoices</h2> 
            }
            <Table bordered className='w-75 mx-auto'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Id</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                  <th>Generate Invoice</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{(order.total).toFixed(2)}</td>
                      <td>{(order.orderDate).slice(0,10)}</td>
                      <td>
                        <Button
                          variant='outline-secondary'
                          size='sm'
                          onClick={async () => await handleShow(order)}>
                          Generate Invoice
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
          : null
      }
      {showModal &&
        <Modal show={show} onHide={handleClose} size='lg' centered>
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <p>Invoice No: <strong>{modalData.orderId}</strong></p>
                <p>Invoice Date: <strong>{modalData.orderDate}</strong></p>
                <p>Billed by: <strong>{modalData.dealerName}</strong></p>
                <p>Billed To: <strong>{modalData.customerName}</strong></p>
              </div>
              <div>
                <Table bordered >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      modalData.modalData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td size="sm">{index + 1}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemQuantity}</td>
                            <td>{item.rate}</td>
                            <td>{(item.amount).toFixed(2)}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
                <h2>Total: ${modalData.total}</h2>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              Download
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  )
}
