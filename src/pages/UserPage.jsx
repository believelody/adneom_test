import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Card, Pane, Paragraph, Text } from 'evergreen-ui'
import Label from '../components/label/Label'
import { useAppHooks } from '../context'
import quizzes from '../data/quizz.json'
import { SUCCESS_AUTH } from '../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../reducers/loadingReducer'
import isMobile from '../utils/isMobile.util'
import { getUser } from '../utils/user.util'

const UserPage = ({ match }) => {
    const { useAuth, useLoading } = useAppHooks()
    const [{loading}, dispatchLoading] = useLoading
    const [{isConnected, user}, dispatchAuth] = useAuth

    return (
        !loading && isConnected &&
        <Card marginX={isMobile() ? 0 : 150} marginTop={50} elevation={1} padding={50}>
            <Paragraph>
                Tout d'abord merci encore de participer à ce quizz. Permet moi de te tutoyer.
                Tu as choisi le quizz {user && user.language}. Le temps imparti n'est pas un handicap, nous voulons simplement voir en combien de temps tu es capable de le faire.
                Une fois la question finie, tu peux appuyer sur le bouton "Suivant" pour accéder à la page suivante. Utilise tout document qui te semble adéquat pour finaliser le quizz et bonne chance à toi.
            </Paragraph>
            <hr />
            <Text>Positive Think</Text>
            <Label name='Démarrer le test' link={`/users/${match.params.id}/quizz/1`} />
        </Card>
    )
}

export default UserPage
