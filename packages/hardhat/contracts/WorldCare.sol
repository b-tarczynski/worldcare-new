//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract WorldCare {
    // address[] public patients;
    // address[] public doctors;

    mapping(address => bool) public patients;
    mapping(address => bool) public doctors;

    mapping(address => mapping(address => bool)) public doctorsPermissions;

    using ByteHasher for bytes;

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    event DoctorRegistered(address indexed doctor, string filesCid);
    event PatientRegistered(address indexed patient, string filesCid);

    event DocumentAdded(address indexed patient, address indexed doctor, string description, string prescription);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function registerPatient(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string calldata filesCid
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        patients[signal] = true;

        emit PatientRegistered(signal, filesCid);

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
    }


    // function registerPatient() public {
    //     patients.push(msg.sender);
    // }

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function registerDoctor(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string calldata filesCid
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        doctors[signal] = true;

        emit DoctorRegistered(signal, filesCid);

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
    }

    function AddDocument(
        address patient,
        address doctor, 
        string calldata description,
        string calldata prescription) public {
        require(doctors[doctor], "Only doctors can add documents");
        require(patients[patient], "Only patients can have documents");
        emit DocumentAdded(patient, doctor, description, prescription);
    }


    function shareProfile(address doctor) public {
        require(doctors[doctor], "Only doctors can be shared with");
        require(patients[msg.sender], "Only patients can share their profile");
        doctorsPermissions[doctor][msg.sender] = true;
    }
    
    function revokeProfile(address doctor) public {
        require(doctors[doctor], "Only doctors can be shared with");
        require(patients[msg.sender], "Only patients can share their profile");
        doctorsPermissions[doctor][msg.sender] = false;
    }

    // function registerDoctor() public {
    //     doctors.push(msg.sender);
    // }
}