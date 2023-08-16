'use client'

import { LuBrainCircuit } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {}

const QuizMeCard = (props: Props) => {
    const router = useRouter()
    return (
        <Card className="hover:cursor-pointer hover:opacity-75" onClick={() => router.push('/quiz')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Quiz Me!
                </CardTitle>
                <LuBrainCircuit className='w-7 h-7' />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Challenge yourself with a quiz!</p>
            </CardContent>
        </Card>
    )
}

export default QuizMeCard