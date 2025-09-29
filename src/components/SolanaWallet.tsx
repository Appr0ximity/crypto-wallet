import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

export function SolanaWallet ({ mnemonic }: { mnemonic: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [publicKeys, setPublicKeys] = useState<string[]>([])


    return <>
        <button onClick={async () =>{
        const seed = await mnemonicToSeed(mnemonic)
        const path = `m/44'/501'/${currentIndex}'/0'`
        const derivedSeed = derivePath(path, seed.toString("hex")).key
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        const keypair = Keypair.fromSecretKey(secret)

        setCurrentIndex(i=> i+1)
        setPublicKeys(keys => [...keys, keypair.publicKey.toBase58()])
    }}>
            Add Wallet
        </button>
        {publicKeys.map((p, index)=> (
            <div key={index}>
                {p}
            </div>
        ))}
    </>
}