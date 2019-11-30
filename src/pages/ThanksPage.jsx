import React, { useEffect, useState } from 'react'
import { Pane, Card, Paragraph } from 'evergreen-ui'
import Label from '../components/label/Label'
import { useAppHooks } from '../context'
import { BACK_HOME } from '../reducers/pageReducer'
import { ADD_CANDIDAT, UPDATE_CANDIDAT } from '../reducers/candidatReducer'
import { setCandidats, getCandidats } from '../utils/candidat.util'
import { getUser } from '../utils/user.util'

const ThanksPage = () => {
    const { useAuth, useQuizz, usePage, useCandidat } = useAppHooks()
    const [ pageState, dispatchPage ] = usePage
    const [authState, dispatchAuth] = useAuth
    const [{score, min, sec}, dispatchQuizz] = useQuizz
    const [{candidats}, dispatchCandidat] = useCandidat

    const [user, setUser] = useState(getUser())

    useEffect(() => {
        if (sec > 0) {
            let candidat = candidats.find(c => c.id === user.id)
            candidat = {
                ...candidat,
                name: user.name,
                email: user.email,
                language: user.language,
                score,
                time: `${min}min${sec}sec`
            }
    
            dispatchPage({ type: BACK_HOME })
            dispatchCandidat({ type: UPDATE_CANDIDAT, payload: {candidat} })

            let index = candidats.findIndex(c => c.id === candidat.id)
            candidats[index] = candidat
            setCandidats(candidats)
        }
    }, [sec])

    return (
        <Pane>
            <Card marginX={80}>
                <Label name={`Thank YOU ${user.name} !!!`} />
                <Paragraph>
                    Merci à toi d'avoir participer à notre quizz. On espère que tu t'es amusé. Nous étudierons tes résultats et reviendront probablement vers toi.
                    Si tu souhaites t'entrainer sur d'autres technologies, n'hésites pas ;)
                    A très bientôt.
                </Paragraph> 
            </Card>
        </Pane>
    )
}

export default ThanksPage
