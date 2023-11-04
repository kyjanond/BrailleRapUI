import shell from 'shelljs'

import { createRequire } from 'node:module'
const req = createRequire(import.meta.url)
const pkgJson = req('./package.json')
// eslint-disable-next-line no-undef
const ASSET_PATH = process.env.ASSET_PATH || ''
// eslint-disable-next-line no-undef
const PRODUCTION_MODE = process.env.PRODUCTION_MODE
const BUILD_SUB_FOLDER = ''
console.debug('---')
console.debug('Starting AWS upload...')
if (PRODUCTION_MODE) {
  shell.exec(`aws s3 rm s3://${pkgJson.awsConfig.bucketName + BUILD_SUB_FOLDER + '/' + ASSET_PATH} --recursive --exclude devsite/*`)
}
console.debug(`Default root object: ${ASSET_PATH}index-${pkgJson.version}.html`)
const cloudFrontRet = shell.exec(
  `aws cloudfront update-distribution --id ${pkgJson.awsConfig.distributionID} --default-root-object ${ASSET_PATH}index-${pkgJson.version}.html`
  , { silent: true }
)
if (cloudFrontRet.code !== 0 || cloudFrontRet.stderr !== '') {
  console.debug(`FAILED! \r\nCloudFront error:  ${cloudFrontRet.code} \r\n ${cloudFrontRet.stderr}`)
} else {
  console.debug(`SUCCESS! \r\nCloudFront config: \r\n ${cloudFrontRet.stdout}`)
  console.debug('---')
  console.debug('S3 upload:')
  const S3Ret = shell.exec(`aws s3 cp ./dist/${ASSET_PATH} s3://${pkgJson.awsConfig.bucketName + BUILD_SUB_FOLDER + '/' + ASSET_PATH} --recursive`)
  if (S3Ret.code !== 0 || S3Ret.stderr !== '') {
    console.debug('---')
    console.debug(`FAILED! \r\nS3 error:  ${cloudFrontRet.code} \r\n ${cloudFrontRet.stderr}`)
  } else {
    console.debug('---')
    console.debug(`SUCCESS! \r\n Updated to version: ${pkgJson.version} in ${PRODUCTION_MODE ? 'PROD' : 'DEV'}`)
  }
}
