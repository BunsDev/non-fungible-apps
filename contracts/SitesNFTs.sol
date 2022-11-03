// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SitesNFTs is ERC721URIStorage, AccessControl {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private baseURI;

    bytes32 public constant MINTER_ROLE = 0x4d494e5445525f524f4c45000000000000000000000000000000000000000000; // "MINTER_ROLE"

    modifier canMint() {
        bool isMinterOrAdmin = hasRole(MINTER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        require(isMinterOrAdmin, "Caller has no permission to mint.");
        _;
    }

    modifier tokenBelongsToAddress(uint256 tokenId, address holderAddress) {
        require(ownerOf(tokenId) == holderAddress, "Address doesnt own tokenId.");
        _;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        baseURI = "data:application/json;base64,";
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(string memory base64EncodedMetadata, address account) public canMint()  returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(account, newItemId);
        _setTokenURI(newItemId, base64EncodedMetadata);

        _tokenIds.increment();
        return newItemId;
    }

    function updateTokenURI(address tokenHolderAddress, uint256 tokenId, string memory newTokenURI) public canMint() {

    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory _newBbaseURI) public {
        baseURI = _newBbaseURI;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    receive() external payable {}

    fallback() external {}
}