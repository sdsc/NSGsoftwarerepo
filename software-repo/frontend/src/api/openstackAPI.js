import axios from 'axios'

const endpoint = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:5000/tools' : 'http://132.249.242.147:5000/tools'

export const getTools = async () => {
  const rep = await axios.get(endpoint)
  return rep.data.tools
}
