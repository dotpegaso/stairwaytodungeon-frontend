import axios from 'axios'

async function api({ method, url, data }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  axios.defaults.headers.common.Plaftorm = 'WEB'

  const result = await axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT'
    }
  })
    .then((response) => response.data)
    .catch((error) => console.error(`API ${url} error: ${error}`))

  return result
}

export default api
