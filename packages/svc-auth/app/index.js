const fs = require('fs')
const path = require('path')
const express = require('express')
const { Sql } = require('utils')

const { app: opts, sql: sqlOpts } = require('../config')
const apiV1 = require('./api/v1')
const registration = require('../pages/routes/registration')

module.exports = async () => {
  const app = express()
  const distDir = path.join(__dirname, '..', 'dist')
  const assetsDir = path.join(distDir, 'assets')
  const webManifestFile = path.join(__dirname, '..', '..', 'assets', 'site.webmanifest')
  
  Sql.register(sqlOpts)
  const sql = Sql.getInstance()
  
  await sql.connect();
  sql.repo = require('../sql-repositories');
  sql.models = require('../sql-models/init-models')(sql.sequelize);
  
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
  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'pages', 'views'))
  
  app.get('/', (req, res) => res.render('index', opts));
  app.use('/registration', registration);
  app.use('/api/v1/', apiV1.routes.root);

  return { app, sql };
};
