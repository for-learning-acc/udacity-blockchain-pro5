var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const name = "RealEstate";
    const symbol = "RE";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: owner});

            // TODO: mint multiple tokens
            for (let i = 0; i < 10; i++) {
                await this.contract.mint(account_one, i, {from: owner});
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 10, "Total supply should be 10");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_one);
            assert.equal(balance, 10, "Balance of account[1] should be 10");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Wrong uri");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            let balance1 = await this.contract.balanceOf(account_one);
            let balance2 = await this.contract.balanceOf(account_two);
            assert.equal(balance1, 9, "Balance of account[1] should be 9");
            assert.equal(balance2, 1, "Balance of account[1] should be 1");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let flag = false;
            try {
                await this.contract.mint(account_one, 2, {from: account_two});
                flag = true;
            } catch (error) {
            }
            assert.equal(flag, false, "Transfer should fail");
        })

        it('should return contract owner', async function () { 
            let _owner = await this.contract.owner();
            assert.equal(_owner, account_one, "Wrong ownership");
        })

    });
})