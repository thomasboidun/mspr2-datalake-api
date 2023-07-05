const express = require('express');
const app = express();

// Parse JSON Body
app.use(express.json());

// Routers
const candidateRouter = require('./routes/candidate.router');
const communeRouter = require('./routes/commune.router');
const insecurityRateRouter = require('./routes/insecurity-rate.router');
const joblessRateRouter = require('./routes/jobless-rate.router');
const medianLivingStandardRouter = require('./routes/median-living-standard.router');
const povretyRateRouter = require('./routes/povrety-rate.router');
const voiceCountRouter = require('./routes/voice-count.router');
const dataRouter = require('./routes/data.router');

// Routes
app.use('/candidate', candidateRouter);
app.use('/commune', communeRouter);
app.use('/insecurity-rate', insecurityRateRouter);
app.use('/jobless-rate', joblessRateRouter);
app.use('/median-living-standard', medianLivingStandardRouter);
app.use('/povrety-rate', povretyRateRouter);
app.use('/voice-count', voiceCountRouter);
app.use('/data', dataRouter);

// Démarrer le serveur
const port = 3000; // ou tout autre port de votre choix
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
