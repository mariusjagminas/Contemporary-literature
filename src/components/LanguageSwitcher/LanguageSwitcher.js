import React, { useState } from "react"
import styled, { css } from "styled-components"
import { injectIntl } from "gatsby-plugin-intl"
import Languages from "../Languages/Languages"
import flagPoland from "../../assets/images/flag-poland.png"
import flagFrance from "../../assets/images/flag-france.png"
import flagBritish from "../../assets/images/flag-uk.png"

const image = {
  pl: flagPoland,
  fr: flagFrance,
  en: flagBritish,
}

// export const buttonStyles = css`
//   border: none;
//   background: ${({ theme }) => theme.bright};
//   height: 37px;
//   &:focus {
//     outline: none;
//   }
// `

const Nav = styled.nav`
  display: ${({ isMobileMenu }) => (isMobileMenu ? "flex" : "none")};
  position: relative;
  height: 35px;
  padding: 0 20px;
  &:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    right: 0px;
    top: 10px;
    transform: rotateZ(-45deg);
  }

  ${({ theme }) => theme.mq.laptop} {
    display: ${({ isMobileMenu }) => (isMobileMenu ? "none" : "flex")};
    margin-left: auto;
  }
`

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "initial" : "none")};
  position: absolute;
  z-index: 5;
  background: white;
  top: 40px;
  right: 0;
  box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.3);
  width: auto;
  right: -21px;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 10px;
    height: 10px;
    background: white;
    box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.3);
    top: -6px;
    right: 21px;
    transform: rotateZ(45deg);
  }
`

const ImageWrapper = styled.div`
  width: 30px;
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`

const StyledParagraph = styled.p`
  margin: 2px 0 0 7px;
`

const LanguageSwitcher = ({ intl, intl: { locale }, isMobileMenu }) => {
  const [isOpen, setState] = useState(false)
  const toggleMenu = () => {
    setState(!isOpen)
  }

  return (
    <Nav isMobileMenu={isMobileMenu} onClick={toggleMenu}>
      <ImageWrapper>
        <StyledImage src={image[locale]} />
      </ImageWrapper>
      <StyledParagraph>
        {intl.formatMessage({ id: "language_switcher" })}
      </StyledParagraph>
      <DropdownMenu isOpen={isOpen}>
        <Languages />
      </DropdownMenu>
    </Nav>
  )
}

export default injectIntl(LanguageSwitcher)