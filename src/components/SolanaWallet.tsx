import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

export function SolanaWallet ({ mnemonic }: { mnemonic: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [publicKeys, setPublicKeys] = useState<string[]>([])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)


    return <>
        <div className="flex items-center gap-3">
            <button
                onClick={async () =>{
                if (!mnemonic) return
                try {
                    const seed = await mnemonicToSeed(mnemonic)
                    const path = `m/44'/501'/${currentIndex}'/0'`
                    const derivedSeed = derivePath(path, seed.toString("hex")).key
                    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
                    const keypair = Keypair.fromSecretKey(secret)

                    setCurrentIndex(i=> i+1)
                    setPublicKeys(keys => [...keys, keypair.publicKey.toBase58()])
                } catch (_err) {}
            }}
                disabled={!mnemonic}
                className="inline-flex items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-200 shadow-sm transition hover:bg-neutral-800 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Add wallet
            </button>
            <span className="text-xs text-neutral-400">Index: {currentIndex}</span>
        </div>

        <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-1">
            {publicKeys.length === 0 && (
                <div className="text-sm text-neutral-500">No wallets yet. Generate a mnemonic, then add wallets.</div>
            )}
            {publicKeys.map((p, index)=> (
                <div key={index} className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900/70 px-3 py-2 text-sm font-mono text-neutral-300">
                    <span className="truncate">{p}</span>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(p)
                                    setCopiedIndex(index)
                                    setTimeout(() => setCopiedIndex(null), 1500)
                                } catch {}
                            }}
                            className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px] font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${copiedIndex === index ? 'border-emerald-600/50 bg-emerald-900/40 text-emerald-200' : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'}`}
                            aria-label={copiedIndex === index ? 'Copied' : 'Copy address'}
                            title={copiedIndex === index ? 'Copied!' : 'Copy address'}
                        >
                            {copiedIndex === index ? 'Copied!' : 'Copy'}
                        </button>
                        <span className="text-[10px] uppercase tracking-wide text-emerald-400">SOL</span>
                    </div>
                </div>
            ))}
        </div>
    </>
}