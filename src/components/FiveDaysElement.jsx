const FiveDaysElement = (props) => {
    const { texto } = props

    return (
        <div className="d-flex justify-content-center flex-row col-2 border border-dark rounded">
            <div className="text-center">
                <img src="https://picsum.photos/50/50" alt="" />
                <p>{texto}</p>
            </div>
        </div>
    )
}

export default FiveDaysElement