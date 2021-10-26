import styled from 'styled-components/macro'

import iconDiscord from '../../assets/images/icon_discord.svg'
import iconDownload from '../../assets/images/icon_download.svg'

export const Anchor = styled.a`
  text-decoration: none;
  width: 210px;
  font-size: 18px;
  white-space: nowrap;
  background-image: url(${(props) => props.icon || iconDownload});
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
