export type TokenPresale = {
  "version": "0.1.0",
  "name": "token_presale",
  "constants": [
    {
      "name": "PRESALE_SEED",
      "type": "bytes",
      "value": "[84, 69, 83, 84, 95, 66, 73, 84, 77, 69, 95, 80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "quoteTokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "minQuoteAmountToPurchase",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "receiverAccount",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyToken",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimSol",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "presaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "stagePurchasedAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldQuoteAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "minQuoteAmountToPurchase",
            "type": "u64"
          },
          {
            "name": "pricePerToken",
            "type": "u64"
          },
          {
            "name": "stage",
            "type": "u8"
          },
          {
            "name": "identifier",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyQuoteAmount",
            "type": "u64"
          },
          {
            "name": "buyTokenAmount",
            "type": "u64"
          },
          {
            "name": "buyTime",
            "type": "u64"
          },
          {
            "name": "claimQuoteAmount",
            "type": "u64"
          },
          {
            "name": "claimTokenAmount",
            "type": "u64"
          },
          {
            "name": "claimTime",
            "type": "u64"
          },
          {
            "name": "presaleId",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6003,
      "name": "AlreadyPurchased",
      "msg": "Already purchased"
    },
    {
      "code": 6004,
      "name": "PresaleNotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6005,
      "name": "PresaleEnded",
      "msg": "Presale already ended"
    },
    {
      "code": 6006,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6007,
      "name": "InsufficientFund",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6008,
      "name": "StageHardCapReached",
      "msg": "Presale stage hard cap already reached"
    },
    {
      "code": 6009,
      "name": "TooSmallAmount",
      "msg": "Deposit amount is too small"
    },
    {
      "code": 6010,
      "name": "PresaleNotEnded",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6011,
      "name": "PresaleIDRange",
      "msg": "Presale ID out of range"
    },
    {
      "code": 6012,
      "name": "PresaleStageIncorrect",
      "msg": "Presale stage is incorrect"
    },
    {
      "code": 6013,
      "name": "PresaleHardCapReached",
      "msg": "Presale hardcap already reached"
    },
    {
      "code": 6014,
      "name": "UserHardCapReached",
      "msg": "User hardcap already reached"
    },
    {
      "code": 6015,
      "name": "SoftCapReached",
      "msg": "SoftCap reached"
    },
    {
      "code": 6016,
      "name": "SoftCapNotReached",
      "msg": "SoftCap reached"
    },
    {
      "code": 6017,
      "name": "TransactionFailed",
      "msg": "Purchase transaction failed"
    }
  ]
};

export const IDL: TokenPresale = {
  "version": "0.1.0",
  "name": "token_presale",
  "constants": [
    {
      "name": "PRESALE_SEED",
      "type": "bytes",
      "value": "[84, 69, 83, 84, 95, 66, 73, 84, 77, 69, 95, 80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "quoteTokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "minQuoteAmountToPurchase",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "receiverAccount",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyToken",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimSol",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleReservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "presaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "stagePurchasedAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldQuoteAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "minQuoteAmountToPurchase",
            "type": "u64"
          },
          {
            "name": "pricePerToken",
            "type": "u64"
          },
          {
            "name": "stage",
            "type": "u8"
          },
          {
            "name": "identifier",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyQuoteAmount",
            "type": "u64"
          },
          {
            "name": "buyTokenAmount",
            "type": "u64"
          },
          {
            "name": "buyTime",
            "type": "u64"
          },
          {
            "name": "claimQuoteAmount",
            "type": "u64"
          },
          {
            "name": "claimTokenAmount",
            "type": "u64"
          },
          {
            "name": "claimTime",
            "type": "u64"
          },
          {
            "name": "presaleId",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6003,
      "name": "AlreadyPurchased",
      "msg": "Already purchased"
    },
    {
      "code": 6004,
      "name": "PresaleNotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6005,
      "name": "PresaleEnded",
      "msg": "Presale already ended"
    },
    {
      "code": 6006,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6007,
      "name": "InsufficientFund",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6008,
      "name": "StageHardCapReached",
      "msg": "Presale stage hard cap already reached"
    },
    {
      "code": 6009,
      "name": "TooSmallAmount",
      "msg": "Deposit amount is too small"
    },
    {
      "code": 6010,
      "name": "PresaleNotEnded",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6011,
      "name": "PresaleIDRange",
      "msg": "Presale ID out of range"
    },
    {
      "code": 6012,
      "name": "PresaleStageIncorrect",
      "msg": "Presale stage is incorrect"
    },
    {
      "code": 6013,
      "name": "PresaleHardCapReached",
      "msg": "Presale hardcap already reached"
    },
    {
      "code": 6014,
      "name": "UserHardCapReached",
      "msg": "User hardcap already reached"
    },
    {
      "code": 6015,
      "name": "SoftCapReached",
      "msg": "SoftCap reached"
    },
    {
      "code": 6016,
      "name": "SoftCapNotReached",
      "msg": "SoftCap reached"
    },
    {
      "code": 6017,
      "name": "TransactionFailed",
      "msg": "Purchase transaction failed"
    }
  ]
};
