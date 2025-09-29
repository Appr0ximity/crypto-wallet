import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './components/SolanaWallet'
import { EthWallet } from './components/EthWallet'

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
    <br />
    <SolanaWallet mnemonic={mnemonic}></SolanaWallet>
    <EthWallet mnemonic={mnemonic}></EthWallet>
    </>
  )
}

export default App
