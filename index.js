#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')
const ejs = require('ejs')

const questions = [{
  type: 'text',
  name: 'bundleId',
  message: 'What is your bundle id?',
  initial: 'com.example.kotlin',
  validate: value => !!value.trim()
}, {
  type: 'text',
  name: 'projectName',
  message: 'What your project name?',
  initial: 'MultiplatformKotlinExample',
  validate: value => !!value.trim()
}, {
  type: prev => fs.existsSync(path.join(process.cwd(), prev)) ? "confirm" : null,
  name: 'generate',
  message: 'Directory not empty, are your sure ?',
}]

prompts(questions).then(res => {
  if (!res) {
    return
  }

  if (res.generate === false) {
    return
  }

  let projectPath = path.resolve(process.cwd(), res.projectName)
  walkTemplate(projectPath, (templatePath, content) => {
    return {
      path: templatePath === "_gitignore" ? ".gitignore" : templatePath,
      content: ejs.render(content, {
        bundleId: res.bundleId,
        projectName: res.projectName
      })
    }
  })

  console.log('generated at ' + projectPath)

}).catch(error => {
  console.log(error)
})

function walkTemplate(dist, updateContent) {

  const templateDir = path.join(__dirname, 'template')

  function walkDir(dir) {
    let files = fs.readdirSync(dir)
    files.forEach(file => {

      if (file.charAt(0) === '.') {
        return
      }

      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        walkDir(fullPath)
      } else {
        let templatePath = path.relative(templateDir, fullPath)
        let content = fs.readFileSync(fullPath, 'utf8')
        let result = updateContent(templatePath, content)
        let writeDist = path.join(dist, result.path)
        fs.ensureDirSync(path.dirname(writeDist))
        fs.writeFileSync(writeDist, result.content, 'utf8')
      }
    })
  }

  walkDir(templateDir)
}



