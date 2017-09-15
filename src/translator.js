const TJO = require('translate-json-object')
const googleApiKey = require('../config/googleApiKey')
const fs = require('fs')
const path = require('path')
const targetLanguages = require('../config/targetLanguages')

const inputFilePath = path.join(__dirname, '../input/input.json')
const outputFolderFilePath = path.join(__dirname, '../output')
const inputFile = require(inputFilePath)

function initTJOInstance(TJOInstance) {
  TJOInstance.init({ googleApiKey });
}

function getTJOInstance() {
  const instance = TJO()
  initTJOInstance(instance)

  return instance
}

function translate(language) {
  getTJOInstance().translate(inputFile, language.key)
    .then(data => {
      printTranslation(data, language)
      writeTranslationFile(data, language)
    })
    .catch(console.error);
}

function printTranslation(translatedData, language) {
  const outputHeader = `\n${language.name} translation \n\n`

  console.log(outputHeader, translatedData, '\n')
}

function writeTranslationFile(translatedData, language) {
  const prettifiedData = JSON.stringify(translatedData, null, 2)
  const outputFilePath = path.join(outputFolderFilePath, `${language.key}.json`)

  fs.writeFile(outputFilePath, prettifiedData)
}

targetLanguages.forEach(language => translate(language))
