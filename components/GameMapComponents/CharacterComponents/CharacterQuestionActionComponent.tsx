import { QuestionClientResponse } from "../../../types/gameResponseTypes";
import VikingActionComponent from "./VikingActionComponent";
import WizardActionComponent from "./WizardActionComponent";

export default function CharacterQuestionActionComponent({ question, invisible, hasPlayerAnswered }
    : { question: QuestionClientResponse, hasPlayerAnswered: boolean, invisible?: boolean }) {

    if (!hasPlayerAnswered)
        return null

    return (
        <>
            <WizardActionComponent question={question} invisible={invisible} key={"WizardActionComponent"} />
            <VikingActionComponent question={question} invisible={invisible} key={"VikingActionComponent"} />
        </>
    )
}