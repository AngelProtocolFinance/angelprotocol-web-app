interface WalletProps {
	wallet?: {
		terraAddress: string;
	};
}

const WalletDetails = ({ wallet }: WalletProps) => {
	if (wallet && wallet.terraAddress) {
		return (
			<>
				<li className="mr-4">{wallet.terraAddress}</li>
				<li>
					<a href="#">Disconnect Wallet</a>
				</li>
			</>
		);
	}

	return (
		<li>
			<a href="#">Connect Wallet</a>
		</li>
	);
};

interface HeaderProps {
	wallet?: {
		terraAddress: string;
	};
	onConnect: () => void;
	onDisconnect: () => void;
}

const Header = ({ wallet, onConnect, onDisconnect }: HeaderProps) => {
	return (
		<header>
			<nav className="container mx-auto flex justify-between items-center h-16 px-4">
				<a href="/" className="font-bold text-base">
					AngelProtocol
				</a>
				<ul className="flex font-regular text-base">
					<WalletDetails wallet={wallet} />
				</ul>
			</nav>
		</header>
	);
};

export default Header;
