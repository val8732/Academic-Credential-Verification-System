import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractABI = [
  "function issueCredential(string,string,string,string,string)",
  "function verifyCredential(string) view returns (string,string,string,string)",
];

export const getContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545",
  );

  const signer = provider.getSigner();

  return new ethers.Contract(contractAddress, contractABI, signer);
};
