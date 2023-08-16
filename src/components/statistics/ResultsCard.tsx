import { LuAward, LuTrophy } from 'react-icons/lu'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type Props = {
    accuracy: number
}

const ResultsCard = ({ accuracy }: Props) => {
    return (
        <Card className='md:col-span-7'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
                <CardTitle className='text-2xl font-bold'>
                    Results
                </CardTitle>
                <LuAward className='text-xl' />
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center h-3/5'>
                {accuracy > 75 ? (
                    <>
                        <LuTrophy className='mr-4 text-5xl text-yellow-400' />
                        <div className='flex flex-col text-2xl font-semibold text-yellow-400'>
                            <span>Impressive!</span>
                            <span className='text-sm text-center text-black opacity-50'>
                                {`> 75% accuracy`}
                            </span>
                        </div>
                    </>
                ) :
                    accuracy > 25 ? (
                        <>
                            <LuTrophy className='mr-4 text-5xl text-gray-400' />
                            <div className='flex flex-col text-2xl font-semibold text-gray-400'>
                                <span>Good Job!</span>
                                <span className='text-sm text-center text-black opacity-50'>
                                    {`> 25% accuracy`}
                                </span>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <LuTrophy className='mr-4 text-5xl text-red-400' />
                                <div className='flex flex-col text-2xl font-semibold text-red-400'>
                                    <span>Nice Try!</span>
                                    <span className='text-sm text-center text-black opacity-50'>
                                        {`< 25% accuracy`}
                                    </span>
                                </div>
                            </>
                        )}
            </CardContent>
        </Card>
    )
}

export default ResultsCard