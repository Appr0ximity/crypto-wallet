import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({mnemonic}: {mnemonic: string}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    return (
        <>
            <div className="flex items-center gap-3">
                <button
                    onClick={async function() {
                        if (!mnemonic) return;
                        const seed = await mnemonicToSeed(mnemonic);
                        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                        const hdNode = HDNodeWallet.fromSeed(seed);
                        const child = hdNode.derivePath(derivationPath);
                        const privateKey = child.privateKey;
                        const wallet = new Wallet(privateKey);
                        setCurrentIndex(currentIndex + 1);
                        setAddresses([...addresses, wallet.address]);
                    }}
                    disabled={!mnemonic}
                    className="inline-flex items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-200 shadow-sm transition hover:bg-neutral-800 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add wallet
                </button>
                <span className="text-xs text-neutral-400">Index: {currentIndex}</span>
            </div>

            <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-1">
                {addresses.length === 0 && (
                    <div className="text-sm text-neutral-500">No wallets yet. Generate a mnemonic, then add wallets.</div>
                )}
                {addresses.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900/70 px-3 py-2 text-sm font-mono text-neutral-300">
                        <span className="truncate">{p}</span>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText(p);
                                        setCopiedIndex(idx);
                                        setTimeout(() => setCopiedIndex(null), 1500);
                                    } catch {}
                                }}
                                className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px] font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${copiedIndex === idx ? 'border-emerald-600/50 bg-emerald-900/40 text-emerald-200' : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'}`}
                                aria-label={copiedIndex === idx ? 'Copied' : 'Copy address'}
                                title={copiedIndex === idx ? 'Copied!' : 'Copy address'}
                            >
                                {copiedIndex === idx ? 'Copied!' : 'Copy'}
                            </button>
                            <span className="text-[10px] uppercase tracking-wide text-amber-400">ETH</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}