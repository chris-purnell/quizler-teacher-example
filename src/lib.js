import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  // TODO implement chooseRandom

  const newArray = []
  const random = Math.floor(Math.random() * array.length)

  if (array.length === 0 || array.length === 1) {
    return array
  }

  if (numItems < 1 || numItems > array.length) {
    numItems = random
  }

  for (let i = 0; i < numItems; i++) {
    newArray.push(array[random])
  }

  return newArray
}

export const createPrompt = prompt => {
  let result = []
  let questions = prompt && prompt.numQuestions !== undefined ? prompt.numQuestions : 1
  let choices = prompt && prompt.numChoices !== undefined ? prompt.numChoices : 2

  for (let i = 1; i <= questions; i++) {
    result.push({
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    })
    for (let q = 1; q <= choices; q++) {
      result.push({
        type: 'input',
        name: `question-${i}-choice-${q}`,
        message: `Enter answer choice ${q} for question ${i}`
      })
    }
  }
  return result
}

export const createQuestions = (input = {}) => {

  let questionList = []
  let question

  for (const value in input) {
    if (value.indexOf(`-choice-`) !== -1) {
      question.choices.push(input[value]) 
    } else if (value.indexOf('-answer-') !== -1){
      question.answer = input[value]
    } else {
      question = { 
        type: 'list',
        name: value,
        message: input[value],
        choices: []
      }
      questionList.push(question)
    }
  }
  return questionList
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
