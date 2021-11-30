import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, Input, Button, IconButton } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoiceQuestionMock, numberChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc';
import { authAtom, gameTimerAtom } from '../../state';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PlayerAvatar, MultipleAvatars, AnswerButton } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer';
import { MaterialIcons } from '@expo/vector-icons';

export default function NumberChoiceScreen({
    question = numberChoiceQuestionMock,
    AnswerNumberQuestion = (e) => console.log("Default behavior" + e),
    playerQuestionAnswers = playerQuestionNumberAnswersMock
}) {
    const user = useRecoilValue(authAtom)

    function AnswerNumberQuestionComponent() {
    const [answer, setAnswer] = useState("")

        return (
            <Center mt={9} mb={2}>
                <HStack>
                    <Input onChangeText={(e) => {
                        if (/^\d+$/.test(e) || !e) {
                            setAnswer(e)
                        }
                    }}
                        value={answer}
                        maxLength={14}
                        mr={2}
                        keyboardType="numeric"
                        variant="rounded"
                        bg="#D7D7D7"
                        color="black"
                        _hover={{ bg: "#C6C6C6" }}
                        size="md"
                        placeholder="" />

                    <IconButton
                        onPress={() => {
                            AnswerNumberQuestion(answer)
                        }}
                        size="md"
                        colorScheme="blue_button_bd"
                        variant="solid"
                        _icon={{
                            as: MaterialIcons,
                            name: "check",
                            color: "white"
                        }}
                    />
                </HStack>
            </Center>
        )
    }

    function NumberQuestionResult() {
        return (
            <Box>
                <HStack justifyContent="center">
                    <Box width="33%" paddingY={6} borderRadius={25} bg="#2F4887">
                        <Center alignItems="center" justifyContent="center">
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 32 }}>{playerQuestionAnswers.correctAnswer}</Text>
                        </Center>
                    </Box>
                </HStack>

                <HStack marginTop={5} justifyContent="space-evenly">
                    {playerQuestionAnswers.playerAnswers.map(x =>
                        <Box style={{
                            elevation: 5,
                            outlineColor: '#42FF00',
                            outlineStyle: "solid",
                            outlineWidth: x.winner ? 10 : 0,
                        }} width="25%" paddingY={2} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == x.playerId).avatarName)}>
                            <Center alignItems="center" justifyContent="center">
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 25 }}>{x.answer ?? "---"}</Text>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 20 }}>{x.timeElapsed ?? "---"}</Text>
                            </Center>
                        </Box>
                    )}

                </HStack>
            </Box>
        )
    }

    return (
        <>
            <ImageBackground source={require('../../assets/gameLobby.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <Center flex={1}>
                    <Box height="80%" minHeight="500" style={{ backgroundColor: "#D7FFFE", borderRadius: 25, justifyContent: "center" }} width="90%">
                        <Box >
                            <Center>
                                {/* Top Timer */}
                                <MCQuestionTimer />
                            </Center>

                            {/* Question / Avatars */}
                            <HStack style={{ margin: 10 }}>


                                {/* Attacker */}
                                {question.isNeutral ?
                                    <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == user.id).avatarName} />
                                    :
                                    <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == question.attackerId).avatarName} />
                                }

                                {/* Question */}
                                <VStack flex={4} >
                                    <Box style={{
                                        height: "100%",
                                        borderRadius: 30,
                                        backgroundColor: "#2F4887",
                                        justifyContent: "center"
                                    }} p={10} shadow="5">
                                        <Text fontWeight="bold" fontSize="4xl" style={{ textAlign: "center" }}>
                                            {decodeURIComponent(question.question)}
                                        </Text>
                                    </Box>
                                </VStack>

                                {/* Defender */}
                                {question.isNeutral ?
                                    <MultipleAvatars avatarNames={question.participants.filter(x => x.playerId != user.id).map(e => e.avatarName)} />
                                    :
                                    <PlayerAvatar supportIcon={"shield"} avatarName={question.participants.find(x => x.playerId == question.defenderId).avatarName} />
                                }
                            </HStack>

                            {/* Divider */}
                            <Center my={1}>
                                <Divider width="80%" height={1} bgColor="#25479D" />
                            </Center>
                        </Box>
                        <Box>
                            {playerQuestionAnswers ?
                                <NumberQuestionResult />
                                :
                                <AnswerNumberQuestionComponent />
                            }
                        </Box>
                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}