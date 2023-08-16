'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import DsWordCloud from 'react-d3-cloud'

type Props = {
    formattedTopics: { text: string, value: number }[]
}

const fontSizeMapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16
}

const CustomWordCloud = ({ formattedTopics }: Props) => {
    const theme = useTheme()
    const router = useRouter()
    return (
        <>
            <DsWordCloud height={550} font='Times' fontSize={fontSizeMapper} rotate={0} padding={10} onWordClick={(e, word) => {
                router.push("/quiz?topic=" + word.text);
            }} fill={theme.theme === 'dark' ? 'white' : 'black'} data={formattedTopics} />
        </>
    )
}

export default CustomWordCloud