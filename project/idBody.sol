// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "./sha1.sol" ;
//
contract idBody {

  address private scAddr;
  uint private scUserDataNonce;
  bytes32 public scUserPubKey;

  string public scUserName;
  string public scUserEmail; 
  string public scUserData; 
  uint private scTimestamp; 

  struct uCertificate{
    uint scUserPubKey;
    string scUserName;
    string scUserEmail; 
    string scUserData; 
    uint scTimestamp; 
  }

  constructor(){
    scAddr = msg.sender;
    scTimestamp = block.timestamp;
  }

  function getUserData() public view returns (string memory){
    return scUserData;
  }

  function getUserEmail() public view returns (string memory){
    return scUserEmail;
  }

  function getscAddr() public view returns (address){
    return scAddr;
  }

  function getTimeStamp() public view returns (uint){
    //attention, current block timestamp as seconds since unix epoch
    return scTimestamp;
  }

  function setscUserPubKey(bytes32 _scUserPubKey) external{
    scUserPubKey =  _scUserPubKey;
  }

  function setscUserName(string memory _UserName) external{
    scUserName =  _UserName;
  }

  function setscUserEmail(string memory _UserEmail) external{
    scUserEmail =  _UserEmail;
  }
  function setscUserData(string memory _UserData) external{
    scUserData =  _UserData;
  }

}