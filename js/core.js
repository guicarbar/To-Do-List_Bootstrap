// vars
// group vars - classes
const groups = ['group1', 'group2', 'group3', 'group4', 'group5',]
// group atual
let actualGroup = 0
// input listener var
const input = document.getElementById(`input-item`)
// id count
let idCount = 0

// functions
// change group 
function changeGruop(group) {
  actualGroup = group - 1
  console.log(`Os itens serão adcionados no grupo: ${groups[actualGroup]}`)
}

// get checklist area
const checkListArea = document.getElementById('checklist')



// remove task - mmodal initial
function removeTaskCheck(itemId) {
  // se existir algim modal anterior ele apaga
  const oldModal = document.getElementById('dynamicModal')
  if (oldModal) oldModal.remove()

  // cria modal dinamicamente com o click
  const modalHtml = `
  <div class="modal fade" id="dynamicModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Quer apagar esse item ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="RemoveItemBtn">Apagar</button>
        </div>
      </div>
    </div>
  </div>
  `

  // adiciona no body
  document.body.insertAdjacentHTML('beforeend', modalHtml)

  // pega o modal criado
  const modalEl = document.getElementById('dynamicModal')
  const modal = new bootstrap.Modal(modalEl)

  // adiciona evento no botão confirmar
  modalEl.querySelector('#RemoveItemBtn').addEventListener('click', () => {
    modal.hide()


  })

  // abre o modal
  modal.show()
}




// add item 
function addItem() {
  idCount ++
  // get text
  const inputText = input.value.trim()
  // safe text - sanitizar
  const safeText = DOMPurify.sanitize(inputText)

  // cria um elemento temporario para extrair o texto visivel
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = safeText
  const visibleText = tempDiv.textContent.trim()

  // se não houver texto visivel, nao adiciona
  if (!visibleText) {
    input.value = ""
    input.focus()
    return 
  }

  // criando elemento
  const newItem = document.createElement(`div`)
  newItem.innerHTML = `
    <div class="form-check d-flex justify-content-between align-items-center" id='itemId-${idCount}'>
      <label class="form-check-label mx-4" for="checkDefault">
        <input class="form-check-input" type="checkbox" onclick="completeTask(this, '${groups[actualGroup]}')">
        ${inputText}
      </label>
      <div class="d-flex align-items-center gap-1">
        <div class="color-group ${groups[actualGroup]}"></div>
        <button type="button" class="btn" onclick="removeTaskCheck('itemId-${idCount}')"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
  `

  // coloando item no html
  checkListArea.appendChild(newItem)

  // resetando o valo do input apos ser adcionado
  input.value = ""
  input.focus()
  hasContent()

  // att bars
  checkHasIten()
  // update bars
  updateBars(groups[actualGroup])
}



// tem conteudo na checklist
function hasContent() {
  // create visual element
  const hasContent = document.createElement("p")
  hasContent.className = "text-center"
  hasContent.id = "visualElement"
  hasContent.textContent = "Seu item irá aparecer aqui assim que for adicionado."

  // Verifica se já existe o item
  if (checkListArea.innerHTML.trim().length > 0) {
    // se o cheklist teiver dados
    const visual = document.getElementById("visualElement")
    if (visual) visual.remove()
  } else {
    // se o checklist estiver vazio
    checkListArea.appendChild(hasContent)
  }
}



// event listener in enter input
input.addEventListener("keydown", (Event) => {
  if (Event.key === 'Enter') {
    Event.preventDefault()
    addItem()
  }
})



// initial check itens
document.addEventListener("DOMContentLoaded", () => {
  checkHasIten()
  hasContent()
})