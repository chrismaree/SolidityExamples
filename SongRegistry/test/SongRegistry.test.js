var SongRegistry = artifacts.require('SongRegistry')

contract('SongRegistry', function (accounts) {

    const owner = accounts[0]
    const songWriter = accounts[1]
    const buyer = accounts[2]
    const price = web3.utils.toWei("1", "ether")

    it("Should correctly add a song to the registry", async () => {
        const contract = await SongRegistry.deployed()

        let numberOfSongs = await contract.numberOfSongs.call()
        assert.equal(numberOfSongs.toString(), "0", 'Should start with no songs')

        await contract.registerSong("My Epic Rock song 🤘",
            "https://www.ujomusic.com/",
            price, {
                from: songWriter
            })

        numberOfSongs = await contract.numberOfSongs.call()
        assert.equal(numberOfSongs.toString(), "1", 'Did not correctly register a song.')

        const addedSong = await contract.songs.call(0);
        assert.equal(addedSong[0], "My Epic Rock song 🤘", "Song name not set")
        assert.equal(addedSong[1], songWriter)
        assert.equal(addedSong[2], "https://www.ujomusic.com/", "Song address not set")
        assert.equal(addedSong[3].toString(), price.toString(), "price not added")
    })

    it("Can buy a song", async () => {
        const contract = await SongRegistry.deployed()
        await contract.registerSong("My Epic Rock song 🤘",
            "https://www.ujomusic.com/",
            price, {
                from: songWriter
            })

        let songOwner = await contract.isBuyer.call(0, {
            from: buyer
        })
        assert.equal(songOwner, false, "should not be song owner")

        await contract.buySong(0, {
            from: buyer,
            value: price
        })

        songOwner = await contract.isBuyer.call(0, {
            from: buyer
        })
        assert.equal(songOwner, true, "should be song owner")
    })
})