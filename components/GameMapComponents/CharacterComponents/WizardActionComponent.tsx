import { Box, Center, Pressable, Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { WizardUseMultipleChoiceHint } from "../../../hooks";
import { gameTimerAtom, authAtom, gameInstanceAtom } from "../../../state";
import { IAuthData } from "../../../types/authTypes";
import { CharacterType } from "../../../types/gameCharacterTypes";
import { QuestionClientResponse } from "../../../types/gameResponseTypes";

export default function WizardActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showWizardButton, setShowWizardButton] = useState<boolean>(false);
    const [wizardAbilityUsed, setWizardAbilityUsed] = useState<boolean>(false);

    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const gameInstance = useRecoilValue(gameInstanceAtom)

    const getThisUserWizardAbilities = useMemo(() => {
        return question.participants.find(e => e.playerId == user.id)?.gameCharacter?.characterAbilities.wizardCharacterAbilitiesResponse
    }, [question, user])

    const areAllHintsUsed = useMemo(() => {
        if (!getThisUserWizardAbilities) return true;

        return getThisUserWizardAbilities?.mcQuestionHintUseCount >= getThisUserWizardAbilities?.mcQuestionHintMaxUseCount
    }, [getThisUserWizardAbilities])


    useEffect(() => {
        const thisUserParticipant = question.participants.find(e => e.playerId == user.id)

        if (thisUserParticipant?.gameCharacter?.characterAbilities.characterType != CharacterType.WIZARD) return

        // Visible only on multiple rounds
        if (question.type != "multiple")
            return

        setShowWizardButton(true)
        setWizardAbilityUsed(false)
    }, [question.question, user])


    // If the wizard ability was used this round do not allow any more activations for this round
    useEffect(() => {
        if (!getThisUserWizardAbilities || !getThisUserWizardAbilities.abilityUsedInRounds)
            return

        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        if (!getThisUserWizardAbilities.abilityUsedInRounds.some(e => e == currentRound?.id))
            return
            
        setWizardAbilityUsed(true)
    }, [getThisUserWizardAbilities?.abilityUsedInRounds])


    if (!showWizardButton)
        return null


    return (
        <Pressable opacity={invisible ? 0 : 100} disabled={invisible || areAllHintsUsed || wizardAbilityUsed} onPress={() => {
            WizardUseMultipleChoiceHint(globalDisplayTime)
            setWizardAbilityUsed(true)
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box style={{
                        aspectRatio: 1 / 1,
                    }} p={2} mt={6} shadow={3} bg={
                        isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                    } borderRadius={10}>
                        <Center>
                            <Text selectable={false} >
                                Wizard
                            </Text>
                            <Text selectable={false}>
                                {getThisUserWizardAbilities?.mcQuestionHintUseCount} / {getThisUserWizardAbilities?.mcQuestionHintMaxUseCount}
                            </Text>
                        </Center>
                    </Box>
                )
            }}
        </Pressable>
    )
}