'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuCopyCheck, LuBookOpen } from 'react-icons/lu'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { quizCreationSchema } from '@/schemas/form/quiz'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import LoadingQuestions from './LoadingQuestions'

type Props = {
    topicParam: string
}

type Input = z.infer<typeof quizCreationSchema>

const QuizCreation = ({ topicParam }: Props) => {
    const router = useRouter()
    const [showLoader, setShowLoader] = useState(false)
    const [finished, setFinished] = useState(false)
    const { mutate: getQuestions, isLoading } = useMutation({
        mutationFn: async ({ amount, topic, type }: Input) => {

            const response = await axios.post('/api/game', {
                amount,
                topic,
                type,
            })
            return response.data
        }
    })
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: topicParam || '',
            type: 'open_ended',
        },
    })

    const onSubmit = (input: Input) => {
        setShowLoader(true)
        getQuestions({
            amount: input.amount,
            topic: input.topic,
            type: input.type,
        }, {
            onSuccess: ({ gameId }) => {
                setFinished(true)
                setTimeout(() => {
                    if (form.getValues("type") === "open_ended") {
                        router.push(`/play/open-ended/${gameId}`)
                    } else {
                        router.push(`/play/mcq/${gameId}`)
                    }
                }, 1000)
            },
            onError: () => {
                setShowLoader(false)
            }
        })
    }

    form.watch()

    if (showLoader) {
        return <LoadingQuestions finished={finished} />
    }

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                    <CardDescription>Choose a topic</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a topic" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide any topic you would like to be quizzed on
                                            here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Questions</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="How many questions?"
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue("amount", parseInt(e.target.value));
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can choose how many questions you would like to be
                                            quizzed on here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between">
                                <Button
                                    variant={
                                        form.getValues("type") === "mcq" ? "default" : "secondary"
                                    }
                                    className="w-1/2 rounded-none rounded-l-lg"
                                    onClick={() => {
                                        form.setValue("type", "mcq");
                                    }}
                                    type="button"
                                >
                                    <LuCopyCheck className="w-4 h-4 mr-2" />
                                    Multiple Choice
                                </Button>
                                <Separator orientation="vertical" />
                                <Button
                                    variant={
                                        form.getValues("type") === "open_ended"
                                            ? "default"
                                            : "secondary"
                                    }
                                    className="w-1/2 rounded-none rounded-r-lg"
                                    onClick={() => form.setValue("type", "open_ended")}
                                    type="button"
                                >
                                    <LuBookOpen className="w-4 h-4 mr-2" />
                                    Open Ended
                                </Button>
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default QuizCreation