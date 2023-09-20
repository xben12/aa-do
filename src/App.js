
import { React, Component } from 'react';
import SCW from "./zeroDev/scw.js"
//import PassKeyWallet_comp from "./zeroDev/scw_passkey.js"


import {ethers} from 'ethers';  






class App extends Component {


  constructor(props) {
    super(props);
    this.b_create_scw = false;
    this.state = {
      data: null,
      loading: true,
      error: null,
      nft_count: 0,
    };
  }

  async createSCW() {
    if (this.b_create_scw) // if already created, just return
      return;

    let projectId = "2fc4f1f1-8fef-439c-b1a8-f456caf974b2";
    let private_key = "0xf891fd65049f5576ac4a7e0430f3bf5b7eb70c4b12d1917783b009f4bf9f245f";
    this.scw = new SCW();

    await this.scw.initialise(projectId, private_key);
    console.log("owner address is", this.scw.owner_address);
    this.b_create_scw = true;

    // get EOA address: '-----BEGIN RSA PRIVATE KEY-----...'
    var wallet = new ethers.Wallet(private_key);
    const addr_msg = this.scw.owner_address + ", EOA native: " +wallet.address

    return addr_msg;
  }

  async componentDidMount() {
    try {
      const data = await this.createSCW(); //fetchData('https://api.example.com/data');
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }


  async sendNFT () {
    if (!this.b_create_scw) // if already created, just return
      return;
    const nft_count = parseInt(await this.scw.test_account()); 
    this.setState({ nft_count });
  }


  render() {

    return (

      <div className="App">
        <header className="App-header">
          <h3>AA-embrace Wallet</h3>
        </header>
        
        <button type="button" onClick="">Get Private Key Account</button>
        <button type="button" onClick={this.sendNFT.bind(this)}>Mint a Test NFT!</button>
        <p>Your Private Key Wallet; {this.state.data}</p>
        <h4>Your NFT amount is {this.state.nft_count} !</h4>
        <h4> </h4>




        <h4>Your Social Recovery AA Wallet</h4>
        <button type="button" onClick={()=> alert("add protection!")}>Add Protection</button>
        <button type="button" onClick="">Key Recovery</button>



      </div>




    );
  }
}


export default App;


/*
        <h4>Your Passkey AA Wallet</h4>
        <PassKeyWallet_comp />
*/
