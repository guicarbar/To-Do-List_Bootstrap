// progress bar array
const arrayProgressBar = document.querySelectorAll('.progress')

// itens by group
let itensGroupByClassName = [0, 0, 0, 0, 0]


// update progressbar functions
function updateCountGroup() {
  // count elemnts by group className
  for (let i = 1; i <= 5; i++) {
    itensGroupByClassName[i - 1] = document.getElementsByClassName(`group${i}`).length
  }
}



// split positions
function splitPositions() {
  // arrays witch positions
  const nulls = []
  const notNulls = []

  // separated itens
  itensGroupByClassName.forEach((num, index) => {
    if (num === 0) {
      nulls.push(index)
    } else {
      notNulls.push(index)
    }
  })

  // retunr values
  return { nulls, notNulls }
}



// function to check Has iten
function checkHasIten() {
  // verifica a quantidade de itens
  updateCountGroup()

  // element
  const elementNulls = document.getElementById('textNulls')

  // positions
  const positionSplited = splitPositions()

  // in case nulls in all itens
  if (positionSplited.nulls.length === 5) {
    elementNulls.style.display = 'block'
  } else {
    elementNulls.style.display = 'none'
  }

  // display none for 0 itens
  positionSplited.nulls.forEach((num) => {
    if(arrayProgressBar[num]) { arrayProgressBar[num].style.display = "none" }
  })

  // display for <> 0 itens
  positionSplited.notNulls.forEach(num => {
    if(arrayProgressBar[num]) {
      arrayProgressBar[num].style.display = "flex"
    }
  })
}


function resetItensCount() {
  itensGroupByClassName = [0, 0, 0, 0, 0]
}