import { redirect } from "next/navigation"

import MCQ from "@/components/MCQ"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextauth"
import OpenEnded from "@/components/OpenEnded"

type Props = {
    params: {
        gameId: string
    }
}

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect('/')
    }

    const game = await prisma.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    answer: true
                }
            }
        }
    })

    if (!game || game.gameType !== 'open_ended') {
        return redirect('/quiz')
    }

    return (
        <OpenEnded game={game} />
    )
}

export default OpenEndedPage