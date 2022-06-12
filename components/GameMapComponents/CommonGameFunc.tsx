import { Platform } from 'react-native'
import { WizardUseMultipleChoiceHintResponse } from '../../types/gameCharacterTypes';
import { AttackStage, GameInstanceResponse, GameState } from '../../types/gameInstanceTypes'
import { IPlayerAttackPossibilities, QuestionClientResponse } from '../../types/gameResponseTypes';

export function GetAvatarColor(inGameParticipantNumber: number) {
    return ReturnColor(inGameParticipantNumber)
}

function ReturnColor(inGameParticipantNumber: number) {
    switch (inGameParticipantNumber) {
        case 1:
            // Blue
            return "#5074FF"
        case 2:
            // Purple
            return "#8350FF"
        case 3:
            // Red
            return "#FF5074"
    }
}


export function GetParticipantColor(gameInstance: GameInstanceResponse, playerId: number) {
    const particip = gameInstance.participants.find(x => x.playerId == playerId)

    if (!particip) return undefined;

    return ReturnColor(particip!.inGameParticipantNumber)
}


export function GetPvpTerritoryNonHighlightColor(inGameParticipantNumber: number) {
    // Blue
    if (inGameParticipantNumber == 1)
        return "#1A3A89"

    // Purple
    if (inGameParticipantNumber == 2)
        return "#292F89"

    // Red
    if (inGameParticipantNumber == 3)
        return "#513060"


    console.log(`Unhandled color combination - Defender participant number: ${inGameParticipantNumber}`)
}

export function GetNeutralTerritoryPossibilityColor(gameInstance: GameInstanceResponse, playerId: number) {
    const particip = gameInstance.participants.find(x => x.playerId == playerId)

    switch (particip?.inGameParticipantNumber) {
        // Blue
        case 1:
            return "#90A7FF"
        // Purple
        case 2:
            return "#BCA0FF"

        // Red
        case 3:
            return "#FF98AD"
    }
}

export function GetPenguinAvatarImage(avatarName: string) {
    if (Platform.OS == "web") {
        return avatarName == "penguinAvatarWizard"
            ? require('../../assets/penguinAvatarWizard.svg')
            : avatarName == "penguinAvatarKing"
                ? require('../../assets/penguinAvatarKing.svg')
                : require('../../assets/penguinAvatarViking.svg')
    }


    return avatarName == "penguinAvatarWizard"
        ? require('../../assets/penguinAvatarWizard.png')
        : avatarName == "penguinAvatarKing"
            ? require('../../assets/penguinAvatarKing.png')
            : require('../../assets/penguinAvatarViking.png')
}

export function RoundAttackStage(attackStage: AttackStage) {
    switch (attackStage) {
        case 0:
            return "MULTIPLE_NEUTRAL"
        case 1:
            return "NUMBER_NEUTRAL"
        case 2:
            return "MULTIPLE_PVP"
        case 3:
            return "NUMBER_PVP"
    }
}

export const gameSvgs = [
    {
        name: "penguinAvatarWizard",
        img: require(`../../assets/penguinAvatarWizard.svg`),
        imgPng: require(`../../assets/penguinAvatarWizard.png`)
    },
    {
        name: "penguinAvatarKing",
        img: require(`../../assets/penguinAvatarKing.svg`),
        imgPng: require(`../../assets/penguinAvatarKing.png`)
    },
    {
        name: "penguinAvatarViking",
        img: require(`../../assets/penguinAvatarViking.svg`),
        imgPng: require(`../../assets/penguinAvatarViking.png`)
    },
    {
        name: "shield",
        img: require(`../../assets/shield.svg`),
        imgPng: require(`../../assets/shield.png`),
    },
    {
        name: "sword",
        img: require(`../../assets/sword.svg`),
        imgPng: require(`../../assets/sword.png`)
    },
]

export const playerQuestionAnswersMock = {
    "correctAnswerId": 1,
    "playerAnswers": [
        {
            "id": 1,
            "answerId": 3
        },
        {
            "id": 2,
            "answerId": 1
        },
        {
            "id": 3,
            "answerId": 2
        }
    ]
}



