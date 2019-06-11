pragma solidity^0.5.0;

contract SongRegistry {
    address owner;
    
    struct Song{
        string name;
        address payable owner;
        string url;
        uint256 price;
    }
    Song[] songs;
    uint256 public numberOfSongs = 0;
    mapping (uint256 => address[]) buyers;
    
    constructor() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner(){
        msg.sender == owner;
        _;
    }
    
    function registerSong(string memory _name, string memory _url, uint256 _price) public {
        songs[numberOfSongs] = Song ({name: _name, owner: msg.sender, url: _url, price: _price});
        buyers[numberOfSongs].push(msg.sender);
        numberOfSongs = numberOfSongs + 1;
    }
    
    function isBuyer(uint256 _songId) public view returns(bool){
        uint256 numberOfBuyers = buyers[_songId].length;
        for(uint256 i = 0; i < numberOfBuyers; i ++){
            if (buyers[_songId][i] == msg.sender){
                return true;
            }
        }
        return false;
    }
    
    function buySong(uint256 _songId) public payable returns (bool){
        Song memory selectedSong = songs[_songId];
        require(selectedSong.price == msg.value);
        buyers[_songId].push(msg.sender);
        selectedSong.owner.transfer(msg.value);
    }
}