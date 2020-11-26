import '../style/list-style.scss'

class ListComp {
  createItem (title) {
    const item = document.createElement('li')
    item.innerText = title
    return item
  }

  render () {
    const element = document.createElement('ul')
    element.appendChild(this.createItem('item 0'))
    element.appendChild(this.createItem('item 1'))
    element.appendChild(this.createItem('item 2'))
    return element
  }
}

export default new ListComp()
