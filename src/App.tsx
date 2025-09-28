import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'

function App() {

  const [mnemonic, setMnemonic] = useState("")

  const generate = async ()=>{
    const mn = await generateMnemonic()
    setMnemonic(mn)
  }

  return (
    <>
    <button className='' onClick={generate}>Click to generate Mnemonic &nbsp;</button>
    {mnemonic}
    </>
  )
}

export default App
