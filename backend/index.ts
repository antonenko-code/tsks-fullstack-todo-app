import express from 'express';
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hi, I am a Server');
});

app.post('/auth/login', (req, res) => {
  const token = jwt.sign({
    email: req.body.email,
  }, 'hash2023')

  res.json({
    success: true,
    token,
  })
})

app.listen(4444, () => {
  console.log('Server OK')
})
