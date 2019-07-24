import React from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { graphql } from 'gatsby';
import Sidebar from '../../components/Sidebar/Sidebar';
import styled from 'styled-components';
import { injectIntl, Link } from 'gatsby-plugin-intl';
import ArticleShort from '../../components/ArticleShort/ArticleShort';
import  getLocalizedData from '../../assets/helpers/getLocalizedData';

const Container = styled.div`
	max-width: 1360px;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	background: ${({ theme }) => theme.bright};
	${({ theme }) => theme.mq.laptop} {
		padding-left: 80px;
	}
`;

const Wrapper = styled.div`
	width: 100%;
	max-width: 880px;
	position: relative;
	padding: 0 10px 70px 10px;
`;

const StyledLink = styled(Link)`
	position: absolute;
	bottom: 0;
	text-decoration: none;
	padding: 20px;
	color: ${({ theme }) => theme.primary};
	transition: color 0.5s ease-in-out;
	&:hover {
		color: ${({ theme }) => theme.secondary};
	}
`;

const LinkToPrevious = styled(StyledLink)`
	left: 0;
`;

const LinkToNext = styled(StyledLink)`
	right: 0;
`;
const Index = ({ data, pageContext, intl: { locale } }) => {
	// Create array of localized data objects

	
	const indexFrom = pageContext.skip;
	const indexUntil = pageContext.skip + pageContext.articlesPerPage;

	const articlesData = getLocalizedData(data, locale, indexFrom, indexUntil);
	//Pagination

	const isFirstPage = pageContext.currentPage === 1;
	const isLastPage = pageContext.currentPage === pageContext.pagesCount;

	return (
		<MainTemplate>
			<Container>
				<Wrapper>
					{articlesData.map((data, i) => (
						<ArticleShort data={data} key={i} />
					))}
					{!isFirstPage && (
						<LinkToPrevious to={`/articles/${pageContext.currentPage - 1}`}>
							← Newer articles
						</LinkToPrevious>
					)}
					{!isLastPage && (
						<LinkToNext to={`/articles/${pageContext.currentPage + 1}`}>Older articles →</LinkToNext>
					)}
				</Wrapper>

				<Sidebar />
			</Container>
		</MainTemplate>
	);
};

export const query = graphql`
	query articleList {
		allContentfulArticles(sort: { fields: date, order: DESC }) {
			edges {
				node {
					date(formatString: "DD/MM/YYYY")
					slug
					titlePl
					titleFr
					articleImage {
						fluid(maxWidth: 800) {
							...GatsbyContentfulFluid_withWebp_noBase64
						}
					}
				}
			}
		}
		file(relativePath: { eq: "hero_img.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 800) {
					...GatsbyImageSharpFluid_withWebp_noBase64
				}
			}
		}
	}
`;

export default injectIntl(Index);
