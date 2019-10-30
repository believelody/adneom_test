import React from 'react'
import { Pane, Spinner, Text } from 'evergreen-ui'
import { useAppHooks } from '../../context'

let gradient = ``

const Loading = () => {
    const { useLoading } = useAppHooks()
    const [{ loading, msg }, dispatchLoading] = useLoading

    return (
        loading &&
        <Pane
            display="flex"
            overflow='hidden'
            alignItems="center"
            justifyContent="center"
            position='fixed'
            top={0}
            width='100vw'
            height='100vh'
            backgroundColor='rgba(0, 0, 0, .8)'
            flexDirection='column'
            zIndex={99}
        >
            <Spinner size={100} />
            <Text color='white' size={600}>{msg ? msg : 'Loading your content'}</Text>
        </Pane>
    );
}

export default Loading
