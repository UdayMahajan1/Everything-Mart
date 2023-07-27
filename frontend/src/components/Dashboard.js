import React, { useEffect, useState } from 'react'
import { Container, Navbar, Button, Form, Fade } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import DragAndDrop from './DragAndDrop'
import InvoiceTable from './InvoiceTable'

export default function Dashboard() {

  const { logout, currentUser: { email }, GetShopkeeperName, name } = useAuth()
  var username = name;
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function handleName() {
      let name = await GetShopkeeperName(email)
      setOpen(true)
      return name
    }
    handleName()
  })

  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-secondary-subtle text-primary-emphasis pt-3" fixed="top">
          <Container className='d-flex'>
            <Fade in={ open }>
              <h3>Welcome {username}</h3>
            </Fade>
          <Form onSubmit={handleLogout} className="ms-auto ">
            <Button variant="outline-danger" className='mb-1' type="submit">Log out</Button>
          </Form>
          </Container>
        </Navbar>
        <DragAndDrop />        
        <InvoiceTable />
      </div>
    </>
  )
}
