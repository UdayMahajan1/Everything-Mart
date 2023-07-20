import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { addShopkeeper } from '../database'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfRef = useRef()
  const nameRef = useRef()

  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError('Passwords don\'t match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
      await addShopkeeper(nameRef.current.value, emailRef.current.value)
      navigate('/')
    } catch (err) {
      // console.log(err)
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="passwordConf">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" ref={passwordConfRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mb-4">
            Already have an account? <Link to='/login'>Log In</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
