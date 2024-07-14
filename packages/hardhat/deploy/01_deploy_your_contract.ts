import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const worldRouterAddresses = {
  sepolia: '0x469449f251692e0779667583026b5a1e99512157',
  optimismSepolia: '0x11cA3127182f7583EfC416a8771BD4d11Fae4334',
  baseSepolia: '0x42FF98C4E85212a5D31358ACbFe76a621b50fC02',
  arbitrumSepolia: 'test',
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

  if (hre.network.name != 'sepolia' && hre.network.name != 'optimismSepolia' && hre.network.name != 'baseSepolia' && hre.network.name != 'arbitrumSepolia') {
    console.log('SEARCH THIS STAFF And add condition')
    return
  }

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;


  if (hre.network.name == 'arbitrumSepolia'){
    const worldId =  await deploy("WorldId", {
      from: deployer,
      // Contract constructor arguments
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });
  
    if (!worldId.receipt?.contractAddress){
      throw new Error('WorldId contract deployment failed')
    }

    worldRouterAddresses[hre.network.name] = worldId.receipt.contractAddress
  }



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
