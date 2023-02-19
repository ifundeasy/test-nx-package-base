const fs = require('fs')
const path = require('path')
const express = require('express')

const { app: opts } = require('../config')
const apiV1 = require('./api/v1')

const app = express()
const distDir = path.join(__dirname, '..', 'dist')
const assetsDir = path.join(distDir, 'assets')
const webManifestFile = path.join(__dirname, '..', '..', 'assets', 'site.webmanifest')

app.use(express.static(distDir));
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

const webmanifest = JSON.parse(fs.readFileSync(webManifestFile));
fs.writeFileSync(
  path.join(assetsDir, 'site.webmanifest'),
  JSON.stringify({
    ...webmanifest,
    name: `${opts.slug}: ${opts.name}`,
    short_name: opts.slug
  }, 0, 2)
)

app.use('/api/v1/', apiV1.routes.root);

module.exports = app;
