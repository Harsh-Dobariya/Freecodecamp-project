const { Url, validate } = require('../models/url');
const dns = require('dns');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

router.get('/api/shorturl/:shorturl?', async (req, res) => {
    if (isNaN(req.params.shorturl)) return res.json({ "error": "Wrong format" });

    const shortUrl = parseInt(req.params.shorturl);
    const result = await Url.findOne({ short_url: shortUrl });

    res.redirect(result.original_url);
})

router.post('/api/shorturl', (req, res) => {
    try {
        originalUrl = req.body.url
        if (!validate(originalUrl)) return res.json({ error: 'invalid url' });

        originalUrl = new URL(originalUrl);

        dns.lookup(originalUrl.hostname, async (err) => {
            if (err) return res.json({ "error": "Invalid Hostname" });

            const result = await Url.findOne({ original_url: originalUrl });
            if (result) return res.json({ original_url: result.original_url, short_url: result.short_url });

            let data = new Url({ original_url: originalUrl })
            data = await data.save();

            res.json({ original_url: data.original_url, short_url: data.short_url });
        })

    }
    catch (e) {
        res.json({ error: 'invalid url' });
    }
})

module.exports = router;