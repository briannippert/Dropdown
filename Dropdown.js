class Dropdown {
  constructor (parent, data) {
    this.parent = parent
    this.data = data
    this.required = false
    parent.addEventListener('focus', this.show)
    parent.addEventListener('blur', this.hide)
    parent.addEventListener('change', this.textChange)
    parent.addEventListener('keyup', this.textChange)
    parent.addEventListener('paste', this.textChange)

    parent.dropdown = this
    this.refreshData(data)
  }
  show (evt) {
    console.log('Debug: Showing Dropdown - ' + this.id)
  }
  hide (evt) {
    if (evt.target.dropdown.validateInput() === false && evt.target.value !== '') {
      if (evt.target.dropdown.validateInput() === false) {
        setInvalid(evt.target)
      }
      evt.target.value = ''
      evt.target.focus()
    } else if (evt.target.dropdown.validateInput() === true) {
      setValid(evt.target)
    }
    console.log('Debug: Hiding Dropdown - ' + this.id)
  }
  textChange (evt) {
    if (evt.target.dropdown.validateInput() === true) {
      setValid(evt.target)
      var event = new Event('dropdownChanged')
      evt.target.dispatchEvent(event)
      console.log('Dropdown Event Fired')
    }
    if (evt.target.dropdown.data == null) {
    }
  }
  setRequired (bool) {
    this.required = bool
  }
  refreshData (data) {
    if (data === null) {
      console.log('ERROR: Data Cannot Be Null!')
    } else {
      var htmlOutput = '<datalist id=dropdown-' + this.parent.id + '>'
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i])
        htmlOutput += '<option value="' + data[i] + '">'
      }
    }
    htmlOutput += '</datalist>'
    this.parent.innerHTML = htmlOutput
    this.parent.setAttribute('list', 'dropdown-' + this.parent.id)
  }
  validateInput () {
    var dataCorrect = false
    var curVal = this.parent.value
    for (var i = 0; i < this.data.length; i++) {
      if (curVal === this.data[i]) {
        dataCorrect = true
      }
    }
    return dataCorrect
  }
}
function setInvalid (element) {
  element.classList.add('invalid')
}
function setValid (element) {
  element.classList.remove('invalid')
}
