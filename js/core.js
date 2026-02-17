// ==================== VARIABLES ====================
// Group classes
const groups = ['group1', 'group2', 'group3', 'group4', 'group5']
// Current group index
let actualGroup = 0
// Input element listener
const input = document.getElementById('input-item')
// ID counter for checklist items
let idCount = 0
// next group fot tab
let nextgroup = 0
// Checklist container
const checkListArea = document.getElementById('checklist')
const indicator = this.document.getElementById('groupIndicator')

// ==================== FUNCTIONS ====================
// ---------- Change Group ----------
function changeGruop(group) {
  // removenoid indicador antigo
  indicator.classList.remove(`${groups[actualGroup]}`)
  // mudanod o grupo atual
  actualGroup = group - 1
  nextgroup = group
  // trocando o indicador
  indicator.classList.add(`${groups[actualGroup]}`)
  console.log(`Items will be added to group: ${groups[actualGroup]}`)
}

// ---------- Remove Task ----------
function removeTaskCheck(itemId, group, checkbox) {
  // Remove previous modal if exists
  const oldModal = document.getElementById('dynamicModal')
  if (oldModal) oldModal.remove()

  // Create dynamic modal HTML
  const modalHtml = `
  <div class="modal fade" id="dynamicModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Do you want to delete this item?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="RemoveItemBtn">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `

  // Insert modal into body
  document.body.insertAdjacentHTML('beforeend', modalHtml)

  // Get modal element and initialize Bootstrap modal
  const modalEl = document.getElementById('dynamicModal')
  const modal = new bootstrap.Modal(modalEl)

  // Delete button event
  modalEl.querySelector('#RemoveItemBtn').addEventListener('click', () => {
    modal.hide()

    // Check if checkbox was checked
    const checkboxitem = document.getElementById(checkbox);
    if (checkboxitem && checkboxitem.checked) {
      removePointInTask(group)
    }

    // Remove checklist element
    const elmentCheckList = document.getElementById(itemId);
    if (elmentCheckList) elmentCheckList.remove();

    checkHasIten()
    updateBars(group)
    hasContent()
  });

  // Show modal
  modal.show()
}

// ---------- Add Item ----------
function addItem() {
  idCount++

  // Get input text and sanitize
  const inputText = input.value.trim()
  const safeText = DOMPurify.sanitize(inputText)

  // Extract visible text
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = safeText
  const visibleText = tempDiv.textContent.trim()

  // Return if no visible text
  if (!visibleText) {
    input.value = ""
    input.focus()
    return
  }

  // Create checklist item element
  const newItem = document.createElement("div");
  newItem.className = "form-check d-flex justify-content-between align-items-center";
  newItem.id = `itemId-${idCount}`
  newItem.innerHTML = `
    <label class="form-check-label mx-4" for="checkDefault">
      <input class="form-check-input" id="checkbox-${idCount}" type="checkbox" onclick="completeTask(this, '${groups[actualGroup]}')">
      ${safeText}
    </label>
    <div class="d-flex align-items-center gap-1">
      <div class="color-group ${groups[actualGroup]}"></div>
      <button type="button" class="btn" onclick="removeTaskCheck('itemId-${idCount}', '${groups[actualGroup]}', 'checkbox-${idCount}')">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  `

  // Append item to checklist
  checkListArea.appendChild(newItem);

  // Reset input
  input.value = ""
  input.focus()
  hasContent()

  // Update progress bars
  checkHasIten()
  updateBars(groups[actualGroup])
}

// ---------- Checklist Content Handling ----------
function hasContent() {
  const hasContent = document.createElement("p")
  hasContent.className = "text-center"
  hasContent.id = "visualElement"
  hasContent.textContent = "Your item will appear here once added."

  // Check if checklist has items
  if (checkListArea.innerHTML.trim().length > 0) {
    const visual = document.getElementById("visualElement")
    if (visual) visual.remove()
  } else {
    checkListArea.appendChild(hasContent)
  }
}

// ==================== EVENT LISTENERS ====================
// Add item on Enter key
input.addEventListener("keydown", (Event) => {
  if (Event.key === 'Enter') {
    Event.preventDefault()
    addItem()
  }
})

// Initial setup on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  checkHasIten()
  hasContent()
})

// trocar a de grupo com ArrowDown
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    nextgroup ++
    if (nextgroup > 4) {
      nextgroup = 1
    } else {
    }
    changeGruop(nextgroup)
  }
})


//==================== Check / Uncheck All Items ====================
function checkAll() {
  const checkBox = document.getElementById('checkAllItem');
  let i = 0

  // Check all items
  if (checkBox.checked === true) {
    while (i <= idCount) {
      const checkBoxItem = document.getElementById(`checkbox-${i}`);
      if (checkBoxItem && !checkBoxItem.checked) checkBoxItem.click();
      i++
    }
  }

  // Uncheck all items
  if (checkBox.checked === false) {
    while (i <= idCount) {
      const checkBoxItem = document.getElementById(`checkbox-${i}`);
      if (checkBoxItem && checkBoxItem.checked) checkBoxItem.click();
      i++
    }
  }
}

// ==================== CLEAR ALL CHECKLIST ====================
function clearAll() {
  // Remove previous modal if exists
  const oldModal = document.getElementById('dynamicModal');
  if (oldModal) oldModal.remove();

  // Dynamic modal HTML
  const modalHtml = `
  <div class="modal fade" id="dynamicModalAll" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Do you want to delete your entire list?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="RemoveItemBtnAll">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `


  // Append modal to body
  document.body.insertAdjacentHTML('beforeend', modalHtml)

  // Get modal element and initialize Bootstrap modal
  const modalEl = document.getElementById('dynamicModalAll')
  const modal = new bootstrap.Modal(modalEl)

  // Delete all button event
  modalEl.querySelector('#RemoveItemBtnAll').addEventListener('click', () => {
    modal.hide()

    // Remove all checklist items
    let i = 0
    while (i <= idCount) {
      const elmetnById = document.getElementById(`itemId-${i}`)
      if (elmetnById) elmetnById.remove()
      i++
    }

    // Reset ID counter
    idCount = 0

    // Reset validations
    resetItensCount()
    resetCountComplet()
    checkHasIten()
    hasContent()
  })

  // Show modal
  modal.show()
}


// carrega cor inicial do indicador de grupo
window.addEventListener("load", function() {
  indicator.classList.add(`${groups[actualGroup]}`)
})