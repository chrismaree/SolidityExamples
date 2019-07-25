var Bakery = artifacts.require("./Bakery.sol");

module.exports = function (deployer) {
    deployer.deploy(Bakery);
};