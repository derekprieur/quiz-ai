import { prisma } from "@/lib/db"
import Link from "next/link"
import { LuClock, LuCopyCheck, LuEdit2 } from "react-icons/lu"

type Props = {
    limit: number
    userId: string
}

const HistoryComponent = async ({ limit, userId }: Props) => {
    const games = await prisma.game.findMany({
        where: {
            userId
        },
        take: limit,
        orderBy: {
            timeStarted: 'desc'
        }
    })
    return (
        <div className="space-y-8">
            {games.map(game => (
                <div className="flex items-center justify-between" key={game.id}>
                    <div className="flex items-center">
                        {game.gameType === 'mcq' ? (
                            <LuCopyCheck className='mr-3 text-xl' />
                        ) : (
                            <LuEdit2 className='mr-3 text-xl' />
                        )}
                        <div className="ml-4 space-y-1">
                            <Link className="text-base font-medium leading-none underline" href={`/statistics/${game.id}`}>
                                {game.topic}
                            </Link>
                            <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                                <LuClock className='text-lg mr-1' />
                                {new Date(game.timeStarted).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {game.gameType === 'mcq' ? 'MCQ' : 'Open Ended'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HistoryComponent