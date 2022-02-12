web3js = new Web3(web3.currentProvider);

var userAccount = "0x1325CB0109d418AdCb15E4333b2Ce5312Bd0FA4E";
startApp();
//var myContract = new web3js.eth.Contract(myABI, myContractAddress);

console.log("user acc: "+userAccount);

function startApp() {
    var myContractAddress = "0xfCE0C9e6BC4E44CAe6D233d4fA7aD16235EAF5eD";
    var myABI = JSON.parse(`[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_nbrFavoris",
				"type": "uint256"
			}
		],
		"name": "setnbrFavoris",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHello",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nbrFavoris",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]`);




    whatever = new web3js.eth.Contract(myABI, myContractAddress);

	
    var accountInterval = setInterval(function() {
          // Check if account has changed
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            // Call a function to update the UI with the new account
            getZombiesByOwner(userAccount)
            .then(displayZombies);
          }
        }, 100);

}

/*beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(Inbox.interface))
        .deploy({ data: Inbox.bytecode, arguments: [ 'Hello world!'] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider)
});*/

function setFavoriteNumber(num){
    whatever.methods.setnbrFavoris(num).send({ from: userAccount }).on("receipt", function(receipt) {
    //$("#txStatus").text("Votre numéro favori est " + num + "!");
    console.log("Votre numéro favori est : "+num);
    // La transaction a été acceptée sur la blokchain, il faut mettre à jour l'interface
    //getAccounts(userAccount).then(displayZombies);
  })
  .on("error", function(error) {
    // Si la transaction a échouée, on en informe l'utilisateur
    $("#txStatus").text(error);
  });
}


function getHelloW(){
    return whatever.methods.getHello().call();
}

getHelloW().then(function(result) {
    console.log("Hello World : " + JSON.stringify(result));
});

setFavoriteNumber(90);
