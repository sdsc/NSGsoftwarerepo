import axios from 'axios'

const endpoint = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'https://swrepo.nsgportal.org/tools' : 'https://swrepo.nsgportal.org/tools'

export const getTools = async () => {
  const rep = await axios.get(endpoint)
  return rep.data.tools
}
