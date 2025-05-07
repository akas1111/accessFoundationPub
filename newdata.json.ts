// const newJsonData =[{
//     address: {
//         "text": "2825 S ADAMS ST. SALT LAKE CITY UT 84115-3311",
//         "confidence": 0.9724153280258179
//     },
//     statement_period: [
//         {
//             start_date: {
//                 "text": "December 21, 2023",
//                 "confidence": 0.9770120978355408
//             }
//         },
//         {
//             end_date: {
//                 "text": "January 22, 2024",
//                 "confidence": 0.9770120978355408
//             }
//         }
//     ],
//     checking_account_table: [
//         {
//             asset: {
//                 "checking_and_savings": [
//                     {
//                         "account_name": {
//                             "text": "Chase Total Checking",
//                             "confidence": 0.9804607629776001
//                         },
//                         "account_number": {
//                             "text": " 000000912113559",
//                             "confidence": 0.9687354564666748
//                         },
//                         "beginning_balance": {
//                             "text": "$10,313.57",
//                             "confidence": 0.9998122453689575
//                         },
//                         "ending_balance": {
//                             "text": "$750.79",
//                             "confidence": 0.9998915791511536
//                         }
//                     },
//                     {
//                         "account_name": {
//                             "text": "Chase Savings",
//                             "confidence": 0.966598391532898
//                         },
//                         "account_number": {
//                             "text": " 000003967082570",
//                             "confidence": 0.984809160232544
//                         },
//                         "beginning_balance": {
//                             "text": "$750.79",
//                             "confidence": 0.9998915791511536
//                         },
//                         "ending_balance": {
//                             "text": " 000003967082570",
//                             "confidence": 0.984809160232544
//                         }
//                     }
//                 ]
//             },
//             totals: {
//                 "total_beginning_balance": {
//                     "text": "$29,314.44",
//                     "confidence": 0.9998682141304016
//                 },
//                 "total_ending_balance": {
//                     "text": "$27,751.90",
//                     "confidence": 0.9998551607131958
//                 }
//             }
//         }
//     ],
//     "checking_transaction_detail": [
//         [
//             {
//                 "date": {
//                     "text": "",
//                     "confidence": 0
//                 },
//                 "description": {
//                     "text": "Beginning Balance",
//                     "confidence": 0.9998976588249207
//                 },
//                 "amount": {
//                     "text": "",
//                     "confidence": 0
//                 },
//                 "balance": {
//                     "text": "$10,313.57",
//                     "confidence": 0.9998452067375183
//                 }
//             },
//             {
//                 "date": {
//                     "text": "12/22",
//                     "confidence": 0.9999281764030457
//                 },
//                 "description": {
//                     "text": "Live Auctioneers Direct Dep PPD ID: 9111111103",
//                     "confidence": 0.9757906794548035
//                 },
//                 "amount": {
//                     "text": "5,839.43",
//                     "confidence": 0.9992203712463379
//                 },
//                 "balance": {
//                     "text": "16,153.00",
//                     "confidence": 0.9810946583747864
//                 }
//             },
//             {
//                 "date": {
//                     "text": "12/22",
//                     "confidence": 0.9999238848686218
//                 },
//                 "description": {
//                     "text": "",
//                     "confidence": 0
//                 },
//                 "amount": {
//                     "text": "-7,000.00",
//                     "confidence": 0.9972485303878784
//                 },
//                 "balance": {
//                     "text": "9,153.00",
//                     "confidence": 0.9993077516555786
//                 }
//             },
//             {
//                 "date": {
//                     "text": "12/22",
//                     "confidence": 0.9997932314872742
//                 },
//                 "description": {
//                     "text": "12/22 Payment To Chase Card Ending IN 9889",
//                     "confidence": 0.980810284614563
//                 },
//                 "amount": {
//                     "text": "-5,001.97",
//                     "confidence": 0.9930533170700073
//                 },
//                 "balance": {
//                     "text": "4,151.03",
//                     "confidence": 0.9993935227394104
//                 }
//             }
//         ],
//         [
//             {
//                 "date": {
//                     "text": "12/22",
//                     "confidence": 0.9998750686645508
//                 },
//                 "description": {
//                     "text": "12/22 Payment To Chase Card Ending IN 5707",
//                     "confidence": 0.9812184572219849
//                 },
//                 "amount": {
//                     "text": "-1,647.50",
//                     "confidence": 0.9442984461784363
//                 },
//                 "balance": {
//                     "text": "2,503.53",
//                     "confidence": 0.9964227676391602
//                 }
//             },
//             {
//                 "date": {
//                     "text": "12/26",
//                     "confidence": 0.8247854113578796
//                 },
//                 "description": {
//                     "text": "Zelle Payment To Dp 19399955035",
//                     "confidence": 0.9893304705619812
//                 },
//                 "amount": {
//                     "text": "-500.00",
//                     "confidence": 0.9930682182312012
//                 },
//                 "balance": {
//                     "text": "2,003.53",
//                     "confidence": 0.9660064578056335
//                 }
//             },
//             {
//                 "date": {
//                     "text": "12/28",
//                     "confidence": 0.9998377561569214
//                 },
//                 "description": {
//                     "text": "12/28 Online Transfer To Sav ...2570 Transaction#: 19417721022",
//                     "confidence": 0.9938594102859497
//                 },
//                 "amount": {
//                     "text": "-1,000.00",
//                     "confidence": 0.9967553615570068
//                 },
//                 "balance": {
//                     "text": "1,003.53",
//                     "confidence": 0.9484175443649292
//                 }
//             },
//             {
//                 "date": {
//                     "text": "01/04",
//                     "confidence": 0.9950358271598816
//                 },
//                 "description": {
//                     "text": "Card Purchase 01/04 Wu *8838097321 877-989-3268 CA Card 9517a",
//                     "confidence": 0.9997432231903076
//                 },
//                 "amount": {
//                     "text": "-154.99",
//                     "confidence": 0.9963288903236389
//                 },
//                 "balance": {
//                     "text": "848.54",
//                     "confidence": 0.9995926022529602
//                 }
//             },
//             {
//                 "date": {
//                     "text": "01/08",
//                     "confidence": 0.9989078640937805
//                 },
//                 "description": {
//                     "text": "Zelle Payment From Axcess Jewellers LLC Usbbw5Bilb91e",
//                     "confidence": 0.9770817756652832
//                 },
//                 "amount": {
//                     "text": "285.00",
//                     "confidence": 0.9998077750205994
//                 },
//                 "balance": {
//                     "text": "1,133.54",
//                     "confidence": 0.9995817542076111
//                 }
//             },
//             {
//                 "date": {
//                     "text": "80/L0",
//                     "confidence": 0.866571307182312
//                 },
//                 "description": {
//                     "text": "Recurring Card Purchase 01/06 Wu * 800-325-6000 CO Card 9517",
//                     "confidence": 0.9954081773757935
//                 },
//                 "amount": {
//                     "text": "-154.99",
//                     "confidence": 0.9498578310012817
//                 },
//                 "balance": {
//                     "text": "978.55",
//                     "confidence": 0.9998820424079895
//                 }
//             },
//             {
//                 "date": {
//                     "text": "01/16",
//                     "confidence": 0.96642005443573
//                 },
//                 "description": {
//                     "text": "Card Purchase With Pin 01/14 Tmobile Auto Pay Bellevue WA Card 9517",
//                     "confidence": 0.9849401712417603
//                 },
//                 "amount": {
//                     "text": "-214.89",
//                     "confidence": 0.9946280121803284
//                 },
//                 "balance": {
//                     "text": "763.66",
//                     "confidence": 0.9995322227478027
//                 }
//             },
//             {
//                 "date": {
//                     "text": "01/17",
//                     "confidence": 0.9992052316665649
//                 },
//                 "description": {
//                     "text": "Card Purchase With Pin 01/17 Winco Foods #142 219 Salt Lake Cit UT Card 9517",
//                     "confidence": 0.9818226099014282
//                 },
//                 "amount": {
//                     "text": "-12.87",
//                     "confidence": 0.9940667748451233
//                 },
//                 "balance": {
//                     "text": "750.79",
//                     "confidence": 0.9998836517333984
//                 }
//             },
//             {
//                 "date": {
//                     "text": "",
//                     "confidence": 0
//                 },
//                 "description": {
//                     "text": "Ending Balance",
//                     "confidence": 0.9837663769721985
//                 },
//                 "amount": {
//                     "text": "",
//                     "confidence": 0
//                 },
//                 "balance": {
//                     "text": "$750.79",
//                     "confidence": 0.9900574088096619
//                 }
//             }
//         ]
//     ],
//     "checking_transaction_note": [
//         [],
//         [
//             {
//                 "text": "A.Monthly Service Fee was not charged to your Chase Total Checking account. Here are the three ways you can avoide.",
//                 "confidence": 0.9780724048614502
//             },
//             {
//                 "text": "this fee during any statement period..",
//                 "confidence": 0.9672228097915649
//             },
//             {
//                 "text": "providers or government benefit providers, by using (i) the ACH network, (ii) the Real Time Payment or",
//                 "confidence": 0.9941893815994263
//             },
//             {
//                 "text": "Mastercard network.",
//                 "confidence": 0.9973254203796387
//             },
//             {
//                 "text": "(Your total electronic deposits this period were $5,839.43. Note: some deposits may be listed on your previous.",
//                 "confidence": 0.9794453978538513
//             },
//             {
//                 "text": "statement)",
//                 "confidence": 0.9995425939559937
//             },
//             {
//                 "text": "QR, keep a balance at the beginning of each day of $1,500.00 or more in this account.",
//                 "confidence": 0.979327380657196
//             },
//             {
//                 "text": " QR, keep an average beginning day balance of $5,ooo.o00 or more in qualifying linked deposits and",
//                 "confidence": 0.9570258855819702
//             },
//             {
//                 "text": "investments.",
//                 "confidence": 0.9955257773399353
//             },
//             {
//                 "text": "(Your average beginning day balance of qualifying linked deposits and investments was $28,073.99)",
//                 "confidence": 0.9948279857635498
//             }
//         ]
//     ],
//     "saving_transaction_detail": [],
//     "saving_transaction_note": [],
//     "customer_name": {
//         "text": "UTTAM BARAL",
//         "confidence": 0.9995792508125305
//     },
//     "account_identifier": {
//         "text": " 00016411 DRE 602 211 02324 NNNNNNNNNNN 1 000000000 14 0000",
//         "confidence": 0.9850404262542725
//     },
//     "primary_account_number": {
//         "text": "000000912113559",
//         "confidence": 0.9821577072143555
//     },
//     "chase_total_checking": {
//         "customer_name": {
//             "text": "UTTAM BARAL",
//             "confidence": 0.9648619294166565
//         },
//         "account_number": {
//             "text": "000000912113559",
//             "confidence": 0.997823178768158
//         }
//     },
//     "checking_summary": {
//         "balance_summary": [
//             {
//                 "summary": {
//                     "text": "Beginning Balance",
//                     "confidence": 0.9454733729362488
//                 },
//                 "balance": {
//                     "text": "$10,313.57",
//                     "confidence": 0.9998602867126465
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Deposits and Additions",
//                     "confidence": 0.9729763269424438
//                 },
//                 "balance": {
//                     "text": "6,124.43",
//                     "confidence": 0.9986696839332581
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "ATM & Debit Card Withdrawals.",
//                     "confidence": 0.953557550907135
//                 },
//                 "balance": {
//                     "text": "-537.74",
//                     "confidence": 0.9985276460647583
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Electronic Withdrawals",
//                     "confidence": 0.9971475601196289
//                 },
//                 "balance": {
//                     "text": "-15,149.47",
//                     "confidence": 0.9977989196777344
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Ending Balance",
//                     "confidence": 0.9998968243598938
//                 },
//                 "balance": {
//                     "text": "$750.79",
//                     "confidence": 0.9998207092285156
//                 }
//             }
//         ],
//         "note": {
//             "text": "Your account ending in 2570 is linked to this account for overdraft protection.",
//             "confidence": 0.9798601269721985
//         }
//     },
//     "chase_saving": {
//         "customer_name": {
//             "text": "UTTAM BARAL",
//             "confidence": 0.9724355340003967
//         },
//         "account_number": {
//             "text": "000003967082570",
//             "confidence": 0.9998091459274292
//         }
//     },
//     "savings_summary": {
//         "balance_summary": [
//             {
//                 "summary": {
//                     "text": "Beginning Balance",
//                     "confidence": 0.9799902439117432
//                 },
//                 "balance": {
//                     "text": "$19,000.87",
//                     "confidence": 0.9458333849906921
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Deposits and Additionse",
//                     "confidence": 0.9597068428993225
//                 },
//                 "balance": {
//                     "text": "8,000.24",
//                     "confidence": 0.9548397064208984
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Ending Balance",
//                     "confidence": 0.999043345451355
//                 },
//                 "balance": {
//                     "text": "$27,001.11",
//                     "confidence": 0.9999040365219116
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Annual Percentage Yield Earned This Period",
//                     "confidence": 0.9782417416572571
//                 },
//                 "balance": {
//                     "text": "0.01%",
//                     "confidence": 0.9996801614761353
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Interest Paid This Periode",
//                     "confidence": 0.9730055928230286
//                 },
//                 "balance": {
//                     "text": "$0.24",
//                     "confidence": 0.9997377395629883
//                 }
//             },
//             {
//                 "summary": {
//                     "text": "Interest Paid Year-to-Date",
//                     "confidence": 0.9796413779258728
//                 },
//                 "balance": {
//                     "text": "$0.24",
//                     "confidence": 0.9998180270195007
//                 }
//             }
//         ],
//         "note": {
//             "text": "Interest paid in 2023 for account 000003967082570 was $0.87.",
//             "confidence": 0.9835847020149231
//         }
//     }
// }
// ]

