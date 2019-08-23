import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { theme } from "../../assets/styles/theme"
import GlobalStyle from "../../assets/styles/GlobalStyle"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

const Container = styled.main`
  max-width: 100%;
`

const MainTemplate = props => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Container>{props.children}</Container>
        <Footer />
      </>
    </ThemeProvider>
  </>
)

export default MainTemplate
