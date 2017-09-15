// Require the module and instantiate instance 
const TJO = require('translate-json-object')
const fs = require('fs');
const path = require('path')

const inputFilePath = path.join(__dirname, '../input/input.json')
const outputFolderFilePath = path.join(__dirname, '../output')
const inputFile = require(inputFilePath)

function initTJOInstance(TJOInstance) {
  TJOInstance.init({
    googleApiKey: 'AIzaSyCSkQZolRdhq3Gq36HgTImix3bQT4n0K2o'
  });
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
    }).catch(err => {
      console.error('error ', err)
    });
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

const languages = [
  {
    key: 'es',
    name: 'Spanish'
  },
  {
    key: 'de',
    name: 'German'
  },
  {
    key: 'zh-CN',
    name: 'Chinese'
  },
  {
    key: 'ja',
    name: 'Japanese'
  }
]

languages.forEach(language => translate(language))
