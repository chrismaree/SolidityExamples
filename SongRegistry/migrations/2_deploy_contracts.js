var SongRegistry = artifacts.require("./SongRegistry.sol");

module.exports = function (deployer) {
    deployer.deploy(SongRegistry);
};