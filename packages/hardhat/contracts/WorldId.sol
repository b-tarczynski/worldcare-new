// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./interfaces/IWorldID.sol";

contract WorldId is IWorldID {
    /// @notice This implementation of IWorldID's verifyProof method always passes successfully.
    /// @dev In a real-world scenario, this would not be secure or practical.
    /// @param root The root of the Merkle tree (ignored in this mock).
    /// @param groupId The id of the Semaphore group (ignored in this mock).
    /// @param signalHash A keccak256 hash of the Semaphore signal (ignored in this mock).
    /// @param nullifierHash The nullifier hash (ignored in this mock).
    /// @param externalNullifierHash A keccak256 hash of the external nullifier (ignored in this mock).
    /// @param proof The zero-knowledge proof (ignored in this mock).
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view override {
        // In a real implementation, you would verify the zero-knowledge proof here.
        // This mock implementation simply passes to fulfill the interface requirement without any actual verification.
    }
}