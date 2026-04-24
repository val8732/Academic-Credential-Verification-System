async function main() {
  const Contract = await ethers.getContractFactory('AcademicCredential');
  const contract = await Contract.deploy();

  await contract.deployed(); // ✅ ethers v5

  console.log('Deployed to:', contract.address); // ✅ ethers v5
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
