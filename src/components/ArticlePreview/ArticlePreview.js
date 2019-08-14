import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import Date from "../Date/Date"
import Title from "../Title/Title"
import ArticleSocialIcons from "../ArticleSocialIcons/ArticleSocialIcons"
import truncate from "lodash/truncate"

const Wrapper = styled.div`
  width: 100%;
  max-width: 880px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledImg = styled(Img)`
  max-height: 550px;
  width: 95%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.primaryLight};
  border: 1px solid ${({ theme }) => theme.secondaryLight};
  position: relative;
  padding: 4px 50px;
  transition-property: background, border;
  transition-duration: 0.5s;
  &:before {
    content: "";
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    right: 2px;
    border: 1px solid ${({ theme }) => theme.secondaryLight};
  }

  &:hover {
    background: ${({ theme }) => theme.secondaryLight};
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 3px;
  }
`
// TODO: style article-prewiew  exerpt
const ArticlePreview = ({ data, falbackImage }) => {
  const fluidImage = data.articleImage ? data.articleImage.fluid : falbackImage
  const contentExerpt = data.content.json.content[0].content[0].value
  console.log(data)
  return (
    <Wrapper>
      <Date date={data.date} />
      <Title title={data.title} />
      <StyledImg imgStyle={{ objectFit: "contain" }} fluid={fluidImage} />
      <p>{truncate(contentExerpt, { length: 300 })}</p>
      <ArticleSocialIcons />
      <StyledLink to={`/${data.slug}`}>Read Article</StyledLink>
    </Wrapper>
  )
}

export default ArticlePreview
