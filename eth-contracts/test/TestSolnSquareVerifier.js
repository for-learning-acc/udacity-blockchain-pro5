var Verifier = artifacts.require('Verifier');
var proof = require("../../zokrates/code/square/proof.json");
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssert = require('truffle-assertions');

contract('TestSolnSquareVerifier', accounts => {
    const CONTRACT_NAME = "RealEstate"
    const CONTRACT_SYMBOL = "RE"

    let owner = accounts[0];

    describe('Test TestSolnSquareVerifier', function () {
        beforeEach(async function () {
            this.verifier = await Verifier.new({from: owner});
            let verifierAddress = this.verifier.address;
            this.solnSquareVerifier = await SolnSquareVerifier.new(verifierAddress, CONTRACT_NAME, CONTRACT_SYMBOL, {from: owner});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () { 
            let solution = {
                index: 1,
                owner: accounts[0],
            }
            
            // Watch the emitted event SolutionAdded()
            let event = await this.solnSquareVerifier.addSolution(
                solution.index,
                solution.owner,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                {from: owner}
            );

            truffleAssert.eventEmitted(event, 'SolutionAdded');
        })

    

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () { 
            let solution = {
                index: 1,
                owner: accounts[0],
            }

            let isMinted = false;
            try {
                result = await this.solnSquareVerifier.mintNFT(
                    solution.index,
                    solution.owner,
                    proof.proof.a,
                    proof.proof.b,
                    proof.proof.c,
                    proof.inputs,
                    {from: owner}
                );

                isMinted = true;
            } catch (error) {
                console.log({error});
            }
            assert.equal(isMinted, true, 'NFT is not minted');
        })
    })
})
