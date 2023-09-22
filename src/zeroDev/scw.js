import { ECDSAProvider } from '@zerodev/sdk'
import { LocalAccountSigner } from "@alchemy/aa-core"
import { encodeFunctionData, parseAbi, createPublicClient, http } from 'viem'
import { polygonMumbai } from 'viem/chains'

class SCW {

    constructor() {
        this.created = true;
    }

    async initialise(projectId, _private_key) {
        try {
            this.projectId = projectId;
            this.owner = LocalAccountSigner.privateKeyToAccountSigner(_private_key);

            const owner = this.owner;
            this.ecdsaProvider = await ECDSAProvider.init({
                projectId,
                owner,
            })
            this.owner_address = await this.ecdsaProvider.getAddress()
            // console.log('My address:', this.owner_address)

            return this.owner_address;
         }
        catch (err) {
            console.log(err)
            return err.prototype.toString();
        } 
    }

    async test_account() {
        // Mint the NFT

        // The NFT contract we will be interacting with
        const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
        const contractABI = parseAbi([
            'function mint(address _to) public',
            'function balanceOf(address owner) external view returns (uint256 balance)'
        ])
        const publicClient = createPublicClient({
            chain: polygonMumbai,
            // the API is rate limited and for demo purposes only
            // in production, replace this with your own node provider (e.g. Infura/Alchemy)
            transport: http('https://polygon-mumbai.infura.io/v3/f36f7f706a58477884ce6fe89165666c'),
        })

        const address = this.owner_address
        const { hash } = await this.ecdsaProvider.sendUserOperation({
            target: contractAddress,
            data: encodeFunctionData({
                abi: contractABI,
                functionName: 'mint',
                args: [address],
            }),
        })
        await this.ecdsaProvider.waitForUserOperationTransaction(hash)

        // Check how many NFTs we have
        const balanceOf = await publicClient.readContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'balanceOf',
            args: [address],
        })
        return balanceOf;
    }

}

export default SCW;

