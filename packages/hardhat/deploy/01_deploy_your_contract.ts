import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const worldRouterAddresses = {
  sepolia: '0x469449f251692e0779667583026b5a1e99512157',
  optimismSepolia: '0x11cA3127182f7583EfC416a8771BD4d11Fae4334'
}

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('Network name: ', hre.network.name)


  if (hre.network.name == 'localhost' || !hre.network.name) {
    return
  }

  if (hre.network.name != 'sepolia' && hre.network.name != 'optimismSepolia') {
    return
  }

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("WorldCare", {
    from: deployer,
    log: true,
    args: [
      worldRouterAddresses[hre.network.name],
      'app_staging_47391015481f14b9ef820719cb4383a7',
      'register-user',
    ],
    autoMine: true,
  });

};

export default deployYourContract;