// const newJsonData =[ {
//         "address": {
//             "text": "UTTAM BARAL 2825 S ADAMS ST SALT LAKE CITY UT 84115-3311",
//             "confidence": 0.9995792508125305
//         },
//         "statement_period": [
//             {
//                 "start_date": {
//                     "text": "December 21, 2023",
//                     "confidence": 0.9894092082977295
//                 }
//             },
//             {
//                 "end_date": {
//                     "text": "January 22, 2024",
//                     "confidence": 0.9894092082977295
//                 }
//             }
//         ],
//         "checking_account_table": [
//             {
//                 "assets": {
//                     "checking_and_savings": [
//                         {
//                             "account_name": {
//                                 "text": "Chase Total Checking",
//                                 "confidence": 0.9804607629776001
//                             },
//                             "account_number": {
//                                 "text": " 000000912113559",
//                                 "confidence": 0.9687355756759644
//                             },
//                             "beginning_balance": {
//                                 "text": "$10,313.57",
//                                 "confidence": 0.9998122453689575
//                             },
//                             "ending_balance": {
//                                 "text": "$750.79",
//                                 "confidence": 0.9998915791511536
//                             }
//                         },
//                         {
//                             "account_name": {
//                                 "text": "Chase Savings",
//                                 "confidence": 0.966598391532898
//                             },
//                             "account_number": {
//                                 "text": " 000003967082570",
//                                 "confidence": 0.9848092794418335
//                             },
//                             "beginning_balance": {
//                                 "text": "$750.79",
//                                 "confidence": 0.9998915791511536
//                             },
//                             "ending_balance": {
//                                 "text": " 000003967082570",
//                                 "confidence": 0.9848092794418335
//                             }
//                         }
//                     ]
//                 },
//                 "totals": {
//                     "total_beginning_balance": {
//                         "text": "$29,314.44",
//                         "confidence": 0.9998682141304016
//                     },
//                     "total_ending_balance": {
//                         "text": "$27,751.90",
//                         "confidence": 0.9998551607131958
//                     }
//                 }
//             }
//         ],
//         "checking_transaction_detail": [
//             [
//                 {
//                     "date": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "description": {
//                         "text": "Beginning Balance",
//                         "confidence": 0.9998976588249207
//                     },
//                     "amount": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "balance": {
//                         "text": "$10,313.57",
//                         "confidence": 0.9998452067375183
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/22",
//                         "confidence": 0.9999281764030457
//                     },
//                     "description": {
//                         "text": "Live Auctioneers Direct Dep PPD ID: 9111111103",
//                         "confidence": 0.9757907390594482
//                     },
//                     "amount": {
//                         "text": "5,839.43",
//                         "confidence": 0.9992203712463379
//                     },
//                     "balance": {
//                         "text": "16,153.00",
//                         "confidence": 0.9810943603515625
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/22",
//                         "confidence": 0.9999238848686218
//                     },
//                     "description": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "amount": {
//                         "text": "-7,000.00",
//                         "confidence": 0.9972485303878784
//                     },
//                     "balance": {
//                         "text": "9,153.00",
//                         "confidence": 0.9993077516555786
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/22",
//                         "confidence": 0.9997959136962891
//                     },
//                     "description": {
//                         "text": "12/22 Payment To Chase Card Ending IN 9889",
//                         "confidence": 0.980810284614563
//                     },
//                     "amount": {
//                         "text": "-5,001.97",
//                         "confidence": 0.9930534362792969
//                     },
//                     "balance": {
//                         "text": "4,151.03",
//                         "confidence": 0.9993935227394104
//                     }
//                 }
//             ],
//             [
//                 {
//                     "date": {
//                         "text": "12/22",
//                         "confidence": 0.9998750686645508
//                     },
//                     "description": {
//                         "text": "12/22 Payment To Chase Card Ending IN 5707",
//                         "confidence": 0.9812184572219849
//                     },
//                     "amount": {
//                         "text": "-1,647.50",
//                         "confidence": 0.944298505783081
//                     },
//                     "balance": {
//                         "text": "2,503.53",
//                         "confidence": 0.9964227676391602
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/26",
//                         "confidence": 0.8247848749160767
//                     },
//                     "description": {
//                         "text": "Zelle Payment To Dp 19399955035",
//                         "confidence": 0.9893304705619812
//                     },
//                     "amount": {
//                         "text": "-500.00",
//                         "confidence": 0.993068277835846
//                     },
//                     "balance": {
//                         "text": "2,003.53",
//                         "confidence": 0.9660062789916992
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/28",
//                         "confidence": 0.9998377561569214
//                     },
//                     "description": {
//                         "text": "12/28 Online Transfer To Sav ...2570 Transaction#: 19417721022",
//                         "confidence": 0.9938594102859497
//                     },
//                     "amount": {
//                         "text": "-1,000.00",
//                         "confidence": 0.9967553615570068
//                     },
//                     "balance": {
//                         "text": "1,003.53",
//                         "confidence": 0.9484176635742188
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "01/04",
//                         "confidence": 0.9950358271598816
//                     },
//                     "description": {
//                         "text": "Card Purchase 01/04 Wu *8838097321 877-989-3268 CA Card 9517a",
//                         "confidence": 0.9997432231903076
//                     },
//                     "amount": {
//                         "text": "-154.99",
//                         "confidence": 0.9963289499282837
//                     },
//                     "balance": {
//                         "text": "848.54",
//                         "confidence": 0.9995926022529602
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "01/08",
//                         "confidence": 0.9989078640937805
//                     },
//                     "description": {
//                         "text": "Zelle Payment From Axcess Jewellers LLC Usbbw5Bilb91e",
//                         "confidence": 0.9770820140838623
//                     },
//                     "amount": {
//                         "text": "285.00",
//                         "confidence": 0.9998077750205994
//                     },
//                     "balance": {
//                         "text": "1,133.54",
//                         "confidence": 0.9995817542076111
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "80/L0",
//                         "confidence": 0.8665711283683777
//                     },
//                     "description": {
//                         "text": "Recurring Card Purchase 01/06 Wu * 800-325-6000 CO Card 9517",
//                         "confidence": 0.9954081773757935
//                     },
//                     "amount": {
//                         "text": "-154.99",
//                         "confidence": 0.9498582482337952
//                     },
//                     "balance": {
//                         "text": "978.55",
//                         "confidence": 0.9998820424079895
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "01/16",
//                         "confidence": 0.9664202928543091
//                     },
//                     "description": {
//                         "text": "Card Purchase With Pin 01/14 Tmobile Auto Pay Bellevue WA Card 9517",
//                         "confidence": 0.9880528450012207
//                     },
//                     "amount": {
//                         "text": "-214.89",
//                         "confidence": 0.9946280121803284
//                     },
//                     "balance": {
//                         "text": "763.66",
//                         "confidence": 0.9995322227478027
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "01/17",
//                         "confidence": 0.9992052316665649
//                     },
//                     "description": {
//                         "text": "Card Purchase With Pin 01/17 Winco Foods #142 219 Salt Lake Cit UT Card 9517",
//                         "confidence": 0.9818226099014282
//                     },
//                     "amount": {
//                         "text": "-12.87",
//                         "confidence": 0.9940667152404785
//                     },
//                     "balance": {
//                         "text": "750.79",
//                         "confidence": 0.9998836517333984
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "description": {
//                         "text": "Ending Balance",
//                         "confidence": 0.9837666153907776
//                     },
//                     "amount": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "balance": {
//                         "text": "$750.79",
//                         "confidence": 0.990057110786438
//                     }
//                 }
//             ]
//         ],
//         "checking_transaction_note": [
//             [],
//             [
//                 {
//                     "text": "A.Monthly Service Fee was not charged to your Chase Total Checking account. Here are the three ways you can avoid",
//                     "confidence": 0.9868401288986206
//                 },
//                 {
//                     "text": "this fee during any statement period..",
//                     "confidence": 0.9634443521499634
//                 },
//                 {
//                     "text": "Have electronic deposits made into this account totaling $5oo.o0 or more, such as payments from payroll",
//                     "confidence": 0.9778899550437927
//                 },
//                 {
//                     "text": "providers or government benefit providers, by using (i) the ACH network, (ii) the Real Time Payment or",
//                     "confidence": 0.9884856939315796
//                 },
//                 {
//                     "text": "Mastercard network.",
//                     "confidence": 0.9973254203796387
//                 },
//                 {
//                     "text": "(Your total electronic deposits this period were $5,839.43. Note: some deposits may be listed on your previous",
//                     "confidence": 0.9850064516067505
//                 },
//                 {
//                     "text": "statement)",
//                     "confidence": 0.9995425939559937
//                 },
//                 {
//                     "text": "QR, keep a balance at the beginning of each day of $1,500.00 or more in this account.",
//                     "confidence": 0.9793274998664856
//                 },
//                 {
//                     "text": " QR, keep an average beginning day balance of $5,ooo.o00 or more in qualifying linked deposits and",
//                     "confidence": 0.9570258259773254
//                 },
//                 {
//                     "text": "investments.",
//                     "confidence": 0.9955257773399353
//                 },
//                 {
//                     "text": "(Your average beginning day balance of qualifying linked deposits and investments was $28,073.99)",
//                     "confidence": 0.99546879529953
//                 }
//             ]
//         ],
//         "saving_transaction_detail": [
//             [
//                 {
//                     "date": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "description": {
//                         "text": "Beginning Balance",
//                         "confidence": 0.9889439344406128
//                     },
//                     "amount": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "balance": {
//                         "text": "$19,000.87",
//                         "confidence": 0.9989145398139954
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/22",
//                         "confidence": 0.909990668296814
//                     },
//                     "description": {
//                         "text": "Online Transfer From Chk..3559 Transaction#: 19362381883",
//                         "confidence": 0.9860902428627014
//                     },
//                     "amount": {
//                         "text": "7,000.00",
//                         "confidence": 0.9989053010940552
//                     },
//                     "balance": {
//                         "text": "26,000.87",
//                         "confidence": 0.9712284803390503
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "12/28",
//                         "confidence": 0.9998977780342102
//                     },
//                     "description": {
//                         "text": "Online Transfer From Chk ...3559 Transaction#: 19417721022",
//                         "confidence": 0.9852103590965271
//                     },
//                     "amount": {
//                         "text": "1,000.00",
//                         "confidence": 0.9986753463745117
//                     },
//                     "balance": {
//                         "text": "27,000.87",
//                         "confidence": 0.9992147088050842
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "01/22",
//                         "confidence": 0.9932153820991516
//                     },
//                     "description": {
//                         "text": "Interest Payment",
//                         "confidence": 0.9528229832649231
//                     },
//                     "amount": {
//                         "text": "0.24",
//                         "confidence": 0.9988360404968262
//                     },
//                     "balance": {
//                         "text": "27,001.11",
//                         "confidence": 0.9980397820472717
//                     }
//                 },
//                 {
//                     "date": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "description": {
//                         "text": "Ending Balance",
//                         "confidence": 0.9995457530021667
//                     },
//                     "amount": {
//                         "text": "",
//                         "confidence": 0
//                     },
//                     "balance": {
//                         "text": "$27,001.11",
//                         "confidence": 0.9997771978378296
//                     }
//                 }
//             ],
//             []
//         ],
//         "saving_transaction_note": [
//             [
//                 {
//                     "text": "(Your minimum daily balance was $19,000).",
//                     "confidence": 0.9831764698028564
//                 },
//                 {
//                     "text": "Call us at 1-866-564-2262 or write us at the address on the front of this statement immediately if you think your statement or receipt is incorrect or if",
//                     "confidence": 0.9834883809089661
//                 },
//                 {
//                     "text": "For personal accounts only: We must hear from you no later than 60 days after we sent you the FIRST statement on which the problem or error.",
//                     "confidence": 0.9819554090499878
//                 },
//                 {
//                     "text": " appeared. Be prepared to give us the following information:.",
//                     "confidence": 0.9602622389793396
//                 },
//                 {
//                     "text": "Your name and account number:.",
//                     "confidence": 0.9355514049530029
//                 },
//                 {
//                     "text": "Adescription of the error or the transaction you are unsure about, and why you think it is an error or want more information; and",
//                     "confidence": 0.9886801242828369
//                 },
//                 {
//                     "text": "us to complete our investigation.",
//                     "confidence": 0.9844249486923218
//                 },
//                 {
//                     "text": "For business accounts, see your deposit account agreement or other applicable agreements that govern your account for details.",
//                     "confidence": 0.9861293435096741
//                 }
//             ],
//             []
//         ],
//         "customer_name": {
//             "text": " 00016411 DRE 602 211 02324 NNNNNNNNNNN 1 000000000 14 0000",
//             "confidence": 0.9850404262542725
//         },
//         "account_identifier": {
//             "text": "CHASEOTest",
//             "confidence": 0.9847524166107178
//         },
//         "primary_account_number": {
//             "text": "000000912113559",
//             "confidence": 0.9813327193260193
//         },
//         "chase_total_checking": {
//             "customer_name": {
//                 "text": "UTTAM BARAL",
//                 "confidence": 0.9648619294166565
//             },
//             "account_number": {
//                 "text": "000000912113559",
//                 "confidence": 0.9978231191635132
//             }
//         },
//         "checking_summary": {
//             "balance_summary": [
//                 {
//                     "summary": {
//                         "text": "Beginning Balance",
//                         "confidence": 0.9454733729362488
//                     },
//                     "balance": {
//                         "text": "$10,313.57",
//                         "confidence": 0.9998602867126465
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Deposits and Additions",
//                         "confidence": 0.9729763269424438
//                     },
//                     "balance": {
//                         "text": "6,124.43",
//                         "confidence": 0.9986696839332581
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "ATM & Debit Card Withdrawals.",
//                         "confidence": 0.9535577297210693
//                     },
//                     "balance": {
//                         "text": "-537.74",
//                         "confidence": 0.9985276460647583
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Electronic Withdrawals",
//                         "confidence": 0.9971475601196289
//                     },
//                     "balance": {
//                         "text": "-15,149.47",
//                         "confidence": 0.9977988004684448
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Ending Balance",
//                         "confidence": 0.9998968243598938
//                     },
//                     "balance": {
//                         "text": "$750.79",
//                         "confidence": 0.9998207092285156
//                     }
//                 }
//             ],
//             "note": {
//                 "text": "Your account ending in 2570 is linked to this account for overdraft protection.",
//                 "confidence": 0.9798601269721985
//             }
//         },
//         "chase_saving": {
//             "customer_name": {
//                 "text": "UTTAM BARAL",
//                 "confidence": 0.9724356532096863
//             },
//             "account_number": {
//                 "text": "000003967082570",
//                 "confidence": 0.9998091459274292
//             }
//         },
//         "savings_summary": {
//             "balance_summary": [
//                 {
//                     "summary": {
//                         "text": "Beginning Balance",
//                         "confidence": 0.9799902439117432
//                     },
//                     "balance": {
//                         "text": "$19,000.87",
//                         "confidence": 0.9458326101303101
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Deposits and Additionse",
//                         "confidence": 0.9597069025039673
//                     },
//                     "balance": {
//                         "text": "8,000.24",
//                         "confidence": 0.9548395872116089
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Ending Balance",
//                         "confidence": 0.999043345451355
//                     },
//                     "balance": {
//                         "text": "$27,001.11",
//                         "confidence": 0.9999040365219116
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Annual Percentage Yield Earned This Period",
//                         "confidence": 0.9782417416572571
//                     },
//                     "balance": {
//                         "text": "0.01%",
//                         "confidence": 0.9996801614761353
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Interest Paid This Periode",
//                         "confidence": 0.9730055928230286
//                     },
//                     "balance": {
//                         "text": "$0.24",
//                         "confidence": 0.9997377395629883
//                     }
//                 },
//                 {
//                     "summary": {
//                         "text": "Interest Paid Year-to-Date",
//                         "confidence": 0.9796315431594849
//                     },
//                     "balance": {
//                         "text": "$0.24",
//                         "confidence": 0.9998180270195007
//                     }
//                 }
//             ],
//             "note": {
//                 "text": " Primary Account: 000000912113559e",
//                 "confidence": 0.9523465633392334
//             }
//         }
// }
// ]



// export default newJsonData