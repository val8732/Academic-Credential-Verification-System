// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AcademicCredential {

    struct Credential {
        string studentName;
        string institution;
        string course;
        string hash;
        bool exists;
    }

    mapping(string => Credential) public credentials;

    function issueCredential(
        string memory id,
        string memory studentName,
        string memory institution,
        string memory course,
        string memory hash
    ) public {
        require(!credentials[id].exists, "Already exists");

        credentials[id] = Credential(
            studentName,
            institution,
            course,
            hash,
            true
        );
    }

    function verifyCredential(string memory id)
    public
    view
    returns (
        string memory,
        string memory,
        string memory,
        string memory
    )
{
    Credential memory c = credentials[id];

    if (!c.exists) {
        return ("", "", "", "");
    }

    return (
        c.studentName,
        c.institution,
        c.course,
        c.hash
    );
}
}