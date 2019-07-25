//I know tests were not needed but it was fun to see how far I could get in 30 mins.
var Bakery = artifacts.require('Bakery')

contract('Bakery', function (accounts) {

    const owner = accounts[0]
    const baker = accounts[1]
    const buyer = accounts[1]
    const price = web3.utils.toWei("1", "ether")

    let bankedGood = {
        name: "Chocolate cake 🎂",
        price: price,
        quantity: 2
    }

    it("Should correctly add a baked good to the bakery", async () => {
        const contract = await Bakery.deployed()

        let numberOfBakedGoods = await contract.numberOfBakedGoods.call()
        assert.equal(numberOfBakedGoods.toString(), "0", 'Should start with no baked goods')

        await contract.createBakedGood(bankedGood.name,
            bankedGood.price,
            bankedGood.quantity, {
                from: baker
            })

        numberOfBakedGoods = await contract.numberOfBakedGoods.call()
        assert.equal(numberOfBakedGoods.toString(), "1", 'Did not correctly register a baked good')

        const addedBakedGood = await contract.bakedGoods.call(0);
        assert.equal(addedBakedGood[0], baker, "Baker owner not set")
        assert.equal(addedBakedGood[1], bankedGood.name, "Baked good name not set")
        assert.equal(addedBakedGood[2].toString(), bankedGood.price.toString(), "Baked good price not set")
        assert.equal(addedBakedGood[3].toString(), bankedGood.quantity.toString(), "quantity not set")
    })

    it("Should allow for baked goods to be eaten", async () => {
        const contract = await Bakery.deployed()
        await contract.createBakedGood(bankedGood.name,
            bankedGood.price,
            bankedGood.quantity, {
                from: baker,
            })

        let bakedGood = await contract.bakedGoods.call(0);
        assert.equal(bakedGood[3].toString(), (bankedGood.quantity).toString(), "quantity not set")

        await contract.eatBakedGood(0, {
            from: buyer,
            value: price
        })

        bakedGood = await contract.bakedGoods.call(0);
        // the quantity should be decreased by 1
        assert.equal(bakedGood[3].toString(), (bankedGood.quantity - 1).toString(), "quantity not set")

        //lastly we need to check that the correct value was sent
    })

    it("Should revert is wrong value sent", async () => {
        

    })
    it("Should revert is no baked goods left", async () => {

    })
})