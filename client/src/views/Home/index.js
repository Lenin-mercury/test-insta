import React from "react"
import "./home.scss"
import Header from "../../components/Header"
// import Footer from "../../components/Footer"
// import Stories from "../../components/Stories"
import { Container, Row, Col } from "reactstrap"

const Home = () => {
  return (
      <Container fluid>
        <Row>
          <Col md="12" sm="12" xs="12">
            <Header />
          </Col>
        </Row>
      </Container>
  )
}

export default Home
