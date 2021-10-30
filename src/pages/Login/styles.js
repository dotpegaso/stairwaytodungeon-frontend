import styled from 'styled-components/macro'

import iconDiscord from '../../assets/images/icon_discord.svg'
import iconDownload from '../../assets/images/icon_download.svg'
import background from '../../assets/images/background.svg'

export const Container = styled.div`
  background-color: var(--primary-background);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: bottom;
`

export const Anchor = styled.a`
  text-decoration: none;
  width: 210px;
  font-size: 18px;
  white-space: nowrap;
  background-image: url(${iconDownload});
  background-position: left center;
  background-repeat: no-repeat;
  color: var(--primary-color);
  padding: 8px 20px;
  border-radius: 6px;
  text-align: right;

  ${(props) =>
    props.isDiscord &&
    `
    background-color: var(--discord);
    background-image: url(${iconDiscord});
    background-position: left 10px center;
    width: 250px;
  `}
`
