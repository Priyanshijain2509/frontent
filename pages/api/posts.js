import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:3001/posts/index');
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
