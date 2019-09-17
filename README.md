# Workplaces marketplace built on Waves blockchain

The idea of the project is to provide office owners or renter a marketplace where they could share an access to their offices with freelancers or small startups. If they have some free space

Project is based on two smart contracts/accounts:

1. Wwork account which stores officeAddress <-> ownerAddress info. Every time the owner adds new office its Waves address will appear in the data of the Wwork account.

2. Office Smart Contract. The dApp where user can buy a token for one-day access to office and then activate it to enter the office. After activation user address will be added to the list of users for the current day. Owner manages the amount of available tokens.

Owner workflow:

1. Add new office:
   - Issue new token
   - Create office smart contract
   - add the address to the Wwork account
2. Manage the number of tokens available on the office smart contract, so the amount of workplaces === amount of tokens

Renter workflow:

1. Browse all available workplaces and choose one
2. Buy token
3. Activate access to office by calling 'activateAccess' function
