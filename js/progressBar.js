// ==================== VARIABLES ====================
// Progress bar elements
const arrayProgressBar = document.querySelectorAll('.progress')
// Items count by group
let itensGroupByClassName = [0, 0, 0, 0, 0]

// ==================== FUNCTIONS ====================
// ---------- Update Count by Group ----------
function updateCountGroup() {
  // Count elements by group className
  for (let i = 1; i <= 5; i++) {
    itensGroupByClassName[i - 1] = document.getElementsByClassName(`group${i}`).length
  }
}

// ---------- Split Positions into Empty and Non-Empty ----------
function splitPositions() {
  // Arrays to store positions
  const nulls = [];
  const notNulls = [];

  // Separate items
  itensGroupByClassName.forEach((num, index) => {
    if (num === 0) {
      nulls.push(index)
    } else {
      notNulls.push(index)
    }
  });

  // Return result
  return { nulls, notNulls }
}

// ---------- Check if Checklist Has Items ----------
function checkHasIten() {
  // Update item counts
  updateCountGroup()

  // Get the element that shows "create your first item"
  const elementNulls = document.getElementById('textNulls')

  // Get positions split
  const positionSplited = splitPositions()

  // Show message if all groups are empty
  if (positionSplited.nulls.length === 5) {
    elementNulls.style.display = 'block'
  } else {
    elementNulls.style.display = 'none'
  }

  // Hide progress bars for empty groups
  positionSplited.nulls.forEach((num) => {
    if (arrayProgressBar[num]) arrayProgressBar[num].style.display = "none"
  })

  // Show progress bars for groups with items
  positionSplited.notNulls.forEach((num) => {
    if (arrayProgressBar[num]) arrayProgressBar[num].style.display = "flex"
  })
}

// ---------- Reset Items Count ----------
function resetItensCount() {
  itensGroupByClassName = [0, 0, 0, 0, 0]
}
