import React, { useState, useRef, useEffect } from 'react'
import { Container, Button, Card, Collapse, Fade, Form } from 'react-bootstrap'
import Dropzone from 'dropzone'

export default function DragAndDrop() {

  const dropFileRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dropzone = new Dropzone('div#dragAndDrop', {
      url: '/',
      previewTemplate: `
      <div class="dz-preview dz-file-preview mt-4">
        <div class="dz-details mx-auto">
          <img data-dz-thumbnail />
          <div class="dz-filename pt-3"><span data-dz-name></span></div>
          <div class="dz-size pt-1" data-dz-size></div>
          <button class="btn btn-danger" data-dz-remove>Remove file</button>
          </div>
      </div>
    `,
      autoProcessQueue: false,
    })

    dropFileRef.current = dropzone

    dropzone.on('addedfile', (file) => console.log(file))

    return () => {
      dropzone.destroy(); // Cleanup Dropzone instance if needed
    };
  }, [])

  function handleUpload(e) {
    dropFileRef.current.processQueue();
  }

  function handleClick(e) {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <>
      <Container className='text-center py-5' style={{ marginTop: "61px" }}>
        <Collapse in={!open}>
          <Button
            size="lg"
            variant="outline-primary"
            className='mb-1 w-50 fs-3'
            type="submit"
            onClick={(e) => handleClick(e)}>
            Upload the order details
          </Button>
        </Collapse>
        <Fade in={open}>
          <Card
            className="shadow mx-auto rounded-4 w-75 h-auto position-relative"
            style={{ height: open ? "20rem" : "0rem" }}>
            <button type="button" className="btn-close position-absolute mt-2 me-2 top-0 end-0" aria-label="Close" onClick={(e) => handleClick(e)}></button>
            <div id="dragAndDrop" style={{ height: "20rem" }}>
              <Card.Title className="text-center text-secondary pt-4 fs-4">Drag and Drop or Click to Upload
              </Card.Title>
            </div>
            <div className="d-flex w-75 mx-auto justify-content-center">
              <Button
                variant="outline-primary"
                className='mb-4 w-50 fs-3'
                onChange={handleUpload}
              >
                Upload
              </Button>
            </div>
          </Card>
        </Fade>
      </Container>
    </>
  )
}
