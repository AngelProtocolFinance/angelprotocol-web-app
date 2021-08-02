import React, { useState } from 'react';

import { useConnectedWallet } from '@terra-money/wallet-provider';
import { LCDClient, Denom } from '@terra-money/terra.js';

export function CurrentBalance() {
	const [balanceUSD, setBalanceUSD] = useState('');
	const connectedWallet = useConnectedWallet();

	if (connectedWallet) {
		const terra = new LCDClient({
			URL: connectedWallet.network.lcd,
			chainID: connectedWallet.network.chainID,
		});

		terra.bank.balance(connectedWallet.terraAddress).then((balance) => {
			const prettifiedBalanceUSD = balance
				.get(Denom.USD)
				?.div(1000000)
				?.amount.toNumber()
				.toLocaleString(undefined, {
					minimumFractionDigits: 6,
				});

			if (prettifiedBalanceUSD) {
				setBalanceUSD(prettifiedBalanceUSD);
			}
		});
	}

	return (
		<div>
			<h3>Current balance</h3>
			<div>UST: {balanceUSD}</div>
		</div>
	);
}
