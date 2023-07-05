const API_KEY = 'myapikey';

module.exports = () => {
    return (req, res, next) => {
        if (req?.headers?.api_key === API_KEY) {
            next();
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
}