import React, { useEffect, useMemo, useState } from 'react'
import { Text, Button, Center, Container, Box, Icon, HStack, Pressable, VStack, Image, IconButton } from 'native-base'
import { StyleSheet, ImageBackground, ActivityIndicator, Platform } from 'react-native'
import { LeaveGameLobby, StartGame, AddGameBot, RemovePlayerFromLobby, SelectLobbyCharacter } from '../../hooks'
import { FontAwesome5 } from "@expo/vector-icons"
import { useRecoilValue } from "recoil"
import { connectionStatusAtom, gameInstanceAtom, userIdSelector } from "../../state"
import ExitGameModal from '../Popups/ExitGameModal'
import { GetPenguinAvatarImage } from '../GameMapComponents/CommonGameFunc'
import { GameInstanceResponse, GameLobbyDataResponse, GameType, ParticipantsResponse } from '../../types/gameInstanceTypes'
import { GameHubStatusCode } from '../../types/hubTypes'
import { AntDesign } from '@expo/vector-icons';
import { gameLobbyAtom, gameLobbyCharactersAtom, gameLobbyParticipantCharacterAtom } from '../../state/lobby'
import GameLobbyCharacters from './GameLobbyCharacters'

export default function GameLobby() {
    const connectionStatus = useRecoilValue(connectionStatusAtom)
    const lobbyData = useRecoilValue(gameLobbyAtom) as GameLobbyDataResponse

    const [isClosing, setIsClosing] = useState(false)
    const RequiredPlayers = 3
    const userId = useRecoilValue(userIdSelector)

    const IsLobbyFull = useMemo(() => {
        return lobbyData.participants.length == RequiredPlayers ? true : false
    }, [lobbyData])

    const IsGameHost = useMemo(() => {
        return lobbyData.gameCreatorId == userId ? true : false
    }, [lobbyData, userId])


    // Gametype - 0 public, 1 private
    function StartGameButton({ onPress }: { onPress: () => void }) {
        return (
            <Pressable disabled={!IsGameHost || !IsLobbyFull} onPress={() => {
                lobbyData.gameType == 1 && onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} mt={6} shadow={3} bg={
                            !IsLobbyFull ? "#4D66A5" :
                                isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                        } p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text selectable={false} fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    {!IsLobbyFull ? `Waiting for ${RequiredPlayers - lobbyData.participants?.length} more players` : IsGameHost ? "Start game" : "Waiting for host to start"}
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function CodeCard() {
        if (lobbyData.gameCreatorId != userId) {
            return (
                <Box backgroundColor="#C8FBFF" py={Platform.OS == "web" ? 6 : 2} px={'40'} shadow={3} borderRadius={15}>
                    <Text color="black" fontWeight="bold" fontSize="3xl">
                        Code: {lobbyData.invitationLink}
                    </Text>
                </Box>
            )
        }

        return (
            <HStack style={{
                justifyContent: "space-around",
                flex: 1,
                alignItems: "center",
            }}>
                <AddGameBotButton invisible />
                <Box backgroundColor="#C8FBFF" py={Platform.OS == "web" ? 6 : 2} px={'40'} shadow={3} borderRadius={15}>
                    <Text color="black" fontWeight="bold" fontSize="3xl">
                        Code: {lobbyData.invitationLink}
                    </Text>
                </Box>

                <Box mx={3} />
                <AddGameBotButton onPress={() => {
                    AddGameBot()
                }} />
            </HStack>
        )
    }

    function AddGameBotButton({ onPress, invisible }: { onPress?: () => void, invisible?: boolean }) {
        return (
            <Pressable opacity={invisible ? 0 : 100} disabled={!IsGameHost || IsLobbyFull} onPress={() => {
                lobbyData.gameType == GameType.PRIVATE && onPress && onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box shadow={3} bg={
                            isPressed ? "#BDBDBD" : isHovered ? "#E4E4E4" : "#fff"
                        } p={2} borderColor="black" borderWidth={2} borderRadius={5}>
                            <Text selectable={false} textAlign={"center"} color={"black"} >
                                Add Bot
                            </Text>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function PlayerCard({ participant }: { participant: ParticipantsResponse }) {
        return (
            <Container style={{ borderWidth: participant.playerId == lobbyData.gameCreatorId ? 5 : 0, borderColor: "gold", }} m={5} p={3} backgroundColor="white" borderRadius={20}>
                <VStack >
                    <Center>
                        <Image
                            source={GetPenguinAvatarImage(participant.gameCharacter?.character.avatarName)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size={Platform.OS === 'web' ? "xl" : "sm"}
                        />

                    </Center>
                    <Center>
                        <Text isTruncated maxWidth="250" fontSize="xl" color="black">
                            {participant.player?.username}
                        </Text>

                        {participant.playerId == lobbyData.gameCreatorId ? (
                            <Text isTruncated maxWidth="90%" fontSize="md" color="black">
                                (host)
                            </Text>
                        ) : lobbyData.gameCreatorId == userId && participant.player?.isBot ?
                            <IconButton
                                onPress={() => {
                                    RemovePlayerFromLobby(participant.playerId)
                                }}
                                size="md"
                                variant="outline"
                                colorScheme="danger"
                                _icon={{
                                    as: AntDesign,
                                    size: "md",
                                    name: "closecircle",
                                }}
                            /> : null
                        }
                        <Text isTruncated maxWidth="90%" fontWeight="bold" fontSize="md" color="black">
                            {participant.gameCharacter?.character.name}
                        </Text>
                    </Center>
                </VStack>

            </Container>
        )
    }

    if (connectionStatus && connectionStatus.StatusCode == GameHubStatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{connectionStatus.Error}</Text>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/gameLobby.svg') : require('../../assets/gameLobby.png')} resizeMode="cover" style={styles.image}>
            {isClosing && <ExitGameModal backAction={isClosing}
                onAccept={() => {
                    LeaveGameLobby()
                    setIsClosing(false)
                }}
                onClose={() => {
                    setIsClosing(false)
                }} />}

            <Box position="absolute" top="0" left="0">
                <Button onPress={() => {
                    setIsClosing(true)
                }} leftIcon={<Icon as={FontAwesome5} name="arrow-left" size="sm" color="white" />} size="lg" colorScheme="danger">
                    <Text fontSize="lg" >Exit game lobby</Text>
                </Button>
            </Box>


            <Center>
                <HStack>
                    {lobbyData.participants?.map(x => {
                        return (
                            <PlayerCard key={x.playerId} participant={x} />
                        )
                    })}


                </HStack>

                {lobbyData.gameType == 1 && CodeCard()}
                <StartGameButton onPress={() =>
                    StartGame()
                } />
            </Center>


            <GameLobbyCharacters  />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})