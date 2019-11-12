import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pane, Card, RadioGroup, Button, Text } from 'evergreen-ui'
import Label from '../label/Label'
import { useAppHooks } from '../../context'
import { ANSWER_FOUND, QUIZZ_FINISHED } from '../../reducers/quizzReducer'

const QCMQuizzForm = ({ data, matchParams }) => {
    const { useQuizz } = useAppHooks()
    const [quizzState, dispatchQuizz] = useQuizz

    const [value, setValue] = useState(null)

    const handleResponse = e => {
        console.log(value)
        if (value === data.answer) {
            dispatchQuizz({ type: ANSWER_FOUND })
        }
        if (matchParams.pageId == data.choices.length) {
            dispatchQuizz({ type: QUIZZ_FINISHED })
        }
    }

    return (
        data &&
        <Card>
           <Label name={data.question} />
            <Pane>
                <RadioGroup
                    value={value}
                    options={
                        data.choices.map((choice, i) =>({label: choice, value: choice}))
                    }
                    onChange={v => setValue(v)}
                />
            </Pane>
            <Pane>                
                {
                    matchParams.pageId == data.choices.length ?
                    <Link to='/thanks'>
                        <Button onClick={handleResponse}>
                            <Text>Terminer le quizz</Text>
                        </Button>
                    </Link> :
                    <Link to={`${+matchParams.pageId + 1}`}>
                        <Button onClick={handleResponse}>
                            <Text>Question suivante</Text>
                        </Button>
                    </Link>
                }
            </Pane>
        </Card>
    )
}

export default QCMQuizzForm
