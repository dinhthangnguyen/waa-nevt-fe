import "./index.css"

export const OptionType = ({ attributeType, selectAtrribute }) => {
    const select = (attribute) => {
        selectAtrribute({type: attributeType.type, attribute: attribute})
    }
    return (
        <div className="option">
            <h5 id="attributeType" className="card-title">{attributeType.type.toUpperCase()} OPTIONS</h5>
            <div className="a-content">
                {attributeType.items.map(e => {
                    return <div className={e.selected ? "cell-selected" : "cell"} key={e.value} onClick={select.bind(this,e)}>
                        <p className=" text-uppercase">
                            {e.value}
                        </p>
                        <p className={e.selected ? "": " text-success"}>${e.additionalPrice}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
