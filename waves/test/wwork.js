const wvs = 10 ** 8;
let officeToken;

describe("wwork admin contract test suite", async function() {
  this.timeout(100000);

  before(async function() {
    await setupAccounts({
      admin: 10 * wvs,
      officeOwner: 2 * wvs,
      office: 2 * wvs,
      customer: 2 * wvs
    });
    const script = compile(file("wwork.ride"));
    const ssTx = setScript({ script }, accounts.admin);
    await broadcast(ssTx);
    await waitForTx(ssTx.id);
    console.log("Admin Script has been set");
  });

  it("Can setup office", async function() {
    // issueTokens
    const issueTx = issue(
      {
        quantity: 31,
        name: "Office A",
        description: "token for office A"
      },
      accounts.officeOwner
    );
    await broadcast(issueTx);
    await waitForTx(issueTx.id);
    officeToken = issueTx.id;

    console.log("Office Token has been issued. Token id: " + officeToken);

    const officeScript = compile(file("office.ride"));
    const officeSsTx = setScript({ script: officeScript }, accounts.office);
    await broadcast(officeSsTx);
    await waitForTx(officeSsTx.id);
    console.log("Office Script has been set");

    const initOfficeTx = invokeScript(
      {
        dApp: address(accounts.office),
        call: {
          function: "init",
          args: [
            { type: "string", value: "Red October" },
            {
              type: "string",
              value: "https://s.inyourpocket.com/gallery/190542.jpg"
            },
            {
              type: "integer",
              value: 0.1 * wvs
            },
            {
              type: "string",
              value: officeToken
            }
          ]
        },
        fee: 900000
      },
      accounts.officeOwner
    );
    await broadcast(initOfficeTx);
    await waitForTx(initOfficeTx.id);
    console.log("Office contract has been inited");

    const transferToOfficeTx = transfer(
      {
        recipient: address(accounts.office),
        amount: 30,
        assetId: officeToken
      },
      accounts.officeOwner
    );

    await broadcast(transferToOfficeTx);
    await waitForTx(transferToOfficeTx.id);
    console.log("Tokens have been sent to office contract");
  });

  it("Can exchange tokens for Waves", async function() {
    const buyTokenTx = invokeScript(
      {
        dApp: address(accounts.office),
        call: {
          function: "buyToken"
        },
        payment: [{ assetId: null, amount: 0.1 * wvs }]
      },
      accounts.customer
    );
    await broadcast(buyTokenTx);
    await waitForTx(buyTokenTx.id);
    console.log("Token has been bought");
  });

  it("Can activate access", async function() {
    const activateTx = invokeScript(
      {
        dApp: address(accounts.office),
        call: {
          function: "activateAccess"
        },
        payment: [{ assetId: officeToken, amount: 1 }]
      },
      accounts.customer
    );
    await broadcast(activateTx);
    await waitForTx(activateTx.id);
    console.log("Access has been activated");
  });

  //   it("Can add office", async function() {
  //     const iTxFoo = invokeScript(
  //       {
  //         dApp: address(accounts.admin),
  //         call: {
  //           function: "addOffice",
  //           args: [{ type: "string", value: "dafdsfsad" }]
  //         }
  //       },
  //       accounts.officeOwner
  //     );

  //     await broadcast(iTxFoo);
  //     await waitForTx(iTxFoo.id);
  //   });
});
