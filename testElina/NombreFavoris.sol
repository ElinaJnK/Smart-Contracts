pragma solidity ^0.4.19;

contract NombreFavoris{

    uint public nbrFavoris = 7;

    function setnbrFavoris(uint _nbrFavoris) external {
        nbrFavoris = _nbrFavoris; 
    }

    function getHello() public pure returns (string){
        return "Hello World!";
    }

}