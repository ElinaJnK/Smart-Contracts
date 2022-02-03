pragma solidity >=0.5.0 <0.6.0;

import "./sha1.sol" ;

contract idBody {

  struct idStateEntry{
    bool scMod;
    bool idStValidation;
    uint256 scTimestamp;
  }

  address private scAddr;
  bytes32 private scUserPubKey;
  string public scUserName;
  string public scUserEmail; 
  string public scUserData; 
  uint[] scValSigns;
  uint private scTimestamp; 
 
  bool private idStValidation;
  uint256 private idStexpDate; 
  idStateEntry private IdState;
  idStateEntry[] private idStbalance;
  mapping(bytes32 => idStateEntry) UserPubKeyToBalance;

    //regexp pour la verification d'email (version simple)
    string public regex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-_]+\\.[a-zA-Z]{2,}";

  constructor(string memory _UserName, string memory _UserData, string memory _UserEmail) public {

    scUserName = _UserName;
    scUserEmail = _UserEmail; 
    scUserData = _UserData;
    scAddr = msg.sender;
    scTimestamp = block.timestamp;

  }



  function getUserData() public view returns (string memory){
    return scUserData;
  }

  function getscAddr() public view returns (address){
    return scAddr;
  }

  function getTimeStamp() public view returns (uint){
    //attention, current block timestamp as seconds since unix epoch
    return scTimestamp;
  }

    //initialise idStateEntry et le rajoute dans idSyBalance, associe en meme temps un client avec l'etat de sa balance
  function setIdStateEntry() public{
      idStateEntry memory idStateE = idStateEntry({
        scMod: true,
        idStValidation: idStValidation,
        scTimestamp: scTimestamp
      });
      UserPubKeyToBalance[scUserPubKey] = idStateE;
      idStbalance.push(idStateE);
    }

    //transforme une string en string hash
    function scHashCalculation(string memory _scUserData) public pure returns (bytes20){
        return SHA1.sha1(bytes(_scUserData));
    }
    //en cours de test
    function splitSignature(bytes memory signature) public pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(signature.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(signature, 32))
            // second 32 bytes.
            s := mload(add(signature, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(signature, 96)))
        }

        return (v, r, s);
    }
    

    //input a message hash, v, r and s values and generate the public key
    function recoverPublicAddress (bytes32 messagehash, uint8 v, bytes32 r, bytes32 s) public pure
    returns (address sender) {
        return ecrecover(messagehash, v, r, s);
  }
  //function getUserSign() public{
    //return web3.eth.sign(scUserData, scUserPubKey);
  //}
}