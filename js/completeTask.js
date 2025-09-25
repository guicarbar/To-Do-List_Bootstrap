// vars
let countCompletForGroup = [0, 0, 0, 0, 0]

// functions
// updatebars
function updateBars(group) {
  // barras de progresso
  const completeBars = document.querySelectorAll('.progress-bar')
  let index

  // index
  switch (group) {
    case 'group1': index = 0; break
    case 'group2': index = 1; break
    case 'group3': index = 2; break
    case 'group4': index = 3; break
    case 'group5': index = 4; break
  }

  // 
  const totalItens = document.querySelectorAll(`.${group}`).length
  const completed = countCompletForGroup[index]

  const percent = totalItens > 0 ? (completed / totalItens) * 100 : 0
  completeBars[index].style.width = percent + "%"
}



// remove item
function removePointInTask(group) {
  let index
  // by group
  switch (group) {
    case 'group1': index = 0; break
    case 'group2': index = 1; break
    case 'group3': index = 2; break
    case 'group4': index = 3; break
    case 'group5': index = 4; break
  }

  // remove in count var
  countCompletForGroup[index] --
}



// verify checked item
function completeTask(element, group) {
  if (element.checked) {
    // sum in group
    switch (group) {
      case 'group1':
          countCompletForGroup[0] = countCompletForGroup[0] + 1
        break
      case 'group2':
          countCompletForGroup[1] = countCompletForGroup[1] + 1
        break
      case 'group3':
          countCompletForGroup[2] = countCompletForGroup[2] + 1
        break
      case 'group4':
          countCompletForGroup[3] = countCompletForGroup[3] + 1
        break
      case 'group5':
          countCompletForGroup[4] = countCompletForGroup[4] + 1
        break
    }
    // update bars
    updateBars(group)
  } else {
    // degress group
    switch (group) {
      case 'group1':
          countCompletForGroup[0] = countCompletForGroup[0] - 1
        break
      case 'group2':
          countCompletForGroup[1] = countCompletForGroup[1] - 1
        break
      case 'group3':
          countCompletForGroup[2] = countCompletForGroup[2] - 1
        break
      case 'group4':
          countCompletForGroup[3] = countCompletForGroup[3] - 1
        break
      case 'group5':
          countCompletForGroup[4] = countCompletForGroup[4] - 1
        break
    }
    // update bars
    updateBars(group)
  }
}


function resetCountComplet() {
  countCompletForGroup = [0, 0, 0, 0, 0]
}