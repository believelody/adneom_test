import React, { useEffect } from 'react'
import { Pane, Card, Paragraph } from 'evergreen-ui'
import Label from '../components/label/Label'
import { useAppHooks } from '../context'
import { BACK_HOME } from '../reducers/pageReducer'

const ThanksPage = () => {
    const { useAuth, useQuizz, usePage } = useAppHooks()
    const [ pageState, dispatchPage ] = usePage
    const [{user}, dispatchAuth] = useAuth
    const [quizzState, dispatchQuizz] = useQuizz

    useEffect(() => {
        dispatchPage({ type: BACK_HOME })
    }, [])

    console.log(quizzState)

    return (
        <Pane>
            <Card marginX={80}>
                <Label name={`Thank YOU ${user.name} !!!`} />
                <Paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nulla exercitationem, animi nesciunt architecto officia labore atque dicta similique a quibusdam eaque earum quis quidem sed. Qui consequatur ut in eos, voluptates minima animi. Aperiam ipsam delectus consequuntur voluptatum beatae architecto atque odit quod est repellat quaerat, quibusdam, eaque vel eveniet expedita accusamus asperiores dicta dolorum repellendus voluptate ipsum? At accusantium vitae eos exercitationem autem. Alias eos deserunt recusandae dolore delectus quibusdam, deleniti nesciunt laborum?
                </Paragraph> 
            </Card>
        </Pane>
    )
}

export default ThanksPage
