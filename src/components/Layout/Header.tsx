interface WalletProps {
  wallet?: {
    terraAddress: string;
  };
}

const WalletDetails = ({ wallet }: WalletProps) => {
  if (wallet && wallet.terraAddress) {
    return (
      <>
        <li>
          <a href="#">{wallet.terraAddress}</a>
        </li>
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
      <nav>
        <ul>
          <WalletDetails wallet={wallet} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
