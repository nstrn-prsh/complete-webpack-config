import './style/list-style.scss'
import './style/style.css'
import listComp from './component/list-component'

console.log('hello home!')
const app = document.querySelector('#app')
app.appendChild(listComp.render())
