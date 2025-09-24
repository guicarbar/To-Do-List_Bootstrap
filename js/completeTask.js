// vars
let countCompletForGroup = [0, 0, 0, 0, 0]

// functions
// calc 

// updatebars
function updateBars(group) {
  // bars
  const completeBars = document.querySelectorAll('.progress-bar')
  const elementW

  switch (group) {
      case 'group1':
        elementW = completeBars[0].offsetWidth
        completeBars[0].style.width = elementW + 
        break
      case 'group2':
        elementW = completeBars[1].offsetWidth
        break
      case 'group3':
        elementW = completeBars[2].offsetWidth
        break
      case 'group4':
        elementW = completeBars[3].offsetWidth
        break
      case 'group5':
        elementW = completeBars[4].offsetWidth
        break
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