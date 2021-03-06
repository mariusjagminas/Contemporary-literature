import React from "react"
import styled from "styled-components"
import { Link } from "gatsby-plugin-intl"

const Wrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px 10px 30px 10px;
  font-size: 14.4px;
  color: ${({ theme }) => theme.primary};
  transition: color 0.2s ease-in-out;
  ${({ theme }) => theme.mq.tablet} {
    font-size: 16px;
    padding: 40px 10px;
  }
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`

const NextPrevLinks = ({ textPrev, textNext, pathPrev, pathNext }) => {
  return (
    <Wrapper>
      {pathPrev ? (
        <StyledLink to={pathPrev}>{`← ${textPrev}`}</StyledLink>
      ) : (
        <div></div>
      )}
      {pathNext ? (
        <StyledLink to={pathNext}>{`${textNext} →`}</StyledLink>
      ) : (
        <div></div>
      )}
    </Wrapper>
  )
}

export default NextPrevLinks

NextPrevLinks.defaultProps = {
  textPrev: null,
  textNext: null,
  pathPrev: null,
  pathNext: null,
}
