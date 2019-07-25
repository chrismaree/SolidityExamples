pragma solidity^0.5.0;

contract Bakery{
    struct BakedGood {
        address payable owner;
        string name;
        uint256 price;
        uint256 quantity;
    }

    BakedGood[] public bakedGoods;
    
    function createBakedGood(string calldata _name, uint256 _price, uint256 _quantity) external returns(uint256){
        BakedGood memory newBakedGood = BakedGood({owner: msg.sender, name: _name, price: _price, quantity: _quantity});
        uint256 addedIndex = bakedGoods.push(newBakedGood);
        return (addedIndex);
    }
    
    function eatBakedGood(uint256 _bakedGoodIndex) external payable{
        BakedGood memory selectedBackedGood = bakedGoods[_bakedGoodIndex];
        require(selectedBackedGood.price == msg.value, "wrong value sent");
        require(selectedBackedGood.quantity >= 1, "No baked goods left");
        bakedGoods[_bakedGoodIndex].quantity -= 1;
        selectedBackedGood.owner.transfer(selectedBackedGood.price);
    }

    function numberOfBakedGoods() external view returns (uint256){
        return (bakedGoods.length);
    }
}