
import { React, Component } from 'react';
import SCW from "./zeroDev/scw.js"
//import PassKeyWallet_comp from "./zeroDev/scw_passkey.js"

import { ethers } from 'ethers';


class App extends Component {

  constructor(props) {
    super(props);
    this.b_create_scw = false;
    this.state = {
      data: "Not initialised.",
      loading: true,
      error: null,
      nft_count: 0,
    };
  }

  async createSCW() {

    let result_string = "Not initialised.";

    try {

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
      result_string = this.scw.owner_address + ", EOA native: " + wallet.address


    } catch (e) {
      result_string = e.prototype.toString();
    }

    const data = result_string;
    this.setState({ data, loading: false });
  }

  async componentDidMount() {
    try {

    } catch (e) {

    }
  }


  async sendNFT() {
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

        <button type="button" onClick={this.createSCW.bind(this)}>Get Private Key Account</button>
        <button type="button" onClick={this.sendNFT.bind(this)}>Mint a Test NFT!</button>
        <p>Your Private Key Wallet; {this.state.data}</p>
        <h4>Your NFT amount is {this.state.nft_count} !</h4>
        <h4> </h4>




        <h4>Your Social Recovery AA Wallet</h4>
        <button type="button" onClick={() => alert("add protection!")}>Add Protection</button>
        <button type="button" onClick="">Key Recovery</button>

        <h5>version 2023-09-22:09-19</h5>

      </div>




    );
  }
}


export default App;
