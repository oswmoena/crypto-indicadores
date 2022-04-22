import axios from 'axios'

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const response = async (options) => {
    return await client(options)
        .then(response => {
            const { data } = response
            return data
        })
        .catch(error => console.error('error', error))
}

export default client