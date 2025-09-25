// ==================== VARIABLES ====================
// Count of completed items per group
let countCompletForGroup = [0, 0, 0, 0, 0];


// ==================== FUNCTIONS ====================
// ---------- Update Progress Bars ----------
function updateBars(group) {
  // Progress bar elements
  const completeBars = document.querySelectorAll('.progress-bar');
  let index;

  // Determine group index
  switch (group) {
    case 'group1': index = 0; break;
    case 'group2': index = 1; break;
    case 'group3': index = 2; break;
    case 'group4': index = 3; break;
    case 'group5': index = 4; break;
  }

  // Calculate completion percentage
  const totalItens = document.querySelectorAll(`.${group}`).length;
  const completed = countCompletForGroup[index];
  const percent = totalItens > 0 ? (completed / totalItens) * 100 : 0;

  // Update progress bar width
  completeBars[index].style.width = percent + "%";
}

// ---------- Remove Completed Point ----------
function removePointInTask(group) {
  let index;

  // Determine group index
  switch (group) {
    case 'group1': index = 0; break
    case 'group2': index = 1; break
    case 'group3': index = 2; break
    case 'group4': index = 3; break
    case 'group5': index = 4; break
  }

  // Decrement completed count
  countCompletForGroup[index]--
}

// ---------- Verify Checked Item ----------
function completeTask(element, group) {
  let index

  // Determine group index
  switch (group) {
    case 'group1': index = 0; break
    case 'group2': index = 1; break
    case 'group3': index = 2; break
    case 'group4': index = 3; break
    case 'group5': index = 4; break
  }

  // Update completed count
  if (element.checked) {
    countCompletForGroup[index]++
  } else {
    countCompletForGroup[index]--
  }

  // Update progress bars
  updateBars(group)
}

// ---------- Reset Completed Counts ----------
function resetCountComplet() {
  countCompletForGroup = [0, 0, 0, 0, 0]
}