export const playerQuestionNumberAnswersMock = {
    "correctAnswer": 681,
    "playerAnswers": [
        {
            "playerId": 1,
            "answer": 312,
            "differenceWithCorrect": 369,
            "timeElapsed": "3.5s",
            "winner": true,
        },
        {
            "playerId": 2,
            "answer": 1211,
            "differenceWithCorrect": 530,
            "timeElapsed": "8.9s",
            "winner": false,
        },
        {
            "playerId": 3,
            "answer": 1532,
            "differenceWithCorrect": 851,
            "timeElapsed": "5.3s",
            "winner": false,
        },
    ]
}

export const numberChoicePvpQuestionMock = {
    "id": 1,
    "isNeutral": false,
    "question": "When was Bulgaria founded?",
    "type": "number",
    "attackerId": 1,
    "isLastQuestion": true,
    "capitalRoundsRemaining": 2,
    "defenderId": 2,
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        }
    ],
}

export const numberChoiceQuestionMock = {
    "id": 1,
    "isNeutral": true,
    "question": "When was Bulgaria founded?",
    "type": "number",
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        },
        {
            "avatarName": "penguinAvatar3",
            "playerId": 3,
        }
    ],
}

export const multipleChoiceQuestionMock = {
    "id": 1,
    "isNeutral": true,
    "question": "When was Bulgaria founded?",
    "type": "multiple",
    "capitalRoundsRemaining": 4,
    "answers": [
        {
            "id": 1,
            "answer": "681"
        },
        {
            "id": 2,
            "answer": "1332"
        },
        {
            "id": 3,
            "answer": "806"
        },
        {
            "id": 4,
            "answer": "927"
        },
    ],
    "attackerId": 1,
    "defenderId": 2,
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        },
        {
            "avatarName": "penguinAvatar3",
            "playerId": 3,
        }
    ],
}

export const wizardUseMultipleChoiceHintMock: WizardUseMultipleChoiceHintResponse = {
    playerId: 1,
    answers: [
        {
            "id": 428,
            "answer": "681"
        },
        {
            "id": 429,
            "answer": "15"
        },
        {
            "id": 430,
            "answer": "22"
        },
        {
            "id": 431,
            "answer": "512"
        }
    ]
}

export const multipleChoicePvpQuestionMock: QuestionClientResponse = {
    "isLastQuestion": false,
    "isNeutral": false,
    "capitalRoundsRemaining": null,
    "id": 158,
    "question": "When was bulgaria created?",
    "type": "multiple",
    "answers": [
        {
            "id": 428,
            "answer": "681"
        },
        {
            "id": 429,
            "answer": "15"
        },
        {
            "id": 430,
            "answer": "22"
        },
        {
            "id": 431,
            "answer": "512"
        }
    ],
    "participants": [
        {
            "id": 83,
            "inGameParticipantNumber": 3,
            "playerId": 1,
            "gameId": 62,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 76,
                "userId": 1,
                "gameInstanceId": 62,
                "characterAbilities": {
                    "characterType": 0,
                    "gameCharacterId": 76,
                    kingCharacterAbilitiesResponse: null,
                    vikingCharacterAbilitiesResponse: null,
                    "wizardCharacterAbilitiesResponse": {
                        mcQuestionHintMaxUseCount: 2,
                        mcQuestionHintUseCount: 0,
                    }
                },
                "character": {
                    "id": 1,
                    "characterGlobalIdentifier": "2afae81c-806f-4c67-b977-fb124b4c13db",
                    "name": "Wizard",
                    "avatarName": "penguinAvatarWizard",
                    "description": "Some description",
                    "abilityDescription": "Can remove half the options to select from in a multiple choice question. Ability can be used: 3",
                    "pricingType": 0,
                    "characterType": 0,
                    "price": null
                }
            },
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "userGlobalIdentifier": "c0d2a2dc-a040-402b-8d5e-89553745c37d",
                "isBot": false
            }
        },
        {
            "id": 84,
            "inGameParticipantNumber": 2,
            "playerId": 5,
            "gameId": 62,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 77,
                "userId": 5,
                "gameInstanceId": 62,
                "characterAbilities": {
                    vikingCharacterAbilitiesResponse: null,
                    wizardCharacterAbilitiesResponse: null,
                    "characterType": 1,
                    "gameCharacterId": 77,
                    "kingCharacterAbilitiesResponse": {
                        "currentBonusPoints": 0,
                        "pointsMultiplier": 0.1
                    }
                },
                "character": {
                    "id": 2,
                    "characterGlobalIdentifier": "c0cfb149-10ed-477f-8009-ff22a16a3b5e",
                    "name": "King",
                    "avatarName": "penguinAvatarKing",
                    "description": "Some description",
                    "abilityDescription": "Has a permanent score bonus multiplier when you capture a territory. Multiplier: 10%",
                    "pricingType": 0,
                    "characterType": 1,
                    "price": null
                }
            },
            "player": {
                "id": 5,
                "username": "[BOT]Penguin-5267",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        }
    ],
    "attackerId": 1,
    "defenderId": 5
}

