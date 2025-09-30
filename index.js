const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// CALLBACK
app.get('/callback', (req, res) => {
  setTimeout(() => {
    res.json({ id: 1, name: 'Daniel Wang' }); 
  }, 1000);
});

// PROMISE
app.get('/promise', (req, res) => {
  new Promise((resolve) => {
    setTimeout(() => resolve({ id: 2, name: 'Daniel Wang' }), 1000);
  }).then(data => res.json(data));
});

// ASYNC/AWAIT
app.get('/async', async (req, res) => {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve({ id: 3, name: 'Daniel Wang' }), 1000);
  });
  res.json(data); 
});

// FILE READ
app.get('/file', async (req, res) => {
  try {
    const data = await fs.readFile('data.txt', 'utf-8');
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('File read error');
  }
});

// CHAINED
function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/chain', async (req, res) => {
  try {
    await simulateDelay(1000);
    console.log('Step 1: Login');

    await simulateDelay(1000);
    console.log('Step 2: Fetch data');

    await simulateDelay(1000);
    console.log('Step 3: Render data');

    res.json({ message: 'All steps completed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong in /chain' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

