
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PRESALE_AUTHORITY, PRESALE_PROGRAM_PUBKEY, PRESALE_SEED, PRESALE_RESERVE_SEED, TOKEN_DECIMAL, TOKEN_PUBKEY, USER_SEED, ESCROW_SEED } from "./constants.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import useHistory from "./useHistroy.js";
import { SystemProgram, PublicKey, Keypair } from "@solana/web3.js";

import { IDL } from "../idl/token_presale.ts";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

/* global BigInt */

export default function usePresale() {
  const { publicKey, sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const {connected: walletConnected} = useWallet();
  const [balance, setBalance] = useState(0);
  const [programforread, setProgramForRead] = useState()
  const [transactionPending, setTransactionPending] = useState(false);
  const [price_per_token, setPricePerToken] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [receiver, setReceiver] = useState();
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [stageNumber, setStageNumber] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);
  const [entireBuyAmount, setEntireBuyAmount] = useState(0);
  const [totalHardCap, setTotalHardCap] = useState(0);
  const [totalSoftCap, setTotalSoftCap] = useState(0);
  const [loading, setLoading] = useState(false);
  const {getAuthToken, saveData} = useHistory();
  const PRESALE_ID = "2jdxzbDF1T1yAjVXkkoYt9RUE1SHCvuvvFLWkYpixtAr";
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  

  useEffect(() => {
    const getPresaleInfo = async () => {
    const programread = new Program(IDL, PRESALE_ID, { connection });
    setProgramForRead(programread);

      if (programforread) {
        try {
          setLoading(true);
          const [presale_info, presale_bump] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
            ],
            programforread.programId
          );
          // @ts-ignore
          const info = await programforread.account.presaleInfo.fetch(presale_info);
          setPricePerToken(Number(info.pricePerToken));
          setStageNumber(info.stage)
          setStartTime(info.startTime);
          setEndTime(info.endTime);
          setTotalBuyAmount(Number(info.soldTokenAmount) / 10 ** 9);
          setEntireBuyAmount(Number(info.soldQuoteAmount) / 10 ** 9);
          setTotalHardCap(Number(info.hardcapAmount) / 10 ** 9);
          setTotalSoftCap(Number(info.softcapAmount) / 10 ** 9);
          setReceiver(info.receiver);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const getUserInfo = async () => {
      if (programforread && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [userInfo, userBump] = findProgramAddressSync(
            [
              utf8.encode(USER_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
            ],
            programforread.programId
          );
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
          // @ts-ignore
          const info = await programforread.account.userInfo.fetch(userInfo);
          setBuyAmount(info.buyTokenAmount);
          setQuoteAmount(info.buyQuoteAmount);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getUserInfo();
    getPresaleInfo();
  }, [publicKey, transactionPending]);

  
  const buyToken = async (solBalance) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
          ],
          program.programId
        );

        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );
        const buyerAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const [presaleAssociatedTokenAccount] =
          findProgramAddressSync(
            [
              utf8.encode(ESCROW_SEED),
              presaleInfo.toBuffer(),

            ],
            program.programId
          );
        // console.log(program.methods
        //   .buyToken)
        // Use BigInt for large number calculations        
        const bigIntSolAmount =
          BigInt(Number(solBalance * 10 ** TOKEN_DECIMAL).toFixed(0));
          const referAddress = "98BCiW6oDdYG5wNb2Srik2bPJXJMfAVG8Q9y49tEnB5J"
        const tx = await program.methods
          .buyToken(
            new anchor.BN(bigIntSolAmount.toString()),
            new PublicKey(referAddress)
          )
          .accounts({
            presaleInfo,
            presaleTokenMintAccount: TOKEN_PUBKEY,
            buyerPresaleTokenAssociatedTokenAccount: buyerAssociatedTokenAccount,
            presalePresaleTokenAssociatedTokenAccount: presaleAssociatedTokenAccount,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            buyerAuthority: publicKey,
            buyer: publicKey,
            solReceiver: receiver,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .transaction();
          let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
          tx.recentBlockhash = blockhash;
          tx.feePayer = publicKey;

          
        await sendTransaction(tx, connection, {maxRetries:0, skipPreflight: true}).then(()=>{
          toast.success("Token purchase was successful.");
        });

        saveData(getAuthToken, publicKey?.toBase58(), solBalance, solBalance * price_per_token, price_per_token);
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return {
    buyToken,
    balance,
    price_per_token,
    buyAmount,
    entireBuyAmount,
    totalBuyAmount,
    startTime,
    endTime
  }
}
