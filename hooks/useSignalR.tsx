import { setupSignalRConnection } from './SignalRSetup'
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom, gameTimerAtom, gameMapExceptionAtom, authAtom, roundQuestionAtom, playerQuestionAnswersAtom, playerAttackPossibilitiesAtom } from '../state'
import { useRecoilValue, useRecoilState } from 'recoil'
import { GAME_SERVICE_API_URL } from '../injectable'
import { removeBackStack } from '../helpers'
import { getConnection } from './SignalRSetup'
import { useEffect } from 'react'
import { MCPlayerQuestionAnswers, QuestionClientResponse, SelectedTerritoryResponse } from '../types/gameResponseTypes'
import { HubConnection } from '@microsoft/signalr'
import { GameHubStatusCode } from '../types/hubTypes'
import { GameState } from '../types/gameInstanceTypes'

const connectionHub = `${GAME_SERVICE_API_URL}/gamehubs`


let connection: HubConnection
export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const [currentUser, setCurrentUser] = useRecoilState(authAtom)
    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom)
    const [joiningGameException, setJoiningGameException] = useRecoilState(joiningGameExceptionAtom)
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom)
    const [gameTimer, setGameTimer] = useRecoilState(gameTimerAtom)
    const [playerAttackPossibilities, setPlayerAttackPossibilities] = useRecoilState(playerAttackPossibilitiesAtom)
    const [gameMapException, setGameMapException] = useRecoilState(gameMapExceptionAtom)
    const [roundQuestion, setRoundQuestion] = useRecoilState(roundQuestionAtom)
    const [playerQuestionAnswers, setPlayerQuestionAnswers] = useRecoilState(playerQuestionAnswersAtom)
    connection = getConnection()

    useEffect(() => {
        if (!connection) {

            connection = setupSignalRConnection(connectionHub, userJwt)
            setConnectionStatus({
                StatusCode: GameHubStatusCode.CONNECTED,
            })

            setupEvents()
        }
    }, [connection])

    // Prevent question service from idling while in game. Makes sure the question service will respond with questions afterwards
    function pingQuestionService() {
        if (__DEV__) return

        fetch("https://conquiz-question-api.azurewebsites.net/api/question").then(res => {
            // Question service successfully pinged
        }).catch(er => {
            console.log("Question service down: " + er)
        })
    }

    function setupEvents() {


        connection.onreconnecting((error) => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.DISCONNECTED,
                Error: error?.message || "Trying to reconnect to server",
            })
        })
        connection.onreconnected(() => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.CONNECTED,
            })
        })

        connection.onclose(error => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.DISCONNECTED,
                Error: error?.message ? error.message : "Connection to the server lost. Please try again later.",
            })
        })

        // On server event handler
        // Lobby events
        connection.on('LobbyCanceled', ((msg: string) => {
            setJoiningGameException(msg)
            removeBackStack("Home")

            // Game is canceled
            if (gameInstance == null) return

            setGameInstance(old => ({
                ...old,
                gameState: GameState.CANCELED
            }))
        }))
        connection.on('TESTING', ((msg) => {
            console.log(msg)
        }))

        connection.on('CallerLeftGame', (() => {
            removeBackStack("Home")
        }))

        connection.on('GetGameUserId', ((userId) => {
            setCurrentUser(old => ({
                ...old,
                id: userId
            }))
        }))

        connection.on('PersonLeftGame', ((disconnectedPersonId: number) => {
            setGameInstance(old => ({
                ...old,
                participants: old.gameState == 0 ? old.participants.filter(
                    el => el.playerId != disconnectedPersonId) : old.participants.map(
                        y => y.playerId == disconnectedPersonId ? { ...y, isBot: true } : y
                    )
            }))
        }))
        connection.on('NavigateToLobby', ((gi) => {
            removeBackStack("GameLobby")
        }))
        connection.on('NavigateToGame', ((gi) => {
            removeBackStack("GameMap")
        }))

        connection.on('OnSelectedTerritory', (selectedTerritoryResponse: SelectedTerritoryResponse) => {
            setGameInstance(old => ({
                ...old,
                objectTerritory: old.objectTerritory.map(
                    el => el.id === selectedTerritoryResponse.territoryId ? { ...el, attackedBy: selectedTerritoryResponse.attackedById } : el
                )
            }))
        })
        connection.on('GetGameInstance', ((gi) => {
            setGameInstance(gi)

            pingQuestionService()
            setJoiningGameException(null)
        }))
        connection.on('PlayerRejoined', ((participId: number) => {
            setGameInstance(old => ({
                ...old,
                participants: old.participants.map(
                    el => el.playerId === participId ? { ...el, isBot: false } : el
                )
            }))
        }))
        connection.on('GameStarting', (() => {
            removeBackStack("GameMap")
        }))
        connection.on('GameException', ((er: string) => {
            setJoiningGameException(er)
        }))

        connection.on('ShowGameMap', (() => {
            setRoundQuestion(null)
            setPlayerQuestionAnswers(null)
        }))

        // Game events
        connection.on('Game_Show_Main_Screen', ((msTimeForAction) => {
            removeBackStack("GameMap")
        }))

        connection.on('ShowRoundingAttacker', ((attackerId: number, availableAttackTerritoriesNames: string[]) => {
            // Set the preview of available attack territories for given playerid
            setPlayerAttackPossibilities({
                attackerId: attackerId,
                availableAttackTerritories: availableAttackTerritoriesNames
            })



            setPlayerQuestionAnswers(null)
            setRoundQuestion(null)
        }))

        connection.on('BorderSelectedGameException', ((msg: string) => {
            setGameMapException(msg)
        }))

        // Question events
        connection.on('GetRoundQuestion', ((roundQuestion: QuestionClientResponse) => {
            setPlayerQuestionAnswers(null)
            setRoundQuestion(roundQuestion)
        }))

        connection.on('MCQuestionPreviewResult', ((previewResult: MCPlayerQuestionAnswers) => {
            setPlayerAttackPossibilities(null)

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        connection.on('NumberQuestionPreviewResult', ((previewResult: MCPlayerQuestionAnswers) => {
            setPlayerAttackPossibilities(null)

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        // Timer event
        connection.on('GameSendCountDownSeconds', ((secondsForAction) => {
            setGameTimer(secondsForAction)
        }))
    }
}

// Game map events
export function SelectTerritory(territoryName: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("SelectTerritory", territoryName)
}

export function AnswerMCQuestion(answerId: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", answerId)
}

export function AnswerNumberQuestion(numberAnswer: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", numberAnswer)
}

// export function RemoveGameData() {
//     gameInstance && setGameInstance(null)
//     gameTimer && setGameTimer(0)
//     playerAttackPossibilities && setPlayerAttackPossibilities(null)
//     gameMapException && setGameMapException(null)
//     roundQuestion && setRoundQuestion(null)
//     playerQuestionAnswers && setPlayerQuestionAnswers(null)
// }

// Send events to server
export function CreateGameLobby() {

    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("CreateGameLobby")
}

export function LeaveGameLobby() {
    connection?.invoke("LeaveGameLobby")
}

export function JoinLobby(code: string) {
    connection?.invoke("JoinGameLobby", code)
}

export function StartGame() {
    connection?.invoke("StartGame")
}

export function FindPublicMatch() {
    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("FindPublicMatch")
}
