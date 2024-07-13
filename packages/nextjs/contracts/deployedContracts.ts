/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    Counter: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: [
        {
          inputs: [],
          name: "count",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "dec",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "get",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "inc",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    WorldCare: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IWorldID",
              name: "_worldId",
              type: "address",
            },
            {
              internalType: "string",
              name: "_appId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_actionId",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidNullifier",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "DoctorRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          name: "PatientRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "TransactionPaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "VisitAdded",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "addVisit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctors",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctorsPermissions",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "patients",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "payForVisit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
            {
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "registerDoctor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerPatient",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "revokeProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "shareProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "visitdetails",
          outputs: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "paid",
              type: "bool",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    WorldId: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "signalHash",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "externalNullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "verifyProof",
          outputs: [],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        verifyProof: "contracts/interfaces/IWorldID.sol",
      },
    },
  },
  84532: {
    WorldCare: {
      address: "0x27EcDfea73eFC671bF57852aEC460cCA4Ba14327",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IWorldID",
              name: "_worldId",
              type: "address",
            },
            {
              internalType: "string",
              name: "_appId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_actionId",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidNullifier",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "DoctorRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          name: "PatientRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "TransactionPaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "VisitFinalized",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctors",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctorsPermissions",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "finalizeVisit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "patients",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "payForVisit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
            {
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "registerDoctor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerPatient",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "revokeProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "shareProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "visitdetails",
          outputs: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "paid",
              type: "bool",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155111: {
    WorldCare: {
      address: "0xa4DEDd69aDeF6D85d79Cd7cF19B14621096D1218",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IWorldID",
              name: "_worldId",
              type: "address",
            },
            {
              internalType: "string",
              name: "_appId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_actionId",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidNullifier",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "doctors",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getDoctors",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getPatients",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "patients",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "registerDoctor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerPatient",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155420: {
    WorldCare: {
      address: "0x27EcDfea73eFC671bF57852aEC460cCA4Ba14327",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IWorldID",
              name: "_worldId",
              type: "address",
            },
            {
              internalType: "string",
              name: "_appId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_actionId",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidNullifier",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "DoctorRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          name: "PatientRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "TransactionPaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "VisitFinalized",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctors",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "doctorsPermissions",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "finalizeVisit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "patients",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "visitCid",
              type: "string",
            },
          ],
          name: "payForVisit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
            {
              internalType: "string",
              name: "filesCid",
              type: "string",
            },
          ],
          name: "registerDoctor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerPatient",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "revokeProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "shareProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "visitdetails",
          outputs: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "paid",
              type: "bool",
            },
            {
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