export const playerAttackPossibilitiesMock: IPlayerAttackPossibilities = {
    "attackerId": 1,
    "availableAttackTerritories": [
        "Dager",
        "Napana",
        "Sopore",
        "Rilanor",
        "Renyt",
        "Kide",
        "Laly"
    ]
}

export const gameInstanceMock: GameInstanceResponse = {
    "id": 23,
    "gameGlobalIdentifier": "318d9e6a-1a1b-4717-8439-50593036c5b0",
    "gameType": 1,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "8283",
    "gameRoundNumber": 48,
    "objectTerritory": [
        {
            "id": 401,
            "mapTerritoryId": 1,
            "gameInstanceId": 23,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 1,
                "territoryName": "Vibri"
            }
        },
        {
            "id": 402,
            "mapTerritoryId": 2,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 2,
                "territoryName": "Ranku"
            }
        },
        {
            "id": 403,
            "mapTerritoryId": 3,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 3,
                "territoryName": "Dager"
            }
        },
        {
            "id": 404,
            "mapTerritoryId": 4,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 4,
                "territoryName": "Ramac"
            }
        },
        {
            "id": 405,
            "mapTerritoryId": 5,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 5,
                "territoryName": "Napana"
            }
        },
        {
            "id": 406,
            "mapTerritoryId": 6,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 6,
                "territoryName": "Tustra"
            }
        },
        {
            "id": 407,
            "mapTerritoryId": 7,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 7,
                "territoryName": "Sopore"
            }
        },
        {
            "id": 408,
            "mapTerritoryId": 8,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 8,
                "territoryName": "Caydo"
            }
        },
        {
            "id": 409,
            "mapTerritoryId": 9,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 9,
                "territoryName": "Rilanor"
            }
        },
        {
            "id": 410,
            "mapTerritoryId": 10,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 10,
                "territoryName": "Lisu"
            }
        },
        {
            "id": 411,
            "mapTerritoryId": 11,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 11,
                "territoryName": "Renyt"
            }
        },
        {
            "id": 412,
            "mapTerritoryId": 12,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 12,
                "territoryName": "Kide"
            }
        },
        {
            "id": 413,
            "mapTerritoryId": 13,
            "gameInstanceId": 23,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 13,
                "territoryName": "Laly"
            }
        },
        {
            "id": 414,
            "mapTerritoryId": 14,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 14,
                "territoryName": "Caba"
            }
        },
        {
            "id": 415,
            "mapTerritoryId": 15,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 15,
                "territoryName": "Sona"
            }
        },
        {
            "id": 416,
            "mapTerritoryId": 16,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 16,
                "territoryName": "Ronetia"
            }
        },
        {
            "id": 417,
            "mapTerritoryId": 17,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 17,
                "territoryName": "Prusnia"
            }
        },
        {
            "id": 418,
            "mapTerritoryId": 18,
            "gameInstanceId": 23,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 18,
                "territoryName": "Wistan"
            }
        },
        {
            "id": 419,
            "mapTerritoryId": 19,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 19,
                "territoryName": "Rospa"
            }
        },
        {
            "id": 420,
            "mapTerritoryId": 20,
            "gameInstanceId": 23,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 20,
                "territoryName": "Bavi"
            }
        }
    ],
    "participants": [
        // @ts-ignore
        {
            "id": 64,
            "playerId": 1,
            "gameId": 23,
            "isAfk": false,
            "score": 1000,
            "inGameParticipantNumber": 1,
            "finalQuestionScore": 0,
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "userGlobalIdentifier": "c0d2a2dc-a040-402b-8d5e-89553745c37d",
                "isBot": false
            }
        },
        // @ts-ignore
        {
            "id": 65,
            "playerId": 5,
            "gameId": 23,
            "isAfk": false,
            "score": 1000,
            "inGameParticipantNumber": 2,
            "finalQuestionScore": 0,
            "player": {
                "id": 5,
                "username": "[BOT]Penguin-992",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        },
        // @ts-ignore
        {
            "id": 66,
            "playerId": 6,
            "gameId": 23,
            "isAfk": false,
            "score": 1000,
            "inGameParticipantNumber": 3,
            "finalQuestionScore": 0,
            "player": {
                "id": 6,
                "username": "[BOT]Penguin-1932",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        }
    ],
    "rounds": [
        {
            "id": 505,
            "attackStage": 0,
            "gameInstanceId": 23,
            "gameRoundNumber": 1,
            "neutralRound": {
                "id": 145,
                "roundId": 505,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 431,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 145,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 432,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 145,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 433,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 145,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 506,
            "attackStage": 0,
            "gameInstanceId": 23,
            "gameRoundNumber": 2,
            "neutralRound": {
                "id": 146,
                "roundId": 506,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 434,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 146,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 435,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 146,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 436,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 146,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 507,
            "attackStage": 0,
            "gameInstanceId": 23,
            "gameRoundNumber": 3,
            "neutralRound": {
                "id": 147,
                "roundId": 507,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 437,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 147,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 438,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 147,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 439,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 147,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 508,
            "attackStage": 0,
            "gameInstanceId": 23,
            "gameRoundNumber": 4,
            "neutralRound": {
                "id": 148,
                "roundId": 508,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 440,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 148,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 441,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 148,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 442,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 148,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 509,
            "attackStage": 0,
            "gameInstanceId": 23,
            "gameRoundNumber": 5,
            "neutralRound": {
                "id": 149,
                "roundId": 509,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 443,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 149,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 444,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 149,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 445,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 149,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 510,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 41,
            "neutralRound": null,
            "pvpRound": {
                "id": 361,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 510,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 511,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 42,
            "neutralRound": null,
            "pvpRound": {
                "id": 362,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 511,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 512,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 43,
            "neutralRound": null,
            "pvpRound": {
                "id": 363,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 512,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 513,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 44,
            "neutralRound": null,
            "pvpRound": {
                "id": 364,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 513,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 514,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 45,
            "neutralRound": null,
            "pvpRound": {
                "id": 365,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 514,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 515,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 46,
            "neutralRound": null,
            "pvpRound": {
                "id": 366,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 515,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 516,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 47,
            "neutralRound": null,
            "pvpRound": {
                "id": 367,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 516,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 517,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 48,
            "neutralRound": null,
            "pvpRound": {
                "id": 368,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 517,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 518,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 49,
            "neutralRound": null,
            "pvpRound": {
                "id": 369,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 518,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 519,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 50,
            "neutralRound": null,
            "pvpRound": {
                "id": 370,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 519,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 520,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 51,
            "neutralRound": null,
            "pvpRound": {
                "id": 371,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 520,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 521,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 52,
            "neutralRound": null,
            "pvpRound": {
                "id": 372,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 521,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 522,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 53,
            "neutralRound": null,
            "pvpRound": {
                "id": 373,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 522,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 523,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 54,
            "neutralRound": null,
            "pvpRound": {
                "id": 374,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 523,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 524,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 55,
            "neutralRound": null,
            "pvpRound": {
                "id": 375,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 524,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 525,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 56,
            "neutralRound": null,
            "pvpRound": {
                "id": 376,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 525,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 526,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 57,
            "neutralRound": null,
            "pvpRound": {
                "id": 377,
                "attackerId": 6,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 526,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        },
        {
            "id": 527,
            "attackStage": 2,
            "gameInstanceId": 23,
            "gameRoundNumber": 58,
            "neutralRound": null,
            "pvpRound": {
                "id": 378,
                "attackerId": 5,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 527,
                "attackedTerritory": null,
                "capitalRounds": []
            }
        }
    ]
}