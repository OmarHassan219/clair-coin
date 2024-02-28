import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = () => {
  
  return (
    <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== "loading";
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus ||
          authenticationStatus === "authenticated");

      return (
        <div
          {...(!ready && {
            "aria-hidden": true,
            style: {
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="button w-button"
                >
                  Connect Wallet
                </button>
              );
            }

            if (chain.unsupported) {
              return (
                <button
                  onClick={openChainModal}
                  type="button"
                  className="button w-button"
                >
                  Wrong network
                </button>
              );
            }

            return (
              <div>
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="button w-button"
                >
                  {account.displayName}
                  {account.displayBalance
                    ? ` (${account.displayBalance})`
                    : ""}
                </button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
  );
}

export default ConnectWalletButton;
