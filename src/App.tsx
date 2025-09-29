import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './components/SolanaWallet'
import { EthWallet } from './components/EthWallet'

function App() {

  const [mnemonic, setMnemonic] = useState("")
  const [copiedMnemonic, setCopiedMnemonic] = useState(false)

  const generate = async ()=>{
    const mn = await generateMnemonic()
    setMnemonic(mn)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_80%_20%,rgba(168,85,247,0.12),transparent),radial-gradient(600px_300px_at_20%_30%,rgba(16,185,129,0.10),transparent)]" />
      <header className="border-b border-neutral-800/60 bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">Web3 Wallet Playground</h1>
          <span className="text-xs md:text-sm text-neutral-400">Solana + Ethereum</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button
              onClick={generate}
              className="inline-flex items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 shadow-sm transition hover:bg-neutral-800 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate mnemonic
            </button>
            {mnemonic && (
              <div className="w-full md:flex-1">
                <div className="flex items-center justify-between gap-3 rounded-md border border-neutral-800 bg-neutral-900/70 p-3 shadow-inner">
                  <div className="text-xs font-mono text-neutral-300 truncate">
                    {mnemonic}
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(mnemonic)
                        setCopiedMnemonic(true)
                        setTimeout(() => setCopiedMnemonic(false), 1500)
                      } catch {}
                    }}
                    className={`shrink-0 inline-flex items-center justify-center rounded-md border px-2.5 py-1.5 text-xs font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${copiedMnemonic ? 'border-emerald-600/50 bg-emerald-900/40 text-emerald-200' : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'}`}
                    aria-label={copiedMnemonic ? 'Copied' : 'Copy mnemonic'}
                    title={copiedMnemonic ? 'Copied!' : 'Copy mnemonic'}
                  >
                    {copiedMnemonic ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Solana</h2>
              <span className="text-xs text-neutral-400">m/44'/501'/i/0'</span>
            </div>
            <SolanaWallet mnemonic={mnemonic} />
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Ethereum</h2>
              <span className="text-xs text-neutral-400">m/44'/60'/i/0'</span>
            </div>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
