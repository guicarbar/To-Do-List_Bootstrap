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

// add item 
function addItem() {
  idCount = idCount + 1
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
    <div class="form-check d-flex justify-content-between align-items-center" id='${'itemId-' + idCount}'>
      <label class="form-check-label mx-4" for="checkDefault">
        <input class="form-check-input" type="checkbox" onclick="completeTask(this, ${groups[actualGroup]})">
        ${inputText}
      </label>
      <div class="d-flex align-items-center gap-1">
        <div class="color-group ${groups[actualGroup]}"></div>
        <button type="button" class="btn"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
  `

  // coloando item no html
  checkListArea.appendChild(newItem)

  // resetando o valo do input apos ser adcionado
  input.value = ""
  input.focus()
  hasContent()
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