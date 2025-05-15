type HomeLayoutProp = {
    children: React.ReactNode
}
export default function HomeLayout(props: HomeLayoutProp) {

    return (
        <div>
            <h1>Home Layout</h1>
            {
                props.children
            }
        </div>
    )
}
