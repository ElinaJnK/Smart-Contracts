web3js = new Web3(web3.currentProvider);

startApp();

var userAccount = "0x1325CB0109d418AdCb15E4333b2Ce5312Bd0FA4E";

/*------------------------------------------------------------------------*/
function startApp() {
    var myContractAddress = "0x1Cc1D7C79Ef7377178580A0df5Eb54497eA89159"
    var myABI = JSON.parse(`[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserEmail",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getscAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "scUserData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "scUserEmail",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "scUserName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "scUserPubKey",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_UserData",
				"type": "string"
			}
		],
		"name": "setscUserData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_UserEmail",
				"type": "string"
			}
		],
		"name": "setscUserEmail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_UserName",
				"type": "string"
			}
		],
		"name": "setscUserName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_scUserPubKey",
				"type": "bytes32"
			}
		],
		"name": "setscUserPubKey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`);
    contract = new web3js.eth.Contract(myABI, myContractAddress);

    var accountInterval = setInterval(function() { 
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
          }
        }, 100);

}

/*------------------------------------------------------------------------*/
function getUserData(){
    return contract.methods.getUserData().call();
}
/*------------------------------------------------------------------------*/
function getUserEmail(){
    return contract.methods.getUserEmail().call();
}
/*------------------------------------------------------------------------*/
function getscAddr(){
    return contract.methods.getscAddr().call();
}
/*------------------------------------------------------------------------*/
function getTimeStamp(){
    //attention, current block timestamp as seconds since unix epoch
    return contract.methods.getTimeStamp().call();
}
/*------------------------------------------------------------------------*/
async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');

    console.log("Hash en bytes32 : " + web3.utils.asciiToHex(hashHex));
    return hashHex;
}
/*------------------------------------------------------------------------*/
/**
* Secure Hash Algorithm (SHA1)
* http://www.webtoolkit.info/
**/
function SHA1(msg) {
 function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
 };
 function lsb_hex(val) {
    var str='';
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
    vh = (val>>>(i*4+4))&0x0f;
    vl = (val>>>(i*4))&0x0f;
    str += vh.toString(16) + vl.toString(16);
 }
 return str;
 };
 function cvt_hex(val) {
 var str='';
 var i;
 var v;
 for( i=7; i>=0; i-- ) {
 v = (val>>>(i*4))&0x0f;
 str += v.toString(16);
 }
 return str;
 };
 function Utf8Encode(string) {
 string = string.replace(/\r\n/g,'\n');
 var utftext = '';
 for (var n = 0; n < string.length; n++) {
 var c = string.charCodeAt(n);
 if (c < 128) {
 utftext += String.fromCharCode(c);
 }
 else if((c > 127) && (c < 2048)) {
 utftext += String.fromCharCode((c >> 6) | 192);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 else {
 utftext += String.fromCharCode((c >> 12) | 224);
 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 }
 return utftext;
 };
 var blockstart;
 var i, j;
 var W = new Array(80);
 var H0 = 0x67452301;
 var H1 = 0xEFCDAB89;
 var H2 = 0x98BADCFE;
 var H3 = 0x10325476;
 var H4 = 0xC3D2E1F0;
 var A, B, C, D, E;
 var temp;
 msg = Utf8Encode(msg);
 var msg_len = msg.length;
 var word_array = new Array();
 for( i=0; i<msg_len-3; i+=4 ) {
 j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
 msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
 word_array.push( j );
 }
 switch( msg_len % 4 ) {
 case 0:
 i = 0x080000000;
 break;
 case 1:
 i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
 break;
 case 2:
 i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
 break;
 case 3:
 i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8 | 0x80;
 break;
 }
 word_array.push( i );
 while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 word_array.push( msg_len>>>29 );
 word_array.push( (msg_len<<3)&0x0ffffffff );
 for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
 for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 A = H0;
 B = H1;
 C = H2;
 D = H3;
 E = H4;
 for( i= 0; i<=19; i++ ) {
 temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
 E = D;
 D = C;
 C = rotate_left(B,30);
 B = A;
 A = temp;
 }
 for( i=20; i<=39; i++ ) {
 temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
 E = D;
 D = C;
 C = rotate_left(B,30);
 B = A;
 A = temp;
 }
 for( i=40; i<=59; i++ ) {
 temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
 E = D;
 D = C;
 C = rotate_left(B,30);
 B = A;
 A = temp;
 }
 for( i=60; i<=79; i++ ) {
 temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
 E = D;
 D = C;
 C = rotate_left(B,30);
 B = A;
 A = temp;
 }
 H0 = (H0 + A) & 0x0ffffffff;
 H1 = (H1 + B) & 0x0ffffffff;
 H2 = (H2 + C) & 0x0ffffffff;
 H3 = (H3 + D) & 0x0ffffffff;
 H4 = (H4 + E) & 0x0ffffffff;
 }
 var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    console.log("SHA1 : " + temp.toLowerCase());
 return temp.toLowerCase();
}
/*------------------------------------------------------------------------*/
function getRandomKey(length) {
	var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var result = '';
	for ( var i = 0; i < length; i++ ) {
    	result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	}
    console.log("Result getRandomKey : " + result);
    // console.log("Result getRandomKey in bytes32: " + web3.utils.asciiToHex(result));
	return result;
}
/*------------------------------------------------------------------------*/
function setPubKey(){
    var privateKey = getRandomKey(32);
    // var pubKey = hash(privateKey);
    var pubKey = hash(privateKey);
    contract.methods.setscUserPubKey(web3.utils.asciiToHex(pubKey)).send({ from: userAccount }).on("receipt", function(receipt) {
        //$("#txStatus").text("Votre numéro favori est " + num + "!");
        console.log("Cle publique générée : " + pubKey);
        // La transaction a été acceptée sur la blokchain, il faut mettre à jour l'interface
    })
    .on("error", function(error) {
        // Si la transaction a échouée, on en informe l'utilisateur
        $("#txStatus").text(error);
    });
}
/*------------------------------------------------------------------------*/
getscAddr().then(function(result) {
    console.log("Adresse de Smart Contrat : " + JSON.stringify(result));
});

setPubKey();