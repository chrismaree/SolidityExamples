pragma solidity^0.5.0;

contract SongRegistry {
    address owner;
    
    struct Song{
        string name;
        address payable owner;
        string url;
        uint256 price;
    }
    Song[] public songs;
    mapping (uint256 => address[]) buyers;
    
    constructor() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner(){
        msg.sender == owner;
        _;
    }
    
    function registerSong(string calldata _name, string calldata _url, uint256 _price) external {
        Song memory newSong = Song ({name: _name, owner: msg.sender, url: _url, price: _price});
        songs.push(newSong);
        buyers[songs.length - 1].push(msg.sender);
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
        require(selectedSong.price == msg.value, "Incorect value sent with song");
        buyers[_songId].push(msg.sender);
        selectedSong.owner.transfer(msg.value);
    }
    
    function numberOfSongs() public view returns(uint256) {
        return songs.length;
    }
}