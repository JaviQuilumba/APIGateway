const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://lb-grupo14-app-cinema-2120355127.us-east-2.elb.amazonaws.com'
}));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API Gateway is running JC2' });
});


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const services = 'http://lb-g14-microservices-107665025.us-east-2.elb.amazonaws.com';

app.use('/gateway', createProxyMiddleware({ target: services, changeOrigin: true }));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API Gateway escuchando en http://localhost:${port}`);
});
