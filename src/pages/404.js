import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import styled from 'styled-components';
import ReturnToLink from '../components/ReturnToLink/ReturnToLink';
import { injectIntl } from 'gatsby-plugin-intl';

const Wrapper = styled.div`
	max-width: 1360px;
	height: calc(100vh - 228px);
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.bright};
`;

const Index = ({ intl }) => (
	<MainTemplate>
		<Wrapper>
			<ReturnToLink text={intl.formatMessage({ id: 'not_found' })} />
		</Wrapper>
	</MainTemplate>
);

export default injectIntl(Index);

//FIXME: Redicection is always to main 404 page, so localized versions of that
// page are ignored. Make sharebale page 404.
