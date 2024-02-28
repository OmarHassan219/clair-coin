import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
} from "wagmi";
import ConnectWalletButton from "./ConnectWalletButton";
import CountdownTimer from "./CountdownTimers";
import EthCurrency from "./Currency/EthCurrency";
import UsdcCurrency from "./Currency/UsdcCurrency";
import UsdtCurrency from "./Currency/UsdtCurrency";
import ClaimToken from "./ClaimTokens";
import { parseUnits, formatEther, formatUnits } from "viem";
import presaleAbi from "../abi/presale.json";
import { tokenAdd, usdcAdd, usdtAdd, contractAddr, chainId } from "../config";
import { lan } from "../language";

const Price = ({language}) => {
  const [endTime, setEndTime] = useState("");

  const { address } = useAccount();

  const getEndTime = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "endTimeSale",
    watch: true,
    chainId: chainId,
  });

  const getCurrentPrice = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getPriceInUSD",
    watch: true,
    chainId: chainId,
  });

  const getCurrentStage = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "currentStage",
    watch: true,
    chainId: chainId,
  });

  const getStages = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "stages",
    args: [getCurrentStage.data],
    watch: true,
    chainId: chainId,
  });

  const getUserInfo = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "userInfo",
    args: [address],
    enabled: !!address,
    watch: true,
    chainId: chainId,
  });

  const getUsdRaised = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTotalUSDRaised",
    watch: true,
    chainId: chainId,
  });

  const usdTotal = new BigNumber(getUsdRaised.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);
  const currentPrice = new BigNumber(getCurrentPrice.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(4);
  const targetUsd = new BigNumber(15000000);
  const progressPercentage = (usdTotal / targetUsd) * 100;
  const userAmountPurchased = new BigNumber(getUserInfo.data?.[0])
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);
  const userAmountBonus = new BigNumber(getUserInfo.data?.[1])
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);

  const [selectedCurrency, setSelectedCurrency] = useState("eth");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    const endTime = getEndTime.data;
    const currentTime = Math.floor(Date.now() / 1000);
    setEndTime(endTime && currentTime > endTime);
  }, [getEndTime.data]);
  
  return (
    <section id="price" className="ico-section">
      <div data-aos="fade-up" className="w-layout-blockcontainer container w-container">
        <div className="ico-component">
          <h2 className="ico-h2">
            {lan[language].price.title}
          </h2>
          <CountdownTimer />
          <div className="price">USDT Raised: ${Number(usdTotal).toLocaleString()}</div>
          <br />
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${
                  isNaN(progressPercentage.toFixed(3))
                    ? 0
                    : progressPercentage.toFixed(3)
                }%`,
              }}
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <br />
          {endTime ? (
            <ClaimToken />
          ) : (
            <>
              <>
                <div className="button-row">
                  <button
                    type="button"
                    className={`custom-button ${
                      selectedCurrency === "eth" ? "active" : ""
                    }`}
                    onClick={() => setSelectedCurrency("eth")}
                  >
                    <img
                      className="icon"
                      src="/images/eth.png"
                      width={24}
                      height={24}
                      alt="eth"
                    />
                    ETH
                  </button>
                  <button
                    type="button"
                    className={`custom-button ${
                      selectedCurrency === "usdt" ? "active" : ""
                    }`}
                    onClick={() => setSelectedCurrency("usdt")}
                  >
                    <img
                      className="icon"
                      src="/images/usdt.svg"
                      width={24}
                      height={24}
                      alt="usdt"
                    />
                    USDT
                  </button>
                  <button
                    type="button"
                    className={`custom-button ${
                      selectedCurrency === "usdc" ? "active" : ""
                    }`}
                    onClick={() => setSelectedCurrency("usdc")}
                  >
                    <img
                      className="icon"
                      src="/images/coin.png"
                      width={24}
                      height={24}
                      alt="usdc"
                    />
                    USDC
                  </button>
                </div>
                <br />
                <div className="price _2">1 $CLAIR = {currentPrice}</div>
              </>
              <div>
                {address && (
                  <>
                    <p>Your Purchase $CLAIR: {userAmountPurchased}</p>
                    <p>Your Bonus $CLAIR: {userAmountBonus}</p>
                  </>
                )}
              </div>
              <div>
                {selectedCurrency === "eth" && <EthCurrency />}
                {selectedCurrency === "usdt" && <UsdtCurrency />}
                {selectedCurrency === "usdc" && <UsdcCurrency />}
              </div>
            </>
          )}
          <br />
          <div className="coins-wrapper">
            <img src="images/ethereum.png" loading="lazy" alt="price" className="coin hide-mobile" />
            <img src="images/bnb.png" loading="lazy" alt="price" className="coin" />
            <ConnectWalletButton />
            <img src="images/money.png" loading="lazy" alt="price" className="coin" />
            <img src="images/coin.png" loading="lazy" alt="price" className="coin hide-mobile" />
          </div>
          <a
            href="https://baby-sinclair.gitbook.io/docs/how-to-buy"
            className="button-sec small w-button"
          >
            {lan[language].price.how}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Price;
