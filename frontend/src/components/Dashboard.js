import React, { useEffect, useState } from 'react'
import { Container, Navbar, Button, Form, Fade } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { getShopkeeperName } from '../database'
import DragAndDrop from './DragAndDrop'

export default function Dashboard() {

  const { logout, currentUser: { email } } = useAuth()
  const [username, setUsername] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getShopkeeperName(email).then((name) => {
      setOpen(true)
      setUsername(name)
    })
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
      </div>
    </>
  )
}
