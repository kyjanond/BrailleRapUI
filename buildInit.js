import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'node:module'
const req = createRequire(import.meta.url)
const pkgJson = req('./package.json')

console.debug('Incrementing build number...')
const content = readFileSync('src/metadata.json')
const metadata = JSON.parse(content)
metadata.buildRevision = metadata.buildRevision + 1
metadata.datetime = new Date().toISOString()
writeFileSync('src/metadata.json', JSON.stringify(metadata, null, 2))
console.debug(`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`)
pkgJson.version = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}${metadata.buildTag?'-'+metadata.buildTag:''}`
writeFileSync('./package.json', JSON.stringify(pkgJson, null, 2))
console.debug('package.json updated')
