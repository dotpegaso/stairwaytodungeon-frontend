import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`

export const Attribute = styled.div`
  padding: var(--small-padding);
  background: var(--white-97);
  border-radius: 20px;
  color: var(--primary-text);
  display: flex;
  align-items: center;
  position: relative;
  height: 40px;
  margin-left: 20px;
  padding-right: 15px;

  ${(props) => props.positive && 'color: var(--positive-text);'}
  ${(props) => props.negative && 'color: var(--negative-text);'}

  ::before {
    content: '${(props) => props.pseudotext.substring(0, 3).toUpperCase()}';
    width: 40px;
    height: 50px;
    position: absolute;
    padding-top: 4px;
    left: -15px;
    background: var(--white-90);
    transform: rotate(-90deg);
    border-bottom-right-radius: 20px;
    text-align: center;
    color: #fff;
    z-index: -1;
  }
`

export const AttributeContainer = styled.div``

export const AttributeIcon = styled.div``

export const AttributeName = styled.div``
