import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    background: ${(props) => `var(--day-period-${props.dayPeriod})`};
    transition: background-color 1000ms linear;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* font-family: 'Saint Regus'; */
  }

  a {
    text-decoration: none;
  }

  a,p, h1, h2, li {
    color: var(--primary-text);
  }

.whiteboard {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.colors {
  position: fixed;
}

.color {
  display: inline-block;
  height: 48px;
  width: 48px;
}

.color.black { background-color: black; }
.color.red { background-color: red; }
.color.green { background-color: green; }
.color.blue { background-color: blue; }
.color.yellow { background-color: yellow; }

`

export default GlobalStyles
