import React from 'react'
import { Pane, Icon, Button } from 'evergreen-ui'

const ButtonComponent = ({ x, y, color, icon, text }) => {
    return (
        <Pane
            position='absolute'
            top={y}
            left={x}
            transform="translate3d(-50%, -50%, 0)"
        >
            <Button>{text}</Button>
        </Pane>
    )
}

const CircleComponent = ({rx, ry, r, isBordered, color, icon, text}) => {
    return (
        <Pane
            borderRadius='50%'
            width={r * 2}
            height={r * 2}
            position='absolute'
            top={ry}
            left={rx}
            backgroundColor={color}
            transform="translate3d(-50%, -50%, 0)"
        >
            <Pane
                display='flex'
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100%"
            >
                <Pane>
                    <Icon icon={icon} size={80} />
                </Pane>
                <Pane marginX={30} textAlign='center'>{text}</Pane>
            </Pane>
        </Pane>
    )
}

const TestPage = ({ isButton = false }) => {
    const RAYON = 100
    const WIDTH = 500
    const HEIGHT = 500

    return (
        <Pane
            margin="auto"
            position="relative"
            elevation={2}
            width={WIDTH}
            height={HEIGHT}
            backgroundColor="#ffff"
        >
            <CircleComponent
                rx={WIDTH/6}
                ry={HEIGHT/6}
                r={RAYON}
                color="red"
                icon="add"
                text="Lorem ipsum dolor sit amet."
            />
            <CircleComponent
                rx={5*WIDTH/6}
                ry={HEIGHT/6}
                r={RAYON}
                color="grey"
                icon="application"
                text="Suspendisse."
            />
            <CircleComponent
                rx={19*WIDTH/20}
                ry={7.85*HEIGHT/12}
                r={RAYON}
                color="blue"
                icon="badge"
                text="Phasellus placerat."
            />
            <CircleComponent
                rx={WIDTH/2}
                ry={3.8*HEIGHT/4}
                r={RAYON}
                color="green"
                icon="annotation"
                text="Class aptent taciti."
            />
            <CircleComponent
                rx={WIDTH/20}
                ry={2.55*HEIGHT/4}
                r={RAYON}
                color="yellow"
                icon="airplane"
                text="Nulla ut mollis nunc."
            />
            {
                isButton ?
                <CircleComponent
                    rx={WIDTH/2}
                    ry={HEIGHT/2}
                    r={RAYON}
                    color="orange"
                /> :
                <ButtonComponent
                    x={WIDTH / 2}
                    y={HEIGHT / 2}
                    text="Commencer"
                />
            }
        </Pane>
    )
}

export default TestPage
