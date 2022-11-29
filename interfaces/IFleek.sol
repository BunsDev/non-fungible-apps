// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IFleekBuilds.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

interface IFleek is IFleekBuilds, IAccessControl {
    event MetadataUpdated(string name, string description);

    function setName(string calldata _name) external;

    function setDescription(string calldata _description) external;
}
