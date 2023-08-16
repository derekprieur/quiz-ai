import { LuHourglass } from "react-icons/lu"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formatTimeDelta } from "@/lib/utils"
import { differenceInSeconds } from "date-fns"

type Props = {
    timeEnded: Date
    timeStarted: Date
}

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
    return (
        <Card className="md:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Time Taken
                </CardTitle>
                <LuHourglass className='text-xl' />
            </CardHeader>
            <CardContent>
                <div className="text-sm font-medium">
                    {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
                </div>
            </CardContent>
        </Card>
    )
}

export default TimeTakenCard