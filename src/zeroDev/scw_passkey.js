//import { ZeroDevConnector } from "@zerodev/wagmi"
//import { useConnect, configureChains } from "wagmi"
import { createPasskeyOwner } from "@zerodev/sdk/passkey"
import React, { useEffect, useState } from "react";
import { ECDSAProvider } from '@zerodev/sdk'

const defaultProjectId = "b5486fa4-e3d9-450b-8428-646e757c10f6"//"2fc4f1f1-8fef-439c-b1a8-f456caf974b2"


function CreatePasskeyExample() {
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    
    const createPasskey = async () => {
      setLoading(true)
      try {

        const owner = await createPasskeyOwner({name: 'ZeroDev', projectId: defaultProjectId})

        const ecdsaProvider = await ECDSAProvider.init({
          projectId: defaultProjectId,
          owner: owner,
        })
        setAddress(await ecdsaProvider.getAddress())
      } catch (e) {}
      setLoading(false)
    }
  
  
    return (
      <div>
        <div>
        <button onClick={createPasskey} disabled={loading || address}>{ loading ? 'loading...' : 'Create Passkey Wallet'}</button>
        </div>
        {address && 
          <div>
            <label>Wallet: {address}</label>
          </div>
        }
      </div>
    )
  }

  export default CreatePasskeyExample

/* 
export const { chains } = configureChains(
  // make sure to specify a chain that corresponds to your ZeroDev project
)
const projectId = '2fc4f1f1-8fef-439c-b1a8-f456caf974b2'

function AuthenticateScreen() {
  const handleRegister = async () => {
    connect({
      connector: new ZeroDevConnector({
        chains, options: {
          projectId,
          owner: await createPasskeyOwner({ name: 'AA-Embrace', projectId })
        }
      })
    })
  }

  const handleLogin = async () => {
    connect({
      connector: new ZeroDevConnector({
        chains, options: {
          projectId,
          owner: await getPasskeyOwner({ projectId })
        }
      })
    })
  }

  return (
    <div>
      <button onClick={handleRegister}> Register </button>
      <button onClick={handleLogin}> Login </button>
    </div>
  )
}
export default AuthenticateScreen */