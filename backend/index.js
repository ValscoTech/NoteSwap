import express from 'express';

import app from './app.js';

app.listen(4001, () => {
    console.log('Server is running on port 4001');
});