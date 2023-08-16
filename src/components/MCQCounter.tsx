import { LuCheckCircle2, LuXCircle } from "react-icons/lu"

import { Card } from "./ui/card"
import { Separator } from "./ui/separator"

type Props = {
    correctAnswers: number
    wrongAnswers: number
}

const MCQCounter = ({ correctAnswers, wrongAnswers }: Props) => {
    return (
        <Card className="flex flex-row items-center justify-center p-2">
            <LuCheckCircle2 className='text-green-700 text-xl' />
            <span className="mx-3 text-2xl text-[green]">{correctAnswers}</span>
            <Separator orientation="vertical" />
            <span className="mx-3 text-2xl text-[red]">{wrongAnswers}</span>
            <LuXCircle className='text-red-500 text-xl' />
        </Card>
    )
}

export default MCQCounter