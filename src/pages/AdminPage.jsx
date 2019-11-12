import React, {useEffect} from 'react'
import { Pane, Text } from 'evergreen-ui'
import Label from '../components/label/Label'
import CandidatList from '../components/candidats/CandidatList'
import { useAppHooks } from '../context'
import { getCandidats } from '../utils/candidat.util'
import { GET_ALL_CANDIDATS } from '../reducers/candidatReducer'

const AdminPage = () => {
    const { useAuth, useCandidat } = useAppHooks()
    const [{user}, dispatchAuth] = useAuth

    return (
        user &&
        <Pane>
            <Label name={`Bienvenue ${user.name}`} />
            <Pane textAlign='center' paddingY={20}>
                <Text>
                    Voici les statistiques et résultats des différents candidats qui ont effectués le test
                </Text>
            </Pane>
            <CandidatList />
        </Pane>
    )
}

export default AdminPage
