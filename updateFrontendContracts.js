const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const homedir = require("os").homedir();

/**
 *
 * This is just a sample script that can be run as part of another script or as standalone.
 * Subject to change.
 *
 * @param {string} webappContractsDir webapp directory relative to OS home directory,
 * where the contracts JSON file is placed.
 *
 * E.g. if the full path is "/home/user/repos/angelprotocol-web-app/src/contracts",
 * then `webappContractsDir` should be repos/angelprotocol-web-app/src/contracts
 */
function updateFrontendContracts(webappContractsDir) {
  const webappContractsDirFullPath = `${homedir}/${webappContractsDir}`;

  return new Promise((resolve, reject) => {
    try {
      const contractsDir = path.join(__dirname, "../");

      const data = JSON.parse(
        fs.readFileSync(path.join(contractsDir, "contract-address.json"))
      );

      fs.writeFile(
        path.join(webappContractsDirFullPath, "contracts.json"),
        JSON.stringify(data, undefined, 2),
        (err) => {
          if (err) {
            return console.error("error saving file", err);
          }
          // branch can be hardcoded or passed as (process) argument
          exec(
            `cd ${webappContractsDirFullPath} && git switch RC-v1.8 && git pull && git checkout -b update-contracts && git add . && git commit -m "Update contract-address.json" && git push --set-upstream origin update-contracts && gh pr create --title "Update contract addresses" --body "Update contract addresses"`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
              } else if (stderr) {
                console.log(`stderr: ${stderr}`);
              } else {
                console.log(`stdout: ${stdout}`);
              }
              resolve(true);
            }
          );
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

module.exports = { updateFrontendContracts };
