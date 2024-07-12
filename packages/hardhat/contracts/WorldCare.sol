//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract WorldCare {
    address[] public patients;
    address[] public doctors;


    function registerPatient() public {
        patients.push(msg.sender);
    }

    function registerDoctor() public {
        doctors.push(msg.sender);
    }

    function getPatients() public view returns (address[] memory) {
        return patients;
    }

    function getDoctors() public view returns (address[] memory) {
        return doctors;
    }
}