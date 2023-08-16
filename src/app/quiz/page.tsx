import { redirect } from 'next/navigation'

import QuizCreation from '@/components/QuizCreation'
import { getAuthSession } from '@/lib/nextauth'

type Props = {
    searchParams: {
        topic?: string
    }
}

export const metadata = {
    title: 'Quiz | Quizmify',
}

const QuizPage = async ({ searchParams }: Props) => {
    const session = await getAuthSession()
    console.log(searchParams.topic)

    if (!session?.user) {
        return redirect('/')
    }

    return (
        <QuizCreation topicParam={searchParams.topic || ''} />
    )
}

export default QuizPage